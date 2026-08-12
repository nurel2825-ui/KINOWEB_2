-- Migration: Create films table
-- Created: 2026-08-12

CREATE TABLE IF NOT EXISTS "films" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
  "title" varchar(512) NOT NULL,
  "slug" varchar(512) NOT NULL UNIQUE,
  "description" text,
  "poster_url" varchar(1024),
  "vk_video_url" varchar(1024) NOT NULL,
  "year" integer,
  "country" varchar(256),
  "studio" varchar(256),
  "type" varchar(64) NOT NULL DEFAULT 'movie',
  "episodes_total" integer,
  "duration" varchar(64),
  "announcement" text,
  "is_published" boolean NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS "films_slug_idx" ON "films"("slug");
CREATE INDEX IF NOT EXISTS "films_created_at_idx" ON "films"("created_at" DESC);
CREATE INDEX IF NOT EXISTS "films_is_published_idx" ON "films"("is_published");
CREATE INDEX IF NOT EXISTS "films_type_idx" ON "films"("type");