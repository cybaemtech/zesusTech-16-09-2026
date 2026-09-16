<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$name      = isset($_POST['fullName'])   ? trim($_POST['fullName'])   : '';
$email     = isset($_POST['email'])      ? trim($_POST['email'])      : '';
$mobile    = isset($_POST['phone'])      ? trim($_POST['phone'])      : '';
$company   = isset($_POST['company'])    ? trim($_POST['company'])    : '';
$role      = isset($_POST['role'])       ? trim($_POST['role'])       : '';
$size      = isset($_POST['size'])       ? trim($_POST['size'])       : '';
$cloud     = isset($_POST['cloud'])      ? trim($_POST['cloud'])      : '';
$cloudSize = isset($_POST['cloudSize'])  ? trim($_POST['cloudSize'])  : '';
$challenge = isset($_POST['challenge'])  ? trim($_POST['challenge'])  : '';
$message   = isset($_POST['message'])    ? trim($_POST['message'])    : '';

if (empty($name) || empty($email) || empty($company)) {
    http_response_code(400);
    echo json_encode(["error" => "Name, email and company are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email"]);
    exit;
}

$submissionId = date('YmdHis') . substr(md5(uniqid()), 0, 6);

$adminEmail = "info@zensustech.com, Vinayak.salunkhe@zensustech.com";

/* ─────────────────────────────────────────────
   ADMIN / RECEIVER EMAIL
   ───────────────────────────────────────────── */
$adminSubject = "New Cloud Assessment Request - " . htmlspecialchars($name) . " | ZenAI-Ops";

$adminHtml = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Cloud Assessment Request - ZenAI-Ops</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;background-color:#1e293b;border:1px solid #334155;">
        <tr>
          <td style="background:linear-gradient(135deg,#2563eb 0%,#1e40af 100%);padding:36px 32px 28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#bfdbfe;text-transform:uppercase;font-weight:600;">ZenAI-Ops</p>
            <h1 style="margin:0 0 18px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">New Cloud Assessment Request</h1>
            <span style="display:inline-block;background-color:#ffffff;color:#1e40af;padding:7px 20px;border-radius:20px;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Submission ID: ' . $submissionId . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 24px;font-size:14px;color:#94a3b8;">A new cloud assessment request has been received. Details are listed below.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #334155;">
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;width:40%;border-bottom:1px solid #1e293b;">Full Name</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . htmlspecialchars($name) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Email</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;border-bottom:1px solid #334155;"><a href="mailto:' . htmlspecialchars($email) . '" style="color:#38bdf8;text-decoration:none;">' . htmlspecialchars($email) . '</a></td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Mobile</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . (empty($mobile) ? '<span style="color:#475569;">-</span>' : htmlspecialchars($mobile)) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Company Name</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . htmlspecialchars($company) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Job Role</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . (empty($role) ? '<span style="color:#475569;">-</span>' : htmlspecialchars($role)) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Company Size</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . (empty($size) ? '<span style="color:#475569;">-</span>' : htmlspecialchars($size)) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Cloud Platform</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . (empty($cloud) ? '<span style="color:#475569;">-</span>' : htmlspecialchars($cloud)) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Cloud Env Size</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . (empty($cloudSize) ? '<span style="color:#475569;">-</span>' : htmlspecialchars($cloudSize)) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Primary Challenge</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;border-bottom:1px solid #334155;">' . (empty($challenge) ? '<span style="color:#475569;">-</span>' : htmlspecialchars($challenge)) . '</td>
              </tr>
              <tr>
                <td style="padding:13px 18px;background:#0f172a;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;">Submitted At</td>
                <td style="padding:13px 18px;background:#1e293b;font-size:14px;color:#f1f5f9;">' . date('d M Y, H:i:s') . ' UTC</td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td style="padding:16px 18px;background:#0f172a;border-radius:8px 8px 0 0;font-size:12px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;border:1px solid #334155;border-bottom:none;">Message Details</td>
              </tr>
              <tr>
                <td style="padding:18px;background:#1e293b;border-radius:0 0 8px 8px;font-size:14px;color:#f1f5f9;line-height:1.7;border:1px solid #334155;border-top:none;">' . (empty($message) ? '<span style="color:#475569;">No additional details provided.</span>' : nl2br(htmlspecialchars($message))) . '</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>';

/* ─────────────────────────────────────────────
   USER / SENDER CONFIRMATION EMAIL
   ───────────────────────────────────────────── */
$userSubject = "We have Received Your Cloud Assessment Request - ZenAI-Ops";

$userHtml = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You - ZenAI-Ops</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:14px;overflow:hidden;background-color:#ffffff;border:1px solid #e2e8f0;box-shadow:0 12px 32px rgba(0,0,0,0.05);">
        <tr>
          <td style="background:linear-gradient(135deg,#2563eb 0%,#1e40af 100%);padding:36px 32px 28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#bfdbfe;text-transform:uppercase;font-weight:600;">ZenAI-Ops</p>
            <h1 style="margin:0 0 6px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Thank You, ' . htmlspecialchars($name) . '!</h1>
            <p style="margin:0;font-size:14px;color:#dbeafe;">Your Cloud assessment request has been received.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
              <tr>
                <td style="padding:20px;background:#eff6ff;text-align:center;">
                  <p style="margin:0 0 6px;font-size:28px;">&#8987;</p>
                  <p style="margin:0 0 4px;font-size:18px;font-weight:700;color:#1e293b;">We\'ll Be In Touch Soon</p>
                  <p style="margin:0;font-size:13px;color:#334155;">Our team will review your requirements and reach out within 24 hours.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>';

/* ─────────────────────────────────────────────
   SEND
   ───────────────────────────────────────────── */
function sendMultipartEmail($to, $subject, $htmlContent, $replyTo) {
    $boundary = md5(uniqid(time()));
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: ZenAI-Ops <no-reply@zenaiops.com>\r\n";
    $headers .= "Reply-To: " . $replyTo . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $message = "--$boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $htmlContent . "\r\n\r\n";
    $message .= "--$boundary--";

    return @mail($to, $subject, $message, $headers);
}

// Ensure the from domain is correct for your environment if needed
$adminSent = sendMultipartEmail($adminEmail, $adminSubject, $adminHtml, htmlspecialchars($email));
$userSent  = sendMultipartEmail($email,      $userSubject,  $userHtml,  "no-reply@zenaiops.com");

if ($adminSent && $userSent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Request received! You will hear from us within 24 hours.",
        "id"      => $submissionId
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to send request",
        "id"      => $submissionId
    ]);
}
?>
