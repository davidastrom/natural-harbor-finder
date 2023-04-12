import bodyParser from 'body-parser';
import express from 'express';

import auth from './auth.routes';
import harbors from './harbors.routes';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => res.send('Express + TypeScript Server'));

router.use('/api/harbors', harbors);
router.use('/api/auth', auth);

export default router;
