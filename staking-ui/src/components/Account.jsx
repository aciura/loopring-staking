import React from "react";

export function Account({ address, balance }) {
  return (
    <div>
      Address: {address}, balance: {balance}
    </div>
  );
}
