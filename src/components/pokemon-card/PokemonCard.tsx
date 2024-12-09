import { usePokemonStore } from "../../store/usePokemonStore";
import { useNavigate } from "@tanstack/react-router";
import { SimplePokemon } from "../../types/pokemon";
import "./PokemonCard.scss";
import { MouseEvent } from "react";

interface PokemonCardProps {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = usePokemonStore();
  const navigate = useNavigate();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  };

  const handleCardClick = () => {
    navigate({ to: "/pokemon/$id", params: { id: pokemon.id.toString() } });
  };

  return (
    <article
      className="pokemon-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="pokemon-card__image-container">
        <img
          className="pokemon-card__image"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-card__content">
        <h2 className="pokemon-card__name">{pokemon.name}</h2>
        <div className="pokemon-card__types">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`pokemon-card__type pokemon-card__type--${type.name}`}
            >
              {type.name}
            </span>
          ))}
        </div>
        <button
          className={`pokemon-card__favorite-btn ${favorite ? "pokemon-card__favorite-btn--active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          ❤
        </button>
      </div>
    </article>
  );
};
