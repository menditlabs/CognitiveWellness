import { Resend } from "resend";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === "/api/contact" && request.method === "POST") {
            try {
                const formData = await request.formData();

                const name = formData.get("name")?.toString().trim();
                const email = formData.get("email")?.toString().trim();
                const message = formData.get("message")?.toString().trim();

                if (!name || !email || !message) {
                    return Response.json(
                        { error: "Please complete all required fields." },
                        { status: 400 }
                    );
                }

                const resend = new Resend(env.RESEND_API_KEY);

                const { data, error } = await resend.emails.send({
                    from: "Cognitive Wellness Solutions <website@cognitivewellnesssolutions.com>",
                    to: ["jennifer@cognitivewellnesssolutions.com"],
                    replyTo: email,
                    subject: `Website Contact Form — ${name}`,
                    text: `
Name: ${name}
Email: ${email}

Message:
${message}
                    `.trim()
                });

                if (error) {
                    console.error("Resend error:", error);

                    return Response.json(
                        { error: "Unable to send message." },
                        { status: 500 }
                    );
                }

                return Response.json({
                    success: true,
                    id: data?.id
                });

            } catch (error) {
                console.error("Contact form error:", error);

                return Response.json(
                    { error: "Unable to send message." },
                    { status: 500 }
                );
            }
        }

        return env.ASSETS.fetch(request);
    }
};