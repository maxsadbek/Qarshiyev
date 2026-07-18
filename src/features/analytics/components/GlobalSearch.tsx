import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// ============================================================
// GlobalSearch Component
// ============================================================
// TODO: Implement debounced search
// TODO: Add keyboard shortcut (Cmd+K) to focus search
// TODO: Add recent searches from localStorage
// TODO: Add search result highlighting
// TODO: Add empty state and loading state

interface SearchResult {
  id: string;
  type: 'student' | 'teacher' | 'course';
  name: string;
  subtitle: string;
  url?: string;
}

interface GlobalSearchProps {
  onResultClick?: (result: SearchResult) => void;
}

export function GlobalSearch({ onResultClick }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Replace with actual API search call
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Mock search results
    const mockResults: SearchResult[] = [
      { id: '1', type: 'student' as const, name: 'Ali Valiyev', subtitle: 'Talaba • IELTS kursi' },
      { id: '2', type: 'teacher' as const, name: 'Sarah Johnson', subtitle: "O'qituvchi • English" },
      { id: '3', type: 'course' as const, name: 'IELTS Academic', subtitle: 'Kurs • 3 oy' },
    ].filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, performSearch]);

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'student':
        return 'bg-violet-100 text-violet-700';
      case 'teacher':
        return 'bg-emerald-100 text-emerald-700';
      case 'course':
        return 'bg-amber-100 text-amber-700';
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'student':
        return 'Talaba';
      case 'teacher':
        return "O'qituvchi";
      case 'course':
        return 'Kurs';
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Qidirish: talaba, o'qituvchi, kurs..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
        />
      </div>

      {isOpen && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
        >
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => {
                onResultClick?.(result);
                setIsOpen(false);
                setQuery('');
              }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{result.name}</p>
                <p className="text-xs text-slate-500">{result.subtitle}</p>
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(result.type)}`}>
                {getTypeLabel(result.type)}
              </span>
            </button>
          ))}
        </motion.div>
      )}

      {isOpen && query && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg p-4 text-center text-sm text-slate-500"
        >
          Hech narsa topilmadi
        </motion.div>
      )}
    </div>
  );
}
