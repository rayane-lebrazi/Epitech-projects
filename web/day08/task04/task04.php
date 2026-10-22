<?php

function calc(string $operator, int $nbr1, int $nbr2)
{
    switch ($operator) {
        case '+':
            return $nbr1 + $nbr2;
        case '-':
            return $nbr1 - $nbr2;
        case '*':
            return $nbr1 * $nbr2;
        case '/':
            return $nbr2 === 0 ? 'Cannot divide by 0' : $nbr1 / $nbr2;
        case '%':
            return $nbr2 === 0 ? 'Cannot divide by 0' : $nbr1 % $nbr2;
        default:
            return 'Unknown operator';
    }
}