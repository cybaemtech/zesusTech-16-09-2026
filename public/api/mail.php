<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit(0);
}

// Support both form-data ($_POST) and raw JSON input
$inputData = [];
$rawInput = file_get_contents('php://input');
if (!empty($rawInput)) {
  $decoded = json_decode($rawInput, true);
  if (is_array($decoded)) {
    $inputData = $decoded;
  }
}

function getField($key, $fallbackKey = null, $default = '')
{
  global $inputData;
  if (isset($_POST[$key]) && trim($_POST[$key]) !== '') {
    return trim($_POST[$key]);
  }
  if ($fallbackKey && isset($_POST[$fallbackKey]) && trim($_POST[$fallbackKey]) !== '') {
    return trim($_POST[$fallbackKey]);
  }
  if (isset($inputData[$key]) && trim((string) $inputData[$key]) !== '') {
    return trim((string) $inputData[$key]);
  }
  if ($fallbackKey && isset($inputData[$fallbackKey]) && trim((string) $inputData[$fallbackKey]) !== '') {
    return trim((string) $inputData[$fallbackKey]);
  }
  return $default;
}

$fullName = getField('fullName', 'name');
$email = getField('email');
$phone = getField('phone', 'mobile');
$company = getField('company');
$role = getField('role');
$size = getField('size');
$cloud = getField('cloud');
$cloudSize = getField('cloudSize');
$challenge = getField('challenge');
$messageText = getField('message', 'query');
$fileName = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : '';

// Validation
if (empty($fullName) || empty($email)) {
  http_response_code(400);
  echo json_encode(["success" => false, "error" => "Full Name and Business Email are required."]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["success" => false, "error" => "Invalid email address format."]);
  exit;
}

$submissionId = date('YmdHis') . substr(md5(uniqid((string) mt_rand(), true)), 0, 6);

// Email Configurations
// $adminEmail = "varadmule17@gmail.com";
// $ccEmail = "Vinayak.salunkhe@zensustech.com, nikita.nagargoje@cybaemtech.com, varad.mule@cybaemtech.com";
// $fromEmail = "no-reply@zensustech.com";

$adminEmail = "varadmule17@gmail.com";
$ccEmail = "nikita.nagargoje@cybaemtech.com";
$fromEmail = "no-reply@zensustech.com";

/* ─────────────────────────────────────────────
   1. ADMIN / RECEIVER EMAIL (Dark/Modern Slate Theme)
   ───────────────────────────────────────────── */
$adminSubject = "New Cloud Assessment Request - " . htmlspecialchars($fullName) . " (" . htmlspecialchars(!empty($company) ? $company : "Lead") . ") | ZensusTech";

$adminHtml = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Cloud Assessment Request - ZensusTech</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background-color:#1e293b;border:1px solid #334155;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);">
        <tr>
          <td style="background:linear-gradient(135deg,#0284c7 0%,#2563eb 60%,#1d4ed8 100%);padding:36px 32px 28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:3px;color:#bae6fd;text-transform:uppercase;font-weight:700;">ZensusTech ZenAIOps</p>
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">New Cloud Assessment Request</h1>
            <span style="display:inline-block;background-color:#ffffff;color:#0284c7;padding:6px 18px;border-radius:20px;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">Submission ID: ' . $submissionId . '</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 24px;font-size:14px;color:#94a3b8;line-height:1.5;">A new cloud assessment request has been submitted through the portal. Details are listed below:</p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #334155;">
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;width:38%;border-bottom:1px solid #1e293b;">Full Name</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;font-weight:600;border-bottom:1px solid #334155;">' . htmlspecialchars($fullName) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Business Email</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;border-bottom:1px solid #334155;"><a href="mailto:' . htmlspecialchars($email) . '" style="color:#60a5fa;text-decoration:none;font-weight:600;">' . htmlspecialchars($email) . '</a></td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Phone Number</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">' . (empty($phone) ? '<span style="color:#64748b;">Not provided</span>' : htmlspecialchars($phone)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Company Name</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;font-weight:600;border-bottom:1px solid #334155;">' . (empty($company) ? '<span style="color:#64748b;">Not specified</span>' : htmlspecialchars($company)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Job Role</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">' . (empty($role) ? '<span style="color:#64748b;">Not provided</span>' : htmlspecialchars($role)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Company Size</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">' . (empty($size) ? '<span style="color:#64748b;">Not specified</span>' : htmlspecialchars($size)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Cloud Platform</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">' . (empty($cloud) ? '<span style="color:#64748b;">Not specified</span>' : htmlspecialchars($cloud)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Environment Size</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">' . (empty($cloudSize) ? '<span style="color:#64748b;">Not specified</span>' : htmlspecialchars($cloudSize)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Primary Challenge</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#38bdf8;font-weight:600;border-bottom:1px solid #334155;">' . (empty($challenge) ? '<span style="color:#64748b;">Not specified</span>' : htmlspecialchars($challenge)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">File Attached</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">' . (empty($fileName) ? '<span style="color:#64748b;">No attachment</span>' : htmlspecialchars($fileName)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;">Submitted At</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;">' . date('d M Y, H:i:s') . ' UTC</td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td style="padding:14px 18px;background:#0f172a;border-radius:8px 8px 0 0;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:1px;text-transform:uppercase;border:1px solid #334155;border-bottom:none;">Message / Notes</td>
              </tr>
              <tr>
                <td style="padding:16px 18px;background:#1e293b;border-radius:0 0 8px 8px;font-size:14px;color:#e2e8f0;line-height:1.6;border:1px solid #334155;border-top:none;">' . (!empty($messageText) ? nl2br(htmlspecialchars($messageText)) : '<span style="color:#64748b;">No additional message provided.</span>') . '</td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
              <tr>
                <td style="padding:14px 18px;background:rgba(2,132,199,0.15);border-left:4px solid #38bdf8;border-radius:0 8px 8px 0;font-size:13px;color:#bae6fd;line-height:1.5;">
                  <strong style="color:#ffffff;">Action Item:</strong> Review requirements and schedule initial discovery call within 24 hours.
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#0f172a;padding:20px 32px;text-align:center;border-top:1px solid #1e293b;">
            <p style="margin:0 0 6px;font-size:12px;color:#64748b;">Automated lead dispatch from ZensusTech ZenAIOps Platform</p>
            <a href="https://zensustech.com" style="font-size:13px;color:#38bdf8;font-weight:600;text-decoration:none;">www.zensustech.com</a>
            <p style="margin:10px 0 0;font-size:11px;color:#475569;">&copy; ' . date('Y') . ' ZensusTech. All Rights Reserved.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>';

/* ─────────────────────────────────────────────
   2. USER / SENDER CONFIRMATION EMAIL (Clean Light Theme)
   ───────────────────────────────────────────── */
$userSubject = "We Received Your Cloud Assessment Request - ZensusTech ZenAIOps";

$userHtml = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You - ZensusTech ZenAIOps</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background-color:#ffffff;border:1px solid #e2e8f0;box-shadow:0 12px 32px rgba(2,132,199,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#0284c7 0%,#2563eb 60%,#1d4ed8 100%);padding:36px 32px 28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:3px;color:#bae6fd;text-transform:uppercase;font-weight:700;">ZensusTech ZenAIOps</p>
            <h1 style="margin:0 0 6px;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Thank You, ' . htmlspecialchars($fullName) . '!</h1>
            <p style="margin:0;font-size:14px;color:#e0f2fe;">Your cloud assessment request has been received.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <!-- 24-Hour Guarantee Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-radius:12px;overflow:hidden;border:1px solid #bfdbfe;">
              <tr>
                <td style="padding:20px;background:#eff6ff;text-align:center;">
                  <div style="font-size:26px;margin-bottom:6px;">&#9889;</div>
                  <p style="margin:0 0 4px;font-size:17px;font-weight:800;color:#1e3a8a;">24-Hour Response Guarantee</p>
                  <p style="margin:0;font-size:13px;color:#3b82f6;line-height:1.5;">Our enterprise cloud architects will review your infrastructure details and contact you within 24 business hours.</p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 12px;font-size:12px;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:1px;">Summary of Your Submission</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;margin-bottom:24px;">
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;width:38%;">Full Name</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($fullName) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Business Email</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#2563eb;font-weight:600;border-bottom:1px solid #f1f5f9;">' . htmlspecialchars($email) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Company</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #f1f5f9;">' . (empty($company) ? '<span style="color:#94a3b8;">-</span>' : htmlspecialchars($company)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Cloud Platform</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;border-bottom:1px solid #f1f5f9;">' . (empty($cloud) ? '<span style="color:#94a3b8;">-</span>' : htmlspecialchars($cloud)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Primary Focus</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #f1f5f9;">' . (empty($challenge) ? '<span style="color:#94a3b8;">-</span>' : htmlspecialchars($challenge)) . '</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;">Submission ID</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:13px;color:#64748b;font-mono:true;">' . $submissionId . '</td>
              </tr>
            </table>

            <p style="margin:0 0 12px;font-size:12px;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:1px;">What Happens Next?</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="padding:8px 0;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="width:28px;vertical-align:top;padding-top:1px;"><span style="display:inline-block;width:22px;height:22px;background:#0284c7;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:800;color:#ffffff;">1</span></td>
                  <td style="font-size:13px;color:#334155;line-height:1.5;padding-left:8px;"><strong>Review:</strong> Our cloud engineers analyze your environment details and requirements.</td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="width:28px;vertical-align:top;padding-top:1px;"><span style="display:inline-block;width:22px;height:22px;background:#0284c7;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:800;color:#ffffff;">2</span></td>
                  <td style="font-size:13px;color:#334155;line-height:1.5;padding-left:8px;"><strong>Discovery:</strong> We connect with you for a 30-minute tailored technical consultation.</td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="width:28px;vertical-align:top;padding-top:1px;"><span style="display:inline-block;width:22px;height:22px;background:#0284c7;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:800;color:#ffffff;">3</span></td>
                  <td style="font-size:13px;color:#334155;line-height:1.5;padding-left:8px;"><strong>Roadmap:</strong> Receive an actionable architecture, security, and cost optimization report.</td>
                </tr></table>
              </td></tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:10px 0 0;">
                  <a href="https://zensustech.com" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0284c7,#2563eb);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:999px;letter-spacing:0.5px;box-shadow:0 4px 12px rgba(2,132,199,0.3);">Visit ZensusTech Website</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Direct Contact:</p>
            <a href="mailto:varadmule17@gmail.com" style="font-size:13px;color:#0284c7;font-weight:700;text-decoration:none;">varadmule17@gmail.com</a>
            <p style="margin:10px 0 0;font-size:11px;color:#94a3b8;">&copy; ' . date('Y') . ' ZensusTech. All Rights Reserved.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>';

/* ─────────────────────────────────────────────
   3. DISPATCH (Standard PHP mail without SMTP)
   ───────────────────────────────────────────── */
function sendMultipartEmail($to, $subject, $htmlContent, $replyTo, $cc = null, $file = null)
{
  global $fromEmail;
  
  $senderEmail = !empty($fromEmail) ? $fromEmail : "no-reply@zensustech.com";

  // Build clean RFC-compliant headers
  $headers = [];
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "From: ZensusTech ZenAIOps <" . $senderEmail . ">";
  $headers[] = "Reply-To: " . $replyTo;
  $headers[] = "Return-Path: " . $senderEmail;
  if (!empty($cc)) {
    $headers[] = "Cc: " . $cc;
  }
  $headers[] = "X-Mailer: PHP/" . phpversion();

  if ($file && isset($file['error']) && $file['error'] == UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
    $boundary = md5(uniqid((string) time(), true));
    $headers[] = "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"";

    $message = "--$boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $htmlContent . "\r\n\r\n";

    $file_tmp_name = $file['tmp_name'];
    $file_name = basename($file['name']);
    $file_size = $file['size'];
    $file_type = $file['type'] ?: 'application/octet-stream';

    $handle = fopen($file_tmp_name, "rb");
    $content = fread($handle, $file_size);
    fclose($handle);
    $encoded_content = chunk_split(base64_encode($content));

    $message .= "--$boundary\r\n";
    $message .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $encoded_content . "\r\n\r\n";
    $message .= "--$boundary--";
  } else {
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "Content-Transfer-Encoding: 8bit";
    $message = $htmlContent;
  }

  $headerStr = implode("\r\n", $headers);
  $additionalParams = "-f" . $senderEmail;

  // Attempt send with envelope sender -f parameter
  $sent = @mail($to, $subject, $message, $headerStr, $additionalParams);
  if (!$sent) {
    // Fallback without -f if mail host disallows additional parameters
    $sent = @mail($to, $subject, $message, $headerStr);
  }

  return $sent;
}

$fileData = isset($_FILES['file']) ? $_FILES['file'] : null;

// Send Admin Notification (sent From: no-reply@zensustech.com, with user Reply-To, and CC)
$adminSent = sendMultipartEmail($adminEmail, $adminSubject, $adminHtml, htmlspecialchars($email), $ccEmail, $fileData);

// Send User Confirmation Receipt (sent From: no-reply@zensustech.com, Reply-To: no-reply@zensustech.com)
$userSent = sendMultipartEmail($email, $userSubject, $userHtml, $fromEmail, null, null);

$lastError = error_get_last();

http_response_code(200);
echo json_encode([
  "success" => true,
  "message" => "Request received! Confirmation email sent.",
  "id" => $submissionId,
  "from" => $fromEmail,
  "adminTo" => $adminEmail,
  "userTo" => $email,
  "adminSent" => (bool) $adminSent,
  "userSent" => (bool) $userSent,
  "debugError" => $lastError ? $lastError['message'] : null
]);
?>