import type { StringLocation } from './stringLocation';

import type { Direction } from './direction';
import type { BookRef, Harbor, HarborDetail } from './harborModels';
export interface FetchHarborIM {
  lat?: number;
  lng?: number;
  directions: Direction[];
  take?: number;
}

export interface ManageHarborInputModel extends Omit<Harbor, 'id' | 'details' | 'book'> {
  id?: string;
  details: ManageHarborDetailInputModel[];
  book?: ManageBookRefInputModel;
}

export interface ManageHarborDetailInputModel extends Omit<HarborDetail, 'id'> {
  id?: string;
}

export interface ManageBookRefInputModel extends Omit<BookRef, 'id'> {
  id?: string;
}

export interface ManageHarborFormModel
  extends Pick<Harbor, 'id'>,
    Omit<ManageHarborInputModel, 'details' | 'id' | 'location' | 'book'> {
  hasBookRef: boolean;
  details: ManageHarborDetailFormModel[];
  location: StringLocation;
  book: ManageBookRefInputModel;
}

export interface ManageHarborDetailFormModel
  extends Omit<ManageHarborDetailInputModel, 'location'> {
  hasSpecificLocation: boolean;
  hasSpecificHarborType: boolean;
  location: StringLocation;
}

// export interface ICreateHarborFormModel {
//   name: string;
//   details: ICreateHarborDetailFormModel[];
//   location: StringLocation;
//   chartNumber: number;
//   harborType: HarborType;
//   hasBookRef: boolean;
//   book?: CreateBookRefInputModel;
// }

// export class CreateHarborFormModel implements ICreateHarborFormModel {
//   constructor() {
//     this.name = '';
//     this.details = [];
//     this.location = new StringLocation();
//     this.chartNumber = 0;
//     this.harborType = HarborType.NATURAL;
//     this.hasBookRef = false;
//     this.book = undefined;
//   }

//   static fromInterface(data: ICreateHarborFormModel): CreateHarborFormModel {
//     const harbor = new CreateHarborFormModel();
//     data.details = data.details.map((detail) => CreateHarborDetailFormModel.fromInterface(detail));
//     Object.assign(harbor, data);
//     if (!harbor.hasBookRef) {
//       harbor.book = undefined;
//     }
//     return harbor;
//   }

//   name: string;
//   details: CreateHarborDetailFormModel[];
//   location: StringLocation;
//   chartNumber: number;
//   harborType: HarborType;
//   hasBookRef: boolean;
//   book?: CreateBookRefInputModel;

//   toInputModel(): CreateHarborInputModel {
//     const location = StringLocationToDdLocation(this.location.lat, this.location.lng);

//     const harborDetails = this.details.map((detail) => detail.toInputModel());

//     return {
//       ...this,
//       location: location,
//       details: harborDetails,
//     } as CreateHarborInputModel;
//   }
// }

// export interface ICreateHarborDetailFormModel {
//   id?: string;
//   name: string;
//   shieldedDirections: Direction[];
//   anchor: boolean;
//   SXKBuoy: boolean;
//   hasSpecificLocation: boolean;
//   location?: StringLocation;
//   hasSpecificHarborType: boolean;
//   harborType?: HarborType;
// }

// export class CreateHarborDetailFormModel implements ICreateHarborDetailFormModel {
//   constructor(name?: string) {
//     this.name = name ?? '';
//     this.shieldedDirections = [];
//     this.anchor = false;
//     this.SXKBuoy = false;
//     this.hasSpecificLocation = false;
//     this.location = new StringLocation();
//     this.hasSpecificHarborType = false;
//     this.harborType = HarborType.NATURAL;
//   }

//   constructor(harborDetail: HarborDetail) {
//     this.id = harborDetail.id;
//     this.name = harborDetail.name;
//     this.shieldedDirections = harborDetail.shieldedDirections;
//     this.anchor = harborDetail.anchor;
//     this.SXKBuoy = harborDetail.SXKBuoy;
//     this.hasSpecificLocation = !!harborDetail.location;
//     this.location = harborDetail.location ?? new StringLocation();
//     this.hasSpecificHarborType = !!harborDetail.harborType;
//     this.harborType = harborDetail.harborType ?? HarborType.NATURAL;
//   }

//   id?: string;
//   name: string;
//   shieldedDirections: Direction[];
//   anchor: boolean;
//   SXKBuoy: boolean;
//   hasSpecificLocation: boolean;
//   location?: StringLocation;
//   hasSpecificHarborType: boolean;
//   harborType?: HarborType;

//   static fromInterface(data: ICreateHarborDetailFormModel): CreateHarborDetailFormModel {
//     const detail = new CreateHarborDetailFormModel();
//     Object.assign(detail, data);

//     if (!detail.hasSpecificLocation) {
//       detail.location = undefined;
//     }

//     if (!detail.hasSpecificHarborType) {
//       detail.harborType = undefined;
//     }

//     return detail;
//   }

//   toInputModel(): CreateHarborDetailInputModel {
//     let location: LatLng | undefined;
//     if (this.location) {
//       location = StringLocationToDdLocation(this.location.lat, this.location.lng);
//     }
//     return {
//       ...this,
//       location: location,
//     } as CreateHarborDetailInputModel;
//   }
// }
