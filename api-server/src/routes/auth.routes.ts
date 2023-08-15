import express from 'express';

import { loginUser } from '../controllers/auth/auth.controller';

const auth = express.Router();

auth.post('/login', loginUser)

export default auth;
