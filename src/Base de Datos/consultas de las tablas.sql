-- -- consulta tabla pokemon
SELECT id, base_experience, name
	FROM public.pokemon;

-- consulta tabla calificacion
SELECT id, rating, "pokemonId", "createdAt"
	FROM public.pokemon_rating;


-- consulta tabla busquedas (registros de busqueda)
SELECT id, "queryParams", "createdAt", endpoint
	FROM public.search_log;