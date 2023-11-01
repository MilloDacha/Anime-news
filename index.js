import express from "express";
import axios from "axios";
import xml2js from "xml2js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const parser =new xml2js.Parser();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/",async (req,res)=>{
    try {
        const response = await axios.get("https://cdn.animenewsnetwork.com/encyclopedia/reports.xml?id=172&type=anime&nskip=0&nlist=50rs");
        parser.parseString(response.data,(err,result)=>{
            res.render("index.ejs",{data: result.report.item});
        });
    }
    catch (error) {
        console.error("Failed to make request: ",error.message);
        res.render("index.ejs",{error: error.message});
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});