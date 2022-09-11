import { latLng } from 'leaflet';

export function DmsToDd(dms: string) {
  const values = dms.match(/\d+(\.*\d+)?/g);
  const dir = dms.match(/[NESW]/);

  if (values?.length !== 3 || dir?.length !== 1) {
    throw new Error('not a valid DMS string');
  }

  const numberValues = values.map((val) => +val);

  const multiplicator = dir[0] === 'S' || dir[0] === 'W' ? -1 : 1;

  return (
    multiplicator *
    (numberValues[0] + numberValues[1] / 60 + numberValues[2] / 3600)
  );
}

export function DdToDms(dd: number, lat: boolean) {
  const dir = dd < 0 ? (lat ? 'S' : 'W') : lat ? 'N' : 'E';
  const deg = (dd < 0 ? (dd = -dd) : dd) | 0;
  const min = (((dd += 1e-9) % 1) * 60) | 0;
  const sec = ((((dd * 60) % 1) * 6000) | 0) / 100;
  return `${deg}°${min}'${sec} ${dir}`;
}

export function StringLocationToDdLocation(lat: string, lng: string) {
  const ddLat = isNaN(+lat) ? DmsToDd(lat) : +lat;
  const ddLng = isNaN(+lng) ? DmsToDd(lng) : +lng;
  return latLng(ddLat, ddLng);
}
