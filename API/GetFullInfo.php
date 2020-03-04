<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
if ($_GET["id"]) {
   error_reporting(0);
    ini_set('display_errors', 0);
   $html = file_get_contents("https://hentaivn.net/user-" . $_GET["id"]);
   $doc = new DomDocument();
   $doc -> loadHTML($html);
   $finder = new DomXPath($doc);
   $nodes = $finder->query("//*[contains(@class, 'wall-name')]//h2");
   $info->displayName = $nodes[0]->textContent;
   if ($info->displayName == null)
       echo 'User is invalid';
   else {
       $info->avatar = $finder->evaluate("string(//div[@class='wall-avatar']//img/@src)");
       $information = $finder->query("//*[contains(@class, 'wall-name')]");
       $info->additionalInfo = $information[0]->textContent;
       $infoData = $finder->query("//*[contains(@class, 'info-row')]//div[contains(@class, 'col-2')]");
       if (strpos($html, "Thành viên nhóm:") || strpos($html, "Trưởng nhóm:")) {
           $info->group = $infoData[0]->textContent;
           $info->gender = $infoData[1]->textContent;
           $info->birthDate = $infoData[2]->textContent;
           $info->joined = $infoData[3]->textContent;
           $info->comments = $infoData[4]->textContent;
           $info->likes = $infoData[5]->textContent;
           $info->yen = $infoData[6]->textContent;
           $info->introduction = $infoData[8]->textContent;
       }
       else {
           $info->group = "none";
           $info->gender = $infoData[0]->textContent;
           $info->birthDate = $infoData[1]->textContent;
           $info->joined = $infoData[2]->textContent;
           $info->comments = $infoData[3]->textContent;
           $info->likes = $infoData[4]->textContent;
           $info->yen = $infoData[5]->textContent;
           $info->introduction = $infoData[7]->textContent;
       }
       echo json_encode($info);
   }
}
else {
   echo 'Invalid UserID';
}
?>