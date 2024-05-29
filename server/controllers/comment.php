<?php 
    include '../dbconnect.php';
    include '../server.php';

    $_POST = json_decode(file_get_contents("php://input"),true);

    if($_POST['action'] == 'Comment'){
        
        $info = $_POST['info'];
        $post_ID = $_POST['post_ID'];
        $user_ID = $_POST['user_ID'];

        $sql = "INSERT INTO comments (info  , post_ID , user_ID)
                VALUES ('$info' , '$post_ID', '$user_ID')";

        try{
            mysqli_query($conn, $sql);
            echo 'comment added';
        }
        catch(mysqli_sql_exception){
            echo 'not added';
        }
    }
    else if($_POST['action'] == 'getComments'){

        $post_ID = $_POST['post_ID'];

        $sql = "SELECT info, user_ID ,id FROM comments WHERE post_ID = $post_ID ";
        
        $result = mysqli_query($conn , $sql);

        $comments = array(); 
    
        if(mysqli_num_rows($result) > 0){
            while($row = $result->fetch_assoc()) {
                $comments[] = $row; 
            }
            echo json_encode($comments); 
        }
        
        else {
            echo 'no comments';
        }
    }
    else if($_POST['action'] == 'deleteComment'){
        $comment_ID = $_POST['commid'];
        $sql = "DELETE FROM comments WHERE id = $comment_ID ";

        try{
            mysqli_query($conn, $sql);
            echo 'deleted comment';
        }
        catch(mysqli_sql_exception){
            echo 'not deleted comment';
        }
        

    }
    if($_POST['action'] == 'getCommentsNumber'){

        $query = "SELECT post_ID, COUNT(*) AS comments_count FROM comments GROUP BY post_ID";
            $result = mysqli_query($conn, $query);
            
            $commentsCounts = array();
            if(mysqli_num_rows($result) > 0){
                while ($row = mysqli_fetch_assoc($result)) {
                    $commentsCounts[] = $row;
                }
                echo json_encode($commentsCounts);
            }
            else {
                echo 'nothing';
            }
    }

?>