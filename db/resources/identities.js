import bcrypt from 'bcryptjs';

export default async () => {
  return [
    {
      email: 'bogdan@chesscoders.com',
      name: 'Bogdan Posedaru',
      role: 'admin',
      __t: 'admin',
      password: bcrypt.hashSync('supersecretpassword'),
      active: true,
      confirmed: true,
    },
  ];
};
