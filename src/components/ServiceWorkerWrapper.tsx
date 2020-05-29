import React, { FC, useEffect } from "react";
import { Dialog } from "@reach/dialog";
import * as serviceWorker from "../serviceWorker";

const ServiceWorkerWrapper: FC = () => {
  const [open, setOpen] = React.useState(false);
  const [
    waitingWorker,
    setWaitingWorker,
  ] = React.useState<ServiceWorker | null>(null);

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setOpen(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setOpen(false);
    window.location.reload(true);
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
      <button className="dialog__button" onClick={reloadPage} autoFocus>
        Reload
      </button>
    </Dialog>
  );
};

export default ServiceWorkerWrapper;
