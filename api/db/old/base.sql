-- -------------------------------------------------------------
-- TablePlus 3.5.0(308)
--
-- https://tableplus.com/
--
-- Database: local
-- Generation Time: 2020-05-18 17:28:47.1040
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."board" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "name" varchar(255) NOT NULL,
    "title" varchar(255) NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."board_post" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "board_id" uuid NOT NULL,
    "title" varchar NOT NULL,
    "content" varchar NOT NULL,
    "hidden" varchar NOT NULL,
    "state" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."board_post_comment" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "post_id" uuid NOT NULL,
    "owner" int4 NOT NULL,
    "content" varchar(2048) NOT NULL,
    "state" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."board_post_comment_vote" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "comment_id" uuid NOT NULL,
    "owner" int4 NOT NULL,
    "state" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."board_post_state" (
    "id" varchar NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."board_post_vote" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "post_id" uuid NOT NULL,
    "owner" int4 NOT NULL,
    "state" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."settings" (
    "hub_id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "public" bool NOT NULL DEFAULT false,
    "title" varchar,
    "description" varchar,
    "whitelabel" bool NOT NULL DEFAULT true,
    "subdomain" varchar NOT NULL,
    "domain_custom" varchar,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("hub_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."settings_brand" (
    "hub_id" uuid,
    "name" varchar,
    "logo_url" varchar,
    "icon_url" varchar,
    "background_url" varchar,
    "colors_primary" varchar,
    "colors_background" varchar,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."subscription" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "stripe_customer_id" varchar,
    "stripe_subscription_id" varchar,
    "current_period_ends" timestamp,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."user" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "email" varchar(256) NOT NULL DEFAULT NULL::character varying,
    "username" varchar(50) NOT NULL DEFAULT NULL::character varying,
    "avatar_url" varchar(4096) DEFAULT NULL::character varying,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hubs"."user_auth" (
    "id" uuid NOT NULL DEFAULT hubs.uuid_generate_v4(),
    "user_id" uuid NOT NULL,
    "adapter" varchar NOT NULL DEFAULT NULL::character varying,
    "access_token" varchar NOT NULL DEFAULT NULL::character varying,
    "refresh_token" varchar NOT NULL DEFAULT NULL::character varying,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

