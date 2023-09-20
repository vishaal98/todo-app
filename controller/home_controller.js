const todo_list_model = require("../models/tasks");

//dummy data - to test the app when no database available
// const tasks = [
//   {
//     title: "to something",
//     desc: "something to be done",
//     cat: "Personal",
//     date: "12 june 2023",
//     p: "1",
//   },
//  {
//     title: "to something else",
//     desc: "something else to be done again",
//     cat: "Academic",
//     date: "12 December 2023",
//     p: "1",
//   },
// ];

//find all the tasks and display
module.exports.home = async function (req, res) {
  try {
    const tasks = await todo_list_model.find({}).exec();
    res.render("home", {
      title: "TODO LIST",
      todo_list: tasks,
    });
  } catch (err) {
    console.log("Error fetching data", err);
  }
};

//add a task
module.exports.add = function (req, res) {
  try {
    todo_list_model.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log("error creating task: ", err);
  }
};

//delete a task
module.exports.delete = async function (req, res) {
  const tasks_to_delete = req.query;
  const taskIDs = Object.keys(tasks_to_delete);
  if (taskIDs.length == 0) {
    res.redirect("/");
    return;
  }
  for (const id of taskIDs) {
    try {
      await todo_list_model.deleteOne({ _id: id });
    } catch (err) {
      console.log("error deleting task", err);
    }
  }
  return res.redirect("back");
};
