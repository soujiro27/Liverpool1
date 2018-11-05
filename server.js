let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const fileUpload = require('express-fileupload')

const url = 'mongodb://ustarroz:AT8AfXtv9VQWgLm@ds151753.mlab.com:51753/liverpool';
const dbName = 'liverpool';

mongoose.connect(url, { useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())


app.listen(9000, () => {
    console.log('listening on 9000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/css/style.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/style.css');
});

app.get('/public/js/Home.js', (req, res) => {
    res.sendFile(__dirname + '/public/js/Home.js');
});


app.post('/send', (req, res) =>{
    db.collection('products').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })

    
    let nameFile = Date.now();


    let file = req.files.file
    console.log(file);
    file.mv(`./files/${file.name}`, err => {
        if (err) return res.status(500).send({ message: err })

        return res.status(200).redirect('/')
    })
});




