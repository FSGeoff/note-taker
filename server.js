const express = require("express");
const app = express();

PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function () {
	console.log(`App listening on port http://${PORT}`);
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/assets/js/index.html"));
});

app.get("/api/config", (req, res) => {
	res.json({
		success: true,
	});
});
