<?php
    include '../dbconnect.php';
    include '../server.php';

    $_POST = json_decode(file_get_contents("php://input"),true);

    if($_POST['action'] == 'getLikes'){
        
        $sql = "SELECT * FROM likes";
        $result = mysqli_query($conn, $sql);
        $likes = array(); 
    
        if(mysqli_num_rows($result) > 0){
            while($row = $result->fetch_assoc()) {
                $likes[] = $row; 
            }
            echo json_encode($likes); 
        }
    }

    if($_POST['action'] == 'getLikesCount'){
        $query = "SELECT post_ID, COUNT(*) AS likes_count FROM likes GROUP BY post_ID";
        $result = mysqli_query($conn, $query);
        
        $likesCounts = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $likesCounts[] = $row;
        }
        
        header('Content-Type: application/json');
        echo json_encode($likesCounts);
    }

    if($_POST['action'] == 'getUsers'){
        $sql = "SELECT * FROM users";
        $result = mysqli_query($conn, $sql);
        $users = array(); 
    
        if(mysqli_num_rows($result) > 0){
            while($row = $result->fetch_assoc()) {
                $users[] = $row; 
            }
            echo json_encode($users); 
        }

    }

    if($_POST['action'] == 'likePost'){
        
        $postID = $_POST['postID'];
        $userID = $_POST['userID'];
        try{
            $sql = "SELECT * FROM likes WHERE post_ID = '$postID' AND user_ID = '$userID' ";
    
            $result = mysqli_query($conn , $sql);
    
            if(mysqli_num_rows($result) > 0 ){
                
                $row = mysqli_fetch_assoc($result);
                $id = $row['id'];
                
                $sql = "DELETE FROM likes WHERE id = '$id'";
                try{
                    mysqli_query($conn, $sql);
                    echo 'like deleted';
                }
                catch(mysqli_sql_exception){
                    echo 'not deleted like';
                }
            }
            else{
                $sql = "INSERT INTO likes (post_ID , user_ID)
                    VALUES ('$postID' , '$userID')";
            
                try{
                    mysqli_query($conn, $sql);
                    echo 'liked';
                }
                catch(mysqli_sql_exception){
                    echo 'not liked';
                }
            }

        }
        catch(mysqli_sql_exception){
            echo 'exception';
        }
    }


?>
