const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname , 'client/build' )));

const jsObj = {
    ipadress: "",
    language: "",
    software: "",
    ip: ""
}

app.get('/', (req,res) => {
    res.send(req.headers.host)
})

app.get('/api/whoiam', (req, res) => {
    const headers = JSON.stringify(req.headers["accept-language"]);
    const ips = JSON.stringify(req.headers.host)
    const soft = JSON.stringify(req.headers["user-agent"]);
    const Ip = (req.ipInfo) 
    console.log(req.ipInfo)

     jsObj.ipadress = `${ips}`;
     jsObj.language = `${headers}`;
     jsObj.software = `${soft}`;
     jsObj.ip = `${Ip}`

    res.json(jsObj)
});

if(process.env.NODE_ENV === "production"){
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
      });
}


app.listen(port, () => console.log(`Listening on port: ${port}`));
