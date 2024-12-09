import { useEffect, useRef, useCallback } from "react";
import { usePokemonStore } from "../../store/usePokemonStore";
import "./PokemonList.scss";
import { PokemonCard } from "../../components/pokemon-card/PokemonCard";
import { usePokemonHook } from "../../hooks/usePokemonHook";

export const PokemonList = () => {
  const { usePokemonList } = usePokemonHook();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonList();
  const { searchQuery } = usePokemonStore();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]);

  const filteredPokemon =
    data?.pages.flatMap((page) =>
      page.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) || [];

  return (
    <div className="pokemon-list">
      <div className="pokemon-list__search">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="pokemon-list__search-input"
          value={searchQuery}
          onChange={(e) =>
            usePokemonStore.getState().setSearchQuery(e.target.value)
          }
        />
      </div>
      <div className="pokemon-list__grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div ref={loadMoreRef} className="pokemon-list__loader">
        {isFetchingNextPage && <span>Cargando más Pokémon...</span>}
      </div>
    </div>
  );
};
