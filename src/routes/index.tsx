import { createFileRoute } from "@tanstack/react-router";
import { PokemonList } from "../modules/main/pages/PokemonList/PokemonList";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <PokemonList />;
}
