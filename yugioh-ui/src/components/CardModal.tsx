import { useEffect } from "react";
import type { Card } from "../types/card";

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

const ATTRIBUTE_COLORS: Record<string, string> = {
  DARK: "#6b21a8",
  LIGHT: "#ca8a04",
  EARTH: "#92400e",
  FIRE: "#dc2626",
  WATER: "#0369a1",
  WIND: "#15803d",
  DIVINE: "#d97706",
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
}

interface PendulumDesc {
  pendulum: string;
  monster: string;
}

function parsePendulumDesc(desc: string): PendulumDesc | null {
  const pendulumMatch = desc.match(/\[\s*Pendulum Effect\s*\]([\s\S]*?)(?=\[\s*Monster Effect\s*\]|$)/i);
  const monsterMatch  = desc.match(/\[\s*Monster Effect\s*\]([\s\S]*?)$/i);

  if (!pendulumMatch && !monsterMatch) return null;

  return {
    pendulum: pendulumMatch?.[1]?.trim() ?? "",
    monster:  monsterMatch?.[1]?.trim()  ?? "",
  };
}

export function CardModal({ card, onClose }: CardModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isMonster   = !card.type?.includes("Spell") && !card.type?.includes("Trap");
  const isPendulum  = card.type?.toLowerCase().includes("pendulum");
  const attrColor   = ATTRIBUTE_COLORS[card.attribute] ?? "#6b7280";
  const image       = card.card_images?.[0];
  const misc        = card.misc_info?.[0];
  const tcgDate     = formatDate(misc?.tcg_date);
  const ocgDate     = formatDate(misc?.ocg_date);
  const pendulumDesc = isPendulum ? parsePendulumDesc(card.desc) : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          ✕
        </button>

        <div className="modal-body">

          {/* Sol: Kart görseli */}
          <div className="modal-image-section">
            <img
              src={image?.image_url_cropped ?? image?.image_url}
              alt={card.name}
              className="modal-card-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.ygoprodeck.com/images/cards/back_card.jpg";
              }}
            />
          </div>

          {/* Sağ: Kart detayları */}
          <div className="modal-info-section">
            <h2 className="modal-card-name">{card.name}</h2>

            {/* Badges */}
            <div className="modal-badges">
              <span className={`badge badge-type type-${card.frameType?.toLowerCase().replace(/\s/g, "-")}`}>
                {card.type}
              </span>
              {card.attribute && (
                <span className="badge badge-attr" style={{ backgroundColor: attrColor }}>
                  {card.attribute}
                </span>
              )}
              {card.race && (
                <span className="badge badge-race">{card.race}</span>
              )}
            </div>

            {isMonster && (
              <div className="modal-stats">
                {card.type?.includes("Link") ? (
                  <div className="stat-item">
                    <span className="stat-label">Link</span>
                    <span className="stat-value stat-num">{card.linkval ?? "—"}</span>
                  </div>
                ) : card.level != null && (
                  <div className="stat-item">
                    <span className="stat-label">{card.type?.includes("XYZ") ? "Rank" : "Level"}</span>
                    <span className="stat-value">{"★".repeat(Math.min(card.level, 12))}</span>
                  </div>
                )}
                {card.scale != null && (
                  <div className="stat-item">
                    <span className="stat-label">Scale</span>
                    <span className="stat-value stat-num">{card.scale}</span>
                  </div>
                )}
                <div className="stat-row">
                  {card.atk != null && (
                    <div className="stat-item">
                      <span className="stat-label">ATK</span>
                      <span className="stat-value stat-num">{card.atk}</span>
                    </div>
                  )}
                  {card.def != null && (
                    <div className="stat-item">
                      <span className="stat-label">DEF</span>
                      <span className="stat-value stat-num">{card.def}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Archetype */}
            {card.archetype && (
              <div className="modal-field">
                <span className="field-label">Archetype</span>
                <span className="field-value">{card.archetype}</span>
              </div>
            )}

            {/* Pendulum Kartı — iki ayrı metin */}
            {isPendulum && pendulumDesc ? (
              <>
                <div className="modal-desc">
                  <span className="field-label pendulum-label">⬡ Pendulum Metni</span>
                  <p className="desc-text pendulum-text">
                    {pendulumDesc.pendulum || "—"}
                  </p>
                </div>
                <div className="modal-desc">
                  <span className="field-label">Kart Metni</span>
                  <p className="desc-text">
                    {pendulumDesc.monster || "—"}
                  </p>
                </div>
              </>
            ) : (
              <div className="modal-desc">
                <span className="field-label">Kart Metni</span>
                <p className="desc-text">{card.desc}</p>
              </div>
            )}

            {/* TCG / OCG Tarihleri + Kart ID */}
            <div className="modal-dates">
              <div className="date-item">
                <span className="field-label">TCG Çıkış</span>
                <span className="field-value date-value">{tcgDate}</span>
              </div>
              <div className="date-item">
                <span className="field-label">OCG Çıkış</span>
                <span className="field-value date-value">{ocgDate}</span>
              </div>
              <div className="date-item">
                <span className="field-label">Kart ID</span>
                <span className="field-value mono"># {card.id}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}