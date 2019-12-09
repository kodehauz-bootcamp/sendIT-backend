const Order = require('../models/order');

module.exports = {
  //simple testing router
   async CreateOrder(request, response) {
     const user = req.user
     //adding the owner id to help know who created the id
    const task = new Task({
      ...req.body,
      owner: user._id
    });

    try {
      const NewOrder = await task.save();
      res.status(201).send({ NewOrder });
    } catch (err) {
      res.status(400).send(err);
    }
   },


  async getOrder (req, res) {
    const match = {};
    const sort = {};

    if (req.query.completed) {
      match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
      //accessing the string query to make your sorting process
      const pathSort = req.query.sortBy.split(':');
      sort[pathSort[0]] = pathSort[1] === 'desc' ? -1 : 1;
    }

    try {
      // const tasks = await Task.find({ owner: userProfile._id })
      await userProfile
        .populate({
          path: 'tasks',
          match,
          options: {
            //this is used for pagination of data pages
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            //this new function helps to sort
            sort
          }
        })
        .execPopulate();

      res.send(userProfile.tasks);
    } catch (e) {
      res.status(400).send(e);
    }
  },


  //This is used to read Task by id
  async getOneOrder (req, res) {
    try {
      const _id = req.params.id;
      // const taskId = await Task.findById(_id);

      const task = await Task.findOne({ _id, owner: userProfile._id });

      if (!task) {
        return res.status(404).send('Error: Message Not Found');
      }

      res.status(200).send({
        Message: 'The Task is Gotten successfully',
        task
      });
    } catch (e) {
      res.status(500).send(e);
    }
  },

  //updating task items
  router.patch('/task/update/:id', auth, async (req, res) => {
    //setting up validation for the keys to be updated
    const updates = Object.keys(req.body);
    const allowableTask = [ 'description', 'completed' ];
    const isValidTask = updates.every((update) => allowableTask.includes(update));

    //Prompt invalid task inputs
    if (!isValidTask) {
      return res.status(404).send(' Error: Invalid Task Input ');
    }

    const _id = req.params.id;

    //Send valid data for update
    try {
      const updatedTask = await Task.findOne({ _id, owner: userProfile._id });
      if (!updatedTask) {
        return res.status(404).send('Task not Found');
      }

      updates.forEach((update) => (updatedTask[update] = req.body[update]));

      await updatedTask.save();

      return res.status(200).send({
        Message: 'Update Successful',
        updatedTask
      });
    } catch (e) {
      console.log(e);
    }
  });

  //deleting a single task
  router.delete('/task/delete/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
      const deletedTask = await Task.findByIdAndDelete({ _id, owner: userProfile._id });

      if (!deletedTask) {
        return res.status(404).send();
      }

      res.send(deletedTask);
    } catch (e) {
      res.status(500).send(e);
    }
  });
}
