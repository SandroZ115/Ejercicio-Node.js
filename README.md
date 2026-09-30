# API de Productos

API REST con Node.js, Express y SQL Server.

## Instalación

```bash
npm install
```

1. Ejecuta `schema.sql` en SQL Server.
2. Copia `.env.example` a `.env` y completa `DB_PASSWORD`.
3. Inicia la API:

```bash
npm run dev
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/productos | Listar productos |
| GET | /api/productos/:id | Obtener un producto |
| POST | /api/productos | Crear producto |
| PUT | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto |
