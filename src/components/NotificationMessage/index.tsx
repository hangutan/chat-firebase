import React, { useState, Fragment, useEffect } from "react";
import Box from "@material-ui/core/Box";

import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

import Alert from "@material-ui/lab/Alert";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { onMessageListener, fetchToken } from "firebase-init";

export interface NotiMessage {
  type?: string;
}

const NotificationMessage = (props: NotiMessage) => {
  const { type } = props;
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);

  fetchToken(setTokenFound);

  useEffect(() => {
    (async () => {
      const token = await fetchToken(setTokenFound);
      console.log("token nhan :", token);
    })();
  }, []);

  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setOpen(true);
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  const onShowNotificationClicked = () => {
    setNotification({
      title: "Notification",
      body: "This is a test notification",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={190000}
        onClose={handleClose}
        message="Thuc hien thanh cong"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        action={action}
      />
    </Box>
  );
};

export default NotificationMessage;
