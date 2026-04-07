import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
};

function getEnv(name: string): string {
  return process.env[name]?.trim() || "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getMailConfig() {
  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT") || "587");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const from = getEnv("CONTACT_FROM_EMAIL") || user;
  const to = getEnv("CONTACT_TO_EMAIL") || getEnv("SMTP_USER");

  if (!host || !user || !pass || !from || !to || Number.isNaN(port)) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from,
    to
  };
}

export async function sendContactEmail(payload: ContactPayload): Promise<boolean> {
  const config = getMailConfig();

  if (!config) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth
  });

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(payload.phone || "Not provided");
  const safeSource = escapeHtml(payload.source || "portfolio");
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br/>");

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      subject: `New portfolio inquiry from ${payload.name}`,
      replyTo: payload.email,
      text: [
        "New portfolio inquiry",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || "Not provided"}`,
        `Source: ${payload.source || "portfolio"}`,
        "",
        payload.message
      ].join("\n"),
      html: `
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Source:</strong> ${safeSource}</p>
        <hr/>
        <p>${safeMessage}</p>
      `
    });

    return true;
  } catch {
    return false;
  }
}