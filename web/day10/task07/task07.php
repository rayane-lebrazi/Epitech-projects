<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
$file = __DIR__ . '/messages.json';
function respond(array $data, int $status = 200): void { http_response_code($status); echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE); exit; }
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode((string)file_get_contents('php://input'), true);
    $name = trim((string)($input['name'] ?? ''));
    $message = trim((string)($input['message'] ?? ''));
    if ($name === '' || $message === '') respond(['error' => 'Name and message are required.'], 400);
    $handle = fopen($file, 'c+');
    if ($handle === false) respond(['error' => 'Could not open message storage.'], 500);
    flock($handle, LOCK_EX);
    $raw = stream_get_contents($handle);
    $messages = json_decode($raw ?: '[]', true);
    if (!is_array($messages)) $messages = [];
    $messages[] = ['name' => substr($name, 0, 240), 'message' => substr($message, 0, 2000), 'sentAt' => gmdate('c')];
    $messages = array_slice($messages, -100);
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($messages, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(['ok' => true]);
}
$messages = json_decode((string)file_get_contents($file), true);
respond(['messages' => is_array($messages) ? $messages : []]);
