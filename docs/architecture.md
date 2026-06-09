# ReadMatch - Arquitectura Hibrida

## Objetivo

Esta version de ReadMatch queda organizada para cumplir una arquitectura hibrida:

- `Supabase` como nucleo de autenticacion, almacenamiento y persistencia de resultados.
- `FastAPI` como capa Python para el sistema de recomendacion y servicios tecnicos.
- `n8n` como orquestador del canal multicanal de Telegram.
- `Expo / React Native` como portal principal de usuario.

## Componentes

### 1. Frontend Expo

Responsabilidades:

- autenticacion y sesion mediante `Supabase Auth`
- lectura de datos de usuario, grupos y recomendaciones persistidas
- llamadas a `FastAPI` para servicios Python
- experiencia UI principal del portal

Archivos clave:

- `src/lib/supabase.js`
- `src/lib/api.js`
- `src/utils/userStorage.js`
- `src/screens/HomeScreen.js`
- `src/screens/GroupDetailScreen.js`
- `src/screens/OnbRevealScreen.js`

### 2. Supabase

Responsabilidades:

- `Auth`
- tablas de dominio:
  - `user_preferences`
  - `books`
  - `group_members`
  - `recommendation_groups`
  - `group_recommendations`
  - `notifications`
- RPCs existentes:
  - `search_users`
  - `create_group_with_admin`
- persistencia final del resultado del recomendador

### 3. FastAPI

Responsabilidades:

- implementar el recomendador en Python
- consultar datos de grupos, perfiles y libros en Supabase
- recalcular recomendaciones grupales
- guardar resultados en `group_recommendations`
- generar el texto de reveal del perfil lector
- ofrecer endpoints para Telegram y n8n

Endpoints base:

- `GET /health`
- `POST /api/recommendations/recompute`
- `GET /api/groups/{group_id}/recommendations`
- `POST /api/reveal`
- `POST /api/telegram/recommend`
- `POST /api/telegram/explain`
- `POST /api/telegram/connect`

### 4. n8n + Telegram

Responsabilidades:

- recibir mensajes/comandos del bot o webhook de Telegram
- transformar el evento a un request de backend
- llamar a `FastAPI`
- reenviar la respuesta a Telegram

## Flujo de recomendacion

1. El usuario crea grupo o cambia configuracion en la app.
2. La app llama a `FastAPI` para recalcular recomendaciones.
3. `FastAPI` consulta miembros y libros en Supabase.
4. El recomendador Python calcula scores y ranking.
5. `FastAPI` guarda el top resultante en `group_recommendations`.
6. La app vuelve a leer esas recomendaciones desde Supabase.
7. Si Telegram esta conectado, `n8n` puede pedir el mismo resultado y publicarlo.

## Justificacion frente a la rubrica

### Descripcion tecnica del sistema

- el recomendador ya no queda disperso solo en frontend
- existe una capa Python formal y explicable
- la arquitectura separa claramente portal, backend y persistencia

### Recomendacion para grupos

- el algoritmo opera sobre perfiles individuales y agregacion grupal
- los grupos pueden reconfigurarse y recalcular sus resultados
- los resultados quedan persistidos y auditables

### Interaccion multicanal

- portal y Telegram comparten la misma capa Python
- `n8n` orquesta Telegram sin duplicar logica del recomendador

### Reflexion critica y pruebas

- la arquitectura facilita comparar metodos (`promedio`, `min_miseria`, `max_placer`, `media_sigma`)
- se pueden ejecutar experimentos y validaciones sobre un backend Python mas defendible
