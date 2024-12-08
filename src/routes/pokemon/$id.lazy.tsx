import { createLazyFileRoute } from "@tanstack/react-router";
import { PokemonDetails } from "../../modules/main/pages/PokemonDetails/PokemonDetails";

export const Route = createLazyFileRoute("/pokemon/$id")({
  component: PokemonDetailsPage,
});

function PokemonDetailsPage() {
  const { id } = Route.useParams();
  return <PokemonDetails id={id} />;
}
