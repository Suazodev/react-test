import { usePokemonDetails } from "../../api/queries";
import { usePokemonStore } from "../../store/usePokemonStore";
import { useNavigate } from "@tanstack/react-router";
import "./PokemonDetails.scss";

interface PokemonDetailsProps {
  id: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({ id }) => {
  const { data: pokemon, isLoading, isError } = usePokemonDetails(id);
  const { addToFavorites, removeFromFavorites, isFavorite } = usePokemonStore();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="pokemon-details__loading">Cargando...</div>;
  }

  if (isError || !pokemon) {
    return (
      <div className="pokemon-details__error">Error al cargar el Pokémon</div>
    );
  }

  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  };

  const handleBackClick = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="pokemon-details">
      <button onClick={handleBackClick} className="pokemon-details__back-btn">
        ← Volver
      </button>

      <div className="pokemon-details__card">
        <div className="pokemon-details__header">
          <h1 className="pokemon-details__name">
            #{pokemon.id} {pokemon.name}
          </h1>
          <button
            className={`pokemon-details__favorite-btn ${
              favorite ? "pokemon-details__favorite-btn--active" : ""
            }`}
            onClick={handleFavoriteClick}
          >
            {favorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>

        <div className="pokemon-details__content">
          <div className="pokemon-details__image-container">
            <img
              className="pokemon-details__image"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>

          <div className="pokemon-details__info">
            <div className="pokemon-details__section">
              <h2 className="pokemon-details__subtitle">Types</h2>
              <div className="pokemon-details__types-list">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className={`pokemon-details__type pokemon-details__type--${type.name}`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pokemon-details__section">
              <h2 className="pokemon-details__subtitle">Base Stats</h2>
              <div className="pokemon-details__stats">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="pokemon-details__stat">
                    <span className="pokemon-details__stat-name">
                      {stat.stat.name}:
                    </span>
                    <div className="pokemon-details__stat-bar">
                      <div
                        className="pokemon-details__stat-fill"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                    <span className="pokemon-details__stat-value">
                      {stat.base_stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pokemon-details__section">
              <h2 className="pokemon-details__subtitle">Features</h2>
              <div className="pokemon-details__features">
                <div className="pokemon-details__feature">
                  <span>Height:</span>
                  <span>{pokemon.height / 10} m</span>
                </div>
                <div className="pokemon-details__feature">
                  <span>Weight:</span>
                  <span>{pokemon.weight / 10} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
