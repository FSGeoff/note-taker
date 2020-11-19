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
			console.log("Hello World", data);
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
	readFileAsync("./db/db.json", "utf8")
		.then((data) => {
			const notesArray = JSON.parse(data);
			let newMessage = req.body;
			// TODO: Read the file.
			// parse the JSON which should be an array
			// push your new note object into the array
			// save the JSON array to the file.
			const newNote = { id: uuidv4(), ...newMessage };
			notesArray.push(newNote);
			writeFileAsync("./db/db.json", JSON.stringify(notesArray))
				.then((data) => {
					const valuesArray = Object.values(newNote);
					console.log(valuesArray);

					return res.json(newNote);
				})
				.catch((err) => {
					throw err;
				});
		})
		.catch((err) => {
			throw err;
		});
});
// Receives a query parameter containing the id of a note to delete
app.delete("/api/notes/:id", (req, res) => {
	let newMessage = req.body;
	readFileAsync("./db/db.json", "utf8").then((data) => {
		const db = JSON.parse(data);
		console.log("DB", db);
		const filteredNotes = db.filter((notes) => notes.id !== req.params.id);
		const finalNote = filteredNotes;
		console.log("74", finalNote);
		writeFileAsync("./db/db.json", JSON.stringify(finalNote))
			.then((data) => {
				console.log(data);
				return res.json(finalNote);
			})
			.catch((err) => {
				throw err;
			});
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
