const express = require('express')
const db = require('./app/models')

const bootcampRoutes = require('./app/routes/bootcamp.routes.js')
const userRoutes = require('./app/routes/user.routes.js')

const app = express()
const PORT = 3000

app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded())

app.use('/api', userRoutes)
app.use('/api/bootcamp', bootcampRoutes)

app.listen(PORT, () => {
  console.log(`escuchando en http://localhost:${PORT}`)
  db.sequelize.sync()
    .then(() => {
      console.log('connect DDBB success :D')
    })
    .catch(err => console.log(err))
})