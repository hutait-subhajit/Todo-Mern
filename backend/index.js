import express from "express"
import cors from "cors"
import { collectionName, connection } from "./dbconfig.js"
import { ObjectId } from "mongodb"


const app = express()
app.use(express.json())
app.use(cors())

app.post("/add-task", async (req, res) => {
    const db = await connection()
    const collection = await db.collection(collectionName)
    const result = await collection.insertOne(req.body)
    if (result) {
        res.send({
            message: "new Task Added",
            success: true,
            result
        })
    } else {
        res.send({
            message: "new Task not Added",
            success: false
        })
    }
})

app.get("/tasks", async (req, res) => {
    const db = await connection()
    const collection = await db.collection(collectionName)
    const result = await collection.find().toArray();
    if (result) {
        res.send({ message: "Task  List Fetch Successfully", success: true, result })
        console.log(result)
    } else {
        res.send({ message: "Try again After Some Time", success: false })
    }
})

app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    const db = await connection();
    const collection = await db.collection(collectionName)
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id) });
    if (result) {
        res.send({ message: "Task deleted Successfully", success: true, result: result })
        console.log(result)
    } else {
        res.send({ message: "Try again After Some Time", success: false })
    }
})

app.delete("/delete-mul", async (req, res) => {
    const Ids = req.body.ids;
    // console.log(Ids)
    const deleteTaskIds = Ids.map(item => new ObjectId(item))
    const db = await connection();
    const collection = await db.collection(collectionName)
    const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })
    if (result) {
        res.send({ message: "Task deleted", success: true, result })
    } else {
        res.send({ message: "Something went wrong!", success: false })
    }

})
// update Start
app.get("/task/:id", async (req, res) => {
    const id = req.params.id;
    const db = await connection();
    const collection = await db.collection(collectionName)
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (result) {
        res.send({ message: "One Data Fetched Successfully", success: true, result: result })
        console.log(result)
    } else {
        res.send({ message: "Try again After Some Time", success: false })
    }
})

app.put("/task-update", async (req, res) => {
    const db = await connection()
    const collection = await db.collection(collectionName)
    const { _id, ...fields } = req.body;
    const update = { $set: fields }
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, update)
    if (result) {
        res.send({ message: "Task update Successfully", success: true })
    } else {
        res.send({ message: "error try after sometime", success: false })
    }
})
//

app.get("/", (req, res) => {
    res.send({
        message: "Api Thik ache",
        success: true
    })
})

app.listen(3200)