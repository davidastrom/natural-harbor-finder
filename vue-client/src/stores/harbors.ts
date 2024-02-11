import axios from 'axios';
import { Icon, LatLng } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { HarborMarker } from '../../types/harborMarker';

import type { FetchHarborIM } from 'types/harborInputModels';
import type { Harbor } from 'types/harborModels';
import { auth0 } from '@/plugins/auth0';

export const useHarborStore = defineStore({
  id: 'harbors',
  state: () => ({
    harbors: new Map<string, Harbor>(),
    selectedHarbor: null as string | null,
  }),
  getters: {
    getHarborsAsMarkers() {
      const harbors = new Array<HarborMarker>();
      this.harbors.forEach((harbor) =>
        harbors.push(
          new HarborMarker(new LatLng(harbor.location.lat, harbor.location.lng), harbor.id, {
            icon: new Icon({
              iconUrl: icon,
              shadowUrl: iconShadow,
              iconSize: [24, 36],
              iconAnchor: [12, 36],
            }),
          })
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
      const token = await auth0.getAccessTokenSilently();

      try {
        const res = await axios.get<Harbor[]>(url, {
          params: { ...position, shieldedDirections: data.directions, take: data.take },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.harbors.clear();
        this.selectedHarbor = null;
        res.data.forEach((harbor) => {
          this.harbors.set(harbor.id, harbor);
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
    addHarbor(harbor: Harbor) {
      this.harbors.set(harbor.id, harbor);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHarborStore as never, import.meta.hot));
}
