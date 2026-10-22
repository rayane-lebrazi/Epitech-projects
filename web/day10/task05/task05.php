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
$price = trim((string)($_GET['price'] ?? ''));
$numberText = trim((string)($_GET['number'] ?? ''));
if (($error = validateTypeSyntax($type)) !== null) respond(['error' => 'Error($type): ' . str_replace($type . ': ', '', $error)], 400);
if (($error = validateBrandSyntax($brand)) !== null) respond(['error' => 'Error($brand): ' . str_replace($brand . ': ', '', $error)], 400);
if (strlen($price) < 2) respond(['error' => 'Error($price): this price does not have enough characters.'], 400);
if (strlen($price) > 5) respond(['error' => 'Error($price): this price has too many characters.'], 400);
if (!preg_match('/^[><=][0-9]{1,4}$/', $price)) respond(['error' => 'Error($price): we cannot define a price - string invalid.'], 400);
if ($numberText === '' || !ctype_digit($numberText) || (int)$numberText <= 0) respond(['error' => 'Error($number): not a positive number.'], 400);
$number = (int)$numberText;
$operator = $price[0];
$amount = (int)substr($price, 1);
try {
    $db = new PDO('sqlite:' . __DIR__ . '/ajax_products.db', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $typeQuery = $db->prepare('SELECT 1 FROM products WHERE LOWER(type) = LOWER(:type) LIMIT 1');
    $typeQuery->execute([':type' => $type]);
    if (!$typeQuery->fetchColumn()) respond(['error' => 'Error($type): this type does not exist in our shop.'], 400);
    $productQuery = $db->prepare('SELECT type, brand, price, stock FROM products WHERE LOWER(type) = LOWER(:type) AND LOWER(brand) = LOWER(:brand)');
    $productQuery->execute([':type' => $type, ':brand' => $brand]);
    $matchingBrand = $productQuery->fetchAll(PDO::FETCH_ASSOC);
    if (!$matchingBrand) respond(['error' => 'Error($brand): this brand does not exist in our database.'], 400);
    $priceMatches = array_values(array_filter($matchingBrand, static function (array $row) use ($operator, $amount): bool {
        switch ($operator) {
            case '>': return (int)$row['price'] > $amount;
            case '<': return (int)$row['price'] < $amount;
            case '=': return (int)$row['price'] === $amount;
        }
        return false;
    }));
    if (!$priceMatches) respond(['error' => 'Error($price): no products found at this price.'], 400);
    $product = $priceMatches[0];
    if ($number > (int)$product['stock']) respond(['error' => 'Error($number): sorry, we do not have enough stock, we only have ' . (int)$product['stock'] . ' in stock.'], 400);
    $product['number'] = $number;
    respond(['products' => [$product]]);
} catch (Throwable $error) {
    respond(['error' => 'Database error.'], 500);
}
