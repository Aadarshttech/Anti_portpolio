'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, message: 'Please fill in all fields.' };
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend testing domain
            to: ['aadarshapandit@gmail.com'],
            subject: `New Message from ${name}`,
            html: `
              <h1>New Contact Form Submission</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
          `,
            replyTo: email,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return { success: false, message: 'Failed to send email. Please try again.' };
        }

        return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
        console.error('Server Error:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
