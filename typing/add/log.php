<?php 
$pdo=new PDO("mysql:dbname=portfolio;host=localhost;","root","");
if($_SERVER["REQUEST_METHOD"] === "POST"){
    $correct=$_GET["correct"];
    $second=$_GET["second"];
    $miss=$_GET["miss"];
    $score=floor($correct*$second-$miss);
    $dt=date("Y-m-d");
    try{
        $pdo->prepare("INSERT INTO typing_log(score , correct , average , miss , dt) VALUES($score , $correct , $second , $miss , '$dt')")->execute();
    }catch(Exception $e){
        echo $e->getMessage();
    }
}
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $stmt=$pdo->query("SELECT name , score FROM typing_log ORDER BY score DESC")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($stmt);
}
?>