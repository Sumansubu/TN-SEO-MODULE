/**
 * Optional SMTP mailer.
 *
 * When SMTP_* variables are not configured (typical local development),
 * `sendPasswordResetEmail` resolves to `false` and callers fall back to a
 * development-only reset link, so the reset flow works without an email server.
 */

export function isSmtpConfigured() {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

export async function sendPasswordResetEmail({ to, fullName, resetUrl }) {
    if (!isSmtpConfigured()) return false;

    const { default: nodemailer } = await import("nodemailer");

    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = port === 465;

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const name = fullName || "there";

    await transport.sendMail({
        from: process.env.SMTP_FROM || `"TN SEO" <${process.env.SMTP_USER}>`,
        to,
        subject: "Reset your TN SEO password",
        text: [
            `Hi ${name},`,
            "",
            "Someone requested a password reset for your TN SEO account.",
            `Open this link to choose a new password (valid for 30 minutes):`,
            resetUrl,
            "",
            "If you didn't request this, you can safely ignore this email.",
        ].join("\n"),
        html: `
            <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#10212b">
                <h2 style="margin:0 0 8px">Hi ${name},</h2>
                <p>Someone requested a password reset for your <strong>TN SEO</strong> account.</p>
                <p>
                    <a href="${resetUrl}"
                       style="display:inline-block;background:#15945d;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold">
                        Reset your password
                    </a>
                </p>
                <p style="color:#69757c;font-size:13px">
                    This link is valid for 30 minutes. If you didn't request this, you can ignore this email.
                </p>
            </div>
        `,
    });

    return true;
}
