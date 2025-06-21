export default function generateOTP(length: number = 6): string {
  const char: string = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += char[Math.floor(Math.random() * length)];
  }
  return otp;
}
