const Task = require("../models/Task");

//const authenticateToken = require("../helpers/authenticate-token");

module.exports = class TaskController {
  // Create a new task
  static async createTask(req, res) {
    try {
      const task = new Task({
        user: req.user.id,
        name: req.body.name,
        difficulty: req.body.difficulty,
        hours: req.body.hours,
      });
      await task.save();
      res.status(201).send("Tarefa Criada");
    } catch (error) {
      res.status(500).send("Erro ao criar tarefa");
    }
  }

  // Update a task (/tasks/:id')
  static async updateById(req, res) {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        name: req.body.name,
        difficulty: req.body.difficulty,
        hours: req.body.hours,
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).send("Tarefa não encontrada");
    }
    res.send("Tarefa atualizada");
  }
  catch(error) {
    res.status(500).send("Erro ao atualizar");
  }
  //delete task '/tasks/:id
  static async deleteById(req, res) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!task) {
        return res.status(404).send("Tarefa não encontrada");
      }
      res.send("Tarefa Deletada");
    } catch (error) {
      res.status(500).send("Erro ao deletar");
    }
  }

  static async createSchedule(req, res) {
    try {
      const tasks = await Task.find({ user: req.user.id });
  
      // Calculate the total time for each difficulty level
      let totalEasyTime = 0;
      let totalMediumTime = 0;
      let totalHardTime = 0;
      tasks.forEach(task => {
        if (task.difficulty === 'Fácil') {
          totalEasyTime += task.hours;
        } else if (task.difficulty === 'Médio') {
          totalMediumTime += task.hours;
        } else if (task.difficulty === 'Difícil') {
          totalHardTime += task.hours;
        }
      });
      
      const totalTime = totalEasyTime + totalMediumTime + totalHardTime;
      const easyPercentage = 0.2
      const mediumPercentage = 0.3
      const hardPercentage = 0.5
  
      
      const schedule = {
        easyTasks: [],
        mediumTasks: [],
        hardTasks: []
      };
  
      schedule.easyTasks = tasks
        .filter(task => task.difficulty === 'Fácil')
        .map(task => {
          return {
            ...task.toObject(),
            time: Math.round(easyPercentage * totalTime)
          };
        });
  
      schedule.mediumTasks = tasks
        .filter(task => task.difficulty === 'Médio')
        .map(task => {
          return {
            ...task.toObject(),
            time: Math.round(mediumPercentage * totalTime)
          };
        });
  
      schedule.hardTasks = tasks
        .filter(task => task.difficulty === 'Difícil')
        .map(task => {
          return {
            ...task.toObject(),
            time: Math.round(hardPercentage * totalTime)
          };
        });
  
      res.json(schedule);
    } catch (error) {
      res.status(500).send('Erro ao gerar o cronograma');
    }
  };
};
