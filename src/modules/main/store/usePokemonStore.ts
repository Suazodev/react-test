import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SimplePokemon } from "../types/pokemon";

interface PokemonState {
  favorites: SimplePokemon[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToFavorites: (pokemon: SimplePokemon) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const usePokemonStore = create<PokemonState>()(
  persist(
    (set, get) => ({
      favorites: [],
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      addToFavorites: (pokemon) =>
        set((state) => ({
          favorites: [...state.favorites, pokemon],
        })),
      removeFromFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((pokemon) => pokemon.id === id),
    }),
    {
      name: "pokemon-storage",
    }
  )
);
