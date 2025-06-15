'use client';

import { useState, useRef, useEffect } from 'react';

interface HistoryItem {
  id: string;
  input: string;
  timestamp: number;
  preview: string;
}

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatJson = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
      setError('');
    } catch {
      setError('Invalid JSON format');
      setFormattedJson('');
    }
  };

  const compressJson = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      const compressed = JSON.stringify(parsed);
      setFormattedJson(compressed);
      setError('');
    } catch {
      setError('Invalid JSON format');
      setFormattedJson('');
    }
  };

  const handleInputChange = (value: string) => {
    setJsonInput(value);
    if (value.trim()) {
      formatJson(value);
      saveToHistory(value);
    } else {
      setFormattedJson('');
      setError('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
  };

  const saveToHistory = (input: string) => {
    if (!input.trim()) return;
    
    try {
      JSON.parse(input); // Validate JSON
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        input,
        timestamp: Date.now(),
        preview: input.substring(0, 50) + (input.length > 50 ? '...' : '')
      };
      
      const updatedHistory = [newItem, ...history.filter(item => item.input !== input)].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('json-formatter-history', JSON.stringify(updatedHistory));
    } catch {
      // Don't save invalid JSON
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setJsonInput(item.input);
    formatJson(item.input);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('json-formatter-history');
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('json-formatter-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        localStorage.removeItem('json-formatter-history');
      }
    }

    const savedTheme = localStorage.getItem('json-formatter-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('json-formatter-theme', newMode ? 'dark' : 'light');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonInput(content);
        formatJson(content);
        saveToHistory(content);
      };
      reader.readAsText(file);
    } else {
      setError('Please select a valid JSON file');
    }
  };

  const bgClass = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4"
    : "min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4";
  
  const textClass = isDarkMode ? "text-white" : "text-gray-800";
  const textSecondaryClass = isDarkMode ? "text-white/80" : "text-gray-600";
  const glassClass = isDarkMode 
    ? "backdrop-blur-xl bg-white/10 border border-white/20" 
    : "backdrop-blur-xl bg-black/5 border border-gray-300";

  return (
    <div className={bgClass}>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div></div>
            <div className="text-center flex-1">
              <h1 className={`text-4xl font-bold ${textClass} mb-2`}>JSON Formatter & Validator</h1>
              <p className={textSecondaryClass}>Format, validate, and beautify your JSON data</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 ${isDarkMode ? 'bg-yellow-500/30 hover:bg-yellow-500/50 border-yellow-400/30' : 'bg-gray-700/30 hover:bg-gray-700/50 border-gray-600/30'} border rounded-lg ${textClass} text-sm transition-colors`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-4 py-2 bg-indigo-500/30 hover:bg-indigo-500/50 border border-indigo-400/30 rounded-lg ${textClass} text-sm transition-colors`}
            >
              History ({history.length})
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className={`px-4 py-2 bg-red-500/30 hover:bg-red-500/50 border border-red-400/30 rounded-lg ${textClass} text-sm transition-colors`}
              >
                Clear History
              </button>
            )}
          </div>
        </header>

        {showHistory && history.length > 0 && (
          <div className={`${glassClass} rounded-2xl p-6 shadow-2xl drop-shadow-lg mb-6`}>
            <h3 className={`${textClass} font-semibold mb-4`}>Recent History</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className={`p-3 ${isDarkMode ? 'bg-black/20 border-white/10 hover:bg-black/30' : 'bg-white/20 border-gray-400/20 hover:bg-white/30'} border rounded-lg cursor-pointer transition-colors`}
                >
                  <div className={`${isDarkMode ? 'text-white/90' : 'text-gray-800/90'} text-sm font-mono truncate`}>{item.preview}</div>
                  <div className={`${isDarkMode ? 'text-white/50' : 'text-gray-600/70'} text-xs mt-1`}>
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className={`${glassClass} rounded-2xl p-6 shadow-2xl drop-shadow-lg`}>
            <div className={`${isDarkMode ? 'bg-gradient-to-r from-white/5 to-white/10' : 'bg-gradient-to-r from-black/5 to-black/10'} rounded-lg p-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${textClass} font-semibold`}>Input JSON</h2>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`px-3 py-1 bg-orange-500/30 hover:bg-orange-500/50 border border-orange-400/30 rounded ${textClass} text-sm transition-colors`}
                  >
                    Upload JSON
                  </button>
                </div>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Paste your JSON here or upload a file..."
                className={`w-full h-96 p-4 ${isDarkMode ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/20 border-gray-400/20 text-gray-800 placeholder-gray-500'} border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 font-mono`}
              />
              {error && (
                <div className={`mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded ${isDarkMode ? 'text-red-200' : 'text-red-700'} text-sm`}>
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className={`${glassClass} rounded-2xl p-6 shadow-2xl drop-shadow-lg`}>
            <div className={`${isDarkMode ? 'bg-gradient-to-r from-white/5 to-white/10' : 'bg-gradient-to-r from-black/5 to-black/10'} rounded-lg p-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${textClass} font-semibold`}>Formatted JSON</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => formatJson(jsonInput)}
                    disabled={!jsonInput.trim()}
                    className={`px-3 py-1 bg-blue-500/30 hover:bg-blue-500/50 border border-blue-400/30 rounded ${textClass} text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Format
                  </button>
                  <button
                    onClick={() => compressJson(jsonInput)}
                    disabled={!jsonInput.trim()}
                    className={`px-3 py-1 bg-green-500/30 hover:bg-green-500/50 border border-green-400/30 rounded ${textClass} text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Compress
                  </button>
                  <button
                    onClick={copyToClipboard}
                    disabled={!formattedJson}
                    className={`px-3 py-1 bg-purple-500/30 hover:bg-purple-500/50 border border-purple-400/30 rounded ${textClass} text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <pre className={`w-full h-96 p-4 ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-white/20 border-gray-400/20 text-gray-800'} border rounded-lg overflow-auto font-mono text-sm`}>
                {formattedJson || `${isDarkMode ? 'Formatted JSON will appear here...' : 'Formatted JSON will appear here...'}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}