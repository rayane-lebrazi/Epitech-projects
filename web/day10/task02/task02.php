<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
$email = trim((string)($_POST['email'] ?? ''));
$valid = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
if (!$valid) {
    http_response_code(400);
}
echo json_encode([
    'valid' => $valid,
    'message' => $valid ? 'This email address is valid.' : 'This email address is not valid.'
], JSON_UNESCAPED_UNICODE);
