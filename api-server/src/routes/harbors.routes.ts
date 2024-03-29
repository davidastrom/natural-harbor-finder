import express from 'express';

import {
    createHarbor,
    getAllHarbors,
    updateHarbor,
} from '../controllers/harbors/harbors.controller';
import { checkRequiredPermissions } from '../middleware/auth0.middleware';
import { AuthPermissions } from '../types/enums/authPermissions';

const harbors = express.Router();

harbors.get(
    '/',
    checkRequiredPermissions([AuthPermissions.ReadHarbors]),
    getAllHarbors
);
harbors.post(
    '/create',
    checkRequiredPermissions([AuthPermissions.EditHarbors]),
    createHarbor
);
harbors.put(
    '/harbor/:harborId/update',
    checkRequiredPermissions([AuthPermissions.EditHarbors]),
    updateHarbor
);

export default harbors;
