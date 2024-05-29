<?php 
    include '../dbconnect.php';
    include '../server.php';
    
    $_POST = json_decode(file_get_contents("php://input"),true);
    
    if($_POST["fullName"] && $_POST['email'] && $_POST['password']){
        $fullName = $_POST["fullName"];
        $email = $_POST["email"];
        $password = $_POST['password'];
    
        $_SESSION['name'] = $fullName;
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $password;


        $hash = password_hash($_POST['password'] , PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO users (fullName , email , password)
        VALUES ('$fullName' , '$email' , '$hash')";

        try{
            mysqli_query($conn, $sql);
            echo 'registred';
        }
        catch(mysqli_sql_exception){
            echo 'Could not register';
        }
    }
    else if($_POST['email'] && $_POST['password']){ 
        $email = $_POST["email"];
        $password = $_POST['password'];

        $_SESSION['email'] = $email;
        $_SESSION['password'] = $password;

        $sql = "SELECT * FROM users WHERE email = '$email' ";
        
        $result = mysqli_query($conn , $sql);
        
        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);

            if(password_verify($password , $row['password'] )){
                echo 'correct';
            }
            else{
                echo 'Incorrect password';
            }
        }
        else{
            echo 'Incorrect email';
        }
    }
    else if($_POST["action"] == 'Destroy'){
        session_destroy();        
    }
    else{
        echo 'Please fill in the form'; 
    }


    mysqli_close($conn);
?>