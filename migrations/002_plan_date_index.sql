-- The hub's retention runner finds expired plan rows by age (plan_date) and
-- deletes them by id; this index covers both halves so the daily sweep does not
-- table-scan. It replaces the client-side `DELETE ... WHERE plan_date < today`
-- the app used to run from every member's browser on every open, which computed
-- "today" from the *device* clock and so could delete the household's current
-- day whenever a member's device was a timezone ahead.
CREATE INDEX IF NOT EXISTS app_family_meals__meal_plan_retention_idx
  ON app_family_meals__meal_plan (plan_date, id);
