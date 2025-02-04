const express = require('express')
const router = express.Router()

const prisma = require('../db/index')

//  POST /api/authors  -  Creates a new author
router.post('/', (req, res, next) => {
  const { firstName, lastName, bio } = req.body

  const newAuthor = {
    firstName,
    lastName,
    bio,
  }

  prisma.author
    .create({ data: newAuthor })
    .then(author => {
      console.log('New author created', author)
      res.status(201).json(author)
    })
    .catch(err => {
      console.log('Error creating new author', err)
      res.status(500).json({ message: 'Error creating new author' })
    })
})

router.get('/', async (req, res, next) => {
  try {
    const authors = await prisma.author.findMany({ include: { books: true } })
    res.json(authors)
  } catch (error) {
    next(error)
  }
})

module.exports = router
