PRAGMA foreign_keys = ON;


CREATE TABLE IF NOT EXISTS schema_migrations (
  migration_id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  nickname TEXT NOT NULL,
  password_hash TEXT,
  email_verified_at TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','disabled','deleted')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  auth_session_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT,
  revoked_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_auth_sessions_user_id
  ON auth_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_auth_sessions_expires_at
  ON auth_sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_auth_sessions_revoked_at
  ON auth_sessions(revoked_at);

CREATE TABLE IF NOT EXISTS email_verification_tokens (
  verification_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  consumed_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

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
  status TEXT NOT NULL DEFAULT 'active',
  owner_user_id TEXT,
  claim_secret_hash TEXT,
  claimed_at TEXT,
  FOREIGN KEY (owner_user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS zodiac_charts (
  chart_id TEXT PRIMARY KEY,
  owner_user_id TEXT,
  claim_secret_hash TEXT,
  result_json TEXT NOT NULL,
  schema_version TEXT NOT NULL,
  calculated_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  claimed_at TEXT,
  FOREIGN KEY (owner_user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS report_entitlements (
  entitlement_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  module TEXT NOT NULL
    CHECK (module IN ('personality','career','zodiac')),
  resource_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','unlocked','revoked','refunded')),
  payment_provider TEXT,
  payment_reference TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  unlocked_at TEXT,
  revoked_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE (user_id, module, resource_id)
);

CREATE INDEX IF NOT EXISTS idx_report_entitlements_user_id
  ON report_entitlements(user_id);

CREATE INDEX IF NOT EXISTS idx_report_entitlements_module_resource
  ON report_entitlements(module, resource_id);

CREATE INDEX IF NOT EXISTS idx_report_entitlements_status
  ON report_entitlements(status);


CREATE TABLE IF NOT EXISTS payments (
  payment_id TEXT PRIMARY KEY,

  provider TEXT NOT NULL
    CHECK (provider IN ('paddle')),

  provider_event_id TEXT NOT NULL,
  provider_transaction_id TEXT NOT NULL,

  user_id TEXT NOT NULL,

  module TEXT NOT NULL
    CHECK (module IN ('personality','career','zodiac')),

  resource_id TEXT NOT NULL,

  product_code TEXT NOT NULL,
  provider_price_id TEXT,

  currency TEXT NOT NULL,
  amount INTEGER NOT NULL
    CHECK (amount >= 0),

  tax_amount INTEGER NOT NULL DEFAULT 0
    CHECK (tax_amount >= 0),

  status TEXT NOT NULL
    CHECK (
      status IN (
        'pending',
        'completed',
        'refunded',
        'failed'
      )
    ),

  created_at TEXT NOT NULL,
  completed_at TEXT,
  refunded_at TEXT,

  FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,

  UNIQUE (provider, provider_event_id),
  UNIQUE (provider, provider_transaction_id)
);


CREATE INDEX IF NOT EXISTS idx_payments_user_id
  ON payments(user_id);

CREATE INDEX IF NOT EXISTS idx_payments_resource
  ON payments(module, resource_id);

CREATE INDEX IF NOT EXISTS idx_payments_status
  ON payments(status);

CREATE INDEX IF NOT EXISTS idx_payments_provider_transaction
  ON payments(provider, provider_transaction_id);

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
