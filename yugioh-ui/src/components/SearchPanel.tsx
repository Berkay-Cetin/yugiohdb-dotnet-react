import { useState } from "react";
import type { SearchFilters } from "../types/card";
import { CARD_TYPES, CARD_RACES_ALL, CARD_ATTRIBUTES } from "../types/card";

interface SearchPanelProps {
  onSearch: (filters: Partial<SearchFilters>) => void;
  loading: boolean;
}

const EMPTY_FILTERS: SearchFilters = {
  name: "", type: "", race: "", attribute: "",
  atkMin: "", atkMax: "",
  defMin: "", defMax: "",
  levelMin: "", levelMax: "",
  linkval: "",
  scaleMin: "", scaleMax: "",
};

export function SearchPanel({ onSearch, loading }: SearchPanelProps) {
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const allRaces = CARD_RACES_ALL;

  const set = (key: keyof SearchFilters) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFilters((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
  };

  const hasAnyFilter = Object.values(filters).some((v) => v !== "");

  const advancedCount = [
    filters.atkMin, filters.atkMax,
    filters.defMin, filters.defMax,
    filters.levelMin, filters.levelMax,
    filters.linkval,
    filters.scaleMin, filters.scaleMax,
  ].filter((v) => v !== "").length;

  return (
    <form onSubmit={handleSubmit} className="search-panel">

      {/* ── Ana Filtreler ── */}
      <div className="search-grid">
        <div className="field-group">
          <label htmlFor="name">Arama</label>
          <input
            id="name"
            type="text"
            placeholder="Kart adı veya metin..."
            value={filters.name}
            onChange={set("name")}
          />
        </div>

        <div className="field-group">
          <label htmlFor="type">Tip</label>
          <select id="type" value={filters.type} onChange={set("type")}>
            <option value="">Tümü</option>
            {CARD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="race">Race</label>
          <select id="race" value={filters.race} onChange={set("race")}>
            <option value="">Tümü</option>
            {allRaces.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="attribute">Attribute</label>
          <select id="attribute" value={filters.attribute} onChange={set("attribute")}>
            <option value="">Tümü</option>
            {CARD_ATTRIBUTES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* ── Gelişmiş Filtreler ── */}
      {showAdvanced && (
        <div className="advanced-grid">

          {/* ATK */}
          <div className="range-group">
            <span className="range-label">ATK</span>
            <input
              type="number" min={0} placeholder="Min"
              value={filters.atkMin} onChange={set("atkMin")}
            />
            <span className="range-sep">—</span>
            <input
              type="number" min={0} placeholder="Max"
              value={filters.atkMax} onChange={set("atkMax")}
            />
          </div>

          {/* DEF */}
          <div className="range-group">
            <span className="range-label">DEF</span>
            <input
              type="number" min={0} placeholder="Min"
              value={filters.defMin} onChange={set("defMin")}
            />
            <span className="range-sep">—</span>
            <input
              type="number" min={0} placeholder="Max"
              value={filters.defMax} onChange={set("defMax")}
            />
          </div>

          {/* Level */}
          <div className="range-group">
            <span className="range-label">Level</span>
            <input
              type="number" min={1} max={12} placeholder="Min"
              value={filters.levelMin} onChange={set("levelMin")}
            />
            <span className="range-sep">—</span>
            <input
              type="number" min={1} max={12} placeholder="Max"
              value={filters.levelMax} onChange={set("levelMax")}
            />
          </div>

          {/* Link */}
          <div className="range-group">
            <span className="range-label">Link</span>
            <input
              type="number" min={1} max={8} placeholder="Değer"
              value={filters.linkval} onChange={set("linkval")}
              className="single-input"
            />
          </div>

          {/* Scale */}
          <div className="range-group">
            <span className="range-label">Scale</span>
            <input
              type="number" min={0} max={13} placeholder="Min"
              value={filters.scaleMin} onChange={set("scaleMin")}
            />
            <span className="range-sep">—</span>
            <input
              type="number" min={0} max={13} placeholder="Max"
              value={filters.scaleMax} onChange={set("scaleMax")}
            />
          </div>

        </div>
      )}

      {/* ── Aksiyon Butonları ── */}
      <div className="search-actions">
        <button
          type="button"
          className={`btn-filter ${showAdvanced ? "active" : ""}`}
          onClick={() => setShowAdvanced((v) => !v)}
        >
          ⚙ Filtrele
          {advancedCount > 0 && (
            <span className="filter-badge">{advancedCount}</span>
          )}
        </button>

        <div className="search-actions-right">
          <button
            type="button"
            className="btn-reset"
            onClick={handleReset}
            disabled={loading}
          >
            Temizle
          </button>
          <button
            type="submit"
            className="btn-search"
            disabled={loading || !hasAnyFilter}
          >
            {loading ? (
              <span className="spinner-text">
                <span className="spinner" /> Aranıyor...
              </span>
            ) : "Ara"}
          </button>
        </div>
      </div>

    </form>
  );
}