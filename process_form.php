<?php
// Connection to MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kinsman";
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    // Insert data into the database
    $sql = "INSERT INTO users (firstname, lastname, email, password) VALUES ('$firstname', '$lastname', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        // Start session and store user's firstname
        session_start();
        $_SESSION['firstname'] = $firstname;
        // Redirect to login.html after successful registration
        header('location: index.html');
        exit; // Exit to prevent further execution
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>;