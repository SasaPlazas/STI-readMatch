# Workflow n8n listo para importar (Telegram -> FastAPI)

Archivo: `docs/n8n-workflow-telegram.json`

## 1) Preparar n8n

- Crea una credencial `Telegram` en n8n con el token de tu bot (BotFather)
- Nombra la credencial exactamente: `Telegram account`

## 2) Configurar variable de entorno en n8n

En tu instancia/workspace de n8n, define:

- `FASTAPI_BASE_URL`

Ejemplos:

- `https://tu-backend.onrender.com`
- `https://tu-dominio.com`
- `http://localhost:8000` (solo sirve si n8n corre en tu misma maquina)

## 3) Importar el workflow

- n8n -> Workflows -> Import from file
- Selecciona `docs/n8n-workflow-telegram.json`

## 4) Comandos que acepta el bot

- `/recommend <group_id>`
- `/why <group_id> <book_id>`
- `/connect <group_id>`

Notas:

- `group_id` es el UUID del grupo (el mismo que usa la app ReadMatch)
- `book_id` es el id de la tabla `books`
- `/connect` guarda `chat_id` en `recommendation_groups.telegram_chat_id` via FastAPI

## 5) Si usas n8n Cloud

Necesitas que `FASTAPI_BASE_URL` sea publico.

Opciones tipicas:

- desplegar FastAPI
- o exponer tu backend local con `ngrok`/`cloudflared`
