import type { Card, SearchFilters } from "../types/card";

const BASE_URL = "/api";

export async function searchCards(filters: Partial<SearchFilters>): Promise<Card[]> {
  const params = new URLSearchParams();

  if (filters.name?.trim())      params.append("name",      filters.name.trim());
  if (filters.type?.trim())      params.append("type",      filters.type.trim());
  if (filters.race?.trim())      params.append("race",      filters.race.trim());
  if (filters.attribute?.trim()) params.append("attribute", filters.attribute.trim());

  if (filters.atkMin?.trim())   params.append("atkMin",   filters.atkMin.trim());
  if (filters.atkMax?.trim())   params.append("atkMax",   filters.atkMax.trim());
  if (filters.defMin?.trim())   params.append("defMin",   filters.defMin.trim());
  if (filters.defMax?.trim())   params.append("defMax",   filters.defMax.trim());
  if (filters.levelMin?.trim()) params.append("levelMin", filters.levelMin.trim());
  if (filters.levelMax?.trim()) params.append("levelMax", filters.levelMax.trim());
  if (filters.linkval?.trim())  params.append("linkval",  filters.linkval.trim());
  if (filters.scaleMin?.trim()) params.append("scaleMin", filters.scaleMin.trim());
  if (filters.scaleMax?.trim()) params.append("scaleMax", filters.scaleMax.trim());

  if ([...params].length === 0) return [];

  const response = await fetch(`${BASE_URL}/cards?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 400) return [];
    throw new Error(`API Error: ${response.status}`);
  }

  const data: Card[] = await response.json();
  return data;
}