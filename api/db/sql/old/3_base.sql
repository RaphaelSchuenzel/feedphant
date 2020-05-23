-- -------------------------------------------------------------
-- TablePlus 3.1.2(296)
--
-- https://tableplus.com/
--
-- Database: local
-- Generation Time: 2020-02-29 18:34:42.9700
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS organizations_seq;

-- Table Definition
CREATE TABLE "public"."organizations" (
    "id" int4 NOT NULL DEFAULT nextval('organizations_seq'::regclass),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS organizations_hubs_seq;

-- Table Definition
CREATE TABLE "public"."organizations_hubs" (
    "id" int4 NOT NULL DEFAULT nextval('organizations_hubs_seq'::regclass),
    "organization_id" int4 NOT NULL,
    "public" int4 NOT NULL DEFAULT 0,
    "title" varchar(150) NOT NULL,
    "description" varchar(500) NOT NULL,
    "whitelabel" int4 NOT NULL DEFAULT 0,
    "brand_name" varchar(150) NOT NULL,
    "brand_logo_url" varchar(2083) DEFAULT NULL::character varying,
    "brand_icon_url" varchar(2083) DEFAULT NULL::character varying,
    "brand_background_url" varchar(2083) DEFAULT NULL::character varying,
    "brand_colors_primary" varchar(150) DEFAULT NULL::character varying,
    "brand_colors_background" varchar(150) DEFAULT NULL::character varying,
    "domain_native" varchar(150) NOT NULL,
    "domain_custom" varchar(150) DEFAULT NULL::character varying,
    "auth_sso_enable" int4 NOT NULL DEFAULT 0,
    "auth_sso_url" varchar(150) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS organizations_hubs_boards_seq;

-- Table Definition
CREATE TABLE "public"."organizations_hubs_boards" (
    "id" int4 NOT NULL DEFAULT nextval('organizations_hubs_boards_seq'::regclass),
    "hub_id" int4 NOT NULL,
    "name" varchar(50) NOT NULL,
    "title" varchar(50) NOT NULL,
    "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS organizations_hubs_boards_posts_seq;

-- Table Definition
CREATE TABLE "public"."organizations_hubs_boards_posts" (
    "id" int4 NOT NULL DEFAULT nextval('organizations_hubs_boards_posts_seq'::regclass),
    "hub_id" int4 NOT NULL,
    "board_id" int4 NOT NULL,
    "title" varchar(70) NOT NULL,
    "content" varchar(1000) NOT NULL,
    "state" int4 NOT NULL,
    "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS organizations_hubs_boards_posts_comments_seq;

-- Table Definition
CREATE TABLE "public"."organizations_hubs_boards_posts_comments" (
    "id" int4 NOT NULL DEFAULT nextval('organizations_hubs_boards_posts_comments_seq'::regclass),
    "hub_id" int4 NOT NULL,
    "board_id" int4 NOT NULL,
    "post_id" int4 NOT NULL,
    "owner" int4 NOT NULL,
    "content" varchar(1000) NOT NULL,
    "state" int4 NOT NULL DEFAULT 0,
    "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS organizations_hubs_boards_posts_votes_seq;

-- Table Definition
CREATE TABLE "public"."organizations_hubs_boards_posts_votes" (
    "id" int4 NOT NULL DEFAULT nextval('organizations_hubs_boards_posts_votes_seq'::regclass),
    "hub_id" int4 NOT NULL,
    "board_id" int4 NOT NULL,
    "post_id" int4 NOT NULL,
    "owner" int4 NOT NULL,
    "state" bool NOT NULL,
    "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS organizations_hubs_boards_states_seq;

-- Table Definition
CREATE TABLE "public"."organizations_hubs_boards_states" (
    "id" int4 NOT NULL DEFAULT nextval('organizations_hubs_boards_states_seq'::regclass),
    "hub_id" int4 NOT NULL,
    "board_id" int4 NOT NULL,
    "title" varchar(50) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_seq'::regclass),
    "email" varchar(256) DEFAULT NULL::character varying,
    "username" varchar(50) DEFAULT NULL::character varying,
    "avatar_url" varchar(4096) DEFAULT NULL::character varying,
    "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_auth_oauth_seq;

-- Table Definition
CREATE TABLE "public"."users_auth_oauth" (
    "id" int4 NOT NULL DEFAULT nextval('users_auth_oauth_seq'::regclass),
    "user_id" int4,
    "provider" varchar(256) DEFAULT NULL::character varying,
    "access_token" varchar(4096) DEFAULT NULL::character varying,
    "refresh_token" varchar(4096) DEFAULT NULL::character varying,
    "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_auth_password_seq;

-- Table Definition
CREATE TABLE "public"."users_auth_password" (
    "id" int4 NOT NULL DEFAULT nextval('users_auth_password_seq'::regclass),
    "user_id" int4,
    "hash" varchar(4096) DEFAULT NULL::character varying,
    "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);


