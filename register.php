<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include your database connection file
    include 'db_connection.php';

    // Define variables and initialize with empty values
    $firstname = $lastname = $email = $password = "";

    // Processing form data when form is submitted
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Prepare an insert statement
    $sql = "INSERT INTO Users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $stmt->bind_param("ssss", $firstname, $lastname, $email, $password);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            // Redirect to login page after successful registration
            header("location: login.php");
            exit();
        } else {
            echo "Something went wrong. Please try again later.";
        }

        // Close statement
        $stmt->close();
    }

    // Close connection
    $conn->close();
}
?>