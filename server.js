let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var Schema = require('mongoose').Schema
const fileUpload = require('express-fileupload')


const url = 'mongodb://ustarroz:AT8AfXtv9VQWgLm@ds151753.mlab.com:51753/liverpool';
const dbName = 'liverpool';

mongoose.connect(url, { useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

var products = new Schema({
    name: String,
    nameFile: String,
    price: Number
});

var productos = mongoose.model('products', products);

let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())
app.use(express.static('files'));
app.use(express.static('public'));


app.listen(9000, () => {
    console.log('listening on 9000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/public/products.html');
});


app.get('/all', (req, res) => {
    
    productos.find({},function(err,test){
        res.status(200).send(test)
    })
});

app.post('/send', (req, res) =>{
   db.collection('products').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database');
        

       let file = req.files.file;
       
       file.mv(`./files/${req.body.nameFile}`, err => {
           if (err) return res.status(500).send({ message: err })
           console.log('file upload')
           return res.status(200).send(file)
       });
        
    })

   

    
});




