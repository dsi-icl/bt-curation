const nodemailer = require('nodemailer');
const { MINDY_EMAIL, SITE_RECIPIENTS } = require('./site_people');

/* change this */
const PASSWORD = '';

/* change this */
const RECIPIENTS = [
    SITE_RECIPIENTS[6],
    SITE_RECIPIENTS[5],
    SITE_RECIPIENTS[3],
    SITE_RECIPIENTS[7],
    SITE_RECIPIENTS[8]
]

/* change this */
function formatEmail(siteDesc) {
    return ({
        from: '"Chon Sou" <cs2116@ic.ac.uk>',
        to: siteDesc.team.reduce((a, e) => `${a}${e.email},`, '') + `${MINDY_EMAIL}`,
        subject: 'New corrections needed',
        text: `Dear ${siteDesc.team.reduce((a, e) => `${a}${e.name}, `, '')}
        Please note that there are new corrections (there are only a few) needed on the online spreadsheet under the tab "remaining errors".

        Site ${siteDesc.site}: to access your spreadsheet:
        ${siteDesc.link}

        Some of these are errors that have not been rectified before; some of them are new.

        Please correct the errors by one of the following ways:
        IF YOU HAVE THAT INFORMATION THAT IS MISSING, correct the answer on InForm and then indicate it on the online spreadsheet. These are saved automatically.
        
        IF YOU DO NOT HAVE THE MISSING INFO AND THE QUESTION IS A MAIN QUESTION (NUMBERED), use the comment function (dialog logo on the right) and indicate the reason for incomplete answer ('UNKNOWN', 'NOT DONE') and then indicate it on the online spreadsheet.

        IF YOU DO NOT HAVE THE MISSING INFO AND THE QUESTION IS A SUB QUESTION (not numbered, following 'yes' or 'no'), the system will not let you put unknown or not done to that question. In this case, please leave a comment on the main question stating reason for missing values, and then indicate it on the online spreadsheet.

        Please do not send any attachment but correct the spreadsheet online. This helps us centralise all the admin work. You do not need to click save on the online spreadsheet as it is automatically saved for you.

        Thank you very much.

        Kind regards,
        Chon
        `
    });
}

const email_array = RECIPIENTS.map(e => formatEmail(e));


const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'cs2116@ic.ac.uk',
        pass: PASSWORD
    }
});

const promises = Promise.all(email_array.map(e => transporter.sendMail(e)));
promises.then(res => console.log(res)).catch(err => console.log(err));
