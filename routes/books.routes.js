const prisma = require('../db')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
  const { title, year, summary, quantity, genre, authorId } = req.body

  const newBookData = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId,
  }

  try {
    // const newBook = await Book.create(newBookData) Mongoose example
    const newBook = await prisma.book.create({ data: newBookData })
    res.status(201).json(newBook)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allBooks = await prisma.book.findMany({ include: { author: true } })
    res.json(allBooks)
  } catch (error) {
    next(error)
  }
})

router.get('/:bookId', async (req, res, next) => {
  try {
    // SELECT * FROM "Book" WHERE id = req.params.bookId;
    const book = await prisma.book.findUnique({
      where: { id: req.params.bookId },
      include: { author: true },
      omit: {
        authorId: true,
      },
    })
    res.json(book)
  } catch (error) {
    next(error)
  }
})

router.put('/:bookId', async (req, res, next) => {
  const { title, year, summary, quantity, genre, authorId } = req.body

  const newBookDetails = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId,
  }

  try {
    // ({ where: { id: req.params.bookId }, data: newBookDetails })
    const updatedBook = await prisma.book.update({
      where: { id: req.params.bookId },
      data: newBookDetails,
    })
    res.status(202).json(updatedBook)
  } catch (error) {
    next(error)
  }
})

router.delete('/:bookId', async (req, res, next) => {
  try {
    // SELECT * FROM "Book" WHERE id = req.params.bookId;
    await prisma.book.delete({
      where: { id: req.params.bookId },
    })
    res.status(204).json()
  } catch (error) {
    next(error)
  }
})

module.exports = router
