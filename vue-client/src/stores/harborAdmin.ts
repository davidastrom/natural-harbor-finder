import { defineStore } from 'pinia';
import type { Harbor } from 'types/harborModels';
import { useHarborStore } from './harbors';
import { auth0 } from '@/plugins/auth0';
import type { ManageHarborFormModel, ManageHarborInputModel } from 'types/harborInputModels';
import { StringLocation } from 'types/stringLocation';
import { HarborType } from 'types/harborType';
import { StringLocationToDdLocation } from '@/helpers/locationHelpers';
import axios from 'axios';

export const NEW_HARBOR_ID = 'newHarbor';

export const useHarborAdminStore = defineStore({
  id: 'harborAdmin',
  state: () => ({
    harborStates: new Map<string, ManageHarborFormModel>(),
    currentHarbor: null as ManageHarborFormModel | null,
  }),
  actions: {
    selectHarbor(id: string) {
      const harborStore = useHarborStore();
      if (this.currentHarbor) {
        if (this.currentHarbor.id === id) {
          return;
        }
        this.harborStates.set(this.currentHarbor.id, this.currentHarbor);
      }

      if (this.harborStates.has(id)) {
        this.currentHarbor = this.harborStates.get(id) ?? null;
        return;
      }

      if (id === NEW_HARBOR_ID) {
        this.currentHarbor = {
          id: NEW_HARBOR_ID,
          name: '',
          details: [],
          location: new StringLocation(),
          chartNumber: 0,
          harborType: 0,
          hasBookRef: false,
          book: {
            title: '',
            page: 0,
            ref: '',
          },
        };
        return;
      }

      const harbor = harborStore.harbors.get(id);
      if (harbor) {
        this.currentHarbor = {
          ...harbor,
          location: new StringLocation(harbor.location.lat, harbor.location.lng),
          hasBookRef: !!harbor.book,
          book: harbor.book ?? {
            title: '',
            page: 0,
            ref: '',
          },
          details: harbor.details.map((detail) => ({
            ...detail,
            hasSpecificHarborType: !!detail.harborType,
            harborType: detail.harborType ?? HarborType.NATURAL,
            hasSpecificLocation: !!detail.location,
            location: detail.location
              ? new StringLocation(detail.location.lat, detail.location.lng)
              : new StringLocation(),
          })),
        };
      }
    },

    prepareNewHarbor() {
      this.selectHarbor(NEW_HARBOR_ID);
    },

    addHarborDetail() {
      if (!this.currentHarbor) {
        return;
      }
      this.currentHarbor.details.push({
        name: '',
        shieldedDirections: [],
        anchor: false,
        sxkBuoy: false,
        hasSpecificLocation: false,
        location: new StringLocation(),
        hasSpecificHarborType: false,
        harborType: HarborType.NATURAL,
      });
    },

    removeHarborDetail(index: number) {
      if (!this.currentHarbor) {
        return;
      }
      this.currentHarbor.details.splice(index, 1);
    },

    clearHarborData(id: string = NEW_HARBOR_ID) {
      this.harborStates.delete(id);
      if (this.currentHarbor?.id === id) {
        this.currentHarbor = null;
      }
    },

    async submitHarbor() {
      if (!this.currentHarbor) {
        return;
      }

      const harbor = this.currentHarbor;
      let res: Harbor | null = null;

      const harborInput: ManageHarborInputModel = {
        ...harbor,
        id: harbor.id === NEW_HARBOR_ID ? undefined : harbor.id,
        location: StringLocationToDdLocation(harbor.location.lat, harbor.location.lng),
        details: harbor.details.map((detail) => ({
          ...detail,
          id: detail.id === NEW_HARBOR_ID ? undefined : detail.id,
          location: detail.hasSpecificLocation
            ? StringLocationToDdLocation(detail.location?.lat ?? '0', detail.location?.lng ?? '0')
            : undefined,
          harborType: detail.hasSpecificHarborType ? detail.harborType : undefined,
        })),
        book: harbor.hasBookRef ? harbor.book : undefined,
      };
      if (harbor.id === NEW_HARBOR_ID) {
        res = await this.createHarbor(harborInput);
      } else {
        res = await this.updateHarbor(harborInput);
      }
      if (res) {
        const harborStore = useHarborStore();
        harborStore.addHarbor(res);
        this.clearHarborData(harbor.id);
      }
    },

    async createHarbor(harbor: ManageHarborInputModel): Promise<Harbor | null> {
      const url = import.meta.env.VITE_API_URL + '/harbors/create';
      const token = await auth0.getAccessTokenSilently();
      try {
        const res = await axios.post<Harbor>(url, harbor, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
      return null;
    },

    async updateHarbor(harbor: ManageHarborInputModel): Promise<Harbor | null> {
      if (!harbor.id) {
        return null;
      }
      const url = import.meta.env.VITE_API_URL + `/harbors/harbor/${harbor.id}/update`;
      const token = await auth0.getAccessTokenSilently();
      try {
        const res = await axios.put<Harbor>(url, harbor, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
      return null;
    },
  },
});
