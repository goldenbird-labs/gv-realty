-- ============================================================
-- G&V Realty — Supabase Schema
-- Run this in the Supabase SQL editor to set up the database
-- ============================================================

-- Enable pgvector for AI semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- AGENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS agents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  title       TEXT,
  email       TEXT UNIQUE,
  phone       TEXT,
  photo       TEXT,
  bio         TEXT,
  listings_sold INTEGER DEFAULT 0,
  volume      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROPERTIES
-- ============================================================
CREATE TABLE IF NOT EXISTS properties (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  type          TEXT CHECK (type IN ('sale', 'rent', 'commercial')) NOT NULL,
  property_type TEXT CHECK (property_type IN ('house','apartment','condo','penthouse','villa','office','retail','land')),
  price         NUMERIC NOT NULL,
  address       TEXT,
  city          TEXT,
  state         TEXT,
  zip           TEXT,
  lat           NUMERIC,
  lng           NUMERIC,
  beds          INTEGER DEFAULT 0,
  baths         NUMERIC DEFAULT 0,
  sqft          INTEGER DEFAULT 0,
  garage        INTEGER DEFAULT 0,
  year_built    INTEGER,
  features      TEXT[] DEFAULT '{}',
  images        TEXT[] DEFAULT '{}',
  status        TEXT DEFAULT 'active' CHECK (status IN ('active','sold','pending','off_market')),
  featured      BOOLEAN DEFAULT false,
  agent_id      UUID REFERENCES agents(id) ON DELETE SET NULL,
  embedding     vector(1536),           -- OpenAI text-embedding-3-small
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX IF NOT EXISTS properties_fts ON properties
  USING gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(city,'')));

-- Vector index for semantic search
CREATE INDEX IF NOT EXISTS properties_embedding_idx ON properties
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  interest    TEXT,
  message     TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  source      TEXT DEFAULT 'website',
  ip          TEXT,
  country     TEXT,
  city        TEXT,
  status      TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','closed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  content       TEXT,
  excerpt       TEXT,
  cover_image   TEXT,
  author        TEXT,
  category      TEXT,
  published     BOOLEAN DEFAULT true,
  published_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEMANTIC SEARCH FUNCTION (pgvector)
-- Called by the backend to find similar properties
-- ============================================================
CREATE OR REPLACE FUNCTION match_properties(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.5,
  match_count     INT    DEFAULT 10,
  filter_type     TEXT   DEFAULT NULL
)
RETURNS TABLE (
  id          UUID,
  title       TEXT,
  city        TEXT,
  state       TEXT,
  type        TEXT,
  price       NUMERIC,
  beds        INTEGER,
  baths       NUMERIC,
  sqft        INTEGER,
  images      TEXT[],
  similarity  FLOAT
)
LANGUAGE sql STABLE AS $$
  SELECT
    p.id, p.title, p.city, p.state, p.type, p.price,
    p.beds, p.baths, p.sqft, p.images,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM properties p
  WHERE p.status = 'active'
    AND (filter_type IS NULL OR p.type = filter_type)
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE properties  ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents      ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads       ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts  ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for active properties, agents, and published posts
CREATE POLICY "Public read properties"  ON properties  FOR SELECT USING (status = 'active');
CREATE POLICY "Public read agents"      ON agents      FOR SELECT USING (true);
CREATE POLICY "Public read blog"        ON blog_posts  FOR SELECT USING (published = true);

-- Leads: insert only from public (server writes with service key bypass RLS)
CREATE POLICY "Insert leads"    ON leads       FOR INSERT WITH CHECK (true);
CREATE POLICY "Insert subscribers" ON subscribers FOR INSERT WITH CHECK (true);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
