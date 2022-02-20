import { Direction } from '../../models/enums/direction';
import { Position } from '../../models/position.model';

export interface getAllHarborInputModel {
    position?: Position;
    shieldedDirections?: Direction[];
    take?: number;
}
