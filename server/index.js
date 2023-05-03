const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express()
const port = 3080

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    console.log("Hello");

    res.json({
        data: "Puta Espanya",
    })
})

app.post('/', async (req,res) => {

    const {message} = req.body;
    console.log(message);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `${message}`}],
    });
    
    res.json({
        message: completion.data.choices[0].message.content,
    })
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
