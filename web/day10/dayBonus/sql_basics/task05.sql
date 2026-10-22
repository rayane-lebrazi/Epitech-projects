SELECT m.title FROM movies AS m JOIN genres AS g ON g.id = m.genre_id WHERE LOWER(g.name) IN ('action', 'romance') ORDER BY m.title;
