const prisma = require('../db')

const router = require('express').Router()

router.get('/', (req, res) => {
  prisma.book.findMany()
  res.json('All good in here')
})

const booksRoutes = require('./books.routes')
router.use('/books', booksRoutes)

const authorsRoutes = require('./authors.routes')
router.use('/authors', authorsRoutes)

module.exports = router
