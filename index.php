<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MongoDB - Manual Insertion</title>
    <link rel="stylesheet" href="./style.css">
    <script src="./script.js"></script>
    <script src="./jquery.min.js"></script>
    
</head>

<?php

if(isset($_POST['ctrl_c'])) {
    $txt = $_POST['format'];
    $myfile = file_put_contents('logs.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
}
?>

<body>
    <div class="container">
        <div class="min-body">
            <div class="min-screen">
                <div class="min-typed"><input type="text" id="min"></div>
                
            </div>
            <div class="min-button-row">
                <div class="button c" onclick="clearMin()">C</div>
                <div class="button l" onclick="genBuddy()">Buddy</div>
                <div class="button postpd" onclick="genPostpd()">POSTPD</div>
                <div class="button l" onclick="genTnt()">TNT</div>
            </div>

            <div id="format" name="format"></div>

            <div class="calc-button-row">
                <button class="button ctrl-c" name="ctrl_c" id="ctrl_c" onclick="ctrlc()">Copy</button>
                
            </div>
            <span class="copied" id="copied">Copied to clipboard!</span>

        </div>
    </div>

</body>
</html>