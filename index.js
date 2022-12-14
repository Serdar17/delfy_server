require('dotenv').config();
const express = require('express');
const authRouter = require('./router/authRouter')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log('DB Connected!'))
        .catch((err) => console.log(err));
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}
start();