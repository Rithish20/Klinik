var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/Klinik', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to the database"));
db.once('open', () => console.log("Connected to the database"));


app.post("/signup", (req, res) => {
    var Username = req.body.Username;
    var email = req.body.email;
    var subject = req.body.subject;
    var message  = req.body.message;
    var data = {
        "username": Username,
        "email": email,
        "subject": subject,
        "message": message 
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Successfully:", collection.insertedId);
        return res.redirect('confirm.html');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('contact.html');
});

app.listen(3030, () => {
    console.log("Listening on PORT 3030");
});