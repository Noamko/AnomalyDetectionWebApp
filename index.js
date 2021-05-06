const Express = require("express");
const app = Express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.listen(500, () =>  console.log("listening on port 5000"));