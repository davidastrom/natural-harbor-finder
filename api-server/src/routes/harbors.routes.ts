import express from 'express';

import {
  createHarbor,
  createHarborDetail,
  getAllHarbors
} from '../controllers/harbors/harbors.controller';

const harbors = express.Router();

harbors.get('/', getAllHarbors);
harbors.post('/create', createHarbor);
harbors.post('/harbor/:harborId/createDetail', createHarborDetail);

export default harbors;
