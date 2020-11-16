const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [
	{
		test: "Success",
	},
];

app.get("/api/notes", (req, res) => {
	// read file
	fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
		if (err) {
			throw err;
		} else {
			return res.json(notes);
		}
	});
	// return res.json(notes)
});

app.get("/api/config", (req, res) => {
	res.json({
		success: true,
	});
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
	let newMessage = req.body;
	res.json(notes);
	fs.writeFile("./db/db.json", JSON.stringify(newMessage), (err) => {
		if (err) {
			throw err;
		} else {
			return res.json(newMessage);
		}
	});
	notes.push(newMessage);
});

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}`);
});
