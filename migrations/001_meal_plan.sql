CREATE TABLE IF NOT EXISTS app_family_meals__meal_plan (
  id           TEXT NOT NULL,
  plan_date    TEXT NOT NULL,
  slot         TEXT NOT NULL,
  meal_name    TEXT NOT NULL,
  recipe_id    TEXT,
  assigned_to  TEXT,
  notes        TEXT NOT NULL DEFAULT '',
  created_at   TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS app_family_meals__favorites (
  id           TEXT NOT NULL,
  name         TEXT NOT NULL,
  tags         TEXT NOT NULL DEFAULT '[]',
  use_count    INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL,
  PRIMARY KEY (id)
);
