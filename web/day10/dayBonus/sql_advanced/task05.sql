SELECT REPLACE(email, 'machin.com', 'epitech.eu') AS "New email addresses" FROM profiles WHERE email IS NOT NULL ORDER BY "New email addresses" DESC;
