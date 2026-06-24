import { Resend } from "resend";

export async function POST(request: Request) {
try {
const resend = new Resend(process.env.RESEND_API_KEY);

const body = await request.json();

const { name, phone, email, service, message } = body;

await resend.emails.send({
  from: "Website Quote Request <onboarding@resend.dev>",
  to: ["garythehandyman26@gmail.com"],
  subject: `New Quote Request from ${name}`,
  html: `
    <h2>New Quote Request</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Service:</strong> ${service}</p>

    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});

return Response.json({ success: true });

} catch (error) {
console.error("CONTACT FORM ERROR:", error);

return Response.json(
  {
    success: false,
  },
  { status: 500 }
);
}
}
