export class SimpleDonation {
  name: string;
  product: string;
  quantity: number;
  student: string;
  date: Date;
  obs: string;
}

const getEmpty = () => {
  return {
    name: null,
    product: null,
    quantity: null,
    student: null,
    date: null,
    obs: null,
  };
};

export default getEmpty;
