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
   $info->avatar = $finder->evaluate("string(//div[@class='wall-avatar']//img/@src)");
   $info->comicLink = "https://hentaivn.net" . $finder->evaluate("string(//*[contains(@class, 'item remove_')]//div[contains(@class, 'box-description')]//h2//a/@href)");
   if ($info->displayName == null)
       echo 'User is invalid';
   else {
       $truyen_list = $finder->query("//*[contains(@class, 'item remove_')]//div[contains(@class, 'box-description')]//h2");
       $info->firstComic = substr($truyen_list[0]->textContent, 1);
       echo json_encode($info);
   }
}
else {
   echo 'Invalid UserID';
}
?>