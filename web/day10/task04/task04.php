<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
function respond(array $data, int $status = 200): void { http_response_code($status); echo json_encode($data, JSON_UNESCAPED_UNICODE); exit; }
function validateTypeSyntax(string $type): ?string {
    $length = strlen($type);
    if ($length === 0) return 'No types sent yet!';
    if ($length < 3) return "$type: this type does not have enough characters.";
    if ($length > 10) return "$type: this type has too many characters.";
    if (!preg_match('/^[a-z-]+$/i', $type)) return "$type: this type has non-alphabetical characters (different from '-').";
    return null;
}
function validateBrandSyntax(string $brand): ?string {
    $length = strlen($brand);
    if ($length === 0) return 'No brands sent yet!';
    if ($length < 2) return "$brand: this brand does not have enough characters.";
    if ($length > 20) return "$brand: this brand has too many characters.";
    if (!preg_match('/^[a-z0-9&-]+$/i', $brand)) return "$brand: this brand has invalid characters.";
    return null;
}
$type = trim((string)($_GET['type'] ?? ''));
$brand = trim((string)($_GET['brand'] ?? ''));
$typeError = validateTypeSyntax($type);
$brandError = validateBrandSyntax($brand);
$messages = ['type' => $typeError ?? "$type: this type exists in databases.", 'brand' => $brandError ?? "$brand: this brand is valid for the type $type."];
if ($typeError !== null || $brandError !== null) respond(['valid' => false, 'messages' => $messages]);
try {
    $db = new PDO('sqlite:' . __DIR__ . '/ajax_products.db', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $typeQuery = $db->prepare('SELECT 1 FROM products WHERE LOWER(type) = LOWER(:type) LIMIT 1');
    $typeQuery->execute([':type' => $type]);
    if (!$typeQuery->fetchColumn()) {
        $messages['type'] = "$type: this type doesn't exist in our shop.";
        $messages['brand'] = 'Enter an existing type to validate this brand.';
        respond(['valid' => false, 'messages' => $messages]);
    }
    $brandQuery = $db->prepare('SELECT 1 FROM products WHERE LOWER(type) = LOWER(:type) AND LOWER(brand) = LOWER(:brand) LIMIT 1');
    $brandQuery->execute([':type' => $type, ':brand' => $brand]);
    if ($brandQuery->fetchColumn()) {
        $messages['brand'] = "$brand: this brand already exists in databases.";
        respond(['valid' => false, 'messages' => $messages]);
    }
    respond(['valid' => true, 'messages' => $messages]);
} catch (Throwable $error) {
    respond(['valid' => false, 'messages' => ['type' => 'Database error.', 'brand' => 'Database error.']], 500);
}
