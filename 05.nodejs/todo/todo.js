const fs = require("fs");
const filePath = "./tasks.json";

const command = process.argv[2];
const argument = process.argv[3];

const loadTasks = () => {
  try {
    const dataBuffers = fs.readFileSync(filePath);
    const dataJSON = dataBuffers.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const listTasks = () => {
  const tasks = loadTasks();

  tasks.forEach((task, i) => {
    console.log(`${i + 1}: ${task.task}`);
  });
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added ", task);
};

const removeTask = (i) => {
  const tasks = loadTasks();
  tasks.splice(i - 1, 1);
  saveTasks(tasks);
};

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command Not Found !");
}
