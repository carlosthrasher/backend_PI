const express = require('express')
const cors = require('cors')

const UserRoutes = require('./routes/UserRoutes');
const TaskRoutes = require('./routes/TaskRoutes');
const AvailableTimeRoutes = require('./routes/AvailableTimeRoutes');
const GenerateScheduleRoutes = require('./routes/GenerateScheduleRoutes');

const app = express()

app.use(express.json())

app.use(cors({credential: true, origin: 'http//localhost:3000'}))

app.use('/users', UserRoutes)
app.use('/tasks', TaskRoutes);
app.use('/available-time', AvailableTimeRoutes);
app.use('/generated-schedule', GenerateScheduleRoutes);

// Start the server
app.listen(5000)