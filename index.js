'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

let token = "EAACrDNc3L0IBAJT9tUbsse0fkCuk0F3grQTjF8Y72KRoC5im8qe7lBbe8J8s9DmGZB16eBDxDfTeOdRGv3eTs5RZCpYBtrEyrZC4inooPMZBf7OT89NUt6qi1XrO6jNfq2PXNgXFsAZBZBskq6SBCSHo2fh6xU80shpUdGSZBbRIKhZCBdFpA9Eb"

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'allenvargas') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post('/webhook', function(req, res)){
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++)
	{
		let event = messaging_events[i]
		let sender = event.sender.id
		if(event.message && event.message.text){
			let text = event.message.text
			sendText(sender, "Text echo: "+text.substring(0,100))
		}
	}
	res.sendStatus(200)
})

function sendText(sender, test){
	let messageData = {text: text}
	request({
		url:https://graph.facebook.com/v2.6/me/messages",
		qs : {acess_token, token},
		methond: "POST",
		json: {
			receipt: {id: sender},
			message: messageData
		}
	}, function(error, response, body){
		if(error){
			console.log("sending error")
		}else if(response.body.error){
			console.log("response body error")
		}
	})
}

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})