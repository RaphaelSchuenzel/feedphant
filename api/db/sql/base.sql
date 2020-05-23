-- -------------------------------------------------------------
-- TablePlus 3.5.0(308)
--
-- https://tableplus.com/
--
-- Database: local
-- Generation Time: 2020-05-20 00:11:15.6500
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."board" (
    "id" uuid NOT NULL DEFAULT hub.uuid_generate_v4(),
    "name" varchar(255) NOT NULL,
    "url" varchar(255) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."board_post" (
    "id" uuid NOT NULL DEFAULT hub.uuid_generate_v4(),
    "board_id" uuid NOT NULL,
    "title" varchar(255) NOT NULL,
    "content" varchar(255) NOT NULL,
    "hidden" bool NOT NULL DEFAULT true,
    "state" varchar(255) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."board_post_comment" (
    "id" uuid NOT NULL DEFAULT hub.uuid_generate_v4(),
    "post_id" uuid NOT NULL,
    "owner" uuid NOT NULL,
    "content" varchar(4096) NOT NULL,
    "hidden" bool NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."board_post_comment_vote" (
    "id" uuid NOT NULL DEFAULT hub.uuid_generate_v4(),
    "comment_id" uuid NOT NULL,
    "owner" uuid NOT NULL,
    "state" bool NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."board_post_state" (
    "id" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."board_post_vote" (
    "id" uuid NOT NULL DEFAULT hub.uuid_generate_v4(),
    "post_id" uuid NOT NULL,
    "owner" uuid NOT NULL,
    "state" bool NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."setting" (
    "hub_id" uuid NOT NULL DEFAULT hub.uuid_generate_v4(),
    "public" bool NOT NULL DEFAULT false,
    "title" varchar(255) NOT NULL,
    "description" varchar(2048),
    "whitelabel" bool NOT NULL DEFAULT false,
    "subdomain" varchar(255) NOT NULL,
    "domain_custom" varchar(255),
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("hub_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."setting_brand" (
    "hub_id" uuid NOT NULL,
    "name" varchar(255) NOT NULL,
    "logo_url" varchar(4096),
    "icon_url" varchar(4096),
    "background_url" varchar(4096),
    "colors_primary" varchar(255),
    "colors_background" varchar(255),
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("hub_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."subscription" (
    "hub_id" uuid NOT NULL,
    "stripe_customer_id" varchar(2048),
    "stripe_subscription_id" varchar(2048),
    "current_period_ends" timestamptz,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("hub_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."user" (
    "id" uuid NOT NULL DEFAULT hub.uuid_generate_v4(),
    "email" varchar(255) NOT NULL DEFAULT NULL::character varying,
    "username" varchar(50) NOT NULL DEFAULT NULL::character varying,
    "avatar_url" varchar(4096) DEFAULT NULL::character varying,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "hub"."user_auth" (
    "user_id" uuid NOT NULL,
    "adapter" varchar(255) NOT NULL DEFAULT NULL::character varying,
    "hash" varchar(4096) DEFAULT NULL::character varying,
    "access_token" varchar(4096) NOT NULL DEFAULT 'NULL::character varying'::character varying,
    "refresh_token" varchar(4096) NOT NULL DEFAULT 'NULL::character varying'::character varying,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

