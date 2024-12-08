import { createLazyFileRoute } from "@tanstack/react-router";
import { FavoritesList } from "../../modules/main/pages/FavoritesList/FavoritesList";

export const Route = createLazyFileRoute("/favorites/")({
  component: FavoritesPage,
});

function FavoritesPage() {
  return <FavoritesList />;
}
