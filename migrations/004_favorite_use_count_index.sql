-- meal_favorites orders by use_count DESC, name ASC under LIMIT 100. The index
-- declares the SAME mixed directions: a single-direction index can be walked
-- backwards for an all-DESC ordering, but not for a mixed one.
-- `name` is encrypted at rest, so it sorts as ciphertext — that is unchanged by
-- this index, which only removes the scan and the sort of the whole table.
CREATE INDEX IF NOT EXISTS app_family_meals__favorites_use_count_idx
  ON app_family_meals__favorites(use_count DESC, name ASC);
