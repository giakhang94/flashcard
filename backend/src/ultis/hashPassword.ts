import * as bcrypt from 'bcrypt';
export const hashPassword = async (password: string, salt: number) => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  encryptedPw: string,
  candidatePw: string,
) => {
  return await bcrypt.compare(candidatePw, encryptedPw);
};
