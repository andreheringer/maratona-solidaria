export class AddStudent {
  name: string;
  registration: string;
  course: number;
  email: string;
  phone: string;
  obs: string;
}

const getEmpty = () => {
  return {
    name: null,
    registration: null,
    course: null,
    email: null,
    phone: null,
    obs: null,
  };
};

export default getEmpty;
