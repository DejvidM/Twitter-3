<?php 
    include '../dbconnect.php';
    include '../server.php';

    $_POST = json_decode(file_get_contents("php://input"),true);

    if($_POST["action"] == "getOneUser"){
        
        $id = $_POST["id"];

        $sql = "SELECT * FROM users WHERE id = $id ";
        
        $result = mysqli_query($conn , $sql);

        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        }
    }
    else if($_POST["action"] == "getloggedin"){
        
        $email = $_POST["email"];

        $sql = "SELECT * FROM users WHERE email = '$email' ";
        
        $result = mysqli_query($conn , $sql);

        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        }
    }
    else if($_POST["action"] == "editBio"){
        
        $bio = $_POST["bio"];
        $id = $_POST["id"];

        $sql = "UPDATE users SET bio = '$bio' WHERE id = $id ";
        
        $result = mysqli_query($conn , $sql);

    }
    else if($_POST["action"] == "getPosts"){
        
        $id = $_POST["user_ID"];

        $sql = "SELECT * FROM posts WHERE user_ID = $id ";
        
        $result = mysqli_query($conn, $sql);
        $posts = array(); 
        
        
        if(mysqli_num_rows($result) > 0){
            while($row = $result->fetch_assoc()) {
                $posts[] = $row; 
            }
            echo json_encode($posts); 
        }

    }

    if($_POST["action"] == "getOneUserByEmail"){
        
        $emai = $_POST["email"];

        $sql = "SELECT * FROM users WHERE email = '$emai' ";
        
        $result = mysqli_query($conn , $sql);

        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        }
    }
        
?>