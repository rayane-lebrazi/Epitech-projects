<?php
function task_hub_escape(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function task_hub_find_folders(string $base, int $depth = 0): array {
    if (!is_dir($base) || $depth > 4) return [];
    $found = []; $entries = scandir($base); if ($entries === false) return [];
    foreach ($entries as $entry) {
        if ($entry === '.' || $entry === '..' || str_starts_with($entry, '.')) continue;
        $path = $base . DIRECTORY_SEPARATOR . $entry; if (!is_dir($path)) continue;
        if (preg_match('/^task\d+$/i', $entry)) $found[] = $path;
        else $found = array_merge($found, task_hub_find_folders($path, $depth + 1));
    }
    return $found;
}
function task_hub_relative(string $path): string {
    $root = realpath(__DIR__); $full = realpath($path);
    if ($root === false || $full === false || !str_starts_with($full, $root . DIRECTORY_SEPARATOR)) return '';
    return str_replace(DIRECTORY_SEPARATOR, '/', substr($full, strlen($root) + 1));
}
function task_hub_candidate(string $folder, string $taskName): ?string {
    $candidates = ['index.php','index.html','index.htm',$taskName.'.html',$taskName.'.htm',$taskName.'.php',$taskName.'.mjs',$taskName.'.js',$taskName.'.sh',$taskName.'.sql'];
    foreach ($candidates as $candidate) { $path=$folder.DIRECTORY_SEPARATOR.$candidate; if (is_file($path) && filesize($path)>0) return $path; }
    foreach (glob($folder.DIRECTORY_SEPARATOR.$taskName.'.*') ?: [] as $path) if (is_file($path) && filesize($path)>0) return $path;
    foreach (glob($folder.DIRECTORY_SEPARATOR.'*') ?: [] as $path) if (is_file($path) && filesize($path)>0) return $path;
    return null;
}
function task_hub_groups(): array {
    return [
        ['title'=>'Day 01 · Shell','path'=>'day01','tone'=>'shell'],['title'=>'Day 02 · HTML & CSS','path'=>'day02','tone'=>'web'],['title'=>'Day 03','path'=>'day03','tone'=>'empty'],['title'=>'Days 04–05 · Portfolio','path'=>'day0405','tone'=>'web'],['title'=>'Day 06 · JavaScript','path'=>'day06','tone'=>'javascript'],['title'=>'Day 07 · DOM','path'=>'day07','tone'=>'javascript'],['title'=>'Day 08 · PHP Basics','path'=>'day08','tone'=>'php'],['title'=>'Day 09 · PHP for Web','path'=>'day09','tone'=>'php'],['title'=>'Day 10 · AJAX','path'=>'day10','tone'=>'php'],['title'=>'Bonus · JavaScript','path'=>'day10/dayBonus/javascript','tone'=>'javascript'],['title'=>'Bonus · SQL Basics','path'=>'day10/dayBonus/sql_basics','tone'=>'sql'],['title'=>'Bonus · SQL Advanced','path'=>'day10/dayBonus/sql_advanced','tone'=>'sql'],
    ];
}
function task_hub_tasks(string $relativeGroup): array {
    $base=__DIR__.DIRECTORY_SEPARATOR.str_replace('/',DIRECTORY_SEPARATOR,$relativeGroup); $tasks=[];
    foreach (task_hub_find_folders($base) as $folder) {
        $relativeFolder=task_hub_relative($folder);
        if ($relativeGroup==='day10' && str_starts_with($relativeFolder,'day10/dayBonus/')) continue;
        $name=basename($folder); $rel=$relativeFolder; $candidate=task_hub_candidate($folder,$name); $source=$candidate?task_hub_relative($candidate):''; $kind=$candidate?strtolower(pathinfo($candidate,PATHINFO_EXTENSION)):''; $special='';
        if ($relativeGroup==='day01') { $special='shell-'.$name; $kind='shell-demo'; }
        elseif (str_starts_with($relativeGroup,'day06') && $kind==='mjs') { $special='module-'.$name; $kind='module-demo'; }
        elseif ($relativeGroup==='day07' && in_array($name,['task08','task09','task10','task11'],true)) { $special='dom-'.$name; $kind='dom-demo'; }
        elseif (str_starts_with($relativeGroup,'day10/dayBonus/sql_') && $kind==='sql') { $special='sql-'.(str_contains($relativeGroup,'advanced')?'advanced':'basics').'-'.substr($name,4); $kind='sql-demo'; }
        $tasks[]=['name'=>$name,'folder'=>$rel,'source'=>$source,'kind'=>$kind,'special'=>$special];
    }
    usort($tasks,static fn(array $a,array $b):int=>strnatcasecmp($a['name'],$b['name'])); return $tasks;
}
function task_hub_launch_url(array $task): string {
    if (str_starts_with($task['special'],'sql-')) return 'sql-runner.php?id='.rawurlencode(substr($task['special'],4));
    if ($task['special']!=='') return 'task-runner.php?id='.rawurlencode($task['special']);
    if ($task['source']!=='') return 'preview.php?path='.rawurlencode($task['source']);
    return 'preview.php?path='.rawurlencode($task['folder']);
}