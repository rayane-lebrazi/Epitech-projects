SELECT COUNT(*) AS "Number of movies", prod_year AS "Year of production" FROM movies WHERE prod_year IS NOT NULL AND prod_year <> 0 GROUP BY prod_year ORDER BY prod_year DESC;
