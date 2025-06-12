export default function generateOTP(length: number = 6): string {
  const char: string = "0123456789";
  const otp: number = Number(char[Math.floor(100000 + Math.random() * length)]);
  return otp.toString();
}
