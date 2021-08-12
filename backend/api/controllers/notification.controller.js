const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
	apiKey: '62d479e5',
	apiSecret: '7y7JxbGk121dDg50',
});
const from = 'Test';
const to = '918290695482';
const text = 'A text message sent using the Vonage SMS API';

vonage.message.sendSms(from, to, text, (err, responseData) => {
	if (err) {
		console.log(err);
	} else {
		if (responseData.messages[0]['status'] === '0') {
			console.log('Message sent successfully.');
		} else {
			console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
		}
	}
});
