<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
if ($_GET["id"]) {
   error_reporting(0);
   ini_set('display_errors', 0);
   $html = file_get_contents("https://hentaivn.net/tacgia=" . $_GET["id"] . ".html");
   $doc = new DomDocument();
   $doc -> loadHTML($html);
   $finder = new DomXPath($doc);
   $nodes = $finder->query("//h1[@class='bar-title']");
   $displayName = strtok(substr($nodes[0]->textContent, 34), "Xế");
   $info->displayName = substr($displayName, 0, strlen($displayName) - 1);
   $info->comicLink = "https://hentaivn.net" . $finder->evaluate("string(//div[@class='box-description']//p[@style='font-size: 18px; line-height: 22px;']//a/@href)");
   $truyen_list = $finder->query("//div[@class='box-description']//p[@style='font-size: 18px; line-height: 22px;']");
   $info->firstComic = substr($truyen_list[0]->textContent, 1);
   if ($info->firstComic == null)
       echo 'Author is invalid';
   else {
       echo json_encode($info);
   }
}
else {
   echo 'Invalid AuthorID';
}
?>