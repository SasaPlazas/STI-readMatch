// Lógica de recomendación consolidada en FastAPI (backend/app/recommender.py)
// Esta Edge Function queda deshabilitada para evitar resultados inconsistentes
export default { fetch: () => new Response("disabled", { status: 410 }) };
