<?php
// Create 4 variables to store these information
// $server="database-1.cxzg4akd6dhy.ap-northeast-1.rds.amazonaws.com";
// $username="admin";
// $password="Bk+w%H86";
// $database = "gasstation";
$server = "127.0.0.1:5656"; // Replace with your server name or IP
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$database = "gasstation"; // Replace with your database name
// Create connection
$conn = new mysqli($server, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?> 