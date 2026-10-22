<?php

function calc_average(array $numbers): float
{
    if ($numbers === []) {
        return 0.0;
    }

    return round(array_sum($numbers) / count($numbers), 1);
}