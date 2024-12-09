export interface SimplePokemon {
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

export interface Pokemon extends SimplePokemon {
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}
