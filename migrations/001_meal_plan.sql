CREATE TABLE IF NOT EXISTS meal_plan (
  household_id UUID NOT NULL DEFAULT current_setting('app.household_id', true)::uuid,
  id           TEXT NOT NULL,
  plan_date    TEXT NOT NULL,
  slot         TEXT NOT NULL,
  meal_name    TEXT NOT NULL,
  recipe_id    TEXT,
  assigned_to  TEXT,
  notes        TEXT NOT NULL DEFAULT '',
  created_at   TEXT NOT NULL,
  PRIMARY KEY (household_id, id)
);
