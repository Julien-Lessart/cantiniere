export default interface Meal {
  id: number;
  description?: string;
  label: string;

  status: string;
  imageId: number;
  priceDF: number;
  availableForWeeksAndDays?: {
    value?: {
      week: number;
      day: number;
    }[];
  }[];
  category: string;
  ingredients: {
    id: number;
    label: string;
    status: string;
    imageId: number;
  }[];
}
