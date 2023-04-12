import express from 'express';

import { loginGoogle } from '../controllers/auth/auth.google.controller';

const auth = express.Router();

auth.post('/google/login', loginGoogle);

export default auth;
