import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs";

export type ContactEmailPayload = {
  fullName: string;
  email: string;
  phone?: string;
  company: string;
  role?: string;
  size?: string;
  cloud?: string;
  cloudSize?: string;
  challenge?: string;
  message?: string;
};

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: ContactEmailPayload) => data)
  .handler(async ({ data }) => {
    const host = process.env["SMTP_HOST"] || "smtp.gmail.com";
    const port = Number(process.env["SMTP_PORT"]) || 465;
    const secure = process.env["SMTP_SECURE"] !== "false";
    const user = process.env["SMTP_USER"];
    const pass = process.env["SMTP_PASS"];

    if (!user || !pass) {
      console.warn("SMTP credentials not provided in .env. Email dispatch logged without SMTP.");
      return { success: true, mode: "no-smtp" };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const mailTo = process.env["MAIL_TO"] || "varadmule17@gmail.com";
    const mailCc = process.env["MAIL_CC"] || "nikita.nagargoje@cybaemtech.com";
    const fromAddress = `"ZensusTech" <no-reply@zensustech.com>`;

    const submissionId = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14) + Math.random().toString(36).substring(2, 8);

    // 1. Admin Email HTML (Dark Slate Modern Theme)
    const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Cloud Assessment Request - ZensusTech</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background-color:#1e293b;border:1px solid #334155;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);">
        <tr>
          <td style="background:linear-gradient(135deg,#0284c7 0%,#2563eb 60%,#1d4ed8 100%);padding:36px 32px 28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:3px;color:#bae6fd;text-transform:uppercase;font-weight:700;">ZensusTech ZenAIOps</p>
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">New Cloud Assessment Request</h1>
            <span style="display:inline-block;background-color:#ffffff;color:#0284c7;padding:6px 18px;border-radius:20px;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">Submission ID: ${submissionId}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 24px;font-size:14px;color:#94a3b8;line-height:1.5;">A new cloud assessment request has been received. Details are listed below:</p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #334155;">
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;width:38%;border-bottom:1px solid #1e293b;">Full Name</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;font-weight:600;border-bottom:1px solid #334155;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Business Email</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;border-bottom:1px solid #334155;"><a href="mailto:${data.email}" style="color:#60a5fa;text-decoration:none;font-weight:600;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Phone Number</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">${data.phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Company Name</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;font-weight:600;border-bottom:1px solid #334155;">${data.company || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Job Role</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">${data.role || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Company Size</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">${data.size || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Cloud Platform</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">${data.cloud || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Environment Size</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#f8fafc;border-bottom:1px solid #334155;">${data.cloudSize || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#0f172a;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #1e293b;">Primary Challenge</td>
                <td style="padding:12px 16px;background:#1e293b;font-size:14px;color:#38bdf8;font-weight:600;border-bottom:1px solid #334155;">${data.challenge || "Not specified"}</td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td style="padding:14px 18px;background:#0f172a;border-radius:8px 8px 0 0;font-size:12px;font-weight:700;color:#38bdf8;letter-spacing:1px;text-transform:uppercase;border:1px solid #334155;border-bottom:none;">Message / Query</td>
              </tr>
              <tr>
                <td style="padding:16px 18px;background:#1e293b;border-radius:0 0 8px 8px;font-size:14px;color:#e2e8f0;line-height:1.6;border:1px solid #334155;border-top:none;">${data.message ? data.message.replace(/\n/g, "<br/>") : '<span style="color:#64748b;">No additional message provided.</span>'}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#0f172a;padding:20px 32px;text-align:center;border-top:1px solid #1e293b;">
            <p style="margin:0 0 6px;font-size:12px;color:#64748b;">Automated lead dispatch from ZensusTech ZenAIOps Platform</p>
            <a href="https://zensustech.com" style="font-size:13px;color:#38bdf8;font-weight:600;text-decoration:none;">www.zensustech.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
    `;

    // 2. User Confirmation Email HTML (Light Clean Theme)
    const userHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You - ZensusTech ZenAIOps</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background-color:#ffffff;border:1px solid #e2e8f0;box-shadow:0 12px 32px rgba(2,132,199,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#0284c7 0%,#2563eb 60%,#1d4ed8 100%);padding:36px 32px 28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:3px;color:#bae6fd;text-transform:uppercase;font-weight:700;">ZensusTech ZenAIOps</p>
            <h1 style="margin:0 0 6px;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Thank You, ${data.fullName}!</h1>
            <p style="margin:0;font-size:14px;color:#e0f2fe;">Your cloud assessment request has been received.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <!-- 24-Hour Guarantee Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-radius:12px;overflow:hidden;border:1px solid #bfdbfe;">
              <tr>
                <td style="padding:20px;background:#eff6ff;text-align:center;">
                  <div style="font-size:26px;margin-bottom:6px;">⚡</div>
                  <p style="margin:0 0 4px;font-size:17px;font-weight:800;color:#1e3a8a;">24-Hour Response Guarantee</p>
                  <p style="margin:0;font-size:13px;color:#3b82f6;line-height:1.5;">Our enterprise cloud architects will review your infrastructure details and contact you within 24 business hours.</p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 12px;font-size:12px;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:1px;">Summary of Your Submission</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;margin-bottom:24px;">
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;width:38%;">Full Name</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #f1f5f9;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Business Email</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#2563eb;font-weight:600;border-bottom:1px solid #f1f5f9;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Company</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #f1f5f9;">${data.company || "-"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Cloud Platform</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;border-bottom:1px solid #f1f5f9;">${data.cloud || "-"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;border-bottom:1px solid #f1f5f9;">Primary Focus</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:14px;color:#0f172a;font-weight:600;border-bottom:1px solid #f1f5f9;">${data.challenge || "-"}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;">Submission ID</td>
                <td style="padding:12px 16px;background:#ffffff;font-size:13px;color:#64748b;">${submissionId}</td>
              </tr>
            </table>

            <p style="margin:0 0 12px;font-size:12px;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:1px;">What Happens Next?</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="padding:8px 0;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="width:28px;vertical-align:top;padding-top:1px;"><span style="display:inline-block;width:22px;height:22px;background:#0284c7;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:800;color:#ffffff;">1</span></td>
                  <td style="font-size:13px;color:#334155;line-height:1.5;padding-left:8px;"><strong>Review:</strong> Our cloud engineers analyze your environment details.</td>
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
                  <a href="https://zensustech.com" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0284c7,#2563eb);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:999px;letter-spacing:0.5px;">Visit ZensusTech Website</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Direct Contact:</p>
            <a href="mailto:info@zensustech.com" style="font-size:13px;color:#0284c7;font-weight:700;text-decoration:none;">info@zensustech.com</a>
            <p style="margin:10px 0 0;font-size:11px;color:#94a3b8;">&copy; ${new Date().getFullYear()} ZensusTech. All Rights Reserved.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
    `;

    // Send 1: Admin Notification
    await transporter.sendMail({
      from: fromAddress,
      to: mailTo,
      cc: mailCc,
      replyTo: data.email,
      subject: `New Cloud Assessment Request: ${data.company} (${data.fullName})`,
      html: adminHtml,
    });

    // Send 2: User Confirmation Receipt
    if (data.email) {
      await transporter.sendMail({
        from: fromAddress,
        to: data.email,
        replyTo: "no-reply@zensustech.com",
        subject: `We Received Your Cloud Assessment Request - ZensusTech ZenAIOps`,
        html: userHtml,
      });
    }

    return { success: true, submissionId };
  });
