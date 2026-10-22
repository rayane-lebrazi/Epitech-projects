<?php

function display_menu(): string
{
    return '<ul>' . PHP_EOL
        . '<li><a href="home.php">Home</a></li>' . PHP_EOL
        . '<li><a href="product.php">Products</a></li>' . PHP_EOL
        . '<li><a href="about.php">About Us</a></li>' . PHP_EOL
        . '<li><a href="contact.php">Contact</a></li>' . PHP_EOL
        . '</ul>';
}