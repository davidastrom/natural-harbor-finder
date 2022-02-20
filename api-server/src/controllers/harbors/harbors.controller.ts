import { Request, Response } from 'express';

import { HarborModel } from '../../models/harbors/harbor.model';
import { getAllHarborInputModel } from './harbors.dto';

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
