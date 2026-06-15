SELECT
  id,
  name,
  tags,
  use_count,
  created_at
FROM app_family_meals__favorites
ORDER BY use_count DESC, name
LIMIT 100
