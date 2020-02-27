import jwt from 'jwt-simple';

export const tokenEncoder = (email: String, id: string, isActive: Boolean) => {
  const payload = { email, id, isActive };
  return jwt.encode(payload, process.env.JWT_TOKEN_SECRET!);
};

export const adminTokenEncoder = (
  email: String,
  id: string,
  isActive: Boolean,
) => {
  const payload = { email, id, isActive };
  return jwt.encode(payload, process.env.JWT_TOKEN_SECRET!);
};
