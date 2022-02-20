import { Position } from '../models/position.model';

export function haversineNautical(pos1: Position, pos2: Position): number {
    return haversineDistance(pos1, pos2, 3440.06479);
}

export function haversineKilometer(pos1: Position, pos2: Position): number {
    return haversineDistance(pos1, pos2, 6371);
}

function haversineDistance(pos1: Position, pos2: Position, r: number): number {
    const pos1Rad = pos1.asRadians();
    const pos2Rad = pos2.asRadians();

    const dLon = pos2Rad.longitude - pos1Rad.longitude;
    const dLat = pos2Rad.latitude - pos1Rad.latitude;

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(pos1Rad.latitude) *
            Math.cos(pos2Rad.latitude) *
            Math.pow(Math.sin(dLon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    return c * r;
}
