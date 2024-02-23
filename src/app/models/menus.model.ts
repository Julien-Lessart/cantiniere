import Meal from './meal.model';

export default interface Menu extends Meal {
  id: number;
  label: string;
  status: string;
  imageId: number;
  priceDF: number;
  availableForWeeksAndDays: {
    value?: {
      week: number;
      day: number;
    }[];
  }[];
}
