<?php
$data = $_POST['formatted']."\n";
file_put_contents('logs.txt', $data.PHP_EOL , FILE_APPEND | LOCK_EX);

?>