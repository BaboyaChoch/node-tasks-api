import express, { type Application, type Request, type Response } from 'express';
import { config } from './config/enviroment';
import UserRoute from './route/user.route';

const app: Application = express();
const port: number = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'ok' });
});

app.listen(port, () => {
  console.log(`tasks-api-v1 listening at http://localhost:${port}`);
});
