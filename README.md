# Agencia de Viajes — Reserva de viajes

Aplicación web básica para reservar un viaje: elegir destino, fechas, hotel y vuelo. Construida con **React**, **Vite**, **React Router**, **Tailwind CSS**, **Apollo Client** y **MSW**. La interfaz está en español; los destinos se obtienen por REST mockeado y la disponibilidad de hoteles/vuelos por GraphQL mockeado (sin backend real).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrí la URL que muestra Vite (por defecto `http://localhost:5173/viajes-dsr-fe-ii/`).

## Build de producción

```bash
npm run build
npm run preview
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/destinos` | Lista de destinos (REST) |
| `/destinos/:id` | Detalle del destino y actividades |
| `/reserva/:destinoId` | Fechas, hotel y vuelo (GraphQL); botón Reservar |
| `/exito` | Confirmación de la reserva |

## Flujo de reserva

1. Elegí un destino desde `/destinos`.
2. En el detalle, iniciá la reserva.
3. Ingresá check-in y check-out; elegí un hotel y un vuelo (ambos obligatorios).
4. Al confirmar, llegás a `/exito` con el resumen.

El borrador de la reserva vive en `BookingContext` (`src/context/BookingContext.jsx`).

## Datos mock

- **REST (MSW):** `GET /api/destinos` y `GET /api/destinos/:id` — ciudad, país y actividades.
- **GraphQL (Apollo + MSW):** query `Disponibilidad` — hoteles (nombre, precio, habitaciones) y vuelos (aerolínea, precio, horario, asientos) según destino y fechas.

Handlers y seeds: `src/mocks/`.

## Diseño atómico

```
src/
  components/
    atoms/       # Button, Input, Label, Text, Badge, Spinner
    molecules/   # DestinoCard, HotelOption, VueloOption, DateRangeFields
    organisms/   # DestinosList, ReservaForm, BookingSummary
    templates/   # PageShell
  pages/
  context/
  api/
  mocks/
  App.jsx
  main.jsx
```

## Scripts disponibles

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | Ejecutar el linter |
