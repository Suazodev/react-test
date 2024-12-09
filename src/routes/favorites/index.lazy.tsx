import { createLazyFileRoute } from "@tanstack/react-router";
import { FavoritesList } from "../../views/FavoritesList/FavoritesList";

export const Route = createLazyFileRoute("/favorites/")({
  component: FavoritesPage,
});

function FavoritesPage() {
  return <FavoritesList />;
}
