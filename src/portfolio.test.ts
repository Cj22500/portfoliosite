import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.resolve(process.cwd(), 'src');
const appTsx = fs.readFileSync(path.join(srcDir, 'App.tsx'), 'utf8');
const internshipTsx = fs.readFileSync(path.join(srcDir, 'components', 'InternshipPage.tsx'), 'utf8');
const chatbotTsx = fs.readFileSync(path.join(srcDir, 'components', 'Chatbot.tsx'), 'utf8');
const serverTs = fs.readFileSync(path.resolve(process.cwd(), 'server.ts'), 'utf8');

test('App.tsx contains all updated flagship projects, ML capstones, and certifications', () => {
  // Flagship Projects
  assert.ok(appTsx.includes('DocuChain — AI & PreP-OCR Document Digitization Platform'));
  assert.ok(appTsx.includes('MakiTest (GodsEye) — Cloud-Native AI Exam Supervision Ecosystem'));
  assert.ok(appTsx.includes('AR Test Lab — 3D Spatial Computing & Mobile AR Simulator'));
  assert.ok(appTsx.includes('Wizaloon (WizSalon KMP) — Cross-Platform Salon Management'));
  assert.ok(appTsx.includes('DevPulse & Aura — React 19 + Real-Time WebSockets Suite'));
  assert.ok(appTsx.includes('MMCL Seminar Explorer — AI Academic Discovery Platform'));

  // ML Capstones
  assert.ok(appTsx.includes('Supervised ML: Customer Churn Classification'));
  assert.ok(appTsx.includes('Unsupervised ML: Customer Segmentation & PCA'));
  assert.ok(appTsx.includes('Deep Learning: Pneumonia CNN & Course Recommender'));

  // Certifications
  assert.ok(appTsx.includes('IBM AI Developer Professional Certificate'));
  assert.ok(appTsx.includes('5BJMANEHPJIG'));
  assert.ok(appTsx.includes('IBM Machine Learning Professional Certificate'));
  assert.ok(appTsx.includes('WJ5YVULQONYC'));
  assert.ok(appTsx.includes('CompTIA Tech+ Certification'));
  assert.ok(appTsx.includes('1d7051cce2a74591aec023e85dcf560a'));
});

test('App.tsx and InternshipPage.tsx reflect updated 503 PRs (468 merged — 93.0% merge rate) and 9-repo breakdown', () => {
  assert.ok(appTsx.includes('503 Pull Requests (468 merged — 93.0% merge rate)'));
  assert.ok(appTsx.includes('336+ files and 455+ call sites'));
  assert.ok(appTsx.includes('May 2026 – November 2026'));

  assert.ok(internshipTsx.includes('503 Authored PRs (468 Merged)'));
  assert.ok(internshipTsx.includes('468 Merged (93.0%)'));
  assert.ok(internshipTsx.includes('prs: 279'));
  assert.ok(internshipTsx.includes('prs: 88'));
  assert.ok(internshipTsx.includes('prs: 37'));
  assert.ok(internshipTsx.includes('prs: 28'));
  assert.ok(internshipTsx.includes('prs: 22'));
  assert.ok(internshipTsx.includes('prs: 17'));
  assert.ok(internshipTsx.includes('prs: 15'));
  assert.ok(internshipTsx.includes('prs: 11'));
  assert.ok(internshipTsx.includes('prs: 6'));

  const repoPrCounts = [279, 88, 37, 28, 22, 17, 15, 11, 6];
  const totalPrs = repoPrCounts.reduce((acc, n) => acc + n, 0);
  assert.equal(totalPrs, 503);
});

test('Chatbot.tsx and server.ts guardrails and system instructions reflect updated 503 PRs, projects, and certifications', () => {
  assert.ok(chatbotTsx.includes('docuchain'));
  assert.ok(chatbotTsx.includes('makitest'));
  assert.ok(chatbotTsx.includes('ar test lab'));
  assert.ok(chatbotTsx.includes('devpulse'));
  assert.ok(chatbotTsx.includes('comptia'));
  assert.ok(chatbotTsx.includes('certifications'));

  assert.ok(serverTs.includes('503 Pull Requests'));
  assert.ok(serverTs.includes('468 merged (93.0% merge rate)'));
  assert.ok(serverTs.includes('DocuChain'));
  assert.ok(serverTs.includes('MakiTest'));
  assert.ok(serverTs.includes('AR Test Lab'));
  assert.ok(serverTs.includes('5BJMANEHPJIG'));
  assert.ok(serverTs.includes('WJ5YVULQONYC'));
  assert.ok(serverTs.includes('1d7051cce2a74591aec023e85dcf560a'));
});

test('Strict IP Sanitization across all modified frontend and backend files', () => {
  const forbiddenTerms = [
    'prodev.prosperna.ph',
    'Astral PH',
    'Mono PH',
    'Gourmet Delicieux',
    'maricstore'
  ];

  for (const term of forbiddenTerms) {
    assert.ok(!appTsx.toLowerCase().includes(term.toLowerCase()), `Forbidden term "${term}" found in App.tsx`);
    assert.ok(!internshipTsx.toLowerCase().includes(term.toLowerCase()), `Forbidden term "${term}" found in InternshipPage.tsx`);
    assert.ok(!chatbotTsx.toLowerCase().includes(term.toLowerCase()), `Forbidden term "${term}" found in Chatbot.tsx`);
    assert.ok(!serverTs.toLowerCase().includes(term.toLowerCase()), `Forbidden term "${term}" found in server.ts`);
  }
});
