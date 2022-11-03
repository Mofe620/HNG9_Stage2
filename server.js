//STAGE 2 using Express and Body-Parser
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/stage2', (req, res) => {
    res.status(200).send("Nothing to display.");
})

const operationTypes = ['addition', 'subtraction', 'multiplication'];

app.post('/stage2', (req, res) => {
    let x = req.body.x;
    let y = req.body.y;
    let operation = req.body.operation_type.toLowerCase();

    if(isNaN(x) || isNaN(y)){
        res.status(400).send("Numbers required for x and y fields");
    } else if(!operationTypes.includes(operation)){
        res.status(400).send("Please select a valid operation");
    } else {
        let result
        switch(operation){
            case "addition":
                result = x + y;
                break;
            case "subtraction":
                result = x - y;
                break;
            case "multiplication":
                result = x * y;
                break;
            default:
                result = null; 
        }
        const myResponse = {
            "slackUsername": "Mofentan Afinotan",
            "result": result,
            "operation_type": req.body.operation_type
        }
        res.status(201).json(myResponse);
    }
})


const PORT = process.env.PORT || 7000
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST);

if (app.listen) console.log(`Server is listening on ${PORT}`);