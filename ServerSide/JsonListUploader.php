<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
if ($_POST["data"] && $_POST["unique_key"]) {
  $file = fopen("FollowerList/" . addslashes($_POST["unique_key"] . ".json") , "w");
  fwrite($file, $_POST["data"]);
  echo 'Upload successfully!';
  fclose($file);
}
else {
  echo 'Invalid data';
}