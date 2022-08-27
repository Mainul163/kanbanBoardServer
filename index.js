const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri =
  "mongodb+srv://mainul:0P05xp0SbdIKRWln@cluster0.54j0pvz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.close();
});

async function run() {
  try {
    await client.connect();

    const collection = client.db("kanbanBoard").collection("task");
    app.post("/kanbanboard", async (req, res) => {
      const task = req.body;
      const result = await collection.insertOne(task);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// user:mainul
// pass:0P05xp0SbdIKRWln
