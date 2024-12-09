import { usePokemonStore } from "../../store/usePokemonStore";
import { PokemonCard } from "../../components/pokemon-card/PokemonCard";
import "./FavoritesList.scss";

export const FavoritesList = () => {
  const { favorites, searchQuery, setSearchQuery } = usePokemonStore();

  const filteredFavorites = favorites.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <div className="favorites-list__empty">
          <h2 className="favorites-list__empty-title">
            Don't have any favorite Pokémon yet
          </h2>
          <p className="favorites-list__empty-text">
            Explore the Pokémon list and mark your favorites to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <div className="favorites-list__header">
        <h1 className="favorites-list__title">My Favorite Pokémon</h1>
        <div className="favorites-list__search">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="favorites-list__search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="favorites-list__grid">
        {filteredFavorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={{
              id: pokemon.id,
              name: pokemon.name,
              sprites: pokemon.sprites,
              types: pokemon.types,
            }}
          />
        ))}
      </div>
    </div>
  );
};
