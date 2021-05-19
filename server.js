const Express = require("express");
const app = Express();
app.use(Express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})




app.listen(8080, () =>  console.log("listening on port 8080"));