<?php
require __DIR__ . '/task_catalog.php';
$groups = task_hub_groups();
foreach ($groups as &$group) {
    $group['tasks'] = task_hub_tasks($group['path']);
}
unset($group);
$total = array_sum(array_map(static fn(array $group): int => count($group['tasks']), $groups));
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Epitech Web Tasks</title>
    <link rel="stylesheet" href="assets/task-list.css">
</head>
<body>
<header class="page-header">
    <h1>Epitech Web Tasks</h1>
    <p><?= (int) $total ?> tasks available</p>
</header>
<main>
    <p class="run-help">Start the website from the project folder with <code>php -S 127.0.0.1:8000</code>, then open <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a>.</p>

    <?php foreach ($groups as $group): ?>
        <section class="day-section" id="<?= task_hub_escape($group['path']) ?>">
            <h2><?= task_hub_escape($group['title']) ?></h2>
            <?php if ($group['tasks']): ?>
                <ul>
                    <?php foreach ($group['tasks'] as $task): ?>
                        <li>
                            <span><?= task_hub_escape(strtoupper($task['name'])) ?></span>
                            <a href="<?= task_hub_escape(task_hub_launch_url($task)) ?>">Open task</a>
                            <?php if ($task['source'] !== ''): ?>
                                <a href="preview.php?path=<?= rawurlencode($task['source']) ?>&amp;mode=code">View code</a>
                            <?php endif; ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php elseif ($group['path'] === 'day0405'): ?>
                <p>Portfolio: <a href="preview.php?path=day0405/index.html">Open portfolio</a> · <a href="preview.php?path=day0405/index.html&amp;mode=code">View HTML</a></p>
            <?php elseif ($group['tone'] === 'empty'): ?>
                <p class="muted">No task files were found in this folder.</p>
            <?php else: ?>
                <p class="muted">No task folders found.</p>
            <?php endif; ?>
        </section>
    <?php endforeach; ?>
</main>
</body>
</html>
