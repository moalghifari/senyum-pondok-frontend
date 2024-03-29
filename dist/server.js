// server.js

const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')
var enforce = require('express-sslify');
// ^ middleware to redirect all URLs to index.html

const app = express()
const staticFileMiddleware = express.static(path.join(__dirname))

app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)
// ^ `app.use(staticFileMiddleware)` is included twice as per https://github.com/bripkens/connect-history-api-fallback/blob/master/examples/static-files-and-index-rewrite/README.md#configuring-the-middleware

app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/index.html'))
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});