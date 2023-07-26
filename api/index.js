
import express, { json } from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import CardModel from '../dbCards.js'
import Cors from 'cors';
configDotenv()


const app = express()
mongoose.connect(process.env.MongoUrl)

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).send("Hello TheWebDev")
});

app.get('/cards', async (req, res) => {
     res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
 
    try {
        const postContents = await CardModel.find()
        res.status(200).json(postContents)
    } catch (err) {
        res.status(404).json(err)
   }

})

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

export default app