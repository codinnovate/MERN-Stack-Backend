import express, { json } from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import CardModel from './dbCards.js'
import  Cors  from 'cors';

configDotenv()
// App configurations
const app = express()
const port = process.env.Port || 8001

// Middleware
app.use(express.json())
app.use(Cors())
// Db config
mongoose.connect(process.env.MongoUrl)

// API EndPoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/cards', async (req, res) => {
    const post = req.body
    const createPost = new CardModel(post)
    try {
        await createPost.save()
        res.status(201).json(createPost)
    } catch (err) {
        res.status(409).json({message:err.message})
    }
        

})
app.get('/cards', async (req, res) => {
    try {
        const postContents = await CardModel.find()
        res.status(200).json(postContents)
    } catch (err) {
        res.status(404).json(err)
   }

})
// Listener
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))


