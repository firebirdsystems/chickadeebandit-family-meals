-- Automations fill a slot on the meal plan
-- (manifest.automation_actions.plan_meal).
--
-- `source_event_id` records which app event produced the row. The dispatcher's
-- dedupe guard reads it before running an action (SELECT 1 ... WHERE
-- source_event_id = ? LIMIT 1), so one event can never be applied twice --
-- neither by a retry nor by two rules pointed at the same trigger.
--
-- Nullable on purpose: every meal the app's own planner writes leaves it NULL.
--
-- The action deliberately does NOT set assigned_to: an optional `member` param
-- is unusable (an unmapped one resolves to "" and fails the roster check), so
-- an automated meal lands unassigned and a person picks the cook, exactly as
-- chore-tracker's add_chore does.
ALTER TABLE app_family_meals__meal_plan ADD COLUMN source_event_id TEXT;

CREATE INDEX IF NOT EXISTS app_family_meals__meal_plan_source_event_idx
  ON app_family_meals__meal_plan (source_event_id);
