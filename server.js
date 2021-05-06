const Express = require("express");
const app = Express();
app.use(Express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.listen(5000, () =>  console.log("listening on port 5000"));