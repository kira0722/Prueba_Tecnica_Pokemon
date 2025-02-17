-- Database: pokemon_prueba

-- DROP DATABASE IF EXISTS pokemon_prueba;

CREATE DATABASE pokemon_prueba
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es-MX'
    LC_CTYPE = 'es-MX'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- Table: public.pokemon

-- DROP TABLE IF EXISTS public.pokemon;

CREATE TABLE IF NOT EXISTS public.pokemon
(
    id integer NOT NULL,
    base_experience integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pokemon_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pokemon
    OWNER to postgres;



-- Table: public.pokemon_rating

-- DROP TABLE IF EXISTS public.pokemon_rating;

CREATE TABLE IF NOT EXISTS public.pokemon_rating
(
    id integer NOT NULL DEFAULT nextval('pokemon_rating_id_seq'::regclass),
    rating integer NOT NULL,
    "pokemonId" integer NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT pokemon_rating_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pokemon_rating
    OWNER to postgres;


-- Table: public.search_log

-- DROP TABLE IF EXISTS public.search_log;

CREATE TABLE IF NOT EXISTS public.search_log
(
    id integer NOT NULL DEFAULT nextval('search_log_id_seq'::regclass),
    "queryParams" json,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    endpoint character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT search_log_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.search_log
    OWNER to postgres;
