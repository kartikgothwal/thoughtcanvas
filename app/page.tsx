import Home from "@/app/home";
import { DbConnect } from "@/config/dbConnect";

const Page = (): JSX.Element => {
  async function db() {
    await DbConnect()
  }
  db()
  return (
    <>
      <Home />
    </>
  )
}

export default Page
