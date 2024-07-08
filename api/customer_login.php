<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Include necessary files and functions
require_once "conn.php";
require_once "validate.php";

// Initialize response array
$response = [];

if (isset($_POST['email']) && isset($_POST['password'])) {
    // Validate and sanitize inputs
    $email = validate($_POST['email']);
    $password = validate($_POST['password']);

    // Prepare SQL statement
    $sql = "SELECT CUSTOMER_ID FROM customer WHERE CUSTOMER_Email = ? AND CUSTOMER_Password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);

    // Execute statement
    if ($stmt->execute()) {
        // Bind result variables
        $stmt->bind_result($customerId);
        
        // Fetch result
        if ($stmt->fetch()) {
            // Successful login
            $response = [
                "response" => "success",
                "customerId" => $customerId
            ];
        } else {
            // No matching user found
            $response = [
                "response" => "failure",
                "message" => "Invalid email or password"
            ];
        }
    } else {
        // Query execution failed
        $response = [
            "response" => "failure",
            "message" => "Database query failed"
        ];
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // Email or password not provided
    $response = [
        "response" => "failure",
        "message" => "Email or password not provided"
    ];
}

// Return JSON response
echo json_encode($response);
?>
