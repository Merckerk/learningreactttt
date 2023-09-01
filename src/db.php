<?php
//Database Connection paremeters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tictactoe3";

//Create sql query from the provided db paremeters
$conn = new mysqli($servername, $username, $password, $dbname);

//Check if connection successful

if ($connn->connect_error) {
    // If there's an error, terminate the script and display a messaage.
    die("Connection failed:" . $conn->connect_error);

}

?>