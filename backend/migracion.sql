--
-- PostgreSQL database dump
--

\restrict N6lLNofSsq4C24grAWlvFeqhlqEvMm9TUjbjJfsvsc4mby81vk2mpS16g5cJOsq

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-04 15:13:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 234 (class 1259 OID 16703)
-- Name: archivos_enviados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.archivos_enviados (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    tamano character varying(30) NOT NULL,
    remitente_id integer,
    grupo_destino_id integer,
    fecha_envio timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(30) DEFAULT 'Enviado'::character varying
);


ALTER TABLE public.archivos_enviados OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16702)
-- Name: archivos_enviados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.archivos_enviados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.archivos_enviados_id_seq OWNER TO postgres;

--
-- TOC entry 5145 (class 0 OID 0)
-- Dependencies: 233
-- Name: archivos_enviados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.archivos_enviados_id_seq OWNED BY public.archivos_enviados.id;


--
-- TOC entry 226 (class 1259 OID 16631)
-- Name: equipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipos (
    id character varying(50) NOT NULL,
    ubicacion character varying(150) NOT NULL,
    estado character varying(30) DEFAULT 'apagado'::character varying,
    grupo_id integer,
    ultima_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.equipos OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16750)
-- Name: evidencias_tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evidencias_tickets (
    id integer NOT NULL,
    ticket_id integer,
    ruta_archivo character varying(500) NOT NULL,
    nombre_original character varying(255) NOT NULL,
    tamano_mb numeric(5,2),
    fecha_subida timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.evidencias_tickets OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16749)
-- Name: evidencias_tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evidencias_tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evidencias_tickets_id_seq OWNER TO postgres;

--
-- TOC entry 5146 (class 0 OID 0)
-- Dependencies: 237
-- Name: evidencias_tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evidencias_tickets_id_seq OWNED BY public.evidencias_tickets.id;


--
-- TOC entry 224 (class 1259 OID 16598)
-- Name: grupos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grupos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    ubicacion character varying(150) DEFAULT 'DII'::character varying,
    estado character varying(20) DEFAULT 'Activo'::character varying,
    fecha_creacion date DEFAULT CURRENT_DATE
);


ALTER TABLE public.grupos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16597)
-- Name: grupos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grupos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grupos_id_seq OWNER TO postgres;

--
-- TOC entry 5147 (class 0 OID 0)
-- Dependencies: 223
-- Name: grupos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grupos_id_seq OWNED BY public.grupos.id;


--
-- TOC entry 230 (class 1259 OID 16666)
-- Name: historial_sesiones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_sesiones (
    id integer NOT NULL,
    usuario_id integer,
    evento character varying(100) NOT NULL,
    dispositivo character varying(150) NOT NULL,
    hora character varying(50) NOT NULL,
    fecha_registro date DEFAULT CURRENT_DATE
);


ALTER TABLE public.historial_sesiones OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16665)
-- Name: historial_sesiones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_sesiones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_sesiones_id_seq OWNER TO postgres;

--
-- TOC entry 5148 (class 0 OID 0)
-- Dependencies: 229
-- Name: historial_sesiones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_sesiones_id_seq OWNED BY public.historial_sesiones.id;


--
-- TOC entry 225 (class 1259 OID 16613)
-- Name: miembros_grupos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.miembros_grupos (
    grupo_id integer NOT NULL,
    usuario_id integer NOT NULL,
    es_administrador boolean DEFAULT false
);


ALTER TABLE public.miembros_grupos OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16558)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion text,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16557)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 5149 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 228 (class 1259 OID 16646)
-- Name: tareas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tareas (
    id integer NOT NULL,
    titulo character varying(150) NOT NULL,
    descripcion text NOT NULL,
    grupo_id integer,
    fecha_limite date NOT NULL,
    estado character varying(30) DEFAULT 'Pendiente'::character varying,
    extra_info character varying(100),
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tareas OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16645)
-- Name: tareas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tareas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tareas_id_seq OWNER TO postgres;

--
-- TOC entry 5150 (class 0 OID 0)
-- Dependencies: 227
-- Name: tareas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tareas_id_seq OWNED BY public.tareas.id;


--
-- TOC entry 236 (class 1259 OID 16725)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    area character varying(100) NOT NULL,
    equipo_id character varying(50),
    usuario_id integer NOT NULL,
    descripcion text NOT NULL,
    estado character varying(30) DEFAULT 'Abierto'::character varying,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16724)
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_id_seq OWNER TO postgres;

--
-- TOC entry 5151 (class 0 OID 0)
-- Dependencies: 235
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- TOC entry 232 (class 1259 OID 16683)
-- Name: trabajos_impresion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trabajos_impresion (
    id integer NOT NULL,
    usuario_id integer,
    impresora character varying(100) NOT NULL,
    ip_impresora character varying(45) NOT NULL,
    archivo character varying(255) NOT NULL,
    tamano character varying(30) NOT NULL,
    estado character varying(30) NOT NULL,
    fecha_envio date DEFAULT CURRENT_DATE,
    hora_envio character varying(20) NOT NULL
);


ALTER TABLE public.trabajos_impresion OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16682)
-- Name: trabajos_impresion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trabajos_impresion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trabajos_impresion_id_seq OWNER TO postgres;

--
-- TOC entry 5152 (class 0 OID 0)
-- Dependencies: 231
-- Name: trabajos_impresion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trabajos_impresion_id_seq OWNED BY public.trabajos_impresion.id;


--
-- TOC entry 222 (class 1259 OID 16572)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    puesto character varying(100),
    role_id integer NOT NULL,
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16571)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5153 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4923 (class 2604 OID 16706)
-- Name: archivos_enviados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.archivos_enviados ALTER COLUMN id SET DEFAULT nextval('public.archivos_enviados_id_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 16753)
-- Name: evidencias_tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidencias_tickets ALTER COLUMN id SET DEFAULT nextval('public.evidencias_tickets_id_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 16601)
-- Name: grupos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos ALTER COLUMN id SET DEFAULT nextval('public.grupos_id_seq'::regclass);


--
-- TOC entry 4919 (class 2604 OID 16669)
-- Name: historial_sesiones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sesiones ALTER COLUMN id SET DEFAULT nextval('public.historial_sesiones_id_seq'::regclass);


--
-- TOC entry 4904 (class 2604 OID 16561)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4916 (class 2604 OID 16649)
-- Name: tareas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas ALTER COLUMN id SET DEFAULT nextval('public.tareas_id_seq'::regclass);


--
-- TOC entry 4926 (class 2604 OID 16728)
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 16686)
-- Name: trabajos_impresion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trabajos_impresion ALTER COLUMN id SET DEFAULT nextval('public.trabajos_impresion_id_seq'::regclass);


--
-- TOC entry 4906 (class 2604 OID 16575)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 5135 (class 0 OID 16703)
-- Dependencies: 234
-- Data for Name: archivos_enviados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.archivos_enviados (id, nombre, tamano, remitente_id, grupo_destino_id, fecha_envio, estado) FROM stdin;
\.


--
-- TOC entry 5127 (class 0 OID 16631)
-- Dependencies: 226
-- Data for Name: equipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipos (id, ubicacion, estado, grupo_id, ultima_actualizacion) FROM stdin;
PC-RH-01	Oficina 201	apagado	\N	2026-06-03 18:11:40.287313
PC-CON-01	Oficina 101	encendido	\N	2026-06-03 18:11:40.287313
PC-SIS-02	Laboratorio 2	encendido	\N	2026-06-03 18:11:40.287313
\.


--
-- TOC entry 5139 (class 0 OID 16750)
-- Dependencies: 238
-- Data for Name: evidencias_tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evidencias_tickets (id, ticket_id, ruta_archivo, nombre_original, tamano_mb, fecha_subida) FROM stdin;
\.


--
-- TOC entry 5125 (class 0 OID 16598)
-- Dependencies: 224
-- Data for Name: grupos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grupos (id, nombre, descripcion, ubicacion, estado, fecha_creacion) FROM stdin;
10	Servicio Social	Grupo para el Servicio Social en la DII	DII	Temporal	2026-06-04
11	Inteligencia Artificial	Objetivo: Crear una IA para responder ataques	DII	Activo	2026-06-04
12	Prueba contaduria	123	DII	Activo	2026-06-04
\.


--
-- TOC entry 5131 (class 0 OID 16666)
-- Dependencies: 230
-- Data for Name: historial_sesiones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial_sesiones (id, usuario_id, evento, dispositivo, hora, fecha_registro) FROM stdin;
\.


--
-- TOC entry 5126 (class 0 OID 16613)
-- Dependencies: 225
-- Data for Name: miembros_grupos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.miembros_grupos (grupo_id, usuario_id, es_administrador) FROM stdin;
10	5	f
11	6	f
11	1	f
11	5	f
12	6	f
12	7	f
12	1	f
12	5	f
\.


--
-- TOC entry 5121 (class 0 OID 16558)
-- Dependencies: 220
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nombre, descripcion, fecha_creacion) FROM stdin;
1	admin	Administrador del sistema	2026-06-03 18:11:40.287313
2	user	Usuario operativo	2026-06-03 18:11:40.287313
\.


--
-- TOC entry 5129 (class 0 OID 16646)
-- Dependencies: 228
-- Data for Name: tareas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tareas (id, titulo, descripcion, grupo_id, fecha_limite, estado, extra_info, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5137 (class 0 OID 16725)
-- Dependencies: 236
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, area, equipo_id, usuario_id, descripcion, estado, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5133 (class 0 OID 16683)
-- Dependencies: 232
-- Data for Name: trabajos_impresion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trabajos_impresion (id, usuario_id, impresora, ip_impresora, archivo, tamano, estado, fecha_envio, hora_envio) FROM stdin;
\.


--
-- TOC entry 5123 (class 0 OID 16572)
-- Dependencies: 222
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, username, nombre, email, password_hash, puesto, role_id, activo, fecha_creacion) FROM stdin;
5	IT	Personal IT	itdii@ipn.mx	dii123	Ingeniero IT	1	t	2026-06-04 11:13:11.063963
6	Fernanda	Fernanda Paola	falvaradoc1900@alumno.ipn.mx	alva8	Inteligencia Artificial	2	t	2026-06-04 11:14:38.023708
1	hector	Héctor Figueroa	hector.admin@ipn.mx	123	Director de la Dirección de Información Institucional	1	t	2026-06-03 18:11:40.287313
7	lucy	Lucia Hernandez	lucy@ipn.mx	123	Jefa de Contaduria	1	t	2026-06-04 14:40:45.883313
\.


--
-- TOC entry 5154 (class 0 OID 0)
-- Dependencies: 233
-- Name: archivos_enviados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.archivos_enviados_id_seq', 1, false);


--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 237
-- Name: evidencias_tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evidencias_tickets_id_seq', 1, false);


--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 223
-- Name: grupos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_id_seq', 12, true);


--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 229
-- Name: historial_sesiones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historial_sesiones_id_seq', 1, false);


--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 227
-- Name: tareas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tareas_id_seq', 1, false);


--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 235
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 1, false);


--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 231
-- Name: trabajos_impresion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trabajos_impresion_id_seq', 1, false);


--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 7, true);


--
-- TOC entry 4956 (class 2606 OID 16713)
-- Name: archivos_enviados archivos_enviados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.archivos_enviados
    ADD CONSTRAINT archivos_enviados_pkey PRIMARY KEY (id);


--
-- TOC entry 4948 (class 2606 OID 16639)
-- Name: equipos equipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_pkey PRIMARY KEY (id);


--
-- TOC entry 4960 (class 2606 OID 16761)
-- Name: evidencias_tickets evidencias_tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidencias_tickets
    ADD CONSTRAINT evidencias_tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 4942 (class 2606 OID 16612)
-- Name: grupos grupos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_nombre_key UNIQUE (nombre);


--
-- TOC entry 4944 (class 2606 OID 16610)
-- Name: grupos grupos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_pkey PRIMARY KEY (id);


--
-- TOC entry 4952 (class 2606 OID 16676)
-- Name: historial_sesiones historial_sesiones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sesiones
    ADD CONSTRAINT historial_sesiones_pkey PRIMARY KEY (id);


--
-- TOC entry 4946 (class 2606 OID 16620)
-- Name: miembros_grupos miembros_grupos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miembros_grupos
    ADD CONSTRAINT miembros_grupos_pkey PRIMARY KEY (grupo_id, usuario_id);


--
-- TOC entry 4932 (class 2606 OID 16570)
-- Name: roles roles_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_key UNIQUE (nombre);


--
-- TOC entry 4934 (class 2606 OID 16568)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4950 (class 2606 OID 16659)
-- Name: tareas tareas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_pkey PRIMARY KEY (id);


--
-- TOC entry 4958 (class 2606 OID 16738)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 4954 (class 2606 OID 16696)
-- Name: trabajos_impresion trabajos_impresion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trabajos_impresion
    ADD CONSTRAINT trabajos_impresion_pkey PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 16591)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4938 (class 2606 OID 16587)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 16589)
-- Name: usuarios usuarios_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);


--
-- TOC entry 4968 (class 2606 OID 16719)
-- Name: archivos_enviados archivos_enviados_grupo_destino_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.archivos_enviados
    ADD CONSTRAINT archivos_enviados_grupo_destino_id_fkey FOREIGN KEY (grupo_destino_id) REFERENCES public.grupos(id) ON DELETE CASCADE;


--
-- TOC entry 4969 (class 2606 OID 16714)
-- Name: archivos_enviados archivos_enviados_remitente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.archivos_enviados
    ADD CONSTRAINT archivos_enviados_remitente_id_fkey FOREIGN KEY (remitente_id) REFERENCES public.usuarios(id) ON DELETE SET NULL;


--
-- TOC entry 4964 (class 2606 OID 16640)
-- Name: equipos equipos_grupo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupos(id) ON DELETE SET NULL;


--
-- TOC entry 4972 (class 2606 OID 16762)
-- Name: evidencias_tickets evidencias_tickets_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidencias_tickets
    ADD CONSTRAINT evidencias_tickets_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;


--
-- TOC entry 4966 (class 2606 OID 16677)
-- Name: historial_sesiones historial_sesiones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_sesiones
    ADD CONSTRAINT historial_sesiones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4962 (class 2606 OID 16621)
-- Name: miembros_grupos miembros_grupos_grupo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miembros_grupos
    ADD CONSTRAINT miembros_grupos_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupos(id) ON DELETE CASCADE;


--
-- TOC entry 4963 (class 2606 OID 16626)
-- Name: miembros_grupos miembros_grupos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miembros_grupos
    ADD CONSTRAINT miembros_grupos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4965 (class 2606 OID 16660)
-- Name: tareas tareas_grupo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupos(id) ON DELETE CASCADE;


--
-- TOC entry 4970 (class 2606 OID 16739)
-- Name: tickets tickets_equipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_equipo_id_fkey FOREIGN KEY (equipo_id) REFERENCES public.equipos(id) ON DELETE SET NULL;


--
-- TOC entry 4971 (class 2606 OID 16744)
-- Name: tickets tickets_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- TOC entry 4967 (class 2606 OID 16697)
-- Name: trabajos_impresion trabajos_impresion_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trabajos_impresion
    ADD CONSTRAINT trabajos_impresion_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE SET NULL;


--
-- TOC entry 4961 (class 2606 OID 16592)
-- Name: usuarios usuarios_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE RESTRICT;


-- Completed on 2026-06-04 15:13:00

--
-- PostgreSQL database dump complete
--

\unrestrict N6lLNofSsq4C24grAWlvFeqhlqEvMm9TUjbjJfsvsc4mby81vk2mpS16g5cJOsq

