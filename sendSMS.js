

require('dotenv').config();
const africastalking = require('africastalking');

const credentials = {
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_USERNAME
};

const AT = africastalking(credentials);
const sms = AT.SMS;

module.exports = async function sendSMS(to, message) {
    try {
        const response = await sms.send({
            to: [to],
            message: message
        });
        return response;
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
};
