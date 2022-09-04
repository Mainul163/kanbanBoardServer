const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
var cors = require("cors");
const app = express();
app.use(cors());
let objectId = require("mongodb").ObjectID;
app.use(express.json());

const port = process.env.PORT || 5000;

const uri =
  "mongodb+srv://mainul:0P05xp0SbdIKRWln@cluster0.54j0pvz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const collection = client.db("kanbanBoard").collection("task");

    app.get("/kanbanboard", async (req, res) => {
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/kanbanboard", async (req, res) => {
      const task = req.body;

      const result = await collection.insertOne(task);
      res.send(result);
    });
    app.delete("/kanbanboard/:id", async (req, res) => {
      let taskId = req.params.id;

      const query = { id: parseInt(taskId) };

      const result = await collection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}

async function inprogress() {
  try {
    await client.connect();

    const collection = client
      .db("kanbanBoardInprogress")
      .collection("inprogress");

    app.get("/kanbanboard/inprogress", async (req, res) => {
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/kanbanboard/inprogress", async (req, res) => {
      const task = req.body;

      const result = await collection.insertOne(task);
      res.send(result);
    });

    app.delete("/kanbanboard/inprogress/:id", async (req, res) => {
      let taskId = req.params.id;

      const query = { id: parseInt(taskId) };
      console.log(query);
      const result = await collection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}

async function done() {
  try {
    await client.connect();

    const collection = client.db("kanbanBoardDone").collection("done");

    app.get("/kanbanboard/done", async (req, res) => {
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/kanbanboard/done", async (req, res) => {
      const task = req.body;

      const result = await collection.insertOne(task);
      res.send(result);
    });

    app.delete("/kanbanboard/done/:id", async (req, res) => {
      let taskId = req.params.id;

      const query = { id: parseInt(taskId) };
      console.log(query);
      const result = await collection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);
inprogress().catch(console.dir);
done().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
