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
app.get('/', function (req, res) 
{
	res.send('Hello world, I am a chat bot')
})

let token = "EAACrDNc3L0IBAHkcTKZC8xbZBDenZCo0217g30PZCGPoSaK8SzsmQRg5wei4kdMIC0KC6C7ZBI4n3MYHmX99vkIQdkNOP8g8ZA3uBTd42p5Ch88rhEPEHu7cn1bFhzZCyXTE8aTHmYPqEqHjazzDg31eI0ZCxIPiQ7oVYk6oTg1K4UGOLU4v3OAZB"

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'allenvargas') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post('/webhook/', function(req, res)
{
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++)
	{
		let event = messaging_events[i]
		let sender = event.sender.id
		if(event.message && event.message.text)
		{
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0,100))
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text)
{
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token : token},
		method: "POST",
		json:{
			recipient: {id: sender},
			message: messageData,
		}
	}, 
	function(error, response, body)
	{
		if(error)
		{
			console.log("sending error")
		}
		else if(response.body.error)
		{
			console.log("response body error")
		}
	})
}

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port')
})