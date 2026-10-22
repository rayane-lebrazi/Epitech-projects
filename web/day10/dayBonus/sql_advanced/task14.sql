UPDATE subscriptions SET name = 'Premium++' WHERE id = (SELECT MAX(id) FROM subscriptions);
