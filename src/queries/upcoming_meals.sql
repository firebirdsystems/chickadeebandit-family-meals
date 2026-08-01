SELECT
  id,
  plan_date,
  slot,
  meal_name,
  recipe_id,
  assigned_to,
  notes,
  created_at
FROM app_family_meals__meal_plan
WHERE plan_date    >= :today
ORDER BY plan_date, slot
LIMIT 100
