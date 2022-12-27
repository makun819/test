<?php 
session_start();
if($_SERVER["REQUEST_METHOD"] === "POST"){
    
    $db="mysql:dbname=portfolio;host=localhost;";
    $user="root";
    $pw="";
    $pdo=new PDO($db,$user,$pw);

    $action=filter_input(INPUT_GET,"action");
    switch($action){
        case "log_check":
            if(isset($_SESSION["name"])){
                echo json_encode($_SESSION["name"]);
                return;
            }
            echo json_encode(false);
            break;
        case "get_question":
            get_question($pdo);
            break;
        case "login":
            judge_password($pdo);
            break;
        case "register":
            user_register($pdo);
            break;
    }
}
function user_register($pdo){
    $name=$_POST["name"];
    $password=(int)$_POST["password"];
    try{
        if($name === "" || $name === null || $password === null || strlen($password) < 4)echo json_encode(false);
        $check_user=$pdo->prepare("SELECT * FROM user WHERE name=:name");
        $check_user->bindValue("name" , $name , \PDO::PARAM_STR);
        $check_user->execute();
        $check_user=$check_user->fetch(PDO::FETCH_ASSOC);
        if($check_user){
            echo json_encode(false);
            return;
        }
        $stmt=$pdo->prepare("INSERT INTO user(name,password) VALUES(:name , :password)");
        $stmt->bindValue("name" , $name , \PDO::PARAM_STR);
        $stmt->bindValue("password" , $password , \PDO::PARAM_INT);
        $stmt->execute();
        $id=$pdo->lastInsertId();
        register_session($id , $name);
        echo json_encode(true);
    }catch(Exception $e){
        echo json_encode($e->getMessage());
    }
}
function judge_password($pdo){
    $name=$_POST["name"];
    $password=$_POST["password"];
    $stmt=$pdo->prepare("SELECT user_id , name FROM user WHERE name=:name AND password=:password");
    $stmt->bindValue("name" , $name , \PDO::PARAM_STR);
    $stmt->bindValue("password" , $password , \PDO::PARAM_INT);
    $stmt->execute();
    $user=$stmt->fetch(PDO::FETCH_ASSOC);
    if($user){
        register_session($user["user_id"] , $user["name"]);
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
}
function register_session($id , $name){
    $_SESSION["id"]=$id;
    $_SESSION["name"]=$name;
}
function get_question($pdo){
    $type=filter_input(INPUT_POST,"type");
    $stmt=$pdo->query("SELECT id , question , choice1 , choice2 , choice3 FROM question WHERE type=$type")->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($stmt);
}
?>