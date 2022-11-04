import React from "react";
import "../styles/Error.css";

function Error({ error }) {
  console.log(error);
  return (
    <>
      <section className="error-container">
        <h1 className="error-header">{error}</h1>
        <div>Please try again.</div>
      </section>
    </>
  );
}

export default Error;
