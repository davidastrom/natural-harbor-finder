import axios from 'axios';
import { LatLng } from 'leaflet';
import { defineStore } from 'pinia';

import { HarborMarker } from '../../types/harborMarker';

import type { FetchHarborIM } from 'types/harborInputModels';
import type { Harbor } from 'types/harborModels';
export const useHarborStore = defineStore({
  id: 'harbors',
  state: () => ({
    harbors: new Map<string, Harbor>(),
    selectedHarbor: null as string | null,
  }),
  getters: {
    getHarborsAsMarkers(state) {
      const harbors = new Array<HarborMarker>();
      state.harbors.forEach((harbor) =>
        harbors.push(
          new HarborMarker(
            new LatLng(harbor.location.lat, harbor.location.lng),
            harbor._id
          )
        )
      );
      return harbors;
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

        this.harbors.clear();
        this.selectedHarbor = null;
        res.data.forEach((harbor) => {
          this.harbors.set(harbor._id, harbor);
        });
      } catch (error) {
        console.log(error);
      }
    },
    selectHarbor(id: string) {
      if (this.harbors.has(id)) {
        this.selectedHarbor = id;
      }
    },
  },
});
