const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'shayanzarabadipour@gmail.com',
        subject: 'thanks for joining us'+name+'!',
        text: `welcome to app ${name}. let me know how you get along with the app`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'shayanzarabadipour@gmail.com',
        subject: 'good by '+name,
        text: 'how can we keep you on board?!'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}