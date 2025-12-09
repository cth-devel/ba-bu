<?php
/**
 * Contact Form Email Handler
 * Upload this file to your cPanel server (e.g., public_html/send-email.php)
 * Make sure to secure this endpoint or use authentication
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
if (!isset($data['name']) || !isset($data['phone']) || !isset($data['service'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, phone, and service are required fields']);
    exit;
}

// Extract form data
$name = htmlspecialchars($data['name'] ?? '');
$email = htmlspecialchars($data['email'] ?? '');
$phone = htmlspecialchars($data['phone'] ?? '');
$service = htmlspecialchars($data['service'] ?? '');
$message = htmlspecialchars($data['message'] ?? '');

// Email configuration
$to = 'info@babufamilysalon.com';
$subject = "New Contact Form Submission from {$name} - BA-BU Family Salon";
$replyTo = $email ? $email : 'info@babufamilysalon.com';

// Create email headers
$headers = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: BA-BU Family Salon Contact Form <noreply@babufamilysalon.com>";
$headers[] = "Reply-To: {$replyTo}";
$headers[] = "X-Mailer: PHP/" . phpversion();

// Create HTML email body
$emailBody = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #77530a, #ffd277); padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
        <p style="color: white; margin: 5px 0 0 0;">BA-BU Family Salon</p>
    </div>
    <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="margin-top: 0;"><strong>You have received a new contact form submission:</strong></p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee;">' . $name . '</td>
            </tr>';

if ($email) {
    $emailBody .= '
            <tr>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee;"><a href="mailto:' . $email . '" style="color: #77530a;">' . $email . '</a></td>
            </tr>';
}

$emailBody .= '
            <tr>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee;"><a href="tel:' . $phone . '" style="color: #77530a;">' . $phone . '</a></td>
            </tr>
            <tr>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
                <td style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #eee;">' . $service . '</td>
            </tr>';

if ($message) {
    $emailBody .= '
            <tr>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px; background: #fff; border-bottom: 1px solid #eee; white-space: pre-wrap;">' . nl2br($message) . '</td>
            </tr>';
}

$emailBody .= '
        </table>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd;">
            <p style="margin: 0; color: #666; font-size: 12px;">This email was sent from the BA-BU Family Salon contact form.</p>
        </div>
    </div>
</body>
</html>';

// Send email using PHP mail() function
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'message' => 'Email sent successfully!',
        'success' => true
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email. Please try again later.',
        'success' => false
    ]);
}
?>

