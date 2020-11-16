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

// HTML Routes

//Returns the notes file
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Returns the index.html files
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API Routes

// * GETs `/api/notes`, reads the  `db.json`
// file and returns all saved notes as JSON.
app.get("/api/notes", (req, res) => {
	fs.readFile("./db/db.json", JSON.stringify(notes), (err) => {
		if (err) {
			throw err;
		} else {
			return res.json(notes);
		}
	});
});

// POSTs `/api/notes` and receives a new note to save
// on the request body, adds it to the `db.json` file,
// and then return the new note to the client.
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
// Receives a query parameter containing the id of a note to delete
app.delete("/api/notes", (req, res) => {
	fs.readFile("./db/db.json", JSON.stringify(notes), (err) => {
		if(err) {
			throw err;
		}else {}
	});
});

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}`);
});
