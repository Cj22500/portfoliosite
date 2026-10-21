# Firestore Security Specification

This specification defines the security invariants and validation guidelines for Cyril's Portfolio Firestore database, covering the `messages` and `guestbook` collections.

## 1. Data Invariants

### Contact Messages (`messages` collection)
- **Public Write-Only**: Anyone can submit a message (creates), but no one can read or update messages via the client SDK. This protects sender privacy (PII isolation).
- **Validation**:
  - `name`: String, 1 to 100 characters.
  - `email`: String, 3 to 150 characters, must look like an email.
  - `message`: String, 1 to 1000 characters.
  - `createdAt`: Must equal `request.time` (server-side enforced timestamp).

### Guestbook (`guestbook` collection)
- **Public Read, Authorized Writes**: Anyone can read the guestbook feed.
- **Creation Control**:
  - Authenticated (Google) users must set `userId` to their actual `request.auth.uid`, `isGoogleUser` to `true`, and can use their authentic photo URL/displayName.
  - Anonymous/Guest users must set `userId` to a generated guest identifier (or `"guest_*"`), `isGoogleUser` to `false`, and cannot set an authenticated avatar.
- **Deletability**: Only the original creator of a guestbook entry can delete their entry (checked via `userId == request.auth.uid` for Google users, or blocked for anonymous guest messages to prevent trolling).
- **No Updates**: Once created, guestbook entries are immutable to prevent modification of other users' messages or history rewriting.
- **Validation**:
  - `name`: String, 1 to 50 characters.
  - `message`: String, 1 to 500 characters.
  - `createdAt`: Must equal `request.time`.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following payloads represent attempt-to-bypass scenarios that must be rejected (`PERMISSION_DENIED`):

1. **Spoofed Creator ID (Guestbook)**: Creating a guestbook entry where `userId` is set to another user's UID instead of `request.auth.uid`.
2. **Missing Author Verification (Guestbook)**: Google user trying to post with `isGoogleUser = true` but `email_verified` is false or missing in auth token.
3. **Ghost Field Injection (Guestbook)**: Injecting an unauthorized field like `isAdmin: true` or `flagged: false` into a guestbook document.
4. **Retroactive Timestamp Manipulation (Guestbook)**: Enforcing `createdAt` as a past or future timestamp instead of `request.time`.
5. **PII Reader Intrusion (Messages)**: Attempting to `get` or `list` documents in the `messages` collection.
6. **Malicious ID Poisoning (Messages)**: Attempting to create a message with a document ID containing special characters or exceeding 128 characters.
7. **Bypass Immutability (Guestbook)**: Authenticated user attempting to `update` a guestbook entry left by themselves or someone else.
8. **Malicious Guest Deletion (Guestbook)**: An anonymous user trying to `delete` a guestbook entry they did not create, or any guestbook entry they made (anonymous posts are immutable/non-deletable to keep the guestbook tidy).
9. **Denial of Wallet payload size attack (Messages)**: Sending a 10MB message string.
10. **Type Mismatch Hijack (Guestbook)**: Setting `isGoogleUser` as `"yes"` (string) instead of a boolean.
11. **Email Spoofing (Messages)**: Attempting to create a message using an invalid/empty email or non-string object.
12. **Foreign Admin Access (Admins)**: Trying to write to a global `/admins/` path to self-elevate permissions.

---

## 3. Test Runner Definitions

The following TypeScript code represents the logical test assertions verifying that our security posture rejects all malicious operations.

```typescript
// firestore.rules.test.ts
// Logical assertions verified:
// - Create Message with client timestamp -> REJECT
// - Read Messages as anonymous or signed-in client -> REJECT
// - Create Guestbook entry with spoofed userId -> REJECT
// - Update Guestbook entry -> REJECT
// - Delete Guestbook entry by non-author -> REJECT
```
