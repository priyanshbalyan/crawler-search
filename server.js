const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Config = require('./config');
const cors = require('cors');
const app = express();
const path = require('path');

const request = require('request');
const scrapeit = require('scrape-it')
const Repo = require('./models/repo');
const router = require('./routes/api');

const url = Config.MONGO_URI;

mongoose.connect(url, { useNewUrlParser:true, useCreateIndex:true });
let db = mongoose.connection;
db.once('open', ()=> {
    console.log("connected to the database");
    // populate();
});
db.on('error', err=> console.log("MONGODB ERROR:",err.message));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "client", "build")));
app.use('/', router);

process.on('uncaughtException', err=>console.log("Uncaught Exception:", err));
process.on('unhandledRejection', err=>console.log("Unhandled Rejection:", err));


let API_PORT = Config.API_PORT;
app.listen(API_PORT, ()=>{ console.log(`Listening at port: ${API_PORT}`) });


function crawl(url){
    return scrapeit(url, {
        searches:{
            listItem: ".repo-list-item",
            data:{
                title: "h3",
                description: "p.col-12",
                language: ".mr-3 > span",
                stars: ".pl-2 > .muted-link",
                link: {
                    selector: ".v-align-middle",
                    attr: "href"
                },
                tags:  {
                    listItem:".topic-tag"
                }
            }
        }
    });
}

async function populate(pages=5, curpage=1){

    console.log("Populating database");
    for(let p=curpage; p<=pages; p++){
        console.log("page", p);
        let { data } = await crawl('https://github.com/search?o=desc&q=nodejs&s=updated&type=Repositories&p='+p)
        data = data.searches;
        // console.log("trigger", data.length, p);
        if(data.length==0) return setTimeout(()=>{ populate(pages, p); }, 5000);

        for(let i=0; i<data.length; i++){
            // console.log(i, data[i]);
            let newrepo = new Repo(data[i]);
            try{
                await newrepo.save();
            }
            catch(err){ console.log(err.message) }
        }
    }
    console.log("successfully populated database");

}