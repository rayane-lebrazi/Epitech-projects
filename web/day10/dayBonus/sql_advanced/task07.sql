SELECT title AS "Movie title" FROM movies WHERE UPPER(SUBSTR(title, 1, 1)) BETWEEN 'O' AND 'T' ORDER BY title ASC;
