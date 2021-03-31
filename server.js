var express = require('express')
var bodyParser = require('body-parser')
var app = express() //reference variable
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = Promise

var dbUrl = 'mongodb://localhost:27017/belajar_nodejs'
var Message = mongoose.model('Message', {nama: String, pesan: String}) //schema definition
var BadWord = mongoose.model('BadWord', {value: String}, "badword")

app.get('/pesan', function (req, res) {
    Message.find({}, function (err, pesan) {
        res.send(pesan)
    })
});

app.post('/pesan', async function (req, res) {

    try{
        var message = new Message(req.body)               
        var savedMessage = await message.save()
        console.log('tersimpan!')
        
        await BadWord.find({}, function (err, badwords) {
            if(err) console.log(err)
        
            badwords.forEach(badword => {    
                word = badword.value 
                
                // make regex
                var regex = new RegExp(word.toString(), "ig")                                

                // make censored word
                var censoredword = ""
                var firstletter = 0
                var lastletter = word.length - 1

                if(word.length < 5) {
                    // -- sensor--
                    censoredword = word[firstletter] // show first letter                   
                    for (let index = firstletter + 1; index < lastletter; index++) {
                        censoredword += "*";                
                    }
                    censoredword += word[lastletter]  // show last letter
                }            
                else {
                    // -- sensor--
                    for (let index = firstletter; index <= lastletter; index++) { 
                        if(index % 3 == 0) {
                            censoredword += word[index]                                                
                        }else {                    
                            censoredword += "*";                        
                        }
                    }   
                }       
                                                      
                // replace all badwords to censoredword
                message.pesan = message.pesan.replace(regex, censoredword)                                
            })            
        })        
        await message.save()
        io.emit('pesan', message)    
        res.sendStatus(200)
    }catch (error) {
        res.sendStatus(500)
        return console.log(error)
    }finally {
        console.log('post pesan dipanggil')
    }

});

io.on('connection', function (socket) {
    console.log('a user connected')
})

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    console.log('koneksi ke mongodb berhasil', err)
})

var server = http.listen(3000, function () {
    console.log("port server adalah", server.address().port)
})