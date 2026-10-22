<?php
function render_body(string $page): string
{
    $allowedPages = ['home', 'php', 'sql'];
    if (!in_array($page, $allowedPages, true)) {
        return '<p>Unknown page</p>';
    }

    $file = __DIR__ . '/' . $page . '.html';
    if (!is_file($file)) {
        return '<p>Unknown page</p>';
    }

    return file_get_contents($file);
}
?>