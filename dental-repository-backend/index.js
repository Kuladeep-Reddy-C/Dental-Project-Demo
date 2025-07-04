import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import testingRoutes from './routes/testing.route.js';
import rolesRoutes from './routes/roles.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


//Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());



app.use('/', testingRoutes);
app.use('/api/user-role', rolesRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
