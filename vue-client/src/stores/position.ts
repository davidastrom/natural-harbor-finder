import { latLng } from 'leaflet';
import { acceptHMRUpdate, defineStore } from 'pinia';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 2000,
  maximumAge: 2000,
};

export const usePositionStore = defineStore({
  id: 'position',
  state: () => ({
    userLong: 0,
    userLat: 0,
  }),
  getters: {
    getUserPosition: (state) => {
      return latLng(state.userLat, state.userLong);
    },
  },
  actions: {
    watchPosition(): number {
      return navigator.geolocation.watchPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLong = position.coords.longitude;
        },
        () => {
          return;
        },
        geolocationOptions
      );
    },
    fetchPositionOnce(
      successFunc: (arg0: GeolocationPosition) => void,
      errorFunc?: () => void
    ) {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLong = position.coords.longitude;
          successFunc(position);
        },
        () => {
          errorFunc ? errorFunc() : null;
        },
        geolocationOptions
      );
    },
    stopWatchingPosition(watchPositionId: number) {
      navigator.geolocation.clearWatch(watchPositionId);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePositionStore as any, import.meta.hot))
}
