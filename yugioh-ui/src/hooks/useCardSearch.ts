import { useState, useCallback, useMemo } from "react";
import type { Card, SearchFilters, SortField, SortDirection } from "../types/card";
import { searchCards } from "../api/cardApi";

interface UseCardSearchReturn {
  cards: Card[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  sortField: SortField;
  sortDirection: SortDirection;
  setSortField: (field: SortField) => void;
  setSortDirection: (dir: SortDirection) => void;
  search: (filters: Partial<SearchFilters>) => Promise<void>;
  clearResults: () => void;
}

function sortCards(cards: Card[], field: SortField, direction: SortDirection): Card[] {
  return [...cards].sort((a, b) => {
    let valA: number | string;
    let valB: number | string;

    switch (field) {
      case "name":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case "atk":
        valA = a.atk ?? -1;
        valB = b.atk ?? -1;
        break;
      case "def":
        valA = a.def ?? -1;
        valB = b.def ?? -1;
        break;
      case "level":
        valA = a.level ?? 0;
        valB = b.level ?? 0;
        break;
      case "link":
        valA = a.linkval ?? 0;
        valB = b.linkval ?? 0;
        break;
      case "tcg_date":
        valA = a.misc_info?.[0]?.tcg_date ?? "";
        valB = b.misc_info?.[0]?.tcg_date ?? "";
        break;
      case "ocg_date":
        valA = a.misc_info?.[0]?.ocg_date ?? "";
        valB = b.misc_info?.[0]?.ocg_date ?? "";
        break;
      default:
        return 0;
    }

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function useCardSearch(): UseCardSearchReturn {
  const [rawCards, setRawCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const cards = useMemo(
    () => sortCards(rawCards, sortField, sortDirection),
    [rawCards, sortField, sortDirection]
  );

  const search = useCallback(async (filters: Partial<SearchFilters>) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchCards(filters);
      setRawCards(results);
    } catch (err) {
      setError("Arama sırasında bir hata oluştu. Backend çalışıyor mu?");
      setRawCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setRawCards([]);
    setHasSearched(false);
    setError(null);
  }, []);

  return {
    cards, loading, error, hasSearched,
    sortField, sortDirection,
    setSortField, setSortDirection,
    search, clearResults,
  };
}