import toast from "react-hot-toast";

function toastStyles(theme: string) {
  return {
    style: {
      borderRadius: "10px",
      background:
        theme?.toLowerCase() == "dark" || theme?.toLowerCase() == "system"
          ? "#333"
          : "#fff",
      color:
        theme?.toLowerCase() == "dark" || theme?.toLowerCase() == "system"
          ? "#fff"
          : "#333",
    },
  };
}
export function ToasterSuccess(message: string, theme: string) {
  toast.success(message, toastStyles(theme));
}
export function ToasterError(message: string, theme: string) {
  toast.error(message, toastStyles(theme));
}
