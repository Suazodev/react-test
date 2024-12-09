import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { pokemonApi } from "../api/pokemon-queries";

export const usePokemonHook = () => {
  const usePokemonList = () =>
    useInfiniteQuery({
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

  const usePokemonDetails = (id: string) =>
    useQuery({
      queryKey: ["pokemon", id],
      queryFn: () => pokemonApi.getById(id),
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    });

  return { usePokemonList, usePokemonDetails };
};
