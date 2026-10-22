SELECT UPPER(SUBSTR(lastname, 1, 1)) || LOWER(SUBSTR(lastname, 2)) || '-' || UPPER(SUBSTR(firstname, 1, 1)) || LOWER(SUBSTR(firstname, 2)) AS "Fullname" FROM profiles ORDER BY birthdate DESC;
