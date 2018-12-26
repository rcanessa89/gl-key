import { Asset } from '@models';

export default interface IEntry {
  id: number | string;
  cedula: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  checkIn: string;
  checkOut: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
  assets: Asset[];
}
