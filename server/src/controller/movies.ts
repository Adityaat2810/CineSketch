
import { PrismaClient } from "@prisma/client";
import { TryCatch } from "../middleware/error.js";
import ErrorHandler from "../lib/errorHandler.js";
const prisma = new PrismaClient();

export const createMovie = TryCatch(
  async (req, res, next) => {
    const { title, releaseYear, genre, director, difficulty } = req.body;

    if (!title || !releaseYear || !genre || !director || !difficulty) {
      return next(new ErrorHandler('Bad request: missing fields', 400));
    }

    const movie = await prisma.movie.create({
      data: {
        title, releaseYear, genre, director, difficulty
      }
    });

    if (!movie) {
      return next(new ErrorHandler('Internal Error', 500));
    }

    return res.status(201).json({
      data: movie,
      success: true
    });
  }
);

export const getAllMovies = TryCatch(
  async (req, res, next) => {
    const movies = await prisma.movie.findMany();

    if (!movies || movies.length === 0) {
      return next(new ErrorHandler('No movies found', 404));
    }

    return res.status(200).json({
      data: movies,
      success: true
    });
  }
);

export const getMovieById = TryCatch(
  async (req, res, next) => {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: { id }
    });

    if (!movie) {
      return next(new ErrorHandler('Movie not found', 404));
    }

    return res.status(200).json({
      data: movie,
      success: true
    });
  }
);

export const updateMovie = TryCatch(
  async (req, res, next) => {
    const { id } = req.params;
    const { title, releaseYear, genre, director, difficulty, isActive } = req.body;

    const movie = await prisma.movie.update({
      where: { id },
      data: { 
        title, releaseYear, genre, director, difficulty, isActive 
      }
    });

    if (!movie) {
      return next(new ErrorHandler('Movie not found or update failed', 404));
    }

    return res.status(200).json({
      data: movie,
      success: true
    });
  }
);

export const deleteMovie = TryCatch(
  async (req, res, next) => {
    const { id } = req.params;

    const movie = await prisma.movie.delete({
      where: { id }
    });

    if (!movie) {
      return next(new ErrorHandler('Movie not found or delete failed', 404));
    }

    return res.status(200).json({
      message: 'Movie deleted successfully',
      success: true
    });
  }
);
