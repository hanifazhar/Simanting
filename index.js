import express from 'express';
import cors from 'cors';
import router from './routes/pasienRoute.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server berjalan di port 3000")
});

app.get('/', (req, res) => {
    res.send('API Berhasil')
})
