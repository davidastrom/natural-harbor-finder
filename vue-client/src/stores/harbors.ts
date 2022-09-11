import axios from 'axios';
import { LatLng, Marker } from 'leaflet';
import { defineStore } from 'pinia';

import type { FetchHarborIM } from 'types/harborInputModels';
import type { Harbor } from 'types/harborModels';

export const useHarborStore = defineStore({
  id: 'harbors',
  state: () => ({
    harbors: [] as Harbor[],
  }),
  getters: {
    getHarborsAsMarkers(state) {
      return state.harbors.map(
        (harbor) =>
          new Marker(new LatLng(harbor.location.lat, harbor.location.lng))
      );
    },
  },
  actions: {
    async fetchHarbors(data: FetchHarborIM) {
      let position;

      if (data.lat && data.lng) {
        position = { lat: data.lat, lng: data.lng };
      }
      const url = import.meta.env.VITE_API_URL + '/harbors/';

      try {
        const res = await axios.get<Harbor[]>(url, {
          params: { ...position, shieldedDirections: data.directions },
        });

        this.harbors = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
