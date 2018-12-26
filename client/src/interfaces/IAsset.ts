import { Entry } from '@models';

export default interface IAssets {
  id: number;
  description: string;
	model: string;
	seriesNumber: string;
	brand: string;
	entry: Entry;
	createdAt: string;
	updatedAt: string;
}
