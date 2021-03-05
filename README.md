# shorten_url_int493

# Install Extension in Postgre (SQL Command)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

# Create Table with SQL
CREATE TABLE IF NOT EXISTS "urls" (
"id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
"shorten_url" TEXT NOT NULL,
"url" TEXT NOT NULL,
"visit" NUMBER NOT NULL,
"created_at" TIMESTAMP DEFAULT NOW(),
"updated_at" TIMESTAMP DEFAULT NOW(),
"deleted_at" TIMESTAMP DEFAULT NULL
);
