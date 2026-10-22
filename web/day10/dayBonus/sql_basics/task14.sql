SELECT title AS "Title of the longest movie" FROM movies WHERE min_duration IS NOT NULL ORDER BY min_duration DESC LIMIT 1;
