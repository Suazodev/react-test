import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Pokemon } from "../types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";
const ITEMS_PER_PAGE = 20;

interface SimplePokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export const pokemonApi = {
  getList: async (
    page: number
  ): Promise<{
    pokemons: SimplePokemon[];
    total: number;
  }> => {
    const offset = page * ITEMS_PER_PAGE;
    const { data } = await axios.get<PokemonListResponse>(
      `${API_BASE_URL}/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`
    );

    const pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: pokemonData } = await axios.get<SimplePokemon>(
          pokemon.url
        );
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          sprites: {
            front_default: pokemonData.sprites.front_default,
          },
          types: pokemonData.types,
        };
      })
    );

    return {
      pokemons,
      total: data.count,
    };
  },

  getById: async (id: string): Promise<Pokemon> => {
    const { data } = await axios.get<Pokemon>(`${API_BASE_URL}/pokemon/${id}`);
    return data;
  },
};

export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemon-list"],
    queryFn: ({ pageParam = 0 }) => pokemonApi.getList(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.total > nextPage * 20 ? nextPage : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const usePokemonDetails = (id: string) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => pokemonApi.getById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
