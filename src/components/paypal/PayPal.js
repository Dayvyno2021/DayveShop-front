import React from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

function PayPal({children}) {

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL
  };


  return (
  <PayPalScriptProvider options={initialOptions}>
    {children}
  </PayPalScriptProvider>
  );
}

export default PayPal;