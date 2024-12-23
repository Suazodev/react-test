import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Pokemon, PokemonListResponse, SimplePokemon } from "../types/pokemon";
import API from "../services/api";

const API_BASE_URL = "https://pokeapi.co/api/v2";
const ITEMS_PER_PAGE = 20;

export const pokemonApi = {
  getList: async (
    page: number
  ): Promise<{
    pokemons: SimplePokemon[];
    total: number;
  }> => {
    const offset = page * ITEMS_PER_PAGE;
    const { data } = await API.getData<PokemonListResponse>(
      `${API_BASE_URL}/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`
    );

    const pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: pokemonData } = await API.getData<SimplePokemon>(
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
    const { data } = await API.getData<Pokemon>(
      `${API_BASE_URL}/pokemon/${id}`
    );
    return data;
  },
};
