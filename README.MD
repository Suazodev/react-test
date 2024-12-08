# Aplicación Pokémon

## Descripción

Esta aplicación web permite explorar y gestionar una lista de Pokémon, con funcionalidades de búsqueda, favoritos y visualización detallada. Está construida con tecnologías modernas y sigue las mejores prácticas de desarrollo.

## Características Principales

- Listado de Pokémon con carga infinita
- Búsqueda de Pokémon en tiempo real
- Sistema de favoritos con persistencia local
- Vista detallada de cada Pokémon
- Diseño responsive
- Tema oscuro
- Carga lazy de rutas

## Tecnologías Utilizadas

- React
- TypeScript
- Vite
- TanStack Router (File-based routing)
- TanStack Query (Gestión de datos y caché)
- Zustand (Estado global)
- SCSS con metodología BEM
- Axios

## Estructura del Proyecto

```
src/
├── modules/
│   ├── admin/
│   ├── auth/
│   └── main/
│       ├── api/
│       │   └── queries.ts
│       ├── components/
│       │   └── PokemonCard/
│       │       ├── PokemonCard.scss
│       │       └── PokemonCard.tsx
│       ├── pages/
│       │   ├── FavoritesList/
│       │   │   ├── FavoritesList.scss
│       │   │   └── FavoritesList.tsx
│       │   ├── PokemonDetails/
│       │   │   ├── PokemonDetails.scss
│       │   │   └── PokemonDetails.tsx
│       │   └── PokemonList/
│       │       ├── PokemonList.scss
│       │       └── PokemonList.tsx
│       ├── store/
│       │   └── usePokemonStore.ts
│       └── types/
│           └── pokemon.ts
├── routes/
│   ├── favorites/
│   │   └── $index.lazy.tsx
│   ├── pokemon/
│   │   └── $id.lazy.tsx
│   ├── __root.tsx
│   └── index.lazy.tsx
├── shared/
│   └── components/
│       └── navbar/
│           └── Navbar.tsx
└── styles/
    ├── _index.scss
    ├── _variables.scss
    ├── _mixins.scss
    └── main.scss
```

## Rutas Disponibles

- `/`: Listado principal de Pokémon
- `/pokemon/:id`: Detalles de un Pokémon específico
- `/favorites`: Lista de Pokémon favoritos

## Optimizaciones Implementadas

1. **Carga de Datos**

   - Carga infinita en el listado principal
   - Carga lazy de rutas secundarias
   - Caché de datos con TanStack Query
   - Optimización de llamadas a la API

2. **Rendimiento**

   - Implementación de lazy loading para rutas
   - Minimización de re-renders
   - Optimización de imágenes
   - Uso eficiente de la caché

3. **Estado**
   - Gestión centralizada con Zustand
   - Persistencia local para favoritos
   - Estado de búsqueda global

## Estilos

- Implementación de metodología BEM
- Sistema de variables CSS para tema oscuro
- Diseño responsive
- Animaciones suaves y transiciones

## API Integration

La aplicación consume la PokeAPI (https://pokeapi.co/), implementando:

- Paginación eficiente
- Manejo de errores
- Tipado completo de respuestas
- Optimización de peticiones

## Mejores Prácticas Implementadas

1. **Arquitectura**

   - Organización por características (feature-based)
   - Separación clara de responsabilidades
   - Componentes reutilizables

2. **Código**

   - TypeScript para type safety
   - Consistencia en nombrado
   - Documentación de componentes clave
   - Código limpio y mantenible

3. **Rendimiento**
   - Lazy loading de rutas
   - Optimización de re-renders
   - Caché eficiente

## Guía de Instalación y Ejecución

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
bun/npm/pnpm install

# Ejecutar en desarrollo
bun/npm/pnpm dev

# Construir para producción
bun/npm/pnpm run build
```

## Variables de Entorno

No se requieren variables de entorno para el funcionamiento básico de la aplicación.

## Consideraciones Adicionales

- La aplicación utiliza localStorage para persistencia de favoritos
- Implementación de tema oscuro por defecto
- Soporte para navegadores modernos
- Accesibilidad básica implementada

## Posibles Mejoras Futuras

1. **Linting y Formatting**

   - Implementar ESLint con configuración personalizada
   - Configurar Prettier para formateo consistente
   - Añadir reglas específicas para TypeScript
   - Integrar plugin de ESLint para React Hooks

2. **Git Hooks con Husky**

   - Pre-commit: Ejecutar lint-staged
   - Pre-push: Ejecutar tests
   - Commit-msg: Validar formato de commits (Conventional Commits)
   - Configurar lint-staged para optimizar el proceso

3. **Automatización**

   - GitHub Actions para CI/CD
   - Validaciones automáticas en PRs
   - Release automático con semantic-release

4. Implementar PWA
5. Añadir más filtros de búsqueda
6. Implementar comparación de Pokémon
7. Añadir animaciones más elaboradas
8. Mejorar la accesibilidad
9. Añadir tests unitarios y de integración
10. Implementar internacionalización
