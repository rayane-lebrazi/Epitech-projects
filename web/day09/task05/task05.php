<?php

function form_is_submitted(): bool
{
    return ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST';
}

function whoami(): void
{
    $name = $_POST['name'] ?? '';
    if (!is_string($name)) {
        $name = '';
    }
    $name = trim($name);

    $age = $_POST['age'] ?? null;
    $validAge = is_string($age) ? filter_var($age, FILTER_VALIDATE_INT) : false;
    $hasAge = $validAge !== false && $validAge >= 0;

    if ($hasAge && $name !== '') {
        $sentence = "Hi, my name is {$name} and I'm {$validAge} years old.";
    } elseif ($hasAge) {
        $sentence = "Hi, I have no name and I'm {$validAge} years old.";
    } elseif ($name !== '') {
        $sentence = "Hi, my name is {$name}.";
    } else {
        $sentence = 'Hi, I have no name.';
    }

    $curricula = [
        'pge' => 'PGE (Programme Grande Ecole)',
        'bachelor' => 'Bachelor',
        'msc' => 'MSc Pro',
        'coding' => 'Coding Academy',
        'wac' => 'Web@cademie',
    ];
    $curriculum = $_POST['curriculum'] ?? '';
    if (is_string($curriculum) && isset($curricula[$curriculum])) {
        $sentence .= ' I\'m a student of ' . $curricula[$curriculum] . '.';
    }

    echo $sentence;
}