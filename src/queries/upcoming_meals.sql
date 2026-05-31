SELECT
  id,
  plan_date,
  slot,
  meal_name,
  recipe_id,
  assigned_to,
  notes,
  created_at
FROM meal_plan
WHERE household_id = current_setting('app.household_id', true)::uuid
  AND plan_date    >= CURRENT_DATE::text
ORDER BY plan_date, slot
LIMIT 100
