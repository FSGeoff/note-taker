const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");
const app = express();

PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const notes = [
	{
		test: "Success",
	},
];

// API Routes

// * GETs `/api/notes`, reads the  `db.json`
// file and returns all saved notes as JSON.
app.get("/api/notes", (req, res) => {
	readFileAsync("./db/db.json", "utf8")
		.then((data) => {
			console.log(data);
			return res.json(JSON.parse(data));
		})
		.catch((err) => {
			throw err;
		});
});

// POSTs `/api/notes` and receives a new note to save
// on the request body, adds it to the `db.json` file,
// and then return the new note to the client.
app.post("/api/notes", (req, res) => {
	let newMessage = req.body;
	// TODO: Read the file.
	// parse the JSON which should be an array
	// push your new note object into the array
	// save the JSON array to the file.
	const newNote = { id: uuidv4(), ...newMessage };
	writeFileAsync("./db/db.json", JSON.stringify(newNote))
		.then((data) => {
			const value = Object.values(newMessage);
			console.log(value);

			return res.json(JSON.stringify(value));
		})
		.catch((err) => {
			throw err;
		});
});
// Receives a query parameter containing the id of a note to delete
app.delete("/api/notes/:id", (req, res) => {
	const iD = req.params.id;
	const filteredNotes = newNote.filter((id) => newNote.id !== iD);
	fs.writeFileAsync("./db/db.json", filteredNotes)
		.then((data) => {
			return res.json(data);
		})
		.catch((err) => {
			throw err;
		});
});

// HTML Routes

//Returns the notes file
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Returns the index.html files
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}`);
});
