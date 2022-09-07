const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(express.json()); // allows us to access json from the body
app.use(cors());

//routes
//get all anecdotes
app.get("/anecdotes", async (req, res) => {
  try {
    const allAnecdotes = await pool.query("SELECT * FROM anecdotes");
    res.json(allAnecdotes.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get note with id
app.get("/anecdotes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const note = await pool.query(
      "SELECT * FROM anecdotes WHERE note_id = $1",
      [id]
    );
    res.json(note.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//create a note
app.post("/anecdotes", async (req, res) => {
  try {
    //await
    const { content, author } = req.body;
    const newNote = await pool.query(
      "INSERT INTO anecdotes (content, author) VALUES ($1, $2) RETURNING *",
      [content, author]
    );

    res.json(newNote.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a note
app.put("/anecdotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { votes } = req.body;

    const updateNote = await pool.query(
      "UPDATE anecdotes SET votes = $1 WHERE note_id = $2 RETURNING *",
      [votes, id]
    );

    res.status(200).json(updateNote.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//delete a note
app.delete("/anecdotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM anecdotes WHERE note_id = $1", [id]);
    res.status(200).json("Note was successfully deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3002, () => {
  console.log(
    "server is listnening in port 3002: making sure that this is the line"
  );
});
