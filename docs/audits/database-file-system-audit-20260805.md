# InnerGeo Database and File-System Audit

**Date:** 2026-08-05
**Purpose:** Mandatory payment-preintegration database and project-file optimization audit.

## 1. Executive Baseline

- Audited files excluding dependency/build/cache directories: **597**
- Audited file size: **7.1 MB**
- Database files found: **1**
- Content-duplicate recoverable size estimate: **0.0 B**
- Archive candidates: **1**
- Backup candidates: **2**

Excluded from content hashing and project-source totals:

- `.git`
- `node_modules`
- `.next`
- `.venv`
- `__pycache__`
- `.pytest_cache`

## 2. Largest Files

| Rank | File | Size |
|---:|---|---:|
| 1 | `innergeodessa-mvp/backend/innergeodessa.db` | 2.1 MB |

## 3. File-Type Distribution

| Extension | Count | Total size |
|---|---:|---:|
| `.ts` | 352 | 2.2 MB |
| `.db` | 1 | 2.1 MB |
| `.png` | 1 | 744.1 KB |
| `.txt` | 14 | 646.6 KB |
| `.md` | 69 | 466.2 KB |
| `.json` | 8 | 303.9 KB |
| `.tsx` | 79 | 278.5 KB |
| `.py` | 37 | 190.7 KB |
| `.css` | 3 | 85.5 KB |
| `.ico` | 1 | 25.3 KB |
| `.zip` | 1 | 19.2 KB |
| `.xlsx` | 3 | 18.3 KB |
| `.bak` | 2 | 12.4 KB |
| `.sql` | 1 | 7.6 KB |
| `.mjs` | 3 | 6.7 KB |
| `.csv` | 4 | 3.7 KB |
| `.svg` | 5 | 3.2 KB |
| `[no extension]` | 11 | 1.6 KB |
| `.js` | 1 | 1.5 KB |
| `.html` | 1 | 981.0 B |

## 4. Archive and Backup Candidates

### 4.1 Archives

| File | Size |
|---|---:|
| `archives/releases/innergeodessa-mvp-v0.1.zip` | 19.2 KB |

### 4.2 Backups and Historical Copies

| File | Size |
|---|---:|
| `archives/code-backups/page.before-storage-fix.tsx.bak` | 6.5 KB |
| `archives/code-backups/personality-result-before-profile.tsx.bak` | 6.0 KB |

### 4.3 Regenerable Files

| File | Size |
|---|---:|
| — | None detected |

## 5. Exact Content Duplicates

Estimated duplicated bytes excluding one canonical copy per group: **0.0 B**

No exact duplicate-content groups detected.

## 6. SQLite Database Audit

### Database: `innergeodessa-mvp/backend/innergeodessa.db`

- File size: **2.1 MB**
- Integrity check: **ok**
- Page size: **4096 bytes**
- Page count: **544**
- Freelist pages: **0**
- Estimated internally free space: **0.0 B**
- Foreign-key violations: **0**

#### Tables

| Table | Rows | Columns |
|---|---:|---:|
| `auth_sessions` | 1 | 7 |
| `email_verification_tokens` | 1 | 6 |
| `items` | 72 | 10 |
| `question_bank_items` | 216 | 13 |
| `question_banks` | 4 | 3 |
| `report_entitlements` | 0 | 11 |
| `responses` | 246 | 5 |
| `results` | 9 | 11 |
| `riasec_question_items` | 36 | 9 |
| `riasec_results` | 5 | 7 |
| `riasec_session_question_items` | 1584 | 3 |
| `riasec_session_responses` | 180 | 5 |
| `session_question_items` | 8928 | 3 |
| `session_responses` | 688 | 5 |
| `sessions` | 168 | 11 |
| `users` | 1 | 9 |
| `zodiac_charts` | 0 | 9 |

#### Table Schemas

##### `auth_sessions`

```sql
CREATE TABLE auth_sessions (
  auth_session_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT,
  revoked_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `auth_session_id` | `TEXT` | 0 | `None` | 1 |
| `user_id` | `TEXT` | 1 | `None` | 0 |
| `token_hash` | `TEXT` | 1 | `None` | 0 |
| `created_at` | `TEXT` | 1 | `None` | 0 |
| `expires_at` | `TEXT` | 1 | `None` | 0 |
| `last_seen_at` | `TEXT` | 0 | `None` | 0 |
| `revoked_at` | `TEXT` | 0 | `None` | 0 |

##### `email_verification_tokens`

```sql
CREATE TABLE email_verification_tokens (
  verification_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  consumed_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `verification_id` | `TEXT` | 0 | `None` | 1 |
| `user_id` | `TEXT` | 1 | `None` | 0 |
| `token_hash` | `TEXT` | 1 | `None` | 0 |
| `created_at` | `TEXT` | 1 | `None` | 0 |
| `expires_at` | `TEXT` | 1 | `None` | 0 |
| `consumed_at` | `TEXT` | 0 | `None` | 0 |

##### `items`

```sql
CREATE TABLE items (
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
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `item_id` | `TEXT` | 0 | `None` | 1 |
| `dimension` | `TEXT` | 1 | `None` | 0 |
| `subdimension` | `TEXT` | 1 | `None` | 0 |
| `keyed_pole` | `TEXT` | 1 | `None` | 0 |
| `form` | `TEXT` | 1 | `None` | 0 |
| `wording` | `TEXT` | 1 | `None` | 0 |
| `language` | `TEXT` | 1 | `'en'` | 0 |
| `version` | `TEXT` | 1 | `None` | 0 |
| `status` | `TEXT` | 1 | `'pilot'` | 0 |
| `master_order` | `INTEGER` | 1 | `None` | 0 |

##### `question_bank_items`

```sql
CREATE TABLE question_bank_items (
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
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `item_record_id` | `INTEGER` | 0 | `None` | 1 |
| `question_bank_version` | `TEXT` | 1 | `None` | 0 |
| `source_item_id` | `TEXT` | 1 | `None` | 0 |
| `dimension` | `TEXT` | 1 | `None` | 0 |
| `subdimension` | `TEXT` | 1 | `None` | 0 |
| `keyed_pole` | `TEXT` | 1 | `None` | 0 |
| `form` | `TEXT` | 1 | `None` | 0 |
| `wording` | `TEXT` | 1 | `None` | 0 |
| `language` | `TEXT` | 1 | `'en'` | 0 |
| `version` | `TEXT` | 1 | `None` | 0 |
| `status` | `TEXT` | 1 | `None` | 0 |
| `master_order` | `INTEGER` | 1 | `None` | 0 |
| `reverse_scored` | `INTEGER` | 1 | `None` | 0 |

##### `question_banks`

```sql
CREATE TABLE question_banks (
  question_bank_version TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `question_bank_version` | `TEXT` | 0 | `None` | 1 |
| `status` | `TEXT` | 1 | `None` | 0 |
| `created_at` | `TEXT` | 1 | `CURRENT_TIMESTAMP` | 0 |

##### `report_entitlements`

```sql
CREATE TABLE report_entitlements (
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
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `entitlement_id` | `TEXT` | 0 | `None` | 1 |
| `user_id` | `TEXT` | 1 | `None` | 0 |
| `module` | `TEXT` | 1 | `None` | 0 |
| `resource_id` | `TEXT` | 1 | `None` | 0 |
| `status` | `TEXT` | 1 | `'pending'` | 0 |
| `payment_provider` | `TEXT` | 0 | `None` | 0 |
| `payment_reference` | `TEXT` | 0 | `None` | 0 |
| `created_at` | `TEXT` | 1 | `None` | 0 |
| `updated_at` | `TEXT` | 1 | `None` | 0 |
| `unlocked_at` | `TEXT` | 0 | `None` | 0 |
| `revoked_at` | `TEXT` | 0 | `None` | 0 |

##### `responses`

```sql
CREATE TABLE responses (
  session_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  raw_value INTEGER NOT NULL CHECK (raw_value BETWEEN 1 AND 5),
  response_time_ms INTEGER,
  answered_at TEXT NOT NULL,
  PRIMARY KEY (session_id, item_id),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(item_id)
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 1 | `None` | 1 |
| `item_id` | `TEXT` | 1 | `None` | 2 |
| `raw_value` | `INTEGER` | 1 | `None` | 0 |
| `response_time_ms` | `INTEGER` | 0 | `None` | 0 |
| `answered_at` | `TEXT` | 1 | `None` | 0 |

##### `results`

```sql
CREATE TABLE results (
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
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 0 | `None` | 1 |
| `personality_type` | `TEXT` | 1 | `None` | 0 |
| `ei_score` | `INTEGER` | 1 | `None` | 0 |
| `sn_score` | `INTEGER` | 1 | `None` | 0 |
| `tf_score` | `INTEGER` | 1 | `None` | 0 |
| `jp_score` | `INTEGER` | 1 | `None` | 0 |
| `ei_confidence` | `REAL` | 1 | `None` | 0 |
| `sn_confidence` | `REAL` | 1 | `None` | 0 |
| `tf_confidence` | `REAL` | 1 | `None` | 0 |
| `jp_confidence` | `REAL` | 1 | `None` | 0 |
| `calculated_at` | `TEXT` | 1 | `None` | 0 |

##### `riasec_question_items`

```sql
CREATE TABLE riasec_question_items (
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
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `item_record_id` | `INTEGER` | 0 | `None` | 1 |
| `question_bank_version` | `TEXT` | 1 | `None` | 0 |
| `source_item_id` | `TEXT` | 1 | `None` | 0 |
| `dimension` | `TEXT` | 1 | `None` | 0 |
| `wording` | `TEXT` | 1 | `None` | 0 |
| `language` | `TEXT` | 1 | `'en'` | 0 |
| `version` | `TEXT` | 1 | `None` | 0 |
| `status` | `TEXT` | 1 | `None` | 0 |
| `master_order` | `INTEGER` | 1 | `None` | 0 |

##### `riasec_results`

```sql
CREATE TABLE riasec_results (
  session_id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  scores_json TEXT NOT NULL,
  percentages_json TEXT NOT NULL,
  ranking_json TEXT NOT NULL,
  answered_json TEXT NOT NULL,
  calculated_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 0 | `None` | 1 |
| `code` | `TEXT` | 1 | `None` | 0 |
| `scores_json` | `TEXT` | 1 | `None` | 0 |
| `percentages_json` | `TEXT` | 1 | `None` | 0 |
| `ranking_json` | `TEXT` | 1 | `None` | 0 |
| `answered_json` | `TEXT` | 1 | `None` | 0 |
| `calculated_at` | `TEXT` | 1 | `None` | 0 |

##### `riasec_session_question_items`

```sql
CREATE TABLE riasec_session_question_items (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  display_order INTEGER NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  UNIQUE (session_id, display_order),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES riasec_question_items(item_record_id)
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 1 | `None` | 1 |
| `item_record_id` | `INTEGER` | 1 | `None` | 2 |
| `display_order` | `INTEGER` | 1 | `None` | 0 |

##### `riasec_session_responses`

```sql
CREATE TABLE riasec_session_responses (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  raw_value INTEGER NOT NULL CHECK (raw_value BETWEEN 1 AND 5),
  response_time_ms INTEGER,
  answered_at TEXT NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES riasec_question_items(item_record_id)
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 1 | `None` | 1 |
| `item_record_id` | `INTEGER` | 1 | `None` | 2 |
| `raw_value` | `INTEGER` | 1 | `None` | 0 |
| `response_time_ms` | `INTEGER` | 0 | `None` | 0 |
| `answered_at` | `TEXT` | 1 | `None` | 0 |

##### `session_question_items`

```sql
CREATE TABLE session_question_items (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  display_order INTEGER NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  UNIQUE (session_id, display_order),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES question_bank_items(item_record_id)
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 1 | `None` | 1 |
| `item_record_id` | `INTEGER` | 1 | `None` | 2 |
| `display_order` | `INTEGER` | 1 | `None` | 0 |

##### `session_responses`

```sql
CREATE TABLE session_responses (
  session_id TEXT NOT NULL,
  item_record_id INTEGER NOT NULL,
  raw_value INTEGER NOT NULL CHECK (raw_value BETWEEN 1 AND 5),
  response_time_ms INTEGER,
  answered_at TEXT NOT NULL,
  PRIMARY KEY (session_id, item_record_id),
  FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (item_record_id)
    REFERENCES question_bank_items(item_record_id)
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 1 | `None` | 1 |
| `item_record_id` | `INTEGER` | 1 | `None` | 2 |
| `raw_value` | `INTEGER` | 1 | `None` | 0 |
| `response_time_ms` | `INTEGER` | 0 | `None` | 0 |
| `answered_at` | `TEXT` | 1 | `None` | 0 |

##### `sessions`

```sql
CREATE TABLE sessions (
  session_id TEXT PRIMARY KEY,
  consent INTEGER NOT NULL CHECK (consent IN (0,1)),
  language TEXT NOT NULL DEFAULT 'en',
  started_at TEXT NOT NULL,
  completed_at TEXT,
  status TEXT NOT NULL DEFAULT 'active'
, question_bank_version TEXT, module TEXT NOT NULL DEFAULT 'personality', owner_user_id TEXT
               REFERENCES users(user_id) ON DELETE SET NULL, claim_secret_hash TEXT, claimed_at TEXT)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `session_id` | `TEXT` | 0 | `None` | 1 |
| `consent` | `INTEGER` | 1 | `None` | 0 |
| `language` | `TEXT` | 1 | `'en'` | 0 |
| `started_at` | `TEXT` | 1 | `None` | 0 |
| `completed_at` | `TEXT` | 0 | `None` | 0 |
| `status` | `TEXT` | 1 | `'active'` | 0 |
| `question_bank_version` | `TEXT` | 0 | `None` | 0 |
| `module` | `TEXT` | 1 | `'personality'` | 0 |
| `owner_user_id` | `TEXT` | 0 | `None` | 0 |
| `claim_secret_hash` | `TEXT` | 0 | `None` | 0 |
| `claimed_at` | `TEXT` | 0 | `None` | 0 |

##### `users`

```sql
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  nickname TEXT NOT NULL,
  email_verified_at TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','disabled','deleted')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
, password_hash TEXT)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `user_id` | `TEXT` | 0 | `None` | 1 |
| `email` | `TEXT` | 1 | `None` | 0 |
| `email_normalized` | `TEXT` | 1 | `None` | 0 |
| `nickname` | `TEXT` | 1 | `None` | 0 |
| `email_verified_at` | `TEXT` | 0 | `None` | 0 |
| `status` | `TEXT` | 1 | `'active'` | 0 |
| `created_at` | `TEXT` | 1 | `None` | 0 |
| `updated_at` | `TEXT` | 1 | `None` | 0 |
| `password_hash` | `TEXT` | 0 | `None` | 0 |

##### `zodiac_charts`

```sql
CREATE TABLE zodiac_charts (
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
)
```

| Column | Type | Not null | Default | Primary key |
|---|---|---:|---|---:|
| `chart_id` | `TEXT` | 0 | `None` | 1 |
| `owner_user_id` | `TEXT` | 0 | `None` | 0 |
| `claim_secret_hash` | `TEXT` | 0 | `None` | 0 |
| `result_json` | `TEXT` | 1 | `None` | 0 |
| `schema_version` | `TEXT` | 1 | `None` | 0 |
| `calculated_at` | `TEXT` | 1 | `None` | 0 |
| `created_at` | `TEXT` | 1 | `None` | 0 |
| `updated_at` | `TEXT` | 1 | `None` | 0 |
| `claimed_at` | `TEXT` | 0 | `None` | 0 |

#### Explicit Indexes

| Index | Table | Definition |
|---|---|---|
| `idx_auth_sessions_expires_at` | `auth_sessions` | `CREATE INDEX idx_auth_sessions_expires_at   ON auth_sessions(expires_at)` |
| `idx_auth_sessions_revoked_at` | `auth_sessions` | `CREATE INDEX idx_auth_sessions_revoked_at   ON auth_sessions(revoked_at)` |
| `idx_auth_sessions_user_id` | `auth_sessions` | `CREATE INDEX idx_auth_sessions_user_id   ON auth_sessions(user_id)` |
| `idx_report_entitlements_module_resource` | `report_entitlements` | `CREATE INDEX idx_report_entitlements_module_resource   ON report_entitlements(module, resource_id)` |
| `idx_report_entitlements_status` | `report_entitlements` | `CREATE INDEX idx_report_entitlements_status   ON report_entitlements(status)` |
| `idx_report_entitlements_user_id` | `report_entitlements` | `CREATE INDEX idx_report_entitlements_user_id   ON report_entitlements(user_id)` |

#### Duplicate-Key Checks

| Table | Key columns | Duplicate groups |
|---|---|---:|
| `auth_sessions` | `user_id` | 0 |
| `auth_sessions` | `token_hash` | 0 |
| `email_verification_tokens` | `user_id` | 0 |
| `email_verification_tokens` | `token_hash` | 0 |
| `items` | `item_id` | 0 |
| `report_entitlements` | `user_id` | 0 |
| `report_entitlements` | `entitlement_id` | 0 |
| `responses` | `item_id` | 72 |
| `responses` | `session_id` | 7 |
| `responses` | `session_id, item_id` | 0 |
| `results` | `session_id` | 0 |
| `riasec_results` | `session_id` | 0 |
| `riasec_session_question_items` | `session_id` | 44 |
| `riasec_session_responses` | `session_id` | 5 |
| `session_question_items` | `session_id` | 124 |
| `session_responses` | `session_id` | 16 |
| `sessions` | `session_id` | 0 |
| `users` | `user_id` | 0 |
| `users` | `email_normalized` | 0 |
| `zodiac_charts` | `chart_id` | 0 |

#### Foreign-Key Check Results

- No foreign-key violations detected.

## 7. Mandatory Review Questions

Before any deletion or schema consolidation, confirm:

1. Which files are required runtime assets, source-of-truth files, generated outputs, historical evidence, or disposable cache.
2. Whether `archives/` belongs inside Git, outside the repository, or in a separate release-storage location.
3. Whether the SQLite production/development database should remain inside the source repository.
4. Whether generated personality and RIASEC item JSON files have a single canonical source.
5. Whether migrations repeat full table creation or contain obsolete compatibility layers.
6. Whether old question-bank versions are preserved only where required for historical session snapshots.
7. Whether database indexes match actual lookup and ownership-access patterns.
8. Whether test fixtures duplicate production data unnecessarily.
9. Whether any database table stores the same payload both as normalized columns and duplicated JSON.
10. Whether `VACUUM`, `ANALYZE`, retention rules, and backup policy should be formalized before payment integration.

## 8. Current Safety Decision

This audit performs no deletion, no database mutation, no VACUUM, and no schema migration.

All cleanup actions must be classified into:

- Safe immediate deletion
- Move outside repository
- Git-ignore only
- Database compaction
- Schema consolidation
- Migration refactor
- Preserve for backward compatibility

## 7. Engineering Decision

- SQLite integrity validation passed.
- No foreign-key violations were detected.
- The database contains no freelist pages; `VACUUM` is not currently required.
- No exact duplicate project files were detected.
- Historical personality sessions and their question snapshots must remain intact for versioned result reproducibility.
- `personality-v2.0.0` is registered as the current application question bank.
- The V2 bank contains 72 items: 18 per dimension, with a balanced 9 forward-scored and 9 reverse-scored items per dimension.
- Existing sessions remain attached to the question-bank version with which they were created.
- The absence of V2 sessions in the current database means that no new personality session has yet been created after the V2 activation; it does not indicate a registration failure.
- The legacy `items` compatibility table retains its historical `1.0-pilot` metadata, while versioned question-bank records are maintained in `question_banks` and `question_bank_items`.
- The local `archives/` directory contains historical backups and release artifacts and is intentionally excluded from Git.
- The current idempotent schema initialization remains acceptable for the present development phase.
- Before payment integration and production deployment, introduce an explicit migration ledger and a documented production database backup-and-restore procedure.
