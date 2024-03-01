import nodemailer from "nodemailer"



export const sendMail = async (email, html) => {

    var testAccount = await nodemailer.createTestAccount()
    console.log(testAccount, 'userrrrr')

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        // port: 465,
        // secure: true,
        auth: {
            user: 'tejasveehirapara@gmail.com',
            pass: 'ophn srjw veii npht'
        }
    });
    // Define the email message
    var mailOptions = {
        from: 'tejasveehirapara@gmail.com',
        to: email,
        subject: 'Reset password',
        text: 'reset my password',
        html: html
    };

    try {
        // Send the email
        const data = await transporter.sendMail(mailOptions);
        console.log(data.accepted, 'mailOptions')
        return { success: true, message: 'Email sent successfully' };

    } catch (error) {
        // Handle errors related to email sending
        console.error('Error sending welcome email:', error);
        return { success: false, message: 'Email sending failed' };
    }

}