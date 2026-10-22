DELETE FROM subscriptions WHERE id IN (SELECT id FROM subscriptions ORDER BY id DESC LIMIT 4);
