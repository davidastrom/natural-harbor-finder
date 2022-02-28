import { Request, Response } from 'express';

import { Harbor, HarborModel } from '../../models/harbors/harbor.model';
import {
  createHarborDetailInputModel,
  createHarborInputModel,
  getAllHarborInputModel
} from './harbors.dto';

export async function getAllHarbors(
    req: Request,
    res: Response
): Promise<void> {
    const input = req.body as getAllHarborInputModel;
    const harbors = await HarborModel.getHarbors(
        input.position,
        input.shieldedDirections,
        input.take
    );
    res.send(harbors);
}

export async function createHarbor(req: Request, res: Response): Promise<void> {
    const input = req.body as createHarborInputModel;
    const harbor = new HarborModel(input);
    await harbor.save();
    res.send(harbor as Harbor);
}

export async function createHarborDetail(
    req: Request,
    res: Response
): Promise<void> {
    const harborId = req.params.harborId;
    const harbor = await HarborModel.findById(harborId);
    if (!harbor) {
        throw new Error(`Harbor with id ${harborId} does not exist`);
    }
    const input = req.body as createHarborDetailInputModel;
    harbor.details.push(input);
    await harbor.save();
    res.send(harbor as Harbor);
}
