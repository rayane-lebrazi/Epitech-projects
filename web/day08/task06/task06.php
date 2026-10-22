<?php

function sequence(int $n): void
{
    if ($n < 0) {
        return;
    }

    $term = '1';

    for ($iteration = 0; $iteration <= $n; $iteration++) {
        echo $term . PHP_EOL;

        $next = '';
        $length = strlen($term);
        $index = 0;

        while ($index < $length) {
            $digit = $term[$index];
            $count = 1;
            $index++;

            while ($index < $length && $term[$index] === $digit) {
                $count++;
                $index++;
            }

            $next .= $count . $digit;
        }

        $term = $next;
    }
}