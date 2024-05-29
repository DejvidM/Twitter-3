<?php 
    include '../dbconnect.php';
    include '../server.php';

    $_POST = json_decode(file_get_contents("php://input"),true);

    if($_POST["action"] == "getInfo"){
        
        $email = $_POST["email"];

        $sql = "SELECT * FROM users WHERE email = '$email' ";
        
        $result = mysqli_query($conn , $sql);

        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        }
    }
    
    else if($_POST['action'] == 'post'){

        $post = $_POST['post'];
        $id = $_POST['id'];

        $sql = "INSERT INTO posts( content, user_ID)
                VALUES ('$post' , '$id')";

        try{
            mysqli_query($conn, $sql);
            echo 'posted';
        }
        catch(mysqli_sql_exception){
            echo 'not posted';
        }
    }

    else if($_POST["action"] == 'getPosts') {
        $sql = "SELECT * FROM posts";
        $result = mysqli_query($conn, $sql);
        $posts = array(); 
    
        if(mysqli_num_rows($result) > 0){
            while($row = $result->fetch_assoc()) {
                $posts[] = $row; 
            }
            echo json_encode($posts); 
        }
    }

    else if($_POST['action'] == 'deletePost'){
        $id = $_POST['id'];

        $sql = "DELETE FROM posts WHERE id = $id ";
        
        try{
            mysqli_query($conn, $sql);
            echo 'deleted';
        }
        catch(mysqli_sql_exception){
            echo 'not deleted';
        }
    }

?>
