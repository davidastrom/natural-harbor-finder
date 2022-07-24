import axios from 'axios';
import { defineStore } from 'pinia';

import type { FetchHarborIM } from 'types/harborInputModels';

export const useHarborStore = defineStore({
  id: 'harbors',
  state: () => ({}),
  getters: {},
  actions: {
    async fetchHarbors(data: FetchHarborIM) {
      let position;

      if (data.lat && data.lng) {
        position = { lat: data.lat, lng: data.lng };
      }

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
