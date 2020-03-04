<?php
$uploads_dir = './FollowerList';
if ($_FILES["file"]["error"] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES["file"]["tmp_name"];
    $name = $_FILES["file"]["name"];
    if (move_uploaded_file($tmp_name, "$uploads_dir/$name")) {
        echo 'Upload successfully!';
    }
    else {
        echo 'Upload failed!';
    }
}
?>