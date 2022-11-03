import { useState, useEffect } from "react";
import "../styles/Toast.css";

export default function Toastmsg({ toastMessage, toastID }) {
  const [hideMsg, setHideMsg] = useState(false);

  useEffect(() => {
    setHideMsg(false);
    setTimeout(() => setHideMsg(true), 5000);
  }, [toastID]);
  return (
    <>
      <div className={hideMsg ? "hide-container" : "toast-container"}>
        <h4>Congratulations!</h4>
        <hr />
        <div className="toast-msg"> {toastMessage}</div>
      </div>
    </>
  );
}
