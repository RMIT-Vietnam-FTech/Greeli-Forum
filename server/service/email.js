import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "email",
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (receiver, subject, text) => {
	try {
		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: {
				name: "Greeli Forum",
				address: process.env.EMAIL_USERNAME,
			},
			to: receiver, // list of receivers
			subject: subject, // Subject line
			text: text, // plain text body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	} catch (error) {
		console.log(error);
	}
};

// const sendEmail = async() => {
//     try {
//         await transporter.sendMail();
//     } catch(error) {

//     }
// }
