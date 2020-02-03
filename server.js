const express = require('express');
const path = require('path');
var os = require( 'os' );

var networkInterfaces = os.networkInterfaces( );

const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname , 'client/build' )));


app.get('/api/whoiam', (req, res) => {
    const headers = JSON.stringify(req.headers["accept-language"]);
    const ips = JSON.stringify(req.headers.host)
    const soft = JSON.stringify(req.headers["user-agent"]);
    const Ip = JSON.stringify(req.headers['x-forwarded-for']);


    const jsObj = [{
        ipadress: ips,
        language: headers,
        software: soft,
        ip: Ip
    }]
    console.log(networkInterfaces)
    //console.log(jsObj)
    res.json(jsObj)
});

if(process.env.NODE_ENV === "production"){
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
      });
}


app.listen(port, () => console.log(`Listening on port: ${port}`));
