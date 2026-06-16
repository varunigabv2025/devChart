import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },

  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  },

  assignedTo: {
    type: String,
    default: "Unassigned",
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  dueDate: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task =
  mongoose.models.Task ||
  mongoose.model("Task", TaskSchema);

export default Task;