# Mini E‑commerce Next.js

Pequeña aplicación full‑stack creada con Next.js + Prisma para practicar APIs, bases de datos y UI con Tailwind. 

Resumen
- Lista de productos, detalle, carrito local y endpoints API básicos.
- Proyecto en TypeScript con routing del App Router de Next.js.

Características principales
- Frontend: Next.js (App Router) + React + TypeScript
- Estilos: Tailwind CSS
- Base de datos: PostgreSQL gestionada con Prisma
- Estado del cliente: Zustand (carrito)
- Código organizado en componentes reutilizables
- Script de seed para datos de ejemplo

Tecnologías
- Next.js (app/)
- TypeScript
- Prisma (Postgres)
- Tailwind CSS
- Zustand
- Node.js, 

Estructura del proyecto (resumen)
- app/ — rutas y páginas (App Router)
- components/ — UI (ProductList, ProductCard, etc.)
- prisma/ — schema.prisma
- lib/ — cliente Prisma, stores (ej.: lib/db.ts, lib/store/cart-store.ts)
- scripts/ — seed.ts
- public/ — assets estáticos
- type.ts — tipos compartidos