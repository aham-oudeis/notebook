const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // allows us to access json from the body

//routes
//get all notes
app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes");
    res.json(allNotes.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get note with id
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const note = await pool.query("SELECT * FROM notes WHERE note_id = $1", [
      id,
    ]);
    res.json(note.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//create a note
app.post("/notes", async (req, res) => {
  try {
    //await
    const { content, author } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (content, author) VALUES ($1, $2) RETURNING *",
      [content, author]
    );

    res.json(newNote.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a note
app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;

    const updateNote = await pool.query(
      "UPDATE notes SET content = $1 WHERE note_id = $2",
      [content, id, author]
    );

    res.json("Note has been updated:", updateNote.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//delete a note
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await pool.query(
      "DELETE FROM notes WHERE note_id = $1",
      [id]
    );
    res.json("Note was successfully deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3002, () => {
  console.log(
    "server is listnening in port 3002: making sure that this is the line"
  );
});
