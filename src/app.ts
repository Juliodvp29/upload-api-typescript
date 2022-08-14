import express from 'express';
import morgan from 'morgan';
import router from './routes/index';
import path from 'path';
import cors from 'cors';

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

const allowDomain = 'http://localhost:5173';

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: allowDomain,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));





// routes
app.use('/api', router);

// folder for images
app.use('/uploads', express.static(path.resolve('uploads')));
export default app;