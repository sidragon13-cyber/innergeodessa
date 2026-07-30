PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS items (
  item_id TEXT PRIMARY KEY,
  dimension TEXT NOT NULL CHECK (dimension IN ('EI','SN','TF','JP')),
  subdimension TEXT NOT NULL,
  keyed_pole TEXT NOT NULL CHECK (keyed_pole IN ('E','I','S','N','T','F','J','P')),
  form TEXT NOT NULL,
  wording TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pilot',
  master_order INTEGER NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS sessions (
  session_id TEXT PRIMARY KEY,
  consent INTEGER NOT NULL CHECK (consent IN (0,1)),
  language TEXT NOT NULL DEFAULT 'en',
  module TEXT NOT NULL DEFAULT 'personality'
    CHECK (module IN ('personality','riasec')),
  started_at TEXT NOT NULL,
  completed_at TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS responses (
  session_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  raw_value INTEGER NOT NULL CHECK (raw_value BETWEEN 1 AND 5),
  response_time_ms INTEGER,
  answered_at TEXT NOT NULL,
  PRIMARY KEY (session_id, item_id),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE IF NOT EXISTS results (
  session_id TEXT PRIMARY KEY,
  personality_type TEXT NOT NULL,
  ei_score INTEGER NOT NULL,
  sn_score INTEGER NOT NULL,
  tf_score INTEGER NOT NULL,
  jp_score INTEGER NOT NULL,
  ei_confidence REAL NOT NULL,
  sn_confidence REAL NOT NULL,
  tf_confidence REAL NOT NULL,
  jp_confidence REAL NOT NULL,
  calculated_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS question_banks (
  question_bank_version TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question_bank_items (
  item_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_bank_version TEXT NOT NULL,
  source_item_id TEXT NOT NULL,
  dimension TEXT NOT NULL CHECK (dimension IN ('EI','SN','TF','JP')),
  subdimension TEXT NOT NULL,
  keyed_pole TEXT NOT NULL CHECK (keyed_pole IN ('E','I','S','N','T','F','J','P')),
  form TEXT NOT NULL,
  wording TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  version TEXT NOT NULL,
  status TEXT NOT NULL,
  master_order INTEGER NOT NULL,
  reverse_scored INTEGER NOT NULL CHECK (reverse_scored IN (0,1)),
  FOREIGN KEY (question_bank_version)
    REFERENCES question_banks(question_bank_version),
  UNIQUE (question_bank_version, source_item_id),
  UNIQUE (question_bank_version, master_order)
);

CREATE TABLE IF NOT EXISTS session_question_items (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  display_order INTEGER NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  UNIQUE (session_id, display_order),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES question_bank_items(item_record_id)
);

CREATE TABLE IF NOT EXISTS session_responses (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  raw_value INTEGER NOT NULL CHECK (raw_value BETWEEN 1 AND 5),
  response_time_ms INTEGER,
  answered_at TEXT NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES question_bank_items(item_record_id)
);

CREATE TABLE IF NOT EXISTS riasec_question_items (
  item_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_bank_version TEXT NOT NULL,
  source_item_id TEXT NOT NULL,
  dimension TEXT NOT NULL CHECK (dimension IN ('R','I','A','S','E','C')),
  wording TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  version TEXT NOT NULL,
  status TEXT NOT NULL,
  master_order INTEGER NOT NULL,
  FOREIGN KEY (question_bank_version)
    REFERENCES question_banks(question_bank_version),
  UNIQUE (question_bank_version, source_item_id),
  UNIQUE (question_bank_version, master_order)
);

CREATE TABLE IF NOT EXISTS riasec_session_question_items (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  display_order INTEGER NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  UNIQUE (session_id, display_order),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES riasec_question_items(item_record_id)
);

CREATE TABLE IF NOT EXISTS riasec_session_responses (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  raw_value INTEGER NOT NULL CHECK (raw_value BETWEEN 1 AND 5),
  response_time_ms INTEGER,
  answered_at TEXT NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES riasec_question_items(item_record_id)
);

CREATE TABLE IF NOT EXISTS riasec_results (
  session_id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  scores_json TEXT NOT NULL,
  percentages_json TEXT NOT NULL,
  ranking_json TEXT NOT NULL,
  answered_json TEXT NOT NULL,
  calculated_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);
