const express = require("express");
const path = require("path");
const app = express();


PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/config", (req, res) => {
	res.json({
		success: true,
	});
});

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}`);
});
