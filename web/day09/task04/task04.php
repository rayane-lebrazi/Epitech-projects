<?php

function whoami(): void
{
    $name = $_POST['name'] ?? '';
    if (!is_string($name)) {
        $name = '';
    }
    $name = trim($name);

    $age = $_POST['age'] ?? null;
    $validAge = is_string($age) ? filter_var($age, FILTER_VALIDATE_INT) : false;
    if ($validAge !== false && $validAge >= 0) {
        if ($name === '') {
            echo "Hi, I have no name and I'm {$validAge} years old.";
        } else {
            echo "Hi, my name is {$name} and I'm {$validAge} years old.";
        }
        return;
    }

    if ($name === '') {
        echo 'Hi, I have no name.';
    } else {
        echo "Hi, my name is {$name}.";
    }
}