import bodyParser from 'body-parser';
import express from 'express';

import api from './api';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => res.send('Express + TypeScript Server'));

router.use('/api', api);

export default router;
