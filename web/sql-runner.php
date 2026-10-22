<?php
require __DIR__ . '/task_catalog.php';
$id = isset($_GET['id']) && is_string($_GET['id']) ? $_GET['id'] : '';
if (!preg_match('/^(basics|advanced)-(\d{2})$/', $id, $match)) { http_response_code(404); exit('Unknown SQL task.'); }
$level=$match[1]; $number=(int)$match[2]; $folder=__DIR__.'/day10/dayBonus/sql_'.$level; $sqlPath=sprintf('%s/task%02d.sql',$folder,$number); $dbPath=$folder.'/movies.db';
if (!is_file($sqlPath) || !is_file($dbPath)) { http_response_code(404); exit('SQL task files not found.'); }
$title='Bonus SQL '.ucfirst($level).' · Task '.sprintf('%02d',$number); $error=''; $rows=[]; $columns=[]; $message=''; $download=($_GET['download']??'')==='csv';
if (!in_array('sqlite',PDO::getAvailableDrivers(),true)) { $error='PHP SQLite support is missing. On Ubuntu, install it with: sudo apt install php-sqlite3'; }
else {
    $tmpDir=sys_get_temp_dir().DIRECTORY_SEPARATOR.'bootcamp-sql-'.bin2hex(random_bytes(8));
    if (!mkdir($tmpDir,0700,true) || !copy($dbPath,$tmpDir.'/movies.db')) { $error='Could not prepare a temporary database copy.'; }
    else {
        try {
            $pdo=new PDO('sqlite:'.$tmpDir.'/movies.db',null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
            if ($level==='advanced' && $number===19) {
                $csvPath=$folder.'/jobs.csv'; $handle=fopen($csvPath,'r'); if ($handle===false) throw new RuntimeException('jobs.csv is missing.');
                $pdo->exec('DROP TABLE IF EXISTS jobs'); $pdo->exec('CREATE TABLE jobs (c1 TEXT, c2 TEXT, c3 TEXT, c4 TEXT)');
                $insert=$pdo->prepare('INSERT INTO jobs (c1,c2,c3,c4) VALUES (?,?,?,?)'); $count=0;
                while (($data=fgetcsv($handle))!==false) { $data=array_pad(array_slice($data,0,4),4,null); $insert->execute($data); $count++; }
                fclose($handle); $message="Imported {$count} CSV rows into a temporary jobs table. The original database is unchanged.";
            } elseif ($level==='advanced' && $number===20) {
                if ($download) {
                    $stmt=$pdo->query('SELECT * FROM movies'); header('Content-Type: text/csv; charset=utf-8'); header('Content-Disposition: attachment; filename="movies.csv"');
                    $out=fopen('php://output','w'); fputcsv($out,array_keys($stmt->fetch(PDO::FETCH_ASSOC) ?: []));
                    $stmt->execute(); while(($row=$stmt->fetch(PDO::FETCH_NUM))!==false) fputcsv($out,$row); fclose($out);
                    $pdo=null; @unlink($tmpDir.'/movies.db'); @rmdir($tmpDir); exit;
                }
                $message='This task exports the movies table as CSV. Use the download button to create the file from a temporary database copy.';
            } else {
                $sql=trim((string)file_get_contents($sqlPath));
                if (str_starts_with($sql,'.')) throw new RuntimeException('This SQLite shell command requires a special import/export action.');
                if (preg_match('/^(SELECT|WITH|PRAGMA)\b/i',$sql)) {
                    $stmt=$pdo->query($sql); $rows=$stmt->fetchAll(PDO::FETCH_ASSOC); $columns=$rows?array_keys($rows[0]):[]; $message=count($rows).' rows returned.';
                } else {
                    $changed=$pdo->exec($sql); $message=(int)$changed.' row(s) changed in a temporary database copy.';
                }
            }
        } catch (Throwable $e) { $error=$e->getMessage(); }
        $pdo=null; @unlink($tmpDir.'/movies.db'); @rmdir($tmpDir);
    }
}
$source=task_hub_relative($sqlPath);
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title><?= task_hub_escape($title) ?> · Bootcamp Lab</title><link rel="stylesheet" href="assets/task-hub.css"><style>.result-wrap{overflow:auto;margin-top:14px}.result-table{border-collapse:collapse;width:100%;font:10px 'DM Mono',monospace}.result-table th,.result-table td{padding:8px;border:1px solid #e2e8e3;text-align:left;max-width:280px;overflow-wrap:anywhere}.result-table th{background:#edf3ee;color:#42634d}.error-box{padding:12px;border:1px solid #ead6d1;background:#fff6f4;color:#8d4238;border-radius:6px;font:11px/1.6 'DM Mono',monospace}.download-link{display:inline-block;margin-top:12px;color:#426f5d;font-size:11px;font-weight:800}</style></head><body><main class="shell"><header class="preview-head"><a class="back-link" href="index.php">← ALL TASKS</a><span class="preview-title"><?= task_hub_escape($source) ?></span><a class="source-link" href="preview.php?path=<?= rawurlencode($source) ?>&mode=code">View SQL</a></header><section class="runner-panel"><div class="eyebrow">TEMPORARY SQLITE COPY</div><h1><?= task_hub_escape($title) ?></h1><p>The task SQL runs against a disposable copy of <code>movies.db</code>; changes made by UPDATE, DELETE, or INSERT tasks do not alter the original database.</p>
<?php if($error): ?><div class="error-box"><?= task_hub_escape($error) ?></div><?php else: ?><div class="output-box"><?= task_hub_escape($message) ?></div><?php if($level==='advanced'&&$number===20): ?><a class="download-link" href="sql-runner.php?id=advanced-20&download=csv">Download exported movies.csv ↧</a><?php endif; ?><?php if($columns): ?><div class="result-wrap"><table class="result-table"><thead><tr><?php foreach($columns as $col): ?><th><?= task_hub_escape((string)$col) ?></th><?php endforeach; ?></tr></thead><tbody><?php foreach(array_slice($rows,0,100) as $row): ?><tr><?php foreach($columns as $col): ?><td><?= task_hub_escape((string)($row[$col]??'')) ?></td><?php endforeach; ?></tr><?php endforeach; ?></tbody></table><?php if(count($rows)>100): ?><p>Showing first 100 of <?= count($rows) ?> rows.</p><?php endif; ?></div><?php endif; ?><?php endif; ?></section></main></body></html>