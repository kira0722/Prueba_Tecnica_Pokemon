PGDMP      0                }            pokemon_prueba    17.3    17.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    pokemon_prueba    DATABASE     t   CREATE DATABASE pokemon_prueba WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-MX';
    DROP DATABASE pokemon_prueba;
                     postgres    false            �            1259    16389    pokemon    TABLE     �   CREATE TABLE public.pokemon (
    id integer NOT NULL,
    base_experience integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.pokemon;
       public         heap r       postgres    false            �            1259    16395    pokemon_rating    TABLE     �   CREATE TABLE public.pokemon_rating (
    id integer NOT NULL,
    rating integer NOT NULL,
    "pokemonId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
 "   DROP TABLE public.pokemon_rating;
       public         heap r       postgres    false            �            1259    16394    pokemon_rating_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pokemon_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.pokemon_rating_id_seq;
       public               postgres    false    219            �           0    0    pokemon_rating_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.pokemon_rating_id_seq OWNED BY public.pokemon_rating.id;
          public               postgres    false    218            �            1259    16403 
   search_log    TABLE     �   CREATE TABLE public.search_log (
    id integer NOT NULL,
    "queryParams" json,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    endpoint character varying NOT NULL
);
    DROP TABLE public.search_log;
       public         heap r       postgres    false            �            1259    16402    search_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.search_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.search_log_id_seq;
       public               postgres    false    221            �           0    0    search_log_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.search_log_id_seq OWNED BY public.search_log.id;
          public               postgres    false    220            *           2604    16398    pokemon_rating id    DEFAULT     v   ALTER TABLE ONLY public.pokemon_rating ALTER COLUMN id SET DEFAULT nextval('public.pokemon_rating_id_seq'::regclass);
 @   ALTER TABLE public.pokemon_rating ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    219    219            ,           2604    16406    search_log id    DEFAULT     n   ALTER TABLE ONLY public.search_log ALTER COLUMN id SET DEFAULT nextval('public.search_log_id_seq'::regclass);
 <   ALTER TABLE public.search_log ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    220    221            �          0    16389    pokemon 
   TABLE DATA           <   COPY public.pokemon (id, base_experience, name) FROM stdin;
    public               postgres    false    217   �       �          0    16395    pokemon_rating 
   TABLE DATA           N   COPY public.pokemon_rating (id, rating, "pokemonId", "createdAt") FROM stdin;
    public               postgres    false    219   !       �          0    16403 
   search_log 
   TABLE DATA           N   COPY public.search_log (id, "queryParams", "createdAt", endpoint) FROM stdin;
    public               postgres    false    221   �       �           0    0    pokemon_rating_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.pokemon_rating_id_seq', 9, true);
          public               postgres    false    218            �           0    0    search_log_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.search_log_id_seq', 75, true);
          public               postgres    false    220            /           2606    16393    pokemon pokemon_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pokemon
    ADD CONSTRAINT pokemon_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pokemon DROP CONSTRAINT pokemon_pkey;
       public                 postgres    false    217            1           2606    16401 "   pokemon_rating pokemon_rating_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.pokemon_rating
    ADD CONSTRAINT pokemon_rating_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.pokemon_rating DROP CONSTRAINT pokemon_rating_pkey;
       public                 postgres    false    219            3           2606    16411    search_log search_log_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.search_log
    ADD CONSTRAINT search_log_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.search_log DROP CONSTRAINT search_log_pkey;
       public                 postgres    false    221            �   o   x�%�A�0��Ǡ8u��.B`��M@�=�G��8�9b��^�D��Zv0�-��9@\K[��)Bm�/bL��K�U�����z����`{o�����ԍ.'"��"r      �   �   x�m���1��3Ta2� I-�_�ы���7�-$eB�̻�9v֎a\3�RB�o@��ư��ƙX~ls������U�H7��0`��։ ?�o��#��R[�W��cV�<��*�m��u����Zl��T�	�6D      �   �  x����n�6���S,|�3��ԭ���>@�BN����e��n�E߽#�%R��2�����Hg�
�]4_�����ϋz�^��䞀�P>6���'O�����~$�n�u�(�������He�CC]'�}S=�+�tPX1�b��$Oj�Mhٚ`��Z7��uu�ֹ@����m�Z7��^E�ϋ�a�?��U�Y��RX6S|h�}��I��?���h0�9�,\d�C���h����^�����{[��j�\�T�/�/�D��l������q�g$؅�0~�h&b�)/�}3��x��S� �5?n&�	�s;/球����|A��[�À}Jv#�Ӻi���`��2J�d-� S���r3`�!8�RoP�o��9lԊ��S��_V7�����s�]����]j�'���M��䵩_2W�xzo�gW�A���ݾj��e]gZ:%Q ��&U��;�r/TK�j��~�v��"�-���Z�Ք���6F��5H���)�Sh:P�$o��6�\����h�A��,���ɣLk5�D�����h5r�⳼�p��9t!�r�w56r��FO3�4�-��[J�d�.�K#m�-��+Z����E�oCO�u��޺,��ހh~DV��ȃ
z~+�h�c�Z@j?&����-]�^�ѥ�0��!Gtt��wLk�j���g�pǄyB��E�����w*��; �C@�=J��C����:y3��ol'���e7�v�؈}�b�j]�Y���$����cF��Mk,�5��n)D���쯹v�1s)�O��xe�w��v��OUv�.o�{��3��[���e3��Vl�C�xt�r0&E����D"o�tl��&{��C���Y0&ј�		'H��#;&��F~��R8�V���T^�WȢV���X5̳��T�?���
����䃢9)m7�h�H.+������E�]����0��!�Jg3`9h<�ځ�6ߪ��m��;�.�d�]�U���f����g"�\}�1!��M׃>B�&�{?��t��z���KE�dǠ,lx��cH*Ex��1I�(��I.�9���u&	F��eL����U�Xݸ��g�	}��oj�2��S�"w^&.d�8M��3��,��m:#{xg�Օdw���^��D��CFuѠ�&��a��!�t��c6y;
Ǿ���P�:��~X�|w5]�I��b�����3��X��"�_1�4������+�     