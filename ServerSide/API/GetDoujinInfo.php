<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
if ($_GET["id"]) {
   error_reporting(0);
   ini_set('display_errors', 0);
   $html = file_get_contents("https://hentaivn.tv/doujin=" . addslashes($_GET["id"]) . ".html");
   $doc = new DomDocument();
   $info = new stdClass();
   $doc -> loadHTML($html);
   $finder = new DomXPath($doc);
   $nodes = $finder->query("//h1[@class='bar-title']");
   $displayName = strtok(substr($nodes[0]->textContent, 33), "Xế");
   $info->displayName = substr($displayName, 0, strlen($displayName) - 1);
   $content = $finder->query("//li[contains(@class, 'item')][1]//div[contains(@class, 'box-description')][1]");
   if (strpos($content[0]->textContent, "Tên Khác:") !== false) {
      $tags = $finder->query("//li[contains(@class, 'item')][1]//div[contains(@class, 'box-description')][1]//p[3]//span//a[contains(@class, 'tag')][1]");
   }
   else {
      $tags = $finder->query("//li[contains(@class, 'item')][1]//div[contains(@class, 'box-description')][1]//p[2]//span//a[contains(@class, 'tag')][1]");
   }
   $tagString = "";
   for ($i = 0; $i < count($tags); $i++){
      $tagString = $tagString . '' . str_replace(" ", "", $tags[$i]->textContent) . ',';
   }
   $info->tags = substr($tagString, 0, strlen($tagString) - 1);
   $info->comicLink = "https://hentaivn.tv" . $finder->evaluate("string(//div[@class='box-description']//p[@style='font-size: 18px; line-height: 22px;']//a/@href)");
   $truyen_list = $finder->query("//div[@class='box-description']//p[@style='font-size: 18px; line-height: 22px;']");
   $info->firstComic = substr($truyen_list[0]->textContent, 1);
   if ($info->firstComic == null)
       echo 'Doujin is invalid';
   else {
       echo json_encode($info);
   }
}
else {
   echo 'Invalid AuthorID';
}
?>