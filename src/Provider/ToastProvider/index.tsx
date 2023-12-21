import styled from "@emotion/styled";
import { IconProps, ToastContainer } from "react-toastify";

import ClearIcon from "@svg/clear.svg?react";
import CheckIcon from "@svg/check.svg?react";
import WarningIcon from "@svg/warning.svg?react";
import { FC } from "react";

const globalRenders = (nodeOrMsg: IconProps) => {
  switch (nodeOrMsg.type) {
    case "success":
      return <CheckIcon color={"#fff"} />;
    case "error":
      return <WarningIcon color={"#fff"} />;
  }
};

const CloseButton: FC = () => {
  return (
    <div style={{ display: "flex", flexShrink: 0, justifyContent: "center", alignItems: "center" }}>
      <ClearIcon />
    </div>
  );
};

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
  ".Toastify__toast-icon": {
    flexShrink: 0,
    width: "fit-content",
    height: "fit-content",
  },
});

const ToastProvider = () => {
  return <ToastContainerStyle closeButton={CloseButton} icon={globalRenders} position="bottom-center" />;
};
export default ToastProvider;
