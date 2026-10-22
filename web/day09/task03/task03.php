<?php
function dynamic_body(): string
{
    $page = $_GET['page'] ?? '';
    if (!is_string($page) || !in_array($page, ['home', 'php', 'sql'], true)) {
        return '<p>Unknown page</p>';
    }

    $file = __DIR__ . '/' . $page . '.html';
    if (!is_file($file)) {
        return '<p>Unknown page</p>';
    }

    return file_get_contents($file);
}
?>