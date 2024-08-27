const secretLength = 130;
const serverUrlTemplate = "http://localhost:3000/secret/";

const getCharacter = async (url) => {
  const response = await fetch(url);
  const responseContents = await response.text();
  return responseContents;
};

class TaskProcessor {
  #maxParallelTasks;
  #ongoingTasks;
  #secret;
  constructor(maxParallelTasks) {
    this.#maxParallelTasks = maxParallelTasks;
    this.#ongoingTasks = 0;
    this.#secret = [];
  }

  canProcessTask = () => {
    return this.#ongoingTasks < this.#maxParallelTasks;
  };

  processTask = async (task) => {
    this.#ongoingTasks++;
    let character = "";
    while (character === "") {
      console.log("fetching character indexed", task.index);
      character = await getCharacter(task.url);
    }
    console.log(
      `found character ${character} for task indexed ${task.index} with url ${task.url}`
    );
    this.#secret[task.index] = character;
    this.#ongoingTasks--;
  };

  getSecret = () => {
    return this.#secret;
  };
}

class Task {
  url;
  index;
  constructor(url, index) {
    this.index = index;
    this.url = url;
  }
}

const fetchSecretAsync = async () => {
  const maxParallelTasks = 5;
  let taskQueue = [];
  const taskProcessor = new TaskProcessor(maxParallelTasks);

  // Fill task queue
  for (let i = 0; i < secretLength; ++i) {
    const url = `${serverUrlTemplate}${i + 1}`;
    taskQueue.push(new Task(url, i));
  }
  const taskPromises = [];

  while (taskQueue.length > 0) {
    if (taskProcessor.canProcessTask()) {
      console.log("processor has capacity");
      const task = taskQueue.shift(); // Get and remove the first task from the queue
      const taskPromise = taskProcessor.processTask(task);
      taskPromises.push(taskPromise);
    } else {
      // Wait briefly before checking again if there's capacity
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  await Promise.all(taskPromises);

  const secret = taskProcessor.getSecret();

  console.log("Secret found");
  console.log(secret.join(""));
};

fetchSecretAsync();
