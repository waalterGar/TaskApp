import express  from 'express';
import cors from 'cors';
import session from "express-session";
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';

import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import trainerRoutes from './routes/trainers.routes.js';
import dietitianRoutes from './routes/dietitian.routes.js';
import athleteRoutes from './routes/atheltes.routes.js';
import routineRoutes from './routes/routines.routes.js';
import trainingSessionRoutes from './routes/trainingSession.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import executionRoutes from './routes/execution.routes.js';
import nutritionalPlanRoutes from './routes/nutritionalPlan.routes.js';
import mealRoutes from './routes/meal.routes.js';
import mealRecordRoutes from './routes/mealRecord.routes.js';

const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use(taskRoutes);
app.use(trainerRoutes);
app.use(dietitianRoutes);
app.use(athleteRoutes);
app.use(routineRoutes);
app.use(trainingSessionRoutes);
app.use(exerciseRoutes);
app.use(executionRoutes);
app.use(nutritionalPlanRoutes);
app.use(mealRoutes);
app.use(mealRecordRoutes);

//app.use(express.static(_dirname, '../client/dist'));

app.listen(PORT);
console.log(`Server on port ${PORT}`);
