import React, { useState, useRef, useEffect } from 'react';
import { weatherApi } from '../services/api';

export default function SearchBox({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // close results when you click somewhere else
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // figure out where to put the dropdown so it lines up under the input
  const updateDropdownPos = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom,
        left: rect.left,
        width: rect.width + 30, // include Go button width
      });
    }
  };

  const doSearch = async (q) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const data = await weatherApi.geocodeSearch(q);
      setResults(data);
      updateDropdownPos();
      setOpen(true);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(val), 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timerRef.current);
    doSearch(query);
  };

  const handleSelect = (result) => {
    setQuery(result.name.split(',')[0]);
    setOpen(false);
    onSelect(result.lat, result.lon, result.name);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => {
            if (results.length > 0) {
              updateDropdownPos();
              setOpen(true);
            }
          }}
          placeholder="Search location..."
          style={{
            padding: '3px 8px',
            border: 'none',
            boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
            background: '#e8e8e8',
            color: '#000',
            fontSize: '12px',
            width: '200px',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '3px 8px',
            border: 'none',
            boxShadow: 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf',
            background: '#0d3d6e',
            color: '#fff',
            fontSize: '11px',
            cursor: 'pointer',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {open && results.length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width,
            background: '#fff',
            border: '1px solid #ccc',
            zIndex: 9999,
            maxHeight: '200px',
            overflowY: 'auto',
            fontSize: '11px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => handleSelect(r)}
              style={{
                padding: '4px 8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                color: '#333',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#e8e8e8'}
              onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
            >
              {r.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
