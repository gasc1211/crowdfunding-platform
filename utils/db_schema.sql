CREATE TABLE "users" (
  "user_id" uuid primary key default gen_random_uuid(),
  "auth_id" varchar unique not null,
  "username" varchar unique not null,
  "first_name" varchar not null,
  "last_name" varchar not null,
  "email" varchar unique not null
  "birth_date" date
);

CREATE TABLE "producer" (
  "user_id" uuid unique,
  "profile_image_url" varchar,
  "profile_banner_url" varchar,
  "biography" text,
  "location" varchar
);

CREATE TABLE "projects" (
  "project_id" uuid primary key default gen_random_uuid(),
  "producer_id" uuid,
  "project_banner_url" varchar,
  "name" varchar,
  "description" varchar,
  "start_date" date,
  "expected_finish_date" date,
  "finish_date" date,
  "progress" number,
  "investement_goal" money,
  "total_invested" money
);

CREATE TABLE "updates" (
  "update_id" uuid primary key default gen_random_uuid(),
  "project_id" uuid,
  "upload_date" date,
  "title" varchar,
  "description" text
);

CREATE TABLE "updates_images" (
  "update_id" uuid,
  "image_url" varchar,
  PRIMARY KEY ("update_id", "image_url")
);

CREATE TABLE "categories" (
  "category_id" uuid primary key default gen_random_uuid(),
  "name" varchar
);

CREATE TABLE "project_categories" (
  "category_id" uuid,
  "project_id" uuid,
  PRIMARY KEY ("category_id", "project_id")
);

CREATE TABLE "comments" (
  "comment_id" uuid primary key default gen_random_uuid(),
  "parent_comment_id" uuid,
  "author_id" uuid,
  "project_id" uuid,
  "content" text
);

CREATE TABLE "investments" (
  "investor_id" uuid,
  "project_id" uuid,
  "investment_amount" money
);

ALTER TABLE "producer" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "projects" ADD FOREIGN KEY ("producer_id") REFERENCES "producer" ("user_id");

ALTER TABLE "updates" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("project_id");

ALTER TABLE "comments" ADD FOREIGN KEY ("parent_comment_id") REFERENCES "comments" ("comment_id");

ALTER TABLE "comments" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("user_id");

ALTER TABLE "comments" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("project_id");

ALTER TABLE "investments" ADD FOREIGN KEY ("investor_id") REFERENCES "users" ("user_id");

ALTER TABLE "investments" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("project_id");
