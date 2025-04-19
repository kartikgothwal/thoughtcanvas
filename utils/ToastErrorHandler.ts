import axios from "axios";
import { ToasterError } from "@/utils";

export default function ToastErrorHandler(
  error: unknown,
  theme: string | undefined
) {
  if (axios.isAxiosError(error) && error.response) {
    ToasterError(error.response.data.message, theme!);
  } else if (error instanceof Error) {
    ToasterError(error.message, theme!);
  } else {
    ToasterError("An unknown error occurred", theme!);
  }
}
