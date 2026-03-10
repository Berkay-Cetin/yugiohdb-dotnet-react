import type { Card } from "../types/card";

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

export function CardGrid({ cards, onCardClick }: CardGridProps) {
  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <button
          key={card.id}
          className="card-item"
          onClick={() => onCardClick(card)}
          style={{ animationDelay: `${Math.min(index * 30, 600)}ms` }}
        >
          <div className="card-img-wrap">
            <img
              src={card.card_images?.[0]?.image_url_small}
              alt={card.name}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.ygoprodeck.com/images/cards/back_card.jpg";
              }}
            />
            <div className="card-overlay">
              <span className="card-overlay-text">Detay</span>
            </div>
          </div>
          <div className="card-name">{card.name}</div>
          <div className="card-meta">
            <span className={`card-type-badge type-${card.frameType?.toLowerCase().replace(/\s/g, "-")}`}>
              {card.type}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}