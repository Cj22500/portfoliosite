import React, { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, LogIn, LogOut, Trash2, Send, ShieldCheck, User as UserIcon } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  userId: string;
  isGoogleUser: boolean;
  avatar?: string;
  createdAt: any;
}

export default function Guestbook() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(true); // Toggle between Google auth and Guest mode
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen for real-time guestbook entries
  useEffect(() => {
    const q = query(
      collection(db, 'guestbook'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: GuestbookEntry[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            name: data.name || 'Anonymous',
            message: data.message || '',
            userId: data.userId || 'unknown',
            isGoogleUser: !!data.isGoogleUser,
            avatar: data.avatar || '',
            createdAt: data.createdAt,
          });
        });
        setEntries(list.reverse()); // Show oldest at the top of feed, newest at bottom, or vice versa. Let's show newest at the top.
        setIsLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'guestbook');
      }
    );

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    let nameToUse = 'Anonymous';
    let userIdToUse = 'guest_' + Math.random().toString(36).substring(2, 9);
    let isGoogleUser = false;
    let avatarToUse = '';

    if (currentUser) {
      nameToUse = currentUser.displayName || 'Google User';
      userIdToUse = currentUser.uid;
      isGoogleUser = true;
      avatarToUse = currentUser.photoURL || '';
    } else {
      if (isGoogleSignIn) {
        // If they attempted to submit while in Google mode but not logged in, prompt login
        await handleGoogleLogin();
        setIsSubmitting(false);
        return;
      }
      nameToUse = guestName.trim() || 'Friendly Guest';
    }

    const payload: Omit<GuestbookEntry, 'id'> = {
      name: nameToUse,
      message: message.trim(),
      userId: userIdToUse,
      isGoogleUser,
      createdAt: serverTimestamp(),
    };

    if (avatarToUse) {
      payload.avatar = avatarToUse;
    }

    try {
      await addDoc(collection(db, 'guestbook'), payload);
      setMessage('');
      if (!currentUser) {
        setGuestName('');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'guestbook');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, entryUserId: string) => {
    if (!currentUser || currentUser.uid !== entryUserId) return;
    
    if (confirm('Are you sure you want to delete your entry?')) {
      try {
        await deleteDoc(doc(db, 'guestbook', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `guestbook/${id}`);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/40 p-6 md:p-8 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-200/40 dark:border-neutral-800/40 pb-6 mb-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="text-accent" /> Guestbook Wall
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Say hello, leave a message, or sign the wall to support Cyril's work!
          </p>
        </div>

        {/* Auth status panel */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-neutral-100/80 dark:bg-neutral-800/80 px-4 py-2 rounded-2xl border border-neutral-200/20 dark:border-neutral-700/20">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'User'} 
                  className="w-8 h-8 rounded-full border border-accent/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <UserIcon size={16} />
                </div>
              )}
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-900 dark:text-white max-w-[120px] truncate">
                  {currentUser.displayName}
                </p>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] text-neutral-400 hover:text-accent font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <LogOut size={10} /> Log Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleGoogleLogin}
              className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all shadow-xs cursor-pointer"
            >
              <LogIn size={14} /> Sign In with Google
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Comment Input Panel */}
        <div className="md:col-span-5 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!currentUser && (
              <div className="bg-white/50 dark:bg-neutral-950/20 p-3 rounded-2xl border border-neutral-200/30 dark:border-neutral-800/30 flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-neutral-400">Post as:</span>
                <div className="flex bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setIsGoogleSignIn(true)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${isGoogleSignIn ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-400'}`}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsGoogleSignIn(false)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${!isGoogleSignIn ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-400'}`}
                  >
                    Guest
                  </button>
                </div>
              </div>
            )}

            {!currentUser && !isGoogleSignIn && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  type="text"
                  required
                  maxLength={50}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Anonymous Guest"
                  className="w-full px-4 py-3 bg-white dark:bg-neutral-950/40 text-neutral-900 dark:text-white rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 focus:ring-1 focus:ring-accent outline-none text-sm"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest ml-1">Your Message</label>
              <textarea 
                required
                maxLength={500}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  currentUser 
                    ? `Hi ${currentUser.displayName}, leave a friendly note!` 
                    : isGoogleSignIn 
                      ? "Sign in with Google to post with your profile, or switch to Guest mode." 
                      : "Write your message here..."
                }
                className="w-full px-4 py-3 bg-white dark:bg-neutral-950/40 text-neutral-900 dark:text-white rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 focus:ring-1 focus:ring-accent outline-none text-sm resize-none"
              />
            </div>

            {currentUser ? (
              <button 
                type="submit" 
                disabled={isSubmitting || !message.trim()}
                className="w-full py-3.5 bg-accent text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent-hover transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={14} /> {isSubmitting ? 'Posting...' : 'Post Message'}
              </button>
            ) : isGoogleSignIn ? (
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all cursor-pointer"
              >
                <LogIn size={14} /> Sign In & Post
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting || !message.trim()}
                className="w-full py-3.5 bg-neutral-950 dark:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={14} /> {isSubmitting ? 'Posting...' : 'Post anonymously'}
              </button>
            )}
          </form>
        </div>

        {/* Real-time Comments List */}
        <div className="md:col-span-7 flex flex-col h-[340px] bg-white/40 dark:bg-neutral-950/20 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl overflow-hidden p-4">
          <div className="overflow-y-auto flex-1 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-neutral-400 text-xs font-mono space-y-2">
                <div className="w-5 h-5 border-2 border-neutral-300 dark:border-neutral-700 border-t-accent rounded-full animate-spin"></div>
                <span>Retrieving messages...</span>
              </div>
            ) : entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-neutral-400">
                <MessageSquare size={32} className="text-neutral-300 dark:text-neutral-700 mb-2" />
                <p className="text-sm font-semibold">No messages yet.</p>
                <p className="text-xs mt-1">Be the first to leave a message on Cyril's wall! 😊</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div 
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="group bg-white dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {entry.avatar ? (
                          <img 
                            src={entry.avatar} 
                            alt={entry.name} 
                            className="w-7 h-7 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500">
                            {entry.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                              {entry.name}
                            </span>
                            {entry.isGoogleUser ? (
                              <span className="text-[8px] bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 font-mono">
                                <ShieldCheck size={8} /> Verified
                              </span>
                            ) : (
                              <span className="text-[8px] bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 px-1.5 py-0.5 rounded-full font-bold font-mono">
                                Guest
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] text-neutral-400 block mt-0.5 font-mono">
                            {entry.createdAt ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Just now'}
                          </span>
                        </div>
                      </div>

                      {/* Delete button (visible if it's the current user's message) */}
                      {currentUser && entry.isGoogleUser && currentUser.uid === entry.userId && (
                        <button 
                          onClick={() => handleDelete(entry.id, entry.userId)}
                          className="p-1 text-neutral-300 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-2.5 font-sans break-words whitespace-pre-line">
                      {entry.message}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
