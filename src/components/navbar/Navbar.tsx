import { Link, useMatchRoute } from "@tanstack/react-router";

export const Navbar = () => {
  const matchRoute = useMatchRoute();
  return (
    <div className="header__content">
      <Link to="/" className="header__logo">
        PokéApp
      </Link>
      <nav className="header__nav">
        <Link
          to="/"
          className={`nav__link ${matchRoute({ to: "/" }) ? "nav__link--active" : ""}`}
        >
          Pokémon
        </Link>
        <Link
          to="/favorites"
          className={`nav__link ${matchRoute({ to: "/favorites" }) ? "nav__link--active" : ""}`}
        >
          Favorites
        </Link>
      </nav>
    </div>
  );
};
