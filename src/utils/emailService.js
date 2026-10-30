import { Resend } from "resend";

// Initialize Resend only when an email needs to be sent.
let resendClient;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing from backend/.env");
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

// Escape user-provided text before inserting it into HTML emails.
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function formatDate(value) {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not specified";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Shared email sender.
// Email failures are logged but do not crash the booking workflow.
async function sendEmail({ to, subject, html }) {
  const resend = getResendClient();

  if (!resend) return false;

  const from = process.env.EMAIL_FROM || "FitNRI <onboarding@resend.dev>";

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("FitNRI email failed:", error.message);
      return false;
    }

    console.log("FitNRI email sent successfully:", data?.id);
    return true;
  } catch (error) {
    console.error("FitNRI email error:", error.message);
    return false;
  }
}

// 1. Notify the admin when a client submits a consultation form.
export async function sendNewConsultationNotification(consultation) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!adminEmail) {
    console.error("ADMIN_NOTIFICATION_EMAIL is missing from backend/.env");
    return false;
  }

  const name = escapeHtml(consultation.fullName);
  const email = escapeHtml(consultation.email);
  const whatsapp = escapeHtml(consultation.whatsapp);
  const country = escapeHtml(consultation.country);
  const plan = escapeHtml(consultation.plan);
  const preferredDate = escapeHtml(formatDate(consultation.preferredDate));
  const preferredTime = escapeHtml(consultation.preferredTime);
  const goal = escapeHtml(consultation.goal).replace(/\n/g, "<br>");

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;color:#17231d;line-height:1.6">
        <div style="max-width:600px;margin:auto;padding:24px">
          <h1 style="color:#527d27">FitNRI</h1>
          <h2>New consultation request</h2>

          <p>A client has submitted a consultation request.</p>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px;border-bottom:1px solid #ddd"><strong>Name</strong></td>
              <td style="padding:10px;border-bottom:1px solid #ddd">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #ddd"><strong>Email</strong></td>
              <td style="padding:10px;border-bottom:1px solid #ddd">${email}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #ddd"><strong>WhatsApp</strong></td>
              <td style="padding:10px;border-bottom:1px solid #ddd">${whatsapp}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #ddd"><strong>Country</strong></td>
              <td style="padding:10px;border-bottom:1px solid #ddd">${country}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #ddd"><strong>Plan</strong></td>
              <td style="padding:10px;border-bottom:1px solid #ddd">${plan}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #ddd"><strong>Preferred date</strong></td>
              <td style="padding:10px;border-bottom:1px solid #ddd">${preferredDate}</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #ddd"><strong>Preferred time</strong></td>
              <td style="padding:10px;border-bottom:1px solid #ddd">${preferredTime}</td>
            </tr>
          </table>

          <h3>Fitness goal</h3>
          <p>${goal}</p>

          <p style="color:#777;font-size:12px">
            This notification was generated automatically by FitNRI.
          </p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New FitNRI consultation — ${consultation.fullName}`,
    html,
  });
}

// 2. Notify the client when their consultation is confirmed.
export async function sendConsultationConfirmation(consultation) {
  const clientEmail = consultation.email;

  if (!clientEmail) {
    console.error("Cannot send confirmation: client email is missing.");
    return false;
  }

  const name = escapeHtml(consultation.fullName);
  const preferredDate = escapeHtml(formatDate(consultation.preferredDate));
  const preferredTime = escapeHtml(consultation.preferredTime);

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;color:#17231d;line-height:1.6">
        <div style="max-width:600px;margin:auto;padding:24px">
          <h1 style="color:#527d27">FitNRI</h1>

          <h2>Your consultation is confirmed!</h2>

          <p>Hi ${name},</p>

          <p>
            Your FitNRI consultation has been confirmed.
            Here are your appointment details:
          </p>

          <div style="background:#f3f7ee;padding:18px;border-radius:10px">
            <p><strong>Date:</strong> ${preferredDate}</p>
            <p><strong>Time:</strong> ${preferredTime}</p>
          </div>

          <p>
            Please keep your preferred time available.
            If you need to discuss your booking, reply to this email
            or contact the FitNRI team.
          </p>

          <p>Thank you,<br />FitNRI Team</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: clientEmail,
    subject: "Your FitNRI consultation is confirmed",
    html,
  });
}
