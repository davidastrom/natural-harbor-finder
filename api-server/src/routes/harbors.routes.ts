import express from 'express';

import { getAllHarbors } from '../controllers/harbors/harbors.controller';

const harbors = express.Router();

harbors.get('/', getAllHarbors);

export default harbors;
