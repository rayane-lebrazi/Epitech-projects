<?php
require __DIR__ . '/task_catalog.php';
$id = isset($_GET['id']) && is_string($_GET['id']) ? $_GET['id'] : '';
$title = 'Task runner'; $kind = ''; $source = ''; $moduleUrl = ''; $message = '';
if (preg_match('/^shell-(task\d{2})$/', $id, $m)) {
    $task = $m[1]; $kind = 'shell'; $title = 'Day 01 · ' . strtoupper($task) . ' · Shell demo';
    $dir = __DIR__ . '/day01/' . $task;
    $files = array_values(array_filter(glob($dir . '/*') ?: [], 'is_file'));
    $source = $files ? task_hub_relative($files[0]) : '';
    $description = [
        'task01'=>'Read the task file and display its contents.', 'task02'=>'Show the command stored in the task file.', 'task03'=>'Explore a directory listing.', 'task04'=>'Create a file in a temporary workspace.', 'task05'=>'Write text to a file in a temporary workspace.', 'task06'=>'Create nested folders in a temporary workspace.', 'task07'=>'Search sample text for matching lines.', 'task08'=>'Replace a misspelled module name in sample JavaScript.', 'task09'=>'Check whether the current path is the home path.', 'task10'=>'Filter error lines and show the first five.', 'task11'=>'Append one line to sample Markdown files.', 'task12'=>'Create a numbered directory tree in memory.'
    ];
    $message = $description[$task] ?? 'Run a safe browser demo of the shell exercise.';
} elseif (preg_match('/^module-(task\d{2})$/', $id, $m)) {
    $task = $m[1]; $kind = 'module'; $title = 'Day 06 · ' . strtoupper($task) . ' · JavaScript runner';
    $candidate = __DIR__ . '/day06/' . $task . '/' . $task . '.mjs';
    if (is_file($candidate)) { $source = task_hub_relative($candidate); $moduleUrl = 'module-source.php?id=' . rawurlencode($task); }
    else { http_response_code(404); $message='JavaScript module not found.'; }
    $message = $message ?: 'This runs the task module itself in your browser.';
} elseif (preg_match('/^dom-(task(?:08|09|10|11))$/', $id, $m)) {
    $task = $m[1]; $kind = 'dom'; $title = 'Day 07 · ' . strtoupper($task) . ' · DOM demo';
    $dir = __DIR__ . '/day07/' . $task;
    $scripts = glob($dir . '/*.js') ?: [];
    $source = $scripts ? task_hub_relative($scripts[0]) : '';
    $message = 'A small preview page loads the original task JavaScript against its expected HTML elements.';
} else {
    http_response_code(404); $message='Unknown task runner.';
}
function field(string $label,string $name,string $value,string $type='text',bool $wide=false): void {
    echo '<label'.($wide?' class="wide"':'').'>'.task_hub_escape($label).'<input type="'.task_hub_escape($type).'" name="'.task_hub_escape($name).'" value="'.task_hub_escape($value).'"></label>';
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title><?= task_hub_escape($title) ?> · Bootcamp Lab</title><link rel="stylesheet" href="assets/task-hub.css"><script src="assets/task-runner.js" defer></script></head><body><main class="shell"><header class="preview-head"><a class="back-link" href="index.php">← ALL TASKS</a><span class="preview-title"><?= task_hub_escape($id) ?></span></header><section class="runner-panel"><div class="eyebrow">INTERACTIVE TASK</div><h1><?= task_hub_escape($title) ?></h1><p><?= task_hub_escape($message) ?></p>
<?php if($kind==='shell'): ?><p class="hint">Shell exercises run as browser-safe demos. They use sample inputs and do not change files in your project.</p><form id="shell-form" class="runner-form" data-task="<?= task_hub_escape($task) ?>">
<?php if($task==='task07'): ?><label>Search pattern<input name="pattern" value="error" required></label><label class="wide">Sample text<textarea name="sample">INFO starting up
ERROR could not connect
warning: retrying
Error: timeout</textarea></label><?php endif; ?>
<?php if($task==='task08'): ?><label class="wide">JavaScript sample<textarea name="sample">import myMoule from './myMoule.js';
const myMouleName = 'myMoule';</textarea></label><?php endif; ?>
<?php if($task==='task09'): ?><label>Current path<input name="path" value="/home/rayane"></label><label>Home path<input name="home" value="/home/rayane"></label><?php endif; ?>
<?php if($task==='task10'): ?><label class="wide">Log text<textarea name="sample">INFO booting
ERROR missing config
error: connection refused
INFO retrying
ERROR timeout
ERROR final failure
ERROR ignored after five</textarea></label><?php endif; ?>
<?php if($task==='task11'): ?><label class="wide">Markdown files (one file name per line)<textarea name="sample">notes.md
readme.md</textarea></label><?php endif; ?>
<?php if($task==='task12'): ?><?php field('Number of task folders','count','4','number'); ?><?php field('Day number','day','8','number'); ?><?php endif; ?>
<button class="run-button wide" type="submit">Run demo</button></form><pre id="output" class="output-box" aria-live="polite">Choose Run demo to see the result.</pre>
<?php elseif($kind==='module'): ?><form id="module-form" class="runner-form" data-module="<?= task_hub_escape($moduleUrl) ?>" data-task="<?= task_hub_escape($task) ?>">
<?php if($task==='task00'): ?><?php field('Name','name','Rayane','text',true); ?><?php endif; ?>
<?php if($task==='task01'): ?><?php field('Triangle height','height','5','number',true); ?><?php endif; ?>
<?php if($task==='task02'): ?><label class="wide">First array (JSON)<textarea name="first">[1, 2, 3]</textarea></label><label class="wide">Second array (JSON)<textarea name="second">[1, 2, 3]</textarea></label><?php endif; ?>
<?php if($task==='task03'): ?><?php field('Text','text','Goggles','text',true); ?><?php endif; ?>
<?php if($task==='task04'): ?><?php field('Count up to','number','20','number',true); ?><?php endif; ?>
<?php if($task==='task05'): ?><?php field('Start','start','1','number'); ?><?php field('End','end','10','number'); ?><?php field('Step (optional)','step','2','number'); ?><?php endif; ?>
<?php if($task==='task06'): ?><label class="wide">Array (JSON)<textarea name="array">[1,2,3,4,5,6,7,8,9]</textarea></label><?php field('Keep multiples of','divisor','3','number'); ?><?php endif; ?>
<?php if($task==='task07'): ?><label>First object (JSON)<textarea name="first">{"here":{"is":"an"},"object":2}</textarea></label><label>Second object (JSON)<textarea name="second">{"here":{"is":"an"},"object":2}</textarea></label><?php endif; ?>
<button class="run-button wide" type="submit">Run task module</button></form><pre id="output" class="output-box" aria-live="polite">Enter values and run the original JavaScript function.</pre>
<?php elseif($kind==='dom'): ?><div class="dom-playground" data-task="<?= task_hub_escape($task) ?>">
<?php if($task==='task08'): ?><p><a href="#">Normal link</a> · <a href="#" target="_blank">New tab link</a></p><p>The original task dims links that stay in this tab.</p>
<?php elseif($task==='task09'): ?><button type="button">Hide paragraphs</button><p>First paragraph</p><p>Second paragraph</p>
<?php elseif($task==='task10'): ?><label>Add an item <input id="listItem" value="Try me"></label><button type="button">Add item</button>
<?php elseif($task==='task11'): ?><p>Move over this paragraph to color it blue. Click to highlight it.</p><p>Try this paragraph too.</p>
<?php endif; ?></div><script src="/<?= task_hub_escape($source) ?>" defer></script>
<?php endif; ?>
<?php if($source): ?><div class="source-row"><a href="preview.php?path=<?= rawurlencode($source) ?>&mode=code">View source code</a></div><?php endif; ?></section></main></body></html>