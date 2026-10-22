<?php
require __DIR__ . '/task_catalog.php';
$requested = isset($_GET['path']) && is_string($_GET['path']) ? str_replace('\\', '/', $_GET['path']) : '';
$requested = ltrim($requested, '/');
$path = realpath(__DIR__ . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $requested));
$root = realpath(__DIR__);
if ($requested === '' || $path === false || $root === false || !str_starts_with($path, $root . DIRECTORY_SEPARATOR) || !is_file($path)) {
    http_response_code(404);
    $relative = '';
    $title = 'Task not found';
    $mode = 'code';
    $content = 'This task file could not be found.';
} else {
    $relative = task_hub_relative($path);
    $title = basename(dirname($path)) . ' / ' . basename($path);
    $mode = ($_GET['mode'] ?? '') === 'code' ? 'code' : 'preview';
    $content = (string)file_get_contents($path);
}
$direct = $relative !== '' ? '/' . implode('/', array_map('rawurlencode', explode('/', $relative))) : '#';
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title><?= task_hub_escape($title) ?> · Bootcamp Lab</title><link rel="stylesheet" href="assets/task-hub.css"></head><body><main class="shell preview-shell"><header class="preview-head"><a class="back-link" href="index.php">← ALL TASKS</a><span class="preview-title"><?= task_hub_escape($title) ?></span><a class="source-link" href="<?= task_hub_escape($direct) ?>" target="_blank" rel="noopener">Open directly ↗</a></header>
<?php if($mode==='code'): ?><pre class="code-panel"><code><?= task_hub_escape($content) ?></code></pre><?php else: ?><iframe class="preview-frame" src="<?= task_hub_escape($direct) ?>" title="<?= task_hub_escape($title) ?>" loading="eager"></iframe><?php endif; ?></main></body></html>