SELECT
  id,
  name,
  tags,
  use_count,
  created_at
FROM favorites
WHERE household_id = current_setting('app.household_id', true)::uuid
ORDER BY use_count DESC, name
LIMIT 100
