import { MongoClient } from "mongodb";

const url = "mongodb+srv://todoDb:Hutait321@cluster0.yaqtudu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "mern-todo";
export const collectionName = "todo"
const client = new MongoClient(url)
export const connection = async () => {
    const connect = await client.connect()
    return await connect.db(dbName)
}