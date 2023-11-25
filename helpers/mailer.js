import nodemailer from 'nodemailer';
import config from '../config.js';

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD,
        method: 'LOGIN'
    }
});

export default transporter;
