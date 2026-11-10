import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  BookOpen, 
  PenTool, 
  Check, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Sparkles,
  Trash2,
  Edit2,
  PlusCircle,
  Save,
  XCircle,
  CloudLightning,
  CloudOff,
  UserCheck
} from "lucide-react";
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  onSnapshot, 
  serverTimestamp 
} from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { db, auth, handleFirestoreError, OperationType } from "../firebase";
import { journalEntries, JournalEntry } from "../data/journalData";

export default function JournalLogbook() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // App views & states
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry>(journalEntries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Interactive Editing states
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form input fields
  const [editDate, setEditDate] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editShift, setEditShift] = useState("");
  const [editArea, setEditArea] = useState("");
  const [editCategory, setEditCategory] = useState<JournalEntry["category"]>("Onboarding");
  const [editContent, setEditContent] = useState("");

  const categories = ["All", "Onboarding", "Performance", "Tailwind Migration", "QA & Testing", "Documentation", "Monitoring"];

  // Handle Google authentication tracker
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const isOwner = currentUser?.email === "cyriljustin225@gmail.com";

  // Dynamic Slug generator for custom firestore ID prevention of duplicates
  const getDocId = (dateStr: string) => {
    return dateStr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  // Real-time listener for Firestore journals
  useEffect(() => {
    setDbLoading(true);
    const q = query(collection(db, "journals"));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: JournalEntry[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.date && data.task && data.content) {
            fetched.push({
              date: data.date,
              task: data.task,
              shift: data.shift || "7:00 AM - 9:00 PM",
              area: data.area || "Software Engineering",
              category: data.category || "Onboarding",
              content: data.content
            });
          }
        });
        
        // Chronological sorting in memory
        fetched.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setJournals(fetched);
        setDbLoading(false);
      },
      (error) => {
        console.error("Firestore read error fallback activated:", error);
        // Fallback to static entries upon configuration/auth error
        setJournals([]);
        setDbLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Determine source of truth: fall back to static journals if firestore is empty
  const activeEntries = journals.length > 0 ? journals : journalEntries;

  // Sync selectedEntry when source list changes
  useEffect(() => {
    if (activeEntries.length > 0) {
      const stillExists = activeEntries.find(e => e.date === selectedEntry.date);
      if (!stillExists) {
        setSelectedEntry(activeEntries[0]);
      } else {
        setSelectedEntry(stillExists);
      }
    }
  }, [journals]);

  // Filter entries based on search and category
  const filteredEntries = activeEntries.filter((entry) => {
    const matchesSearch = 
      entry.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.date.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle entry selection
  const handleSelectEntry = (entry: JournalEntry) => {
    if (isEditing) {
      setIsEditing(false);
    }
    setIsAdding(false);
    setSelectedEntry(entry);
    
    const element = document.getElementById("journal-facsimile");
    if (element && window.innerWidth < 1024) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sync / seed default Mapua journals to Firestore
  const handleSeedDatabase = async () => {
    if (!isOwner) return;
    setIsSyncing(true);
    try {
      for (const entry of journalEntries) {
        const docId = getDocId(entry.date);
        await setDoc(doc(db, "journals", docId), {
          date: entry.date,
          task: entry.task,
          shift: entry.shift,
          area: entry.area,
          category: entry.category,
          content: entry.content,
          createdAt: serverTimestamp()
        });
      }
      alert("Success! All 42 default Mapúa journals are initialized in your Firestore database.");
    } catch (err) {
      console.error("Failed to seed database:", err);
      handleFirestoreError(err, OperationType.WRITE, "journals");
    } finally {
      setIsSyncing(false);
    }
  };

  // Interactive Create
  const startAdding = () => {
    setEditDate("");
    setEditTask("");
    setEditShift("7:00 AM - 9:00 PM");
    setEditArea("Software Engineering");
    setEditCategory("Onboarding");
    setEditContent("");
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleCreateEntry = async () => {
    if (!isOwner) return;
    if (!editDate.trim() || !editTask.trim() || !editContent.trim()) {
      alert("Please fill in Date, Task, and Content fields.");
      return;
    }
    setIsSyncing(true);
    try {
      const docId = getDocId(editDate);
      const payload = {
        date: editDate,
        task: editTask,
        shift: editShift,
        area: editArea,
        category: editCategory,
        content: editContent,
        createdAt: serverTimestamp()
      };
      
      await setDoc(doc(db, "journals", docId), payload);
      
      const newEntry: JournalEntry = {
        date: editDate,
        task: editTask,
        shift: editShift,
        area: editArea,
        category: editCategory,
        content: editContent
      };
      
      setSelectedEntry(newEntry);
      setIsAdding(false);
    } catch (err) {
      console.error("Create entry failed:", err);
      handleFirestoreError(err, OperationType.CREATE, "journals");
    } finally {
      setIsSyncing(false);
    }
  };

  // Interactive Edit
  const startEditing = () => {
    setEditDate(selectedEntry.date);
    setEditTask(selectedEntry.task);
    setEditShift(selectedEntry.shift);
    setEditArea(selectedEntry.area);
    setEditCategory(selectedEntry.category);
    setEditContent(selectedEntry.content);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleSaveChanges = async () => {
    if (!isOwner) return;
    if (!editDate.trim() || !editTask.trim() || !editContent.trim()) {
      alert("Please fill in Date, Task, and Content fields.");
      return;
    }
    setIsSyncing(true);
    try {
      const originalId = getDocId(selectedEntry.date);
      const newId = getDocId(editDate);
      
      const payload = {
        date: editDate,
        task: editTask,
        shift: editShift,
        area: editArea,
        category: editCategory,
        content: editContent,
        createdAt: serverTimestamp()
      };

      if (originalId !== newId) {
        await deleteDoc(doc(db, "journals", originalId));
      }
      
      await setDoc(doc(db, "journals", newId), payload);
      
      setSelectedEntry({
        date: editDate,
        task: editTask,
        shift: editShift,
        area: editArea,
        category: editCategory,
        content: editContent
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Edit entry failed:", err);
      handleFirestoreError(err, OperationType.UPDATE, `journals/${getDocId(selectedEntry.date)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Interactive Delete
  const handleDeleteEntry = async () => {
    if (!isOwner) return;
    if (!window.confirm(`Are you sure you want to delete the journal entry for ${selectedEntry.date}?`)) {
      return;
    }
    setIsSyncing(true);
    try {
      const docId = getDocId(selectedEntry.date);
      await deleteDoc(doc(db, "journals", docId));
      
      const remaining = journals.filter(e => e.date !== selectedEntry.date);
      if (remaining.length > 0) {
        setSelectedEntry(remaining[0]);
      } else if (journalEntries.length > 0) {
        setSelectedEntry(journalEntries[0]);
      }
    } catch (err) {
      console.error("Delete entry failed:", err);
      handleFirestoreError(err, OperationType.DELETE, `journals/${getDocId(selectedEntry.date)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-8" id="internship-journal-section">
      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">
          Daily Logbook
        </span>
        <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-white">
          Mapúa Daily Journal Explorer
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mt-3 text-sm">
          Browse through a complete, interactive facsimile archive of my daily internship logbooks submitted to Mapúa Malayan Colleges Laguna. Records 42 intensive engineering days (7:00 AM – 9:00 PM workdays, totaling 580+ Practicum Hours factoring Philippine national holidays). Connects in real-time with our Google Firebase Firestore database.
        </p>
      </div>

      {/* Database Connection & Sync Banner */}
      <div className="p-4 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {dbLoading ? (
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              ) : journals.length > 0 ? (
                <CloudLightning size={14} className="text-green-500" />
              ) : (
                <CloudOff size={14} className="text-neutral-400" />
              )}
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                {dbLoading 
                  ? "Connecting to Firestore database..." 
                  : journals.length > 0 
                    ? `Live Cloud Storage Active (${journals.length} journal records synced)` 
                    : "Transient Local Mode (Firestore collection is empty)"}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {currentUser 
                ? isOwner 
                  ? "Welcome back, Cyril! You have administrative access to add, edit, or delete logs instantly." 
                  : `Signed in as visitor: ${currentUser.email}. To manage databases, log in as the owner.`
                : "Seeded by default in transient memory. Log in using Google Auth to sync, add, or alter logs."}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {!currentUser && (
              <button
                onClick={async () => {
                  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
                  const provider = new GoogleAuthProvider();
                  try {
                    await signInWithPopup(auth, provider);
                  } catch (err) {
                    console.error("Auth popup failed:", err);
                  }
                }}
                className="px-3.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Owner Login
              </button>
            )}
            
            {isOwner && journals.length === 0 && (
              <button
                onClick={handleSeedDatabase}
                disabled={isSyncing}
                className="px-3.5 py-1.5 bg-accent text-white text-xs font-bold rounded-xl hover:bg-accent/90 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles size={12} className={isSyncing ? "animate-spin" : ""} />
                Initialize Firestore DB
              </button>
            )}

            {isOwner && (
              <button
                onClick={startAdding}
                disabled={isSyncing || isAdding}
                className="px-3.5 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold rounded-xl hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all cursor-pointer"
              >
                + Add Daily Log
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Sidebar list of days */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Search and Filters Card */}
          <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 p-4 rounded-2xl space-y-3 shadow-xs">
            {/* Search Bar */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-3 text-neutral-400" />
              <input
                type="text"
                placeholder="Search daily logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200/80 dark:border-neutral-800/80 text-xs rounded-xl text-neutral-800 dark:text-neutral-100 outline-none focus:border-accent dark:focus:border-accent transition-colors font-sans"
              />
            </div>

            {/* Category Filter Pills (Desktop) */}
            <div className="hidden sm:flex flex-wrap gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === category
                      ? "bg-accent text-white shadow-xs"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {category === "All" ? "All Logs" : category}
                </button>
              ))}
            </div>

            {/* Mobile Category Dropdown */}
            <div className="sm:hidden relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-between"
              >
                <span className="font-semibold flex items-center gap-1.5">
                  <Filter size={12} className="text-accent" />
                  Category: {selectedCategory}
                </span>
                <ChevronDown size={14} />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-35 left-0 right-0 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden py-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {category === "All" ? "All Logs" : category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Timeline List */}
          <div className="bg-white/40 dark:bg-neutral-900/20 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-3.5 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-mono">
                Log Timeline ({filteredEntries.length} items)
              </span>
              <span className="text-[9px] bg-accent/10 text-accent font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                Interactive
              </span>
            </div>

            <div className="divide-y divide-neutral-200/40 dark:divide-neutral-800/40 max-h-[580px] overflow-y-auto custom-scrollbar">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => {
                  const isSelected = selectedEntry.date === entry.date;
                  return (
                    <button
                      key={entry.date}
                      onClick={() => handleSelectEntry(entry)}
                      className={`w-full text-left p-3.5 transition-all flex items-start gap-3 relative cursor-pointer group ${
                        isSelected 
                          ? "bg-accent/5 dark:bg-accent/10 border-l-4 border-accent" 
                          : "hover:bg-neutral-100/50 dark:hover:bg-neutral-900/40"
                      }`}
                    >
                      {/* Left glowing dot indicating state */}
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                        isSelected ? "bg-accent scale-110" : "bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400"
                      }`} />
                      
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold ${
                            isSelected ? "text-accent" : "text-neutral-500 dark:text-neutral-400"
                          }`}>
                            {entry.date}
                          </span>
                          <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded transition-colors ${
                            isSelected 
                              ? "bg-accent/10 text-accent" 
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500"
                          }`}>
                            {entry.category}
                          </span>
                        </div>
                        <h4 className={`text-xs font-bold leading-snug truncate transition-colors ${
                          isSelected ? "text-neutral-900 dark:text-white" : "text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white"
                        }`}>
                          {entry.task}
                        </h4>
                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 line-clamp-1 font-sans">
                          {entry.content}
                        </p>
                      </div>

                      <ChevronRight size={14} className={`ml-auto shrink-0 self-center transition-transform ${
                        isSelected ? "text-accent translate-x-0.5" : "text-neutral-300 dark:text-neutral-700 opacity-0 group-hover:opacity-100"
                      }`} />
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center space-y-2">
                  <FileText className="mx-auto text-neutral-300 dark:text-neutral-700" size={24} />
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">No records match your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Mapúa Malayan Colleges Laguna facsimile sheet view OR Creation View */}
        <div className="lg:col-span-8 space-y-4" id="journal-facsimile">
          {isAdding ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-3xl overflow-hidden font-sans relative">
              <div className="bg-neutral-950 text-neutral-300 px-6 py-3 flex items-center justify-between text-[10px] border-b border-neutral-800 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>NEW LOG: ADD COMPLIANCE JOURNAL</span>
                </div>
                <div>DOC_ID: FORM_OVPAA_030G_MMCL_2026</div>
              </div>

              <div className="p-6 sm:p-10 text-neutral-800 dark:text-neutral-200 space-y-6">
                
                {/* Form Header */}
                <div className="flex items-center gap-3.5 border-b-2 border-red-600 dark:border-red-500/80 pb-5">
                  <div className="bg-neutral-900 text-white p-2 rounded border-2 border-red-600 font-display flex flex-col items-center justify-center w-12 h-12 leading-none shrink-0 font-bold">
                    <span className="text-red-500 text-base tracking-widest uppercase">M</span>
                    <span className="text-[7px] text-neutral-400 font-sans tracking-tighter uppercase font-medium">MMCL</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black font-display text-neutral-900 dark:text-white tracking-tight uppercase leading-none">
                      ADD LOG ENTRY
                    </h3>
                    <p className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-0.5">
                      FIRESTORE STORAGE INSTANCE
                    </p>
                  </div>
                </div>

                {/* Form inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-3">
                    <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950/20 p-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                        DATE STRING
                      </span>
                      <input
                        type="text"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full text-xs"
                        placeholder="e.g. July 16, 2026"
                      />
                    </div>

                    <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950/20 p-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                        TASK ASSIGNMENT
                      </span>
                      <input
                        type="text"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        className="bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full text-xs"
                        placeholder="e.g. Performance Tuning & PR Sync"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950/20 p-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                        AREA ASSIGN
                      </span>
                      <input
                        type="text"
                        value={editArea}
                        onChange={(e) => setEditArea(e.target.value)}
                        className="bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full text-xs"
                        placeholder="e.g. Software Engineering"
                      />
                    </div>

                    <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950/20 p-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                        SHIFT/TIME
                      </span>
                      <input
                        type="text"
                        value={editShift}
                        onChange={(e) => setEditShift(e.target.value)}
                        className="bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full text-xs"
                        placeholder="e.g. 7:00 AM - 9:00 PM"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-950/20 p-2.5 text-xs font-mono">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                    WORK CATEGORY
                  </span>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as JournalEntry["category"])}
                    className="bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full cursor-pointer dark:bg-neutral-900"
                  >
                    {categories.filter(c => c !== "All").map(cat => (
                      <option key={cat} value={cat} className="text-neutral-800 dark:text-neutral-100 dark:bg-neutral-900">{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="relative border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/10">
                  <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none select-none">
                    <div className="text-neutral-900 dark:text-white text-[120px] font-black tracking-widest uppercase">M</div>
                  </div>
                  <textarea
                    rows={8}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="relative w-full bg-transparent text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-[2.1] font-sans font-normal tracking-wide outline-none resize-none z-10"
                    placeholder="Enter full reflective log description..."
                  />
                </div>

                <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-end gap-3">
                  <button
                    onClick={handleCreateEntry}
                    disabled={isSyncing}
                    className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    Create Entry
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="px-5 py-2.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEntry.date}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-3xl overflow-hidden font-sans relative"
              >
                {/* Journal Sheet Top Header Bar */}
                <div className="bg-neutral-900 text-neutral-300 px-6 py-3 flex flex-wrap items-center justify-between text-[10px] border-b border-neutral-800 font-mono gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>PREVIEW: MAPÚA DIGITAL COMPLIANCE ARCHIVE</span>
                  </div>
                  <div>DOC_ID: FORM_OVPAA_030G_MMCL_2026</div>
                </div>

                {/* Real Facsimile Layout Wrapper */}
                <div className="p-6 sm:p-10 text-neutral-800 dark:text-neutral-200 space-y-6 select-text">
                  
                  {/* Facsimile Document Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-red-600 dark:border-red-500/80 pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="bg-neutral-900 text-white p-2 rounded border-2 border-red-600 font-display flex flex-col items-center justify-center w-12 h-12 leading-none shrink-0 font-bold">
                        <span className="text-red-500 text-base tracking-widest uppercase">M</span>
                        <span className="text-[7px] text-neutral-400 font-sans tracking-tighter uppercase font-medium">MMCL</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-black font-display text-neutral-900 dark:text-white tracking-tight uppercase leading-none">
                          MAPÚA
                        </h3>
                        <p className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-0.5">
                          MALAYAN COLLEGES LAGUNA
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right font-mono text-[9px] text-neutral-400 space-y-0.5 leading-none shrink-0 border-l sm:border-l-0 sm:border-r border-neutral-200 dark:border-neutral-800 pl-4 sm:pl-0 sm:pr-4">
                      <div>REVISION NO: <strong className="text-neutral-600 dark:text-neutral-300">00</strong></div>
                      <div>REVISION DATE: <strong className="text-neutral-600 dark:text-neutral-300">May 10, 2016</strong></div>
                    </div>
                  </div>

                  {/* Main Title Banner */}
                  <div className="text-center">
                    <h1 className="text-2xl font-black font-display tracking-widest text-neutral-900 dark:text-white uppercase">
                      DAILY JOURNAL
                    </h1>
                  </div>

                  {/* Important Information banner */}
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 bg-neutral-50 dark:bg-neutral-950/40 text-[9px] text-neutral-500 dark:text-neutral-400 space-y-1 leading-normal font-sans shadow-2xs">
                    <h4 className="font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      IMPORTANT INFORMATION
                    </h4>
                    <ul className="list-disc pl-3.5 space-y-0.5">
                      <li>Include task assignments or movements, reflection on the day&apos;s new learning, accomplishment, challenges faced and how you responded.</li>
                      <li>Scanned copies of this form shall be submitted on a weekly basis through approved LMS.</li>
                      <li>Hard copies of this form should be compiled as part of the student&apos;s portfolio.</li>
                    </ul>
                  </div>

                  {/* Metadata Fields Form Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    
                    {/* Left Column Fields */}
                    <div className="space-y-3">
                      <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-950/20">
                        <span className="w-24 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 self-center">
                          DATE
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            className="px-3 py-2 bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full"
                          />
                        ) : (
                          <div className="px-3 py-2 text-neutral-800 dark:text-neutral-100 font-bold self-center">
                            {selectedEntry.date}
                          </div>
                        )}
                      </div>

                      <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-950/20">
                        <span className="w-24 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 self-center">
                          TASK
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editTask}
                            onChange={(e) => setEditTask(e.target.value)}
                            className="px-3 py-2 bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full"
                          />
                        ) : (
                          <div className="px-3 py-2 text-neutral-800 dark:text-neutral-100 font-bold self-center truncate">
                            {selectedEntry.task}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column Fields */}
                    <div className="space-y-3">
                      <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-950/20">
                        <span className="w-32 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 self-center">
                          AREA ASSIGN
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editArea}
                            onChange={(e) => setEditArea(e.target.value)}
                            className="px-3 py-2 bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full"
                          />
                        ) : (
                          <div className="px-3 py-2 text-neutral-800 dark:text-neutral-100 font-bold self-center truncate">
                            {selectedEntry.area}
                          </div>
                        )}
                      </div>

                      <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-950/20">
                        <span className="w-32 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 self-center">
                          SHIFT/TIME
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editShift}
                            onChange={(e) => setEditShift(e.target.value)}
                            className="px-3 py-2 bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full"
                          />
                        ) : (
                          <div className="px-3 py-2 text-neutral-800 dark:text-neutral-100 font-bold self-center">
                            {selectedEntry.shift}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Render Category dropdown inline when editing */}
                  {isEditing && (
                    <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-950/20 text-xs font-mono">
                      <span className="w-24 sm:w-28 bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 self-center">
                        CATEGORY
                      </span>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as JournalEntry["category"])}
                        className="px-3 py-2 bg-transparent text-neutral-800 dark:text-neutral-100 font-bold outline-none w-full cursor-pointer dark:bg-neutral-900"
                      >
                        {categories.filter(c => c !== "All").map(cat => (
                          <option key={cat} value={cat} className="text-neutral-800 dark:text-neutral-100 dark:bg-neutral-900">{cat}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Journal Content Pad with Ruled Paper lines */}
                  <div className="relative border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/10">
                    <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none select-none">
                      <div className="text-neutral-900 dark:text-white text-[120px] font-black tracking-widest uppercase">M</div>
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between py-6 sm:py-8 pointer-events-none select-none px-6 opacity-30 dark:opacity-10">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="w-full border-b border-neutral-400/50 h-0" />
                      ))}
                    </div>

                    {isEditing ? (
                      <textarea
                        rows={10}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="relative w-full bg-transparent text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-[2.1] font-sans font-normal tracking-wide outline-none resize-none z-10"
                      />
                    ) : (
                      <div className="relative text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-[2.1] font-sans font-normal tracking-wide whitespace-pre-wrap select-text pl-0.5">
                        {selectedEntry.content}
                      </div>
                    )}
                  </div>

                  {/* Form Bottom Footnote & Signature Block */}
                  <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
                    
                    {/* Trainee Name Facsimile Card */}
                    <div className="space-y-1.5 font-mono text-[9px] text-neutral-400 leading-none">
                      <div className="w-48 border-b border-neutral-300 dark:border-neutral-700 pb-1.5 flex flex-col items-center">
                        <span className="text-sm font-display font-bold text-neutral-900 dark:text-neutral-100 tracking-wide select-none h-6">
                          Cyril Justin B. Ayson
                        </span>
                      </div>
                      <div className="text-center font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                        TRAINEE NAME
                      </div>
                    </div>

                    {/* Owner Action Buttons */}
                    {isOwner && (
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSaveChanges}
                              disabled={isSyncing}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm font-sans"
                            >
                              <Save size={12} />
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              disabled={isSyncing}
                              className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-bold rounded-xl transition-all cursor-pointer font-sans"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={startEditing}
                              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 font-sans"
                            >
                              <Edit2 size={12} />
                              Edit
                            </button>
                            <button
                              onClick={handleDeleteEntry}
                              className="px-4 py-2 bg-red-100 dark:bg-red-950/40 hover:bg-red-200 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 font-sans"
                            >
                              <Trash2 size={12} />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {/* Official form label identifier */}
                    <div className="text-right font-mono text-[9.5px] text-neutral-400 leading-normal shrink-0">
                      <div className="font-bold text-neutral-700 dark:text-neutral-400">FORM OVPAA 030G</div>
                      <div className="text-[8.5px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">THIS FORM IS AVAILABLE AT THE OVPAA.</div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
}
