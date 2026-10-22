SELECT zipcode AS "Zipcodes" FROM profiles WHERE zipcode IS NOT NULL AND TRIM(zipcode) <> '' GROUP BY zipcode HAVING COUNT(*) > 1 ORDER BY zipcode ASC;
