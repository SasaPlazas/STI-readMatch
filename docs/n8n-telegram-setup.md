# n8n + Telegram + FastAPI

## Que necesitas

- una cuenta en `n8n` Cloud o una instancia propia
- un bot de Telegram creado con `@BotFather`
- la URL publica de tu `FastAPI`
- el `chat_id` del grupo o canal que vas a conectar

## Como conectar tu cuenta de n8n

### 1. Entrar a tu workspace

- inicia sesion en tu cuenta de `n8n`
- crea un workflow nuevo

### 2. Crear o conectar el bot de Telegram

- en Telegram abre `@BotFather`
- usa `/newbot`
- copia el `bot token`
- en `n8n`, crea una credencial de tipo `Telegram`
- pega ahi el token del bot

### 3. Crear el flujo base

Usa esta secuencia:

1. `Telegram Trigger`
2. `Switch` o `IF` para detectar el comando
3. `HTTP Request` hacia `FastAPI`
4. `Telegram` para responder al chat

## Flujo minimo recomendado

### Comando `/recommend`

1. `Telegram Trigger`
2. Extraer `group_id`
3. `HTTP Request`

```http
POST https://TU_FASTAPI/api/telegram/recommend
Content-Type: application/json

{
  "group_id": "UUID_DEL_GRUPO",
  "metodo": "media_sigma",
  "chat_id": "CHAT_ID_TELEGRAM"
}
```

4. Leer el campo `message` de la respuesta
5. `Telegram -> Send Message`

## Workflow importable

Hay un workflow ya listo para importar:

- `docs/n8n-workflow-telegram.json`
- instrucciones rapidas: `docs/n8n-workflow-telegram.md`

### Comando `/why`

1. `Telegram Trigger`
2. Extraer `group_id` y `book_id`
3. `HTTP Request`

```http
POST https://TU_FASTAPI/api/telegram/explain
Content-Type: application/json

{
  "group_id": "UUID_DEL_GRUPO",
  "book_id": "ID_DEL_LIBRO"
}
```

4. Enviar `message` a Telegram

## Como enlazar tu grupo con Telegram

### Opcion simple

- una vez conozcas el `chat_id`, haz un request a:

```http
POST https://TU_FASTAPI/api/telegram/connect
Content-Type: application/json

{
  "group_id": "UUID_DEL_GRUPO",
  "chat_id": "-1001234567890"
}
```

- esto actualiza `telegram_chat_id` en `recommendation_groups`

### Como obtener el chat_id

Opciones comunes:

- usar `Telegram Trigger` y revisar el JSON del mensaje recibido
- escribir al bot desde el grupo
- leer `message.chat.id` en la ejecucion del workflow

## Estructura sugerida del workflow

### Workflow 1 - Telegram entrada

- `Telegram Trigger`
- `Set` para normalizar:
  - `command`
  - `chat_id`
  - `group_id`
  - `book_id`
- `Switch`
  - rama `/recommend`
  - rama `/why`
  - rama `/connect`

### Workflow 2 - Difusion automatica

- `Cron`
- `HTTP Request` a `FastAPI`
- `Telegram Send Message`

## Credenciales y secretos

En `n8n` guarda:

- token del bot de Telegram
- URL base de FastAPI
- opcionalmente una API key propia si luego quieres proteger FastAPI

## Recomendacion practica

Para tu entrega:

- usa `n8n` solo para Telegram
- deja el recomendador en `FastAPI`
- deja los datos y resultados en `Supabase`

Esa separacion es mas clara, defendible y facil de explicar.
