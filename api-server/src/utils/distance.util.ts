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

    const dLon = pos2Rad.lng - pos1Rad.lng;
    const dLat = pos2Rad.lat - pos1Rad.lat;

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(pos1Rad.lat) *
            Math.cos(pos2Rad.lat) *
            Math.pow(Math.sin(dLon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    return c * r;
}
