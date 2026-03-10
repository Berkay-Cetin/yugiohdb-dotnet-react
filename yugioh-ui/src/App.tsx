import { useState } from "react";
import type { Card, SortField, SortDirection } from "./types/card";
import { useCardSearch } from "./hooks/useCardSearch";
import { SearchPanel } from "./components/SearchPanel";
import { CardGrid } from "./components/CardGrid";
import { CardModal } from "./components/CardModal";
import "./App.css";

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "name",     label: "İsim" },
  { value: "atk",      label: "ATK" },
  { value: "def",      label: "DEF" },
  { value: "level",    label: "Level / Rank" },
  { value: "link",     label: "Link" },
  { value: "tcg_date", label: "TCG Tarih" },
  { value: "ocg_date", label: "OCG Tarih" },
];

export default function App() {
  const {
    cards, loading, error, hasSearched,
    sortField, sortDirection,
    setSortField, setSortDirection,
    search,
  } = useCardSearch();

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
const [showSort, setShowSort] = useState(false);

  const toggleDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="app">

      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-text">YU<em>GI</em>OH</span>
            <span className="logo-sub">CARD SEARCH</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <SearchPanel onSearch={search} loading={loading} />

        {error && (
          <div className="error-banner">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Sonuç bar: sayı + sort */}
        {hasSearched && !loading && !error && cards.length > 0 && (
          <div className="results-bar">
            <span className="result-info">{cards.length} kart bulundu</span>

            <div className="sort-controls">
              <span className="sort-label">Sırala:</span>

              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`sort-btn ${sortField === opt.value ? "active" : ""}`}
                  onClick={() => { setSortField(opt.value); setShowSort(true); }}
                >
                  {opt.label}
                </button>
              ))}

              {showSort && (
                  <button className="sort-dir-btn" onClick={toggleDirection}>
                  {sortDirection === "asc" ? "↑" : "↓"}
                </button>
              )}
            </div>
          </div>
        )}

        {hasSearched && !loading && !error && cards.length === 0 && (
          <div className="result-info no-result">
            Sonuç bulunamadı — farklı filtreler deneyin
          </div>
        )}

        {loading && (
          <div className="skeleton-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}

        {!loading && cards.length > 0 && (
          <CardGrid cards={cards} onCardClick={setSelectedCard} />
        )}

        {!hasSearched && !loading && (
          <div className="empty-state">
            <div className="empty-icon">🃏</div>
            <p>Yukarıdaki filtrelerle kart aramaya başlayın</p>
          </div>
        )}
      </main>

      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}

    </div>
  );
}