<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
$name = trim((string)($_GET['name'] ?? ''));
echo json_encode(['name' => $name], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
