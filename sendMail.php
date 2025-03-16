<?php
session_start();

/*
echo '<pre>';
print_r($_POST);
echo '</pre>';
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $name = trim(htmlspecialchars(strip_tags($_POST['name'])));
    $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $message = trim(htmlspecialchars(strip_tags($_POST['message'])));

    // Initialize error messages
    $errors = [];

    // Validate required fields
    if (empty($name)) {
        $errors['name'] = "Name is required.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Valid email address is required.";
    }
    if (empty($message)) {
        $errors['message'] = "Message cannot be empty.";
    }

    // Store errors and old input in session if validation fails
    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        $_SESSION['old_input'] = $_POST;
        header("Location: index.php#contact");
        exit();
    }

    // Mail sending process
    $to = "selimo.contact@gmail.com";
    $subject = "New Contact Form Submission from " . $name;
    $headers  = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $emailBody  = "Name: $name\n";
    $emailBody .= "Email: $email\n\n";
    $emailBody .= "Message:\n$message\n";

    if (mail($to, $subject, $emailBody, $headers)) {
        $_SESSION['success'] = "Message sent successfully!";
    } else {
        $_SESSION['error'] = "Failed to send the message. Please try again later.";
    }

    // Redirect back to contact form
    header("Location: index.php#contact");
    exit();
}

