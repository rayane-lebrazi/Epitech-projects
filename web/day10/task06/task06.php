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
$priceText = trim((string)($_GET['price'] ?? ''));
$stockText = trim((string)($_GET['number'] ?? ''));
if (($error = validateTypeSyntax($type)) !== null) respond(['error' => $error], 400);
if (($error = validateBrandSyntax($brand)) !== null) respond(['error' => $error], 400);
if ($priceText === '' || !ctype_digit($priceText)) respond(['error' => 'Price must be a non-negative whole number.'], 400);
if ($stockText === '' || !ctype_digit($stockText)) respond(['error' => 'Stock must be a non-negative whole number.'], 400);
try {
    $db = new PDO('sqlite:' . __DIR__ . '/ajax_products.db', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $typeCheck = $db->prepare('SELECT 1 FROM products WHERE LOWER(type) = LOWER(:type) LIMIT 1');
    $typeCheck->execute([':type' => $type]);
    if (!$typeCheck->fetchColumn()) respond(['error' => "$type: this type doesn't exist in our shop."], 400);
    $find = $db->prepare('SELECT id FROM products WHERE LOWER(type) = LOWER(:type) AND LOWER(brand) = LOWER(:brand) LIMIT 1');
    $find->execute([':type' => $type, ':brand' => $brand]);
    $id = $find->fetchColumn();
    if ($id !== false) {
        $save = $db->prepare('UPDATE products SET price = :price, stock = :stock WHERE id = :id');
        $save->execute([':price' => (int)$priceText, ':stock' => (int)$stockText, ':id' => $id]);
        $action = 'updated';
    } else {
        $save = $db->prepare('INSERT INTO products (type, brand, price, stock) VALUES (:type, :brand, :price, :stock)');
        $save->execute([':type' => strtolower($type), ':brand' => strtolower($brand), ':price' => (int)$priceText, ':stock' => (int)$stockText]);
        $id = $db->lastInsertId();
        $action = 'added';
    }
    $get = $db->prepare('SELECT type, brand, price, stock FROM products WHERE id = :id');
    $get->execute([':id' => $id]);
    respond(['action' => $action, 'product' => $get->fetch(PDO::FETCH_ASSOC)]);
} catch (Throwable $error) {
    respond(['error' => 'Database error.'], 500);
}
