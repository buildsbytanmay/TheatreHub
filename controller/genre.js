import Genre from "../models/genre.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";
const router = express.Router();

/**
 * Get all genres.
 * @route GET /api/genres
 * @returns {object[]} An array of genre objects.
 * @throws {Error} If an error occurs while fetching the genres.
 */
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

/**
 * Add a new genre.
 * @route POST /api/genres
 * @param {string} name - The name of the genre.
 * @returns {object} A success message if the genre is added successfully.
 * @throws {Error} If the genre already exists or an error occurs while saving the genre.
 */
router.post("/", checkAuth, checkAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const isGenreExists = await Genre.findOne({ name });

    if (isGenreExists) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const newGenre = new Genre({ name });
    await newGenre.save();

    res.status(201).json({ message: "Genre added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add genre", message: error.message });
  }
});

/**
 * Update a genre by its ID.
 * @route PATCH /api/genres/:id
 * @param {string} id - The ID of the genre to update.
 * @returns {object} A success message and the updated genre object.
 * @throws {Error} If the genre is not found or an error occurs while updating.
 */
router.patch("/:id", checkAuth, checkAdmin, async (req, res) => {
  try {
    const updateGenre = await Genre.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Genre updated successfully", updateGenre });
  } catch (err) {
    res.status(500).json({ err: `Something went wrong: ${err}` });
  }
});

/**
 * Delete a genre by its ID.
 * @route DELETE /api/genres/:id
 * @param {string} id - The ID of the genre to delete.
 * @returns {object} A success message and the deleted genre object.
 * @throws {Error} If the genre is not found or an error occurs while deleting it.
 */
router.delete("/:id", checkAuth, checkAdmin, async (req, res) => {
  try {
    const deleteGenre = await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Genre deleted successfully", deleteGenre });
  } catch (err) {
    res.status(500).json({ err: `Something went wrong: ${err}` });
  }
});

export default router;
