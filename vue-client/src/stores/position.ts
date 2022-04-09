import { latLng } from 'leaflet';
import { defineStore } from 'pinia';

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
        (error) => console.log(error)
      );
    },
    async fetchPositionOnce() {
      return new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLat = position.coords.latitude;
            this.userLong = position.coords.longitude;
            resolve();
          },
          (error) => {
            console.log(error);
            reject();
          }
        );
      });
    },
    stopWatchingPosition(watchPositionId: number) {
      navigator.geolocation.clearWatch(watchPositionId);
    },
  },
});
