SELECT title AS "Movie title", CAST(JULIANDAY('now') - JULIANDAY(release_date) AS INTEGER) AS "Number of days passed" FROM movies WHERE release_date IS NOT NULL;
