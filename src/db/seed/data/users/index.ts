/**
 * User data for seeding database
 */
interface User {
  email: string;
  firstName: string;
  lastName: string;
  DOB: string;
  phone: string;
  password: string;
}

const userData: Array<User> = [
  {
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    DOB: '1994-01-28T19:21:10.786+00:00',
    phone: '0808800880088',
    password: 'password1',
  },
  {
    email: 'janedoe@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    DOB: '1992-04-29T19:21:10.786+00:00',
    phone: '0808800880088',
    password: 'password2',
  },
  {
    email: 'michael@example.com',
    firstName: 'Michael',
    lastName: 'Geralds',
    DOB: '2020-01-28T19:21:10.786+00:00',
    phone: '0808800980088',
    password: 'password3',
  },
  {
    email: 'adebayo@example.com',
    firstName: 'Adebayo',
    lastName: 'Emmanuel',
    DOB: '2020-01-28T19:21:10.786+00:00',
    phone: '0808800880088',
    password: 'password4',
  },
];

export default userData;
