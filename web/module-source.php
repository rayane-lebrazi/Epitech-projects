<?php
$id=isset($_GET['id'])&&is_string($_GET['id'])?$_GET['id']:'';
if(!preg_match('/^task\d{2}$/',$id)){http_response_code(404);exit;}
$file=__DIR__.'/day06/'.$id.'/'.$id.'.mjs';
$root=realpath(__DIR__);$real=realpath($file);
if($real===false||$root===false||!str_starts_with($real,$root.DIRECTORY_SEPARATOR)||!is_file($real)){http_response_code(404);exit;}
header('Content-Type: application/javascript; charset=utf-8');readfile($real);