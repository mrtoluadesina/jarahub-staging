/**
 * User data for seeding database
 */
interface Admin {
  email: string;
  firstName: String;
  lastName: String;
  DOB?: Date;
  phone: String;
  password: string;
  isDeleted: Boolean;
  role?: String;
  isSuper: Boolean;
  isBlocked: Boolean;
  isVerfied: Boolean;
}

const userData: Array<Admin> = [
  {
    email: 'danabramov@example.com',
    firstName: 'Dan',
    lastName: 'Abramov',
    phone: '0808800880088',
    password: 'password3',
    isDeleted: false,
    isSuper: true,
    isBlocked: false,
    isVerfied: true,
  },
  {
    email: 'adekunlegold@example.com',
    firstName: 'Adekunle',
    lastName: 'Gold',
    phone: '0808800880088',
    password: 'password1',
    isDeleted: false,
    isSuper: false,
    isBlocked: false,
    isVerfied: true,
  },
];

export default userData;
