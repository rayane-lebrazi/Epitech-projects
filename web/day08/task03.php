<?php

function get_shortest(array $strings): string
{
    if ($strings === []) {
        return "";
    }

    $shortest = $strings[0];

    foreach ($strings as $string) {
        if (strlen($string) < strlen($shortest)) {
            $shortest = $string;
        }
    }

    return $shortest;
}
?>
