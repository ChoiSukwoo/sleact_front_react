import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";

const ToastContainerStyle = styled(ToastContainer)({
  ".Toastify__toast": {
    boxSizing: "border-box",
    borderRadius: "10px",
    width: "490px",
    minHeight: "50px",
    padding: "13px 16px 13px 10px",
  },
  ".Toastify__toast-body": {
    padding: "0",
  },
  ".Toastify__progress-bar": {
    width: "0%",
  },
  ".Toastify__toast--success": {
    backgroundColor: "rgba(0, 220, 125, 0.8)",
    color: "white",
  },
  ".Toastify__toast--error": {
    backgroundColor: "rgba(234, 31, 42, 0.8)",
    color: "white",
  },
  ".Toastify__close-button": {
    height: "100%",
    fill: "white",
    opacity: 1,
    marginBlock: "auto",
  },
  ".Toastify__close-button > svg": {
    fill: "white",
    opacity: 1,
  },
});

const ToastProvider = () => {
  return <ToastContainerStyle position="bottom-center" />;
};
export default ToastProvider;
