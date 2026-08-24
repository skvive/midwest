-- Midwest University — Neon(PostgreSQL) schema
-- 공통 규칙: 전 콘텐츠 테이블에 is_dummy BOOLEAN, deleted_at TIMESTAMPTZ(Soft Delete)

CREATE TABLE IF NOT EXISTS app_state (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id         SERIAL PRIMARY KEY,
  board      TEXT NOT NULL CHECK (board IN ('bulletin', 'gallery', 'miri')),
  title      TEXT NOT NULL,
  body       TEXT NOT NULL DEFAULT '',
  date       DATE NOT NULL DEFAULT CURRENT_DATE,
  image      TEXT,
  is_dummy   BOOLEAN NOT NULL DEFAULT TRUE,
  deleted_at TIMESTAMPTZ
);

-- 활성 행 부분 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_active
  ON posts (board, date DESC)
  WHERE deleted_at IS NULL;

-- 활성 뷰
CREATE OR REPLACE VIEW active_posts AS
  SELECT * FROM posts WHERE deleted_at IS NULL;

INSERT INTO app_state (key, value) VALUES ('data_mode', 'dummy')
  ON CONFLICT (key) DO NOTHING;
