const nodemailer = require('nodemailer');

class XL_GOI_THU_DIEN_TU {
    Goi_Thu_Lien_he(from, to, subject, body) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nguyenkhangg2k@gmail.com', // User gmail
                pass: 'feoirwphsnbbxkyx', // Pwd gmail
            },
        });

        let mailOptions = {
            from: `Shop Silon <${from}>`,
            to: to,
            subject: subject,
            html: body,
        };
        return transporter.sendMail(mailOptions);
    }
}

var Goi_thu = new XL_GOI_THU_DIEN_TU();
module.exports = Goi_thu;
