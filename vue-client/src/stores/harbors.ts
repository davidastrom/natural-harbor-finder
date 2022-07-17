import axios from 'axios';
import { defineStore } from 'pinia';

import type { Direction } from 'types/direction';
interface FetchHarborIM {
  latitude: number;
  longitude: number;
  directions: Direction[];
}

export const useHarborStore = defineStore({
  id: 'harbors',
  state: () => ({}),
  getters: {},
  actions: {
    async fetchHarbors(data: FetchHarborIM) {
      const position = { latitude: data.latitude, longitude: data.longitude };

      const url = import.meta.env.VITE_API_URL + '/harbors/';

      await axios
        .get(url, { params: { position, shieldedDirections: data.directions } })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
