export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

export interface MiscInfo {
  tcg_date?: string;
  ocg_date?: string;
}

export interface Card {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  atk?: number;
  def?: number;
  level?: number;
  linkval?: number;
  scale?: number;
  race: string;
  attribute: string;
  archetype?: string;
  card_images: CardImage[];
  misc_info?: MiscInfo[];
}

export interface SearchFilters {
  name: string;
  type: string;
  race: string;
  attribute: string;
  atkMin: string;
  atkMax: string;
  defMin: string;
  defMax: string;
  levelMin: string;
  levelMax: string;
  linkval: string;
  scaleMin: string;
  scaleMax: string;
}

export type SortField = "atk" | "def" | "level" | "name" | "tcg_date" | "ocg_date" | "link";
export type SortDirection = "asc" | "desc";

export const CARD_TYPES = [
  "Effect Monster",
  "Flip Effect Monster",
  "Flip Tuner Effect Monster",
  "Fusion Monster",
  "Gemini Monster",
  "Link Monster",
  "Normal Monster",
  "Normal Tuner Monster",
  "Pendulum Effect Fusion Monster",
  "Pendulum Effect Monster",
  "Pendulum Effect Ritual Monster",
  "Pendulum Flip Effect Monster",
  "Pendulum Normal Monster",
  "Pendulum Tuner Effect Monster",
  "Ritual Effect Monster",
  "Ritual Monster",
  "Skill Card",
  "Spell Card",
  "Spirit Monster",
  "Synchro Monster",
  "Synchro Pendulum Effect Monster",
  "Synchro Tuner Monster",
  "Token",
  "Toon Monster",
  "Trap Card",
  "Tuner Monster",
  "Union Effect Monster",
  "XYZ Monster",
  "XYZ Pendulum Effect Monster",
];

export const CARD_RACES_MONSTER = [
  "Aqua", "Beast", "Beast-Warrior", "Creator-God", "Cyberse",
  "Dinosaur", "Divine-Beast", "Dragon", "Fairy", "Fiend",
  "Fish", "Insect", "Machine", "Plant", "Psychic",
  "Pyro", "Reptile", "Rock", "Sea Serpent", "Spellcaster",
  "Thunder", "Warrior", "Winged Beast", "Wyrm", "Zombie",
];

export const CARD_RACES_SPELL = [
  "Normal", "Field", "Equip", "Continuous", "Quick-Play", "Ritual",
];

export const CARD_RACES_TRAP = [
  "Normal", "Continuous", "Counter",
];

export const CARD_RACES_ALL = [
  ...new Set([...CARD_RACES_MONSTER, ...CARD_RACES_SPELL, ...CARD_RACES_TRAP])
].sort();

export const CARD_ATTRIBUTES = [
  "DARK", "DIVINE", "EARTH", "FIRE", "LIGHT", "WATER", "WIND",
];