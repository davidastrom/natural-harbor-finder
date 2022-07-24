import { Direction } from 'types/direction';
import { HarborType } from 'types/harborType';

export function directionValues() {
  const values = Object.entries(Direction)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([text, value]) => isNaN(Number(value)) === false)
    .map(([text, val]) => {
      return {
        value: val,
        label: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
      };
    });
  return values;
}

export function harborTypeValues() {
  const values = Object.entries(HarborType)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([text, value]) => isNaN(Number(value)) === false)
    .map(([text, val]) => {
      return {
        value: val,
        label: (
          text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        ).replace(/_/g, ' '),
      };
    });
  return values;
}
