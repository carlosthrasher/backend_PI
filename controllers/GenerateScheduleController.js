const GeneratedSchedule = require('../models/GeneratedSchedule');
const Task = require('../models/Task');
const AvailableTime = require('../models/AvailableTime');

async function generateSchedule(req, res) {
  const { userId } = req.user;

  try {
    const userAvailableTime = await AvailableTime.find({ user: userId }).exec();
    const tasks = await Task.find({ user: userId }).exec();

    const schedule = generateScheduleObject(userAvailableTime, tasks);

    const generatedSchedule = await GeneratedSchedule.create({ user: userId, schedule });
    res.json(generatedSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate schedule' });
  }
}

function generateScheduleObject(userAvailableTime, tasks) {
  const schedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };

  const totalAvailableTime = getTotalAvailableTime(userAvailableTime);

  const difficultTasks = [];
  const mediumTasks = [];
  const easyTasks = [];

  tasks.forEach((task) => {
    if (task.difficulty === 'difficult') {
      difficultTasks.push(task);
    } else if (task.difficulty === 'medium') {
      mediumTasks.push(task);
    } else if (task.difficulty === 'easy') {
      easyTasks.push(task);
    }
  });

  distributeTasks(difficultTasks, 'difficult');
  distributeTasks(mediumTasks, 'medium');
  distributeTasks(easyTasks, 'easy');

  function distributeTasks(tasks, difficulty) {
    const availableTimePerDay = totalAvailableTime / 5;

    tasks.forEach((task) => {
      const allocatedTime = calculateAllocatedTime(task, difficulty, availableTimePerDay);
      if (difficulty === 'difficult') {
        schedule.Monday.push({ ...task, allocatedTime });
        schedule.Tuesday.push({ ...task, allocatedTime });
        schedule.Wednesday.push({ ...task, allocatedTime });
        schedule.Thursday.push({ ...task, allocatedTime });
        schedule.Friday.push({ ...task, allocatedTime });
      } else {
        const randomDay = getRandomDay();
        schedule[randomDay].push({ ...task, allocatedTime });
      }
    });
  }

  function calculateAllocatedTime(task, difficulty, availableTimePerDay) {
    if (difficulty === 'difficult') {
      return Math.min(task.time, availableTimePerDay * 0.5);
    } else if (difficulty === 'medium') {
      return Math.min(task.time, availableTimePerDay * 0.3);
    } else if (difficulty === 'easy') {
      return Math.min(task.time, availableTimePerDay * 0.2);
    }
  }

  function getRandomDay() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const randomIndex = Math.floor(Math.random() * days.length);
    return days[randomIndex];
  }

  return schedule;
}

function getTotalAvailableTime(userAvailableTime) {
  let totalAvailableTime = 0;

  userAvailableTime.forEach((time) => {
    totalAvailableTime += time.time;
  });

  return totalAvailableTime;
}

module.exports = {
  generateSchedule,
};
