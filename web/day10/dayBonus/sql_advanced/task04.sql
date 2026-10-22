SELECT SUBSTR(summary, 1, 92) AS "Summaries" FROM movies WHERE id BETWEEN 42 AND 84 AND id % 2 = 1;
