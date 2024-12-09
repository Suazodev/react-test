import {
  Link,
  Outlet,
  createRootRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import { Navbar } from "../components/navbar/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();

  return (
    <div className="app">
      <header className="header">
        <Navbar />
      </header>
      <main className="app__container">
        <Outlet />
      </main>
    </div>
  );
}
