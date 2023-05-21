const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors({credential: true, origin: 'http//localhost:3000'}))

//routes
const TaskRoutes = require('./routes/TaskRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use('/tasks', TaskRoutes)
app.use('/users', UserRoutes)
//app.use('/users', UserRoutes)
app.listen(5000,() => console.log("Serve On, port:5000"))