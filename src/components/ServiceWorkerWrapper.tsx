import { Dialog } from "@reach/dialog";
import React, { FC, useEffect, useState } from "react";

import { useTypedSelector } from "reducers";

const ServiceWorkerWrapper: FC = () => {
  const serviceWorkerUpdated = useTypedSelector(
    (state) => state.serviceWorker.serviceWorkerUpdated
  );
  const serviceWorkerRegistration = useTypedSelector(
    (state) => state.serviceWorker.serviceWorkerRegistration
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (serviceWorkerUpdated) {
      setOpen(true);
    }
  }, [serviceWorkerUpdated]);

  const reloadPage = () => {
    const registrationWaiting = serviceWorkerRegistration?.waiting;
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: "SKIP_WAITING" });

      registrationWaiting.addEventListener("statechange", (e) => {
        // eslint-disable-next-line no-console
        console.log(typeof e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e?.target?.state === "activated") {
          setOpen(false);
          window.location.reload();
        }
      });
    }
  };

  return (
    <Dialog
      isOpen={open}
      onDismiss={reloadPage}
      className="cookie-dialog"
      aria-label="App update"
    >
      <h4 className="dialog__header">App update</h4>
      <p className="dialog__content">
        A new version of this app is available. Clicking the button below will
        update and reload the app.
      </p>
      <button
        className="dialog__button"
        onClick={reloadPage}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      >
        Reload
      </button>
    </Dialog>
  );
};

export default ServiceWorkerWrapper;
