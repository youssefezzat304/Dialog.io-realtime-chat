import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { ComponentProps } from "react";
import { MdClose } from "react-icons/md";
import styles from "./index.module.css";

type AlertType = ComponentProps<"div"> & {
  message: string | undefined;
  title: string;
  type: "success" | "info" | "warning" | "error";
  clearErrors: any;
  watch: boolean;
};
const FriendRequestAlert = ({
  message,
  title,
  type,
  clearErrors,
  watch,
}: AlertType) => {
  return (
    <Collapse in={watch}>
      <Alert
        severity={type}
        className={styles.addfriendAlert}
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={clearErrors}
          >
            <MdClose fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default FriendRequestAlert;
