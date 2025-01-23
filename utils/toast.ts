import toast from "react-hot-toast";

export function ToasterSuccess(message:string, theme:string) {
  toast.success(message, {
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
  });
}
export function ToasterError(message:string, theme:string) {
  toast.error(message, {
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
  });
}
