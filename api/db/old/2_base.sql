CREATE DATABASE 'feedback_local_1';
USE feedback_local_1;

CREATE SEQUENCE organizations_seq;

CREATE TABLE IF NOT EXISTS organizations (
  id int NOT NULL DEFAULT NEXTVAL ('organizations_seq'),
  PRIMARY KEY (id)
);

CREATE SEQUENCE organizations_hubs_seq;

CREATE TABLE IF NOT EXISTS organizations_hubs (
  id int NOT NULL DEFAULT NEXTVAL ('organizations_hubs_seq'),
  organization_id int NOT NULL,
  public int NOT NULL DEFAULT '0',
  title varchar(150) NOT NULL,
  description varchar(500) NOT NULL,
  whitelabel int NOT NULL DEFAULT '0',
  brand_name varchar(150) NOT NULL,
  brand_logo_url varchar(2083) DEFAULT NULL,
  brand_icon_url varchar(2083) DEFAULT NULL,
  brand_background_url varchar(2083) DEFAULT NULL,
  brand_colors_primary varchar(150) DEFAULT NULL,
  brand_colors_background varchar(150) DEFAULT NULL,
  domain_native varchar(150) NOT NULL,
  domain_custom varchar(150) DEFAULT NULL,
  auth_sso_enable int NOT NULL DEFAULT '0',
  auth_sso_url varchar(150) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT domain_native UNIQUE  (domain_native),
  CONSTRAINT domain_custom UNIQUE  (domain_custom)
);

CREATE SEQUENCE organizations_hubs_boards_seq;

CREATE TABLE IF NOT EXISTS organizations_hubs_boards (
  id int NOT NULL DEFAULT NEXTVAL ('organizations_hubs_boards_seq'),
  hub_id int NOT NULL,
  name varchar(50) NOT NULL,
  title varchar(50) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE INDEX page_id ON organizations_hubs_boards (hub_id);

CREATE SEQUENCE organizations_hubs_boards_posts_seq;

CREATE TABLE IF NOT EXISTS organizations_hubs_boards_posts (
  id int NOT NULL DEFAULT NEXTVAL ('organizations_hubs_boards_posts_seq'),
  hub_id int NOT NULL,
  board_id int NOT NULL,
  title varchar(70) NOT NULL,
  content varchar(1000) NOT NULL,
  state int NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE INDEX page_id ON organizations_hubs_boards_posts (hub_id);
CREATE INDEX board_id ON organizations_hubs_boards_posts (board_id);

CREATE SEQUENCE organizations_hubs_boards_posts_comments_seq;

CREATE TABLE IF NOT EXISTS organizations_hubs_boards_posts_comments (
  id int NOT NULL DEFAULT NEXTVAL ('organizations_hubs_boards_posts_comments_seq'),
  hub_id int NOT NULL,
  board_id int NOT NULL,
  post_id int NOT NULL,
  owner int NOT NULL,
  content varchar(1000) NOT NULL,
  state int NOT NULL DEFAULT '0',
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE INDEX page_id ON organizations_hubs_boards_posts_comments (hub_id);
CREATE INDEX board_id ON organizations_hubs_boards_posts_comments (board_id);
CREATE INDEX post_id ON organizations_hubs_boards_posts_comments (post_id);

CREATE SEQUENCE organizations_hubs_boards_posts_votes_seq;

CREATE TABLE IF NOT EXISTS organizations_hubs_boards_posts_votes (
  id int NOT NULL DEFAULT NEXTVAL ('organizations_hubs_boards_posts_votes_seq'),
  hub_id int NOT NULL,
  board_id int NOT NULL,
  post_id int NOT NULL,
  owner int NOT NULL,
  state boolean(1) NOT NULL DEFAULT b'0',
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE SEQUENCE organizations_hubs_boards_states_seq;

CREATE TABLE IF NOT EXISTS organizations_hubs_boards_states (
  id int NOT NULL DEFAULT NEXTVAL ('organizations_hubs_boards_states_seq'),
  hub_id int NOT NULL,
  board_id int NOT NULL,
  title varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE users_seq;

CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL DEFAULT NEXTVAL ('users_seq'),
  email varchar(256) DEFAULT NULL,
  username varchar(50) DEFAULT NULL,
  avatar_url varchar(4096) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT email UNIQUE  (email)
);

CREATE SEQUENCE users_auth_oauth_seq;

CREATE TABLE IF NOT EXISTS users_auth_oauth (
  id int NOT NULL DEFAULT NEXTVAL ('users_auth_oauth_seq'),
  user_id int DEFAULT NULL,
  provider varchar(256) DEFAULT NULL,
  access_token varchar(4096) DEFAULT NULL,
  refresh_token varchar(4096) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE SEQUENCE users_auth_password_seq;

CREATE TABLE IF NOT EXISTS users_auth_password (
  id int NOT NULL DEFAULT NEXTVAL ('users_auth_password_seq'),
  user_id int DEFAULT NULL,
  hash varchar(4096) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_id UNIQUE  (user_id)
);
