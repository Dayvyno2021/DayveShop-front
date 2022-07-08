import React from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Alert({message}){
  // const notify = () => toast(message);
  // const notify = () => toast("Wow so easy!");
  return (
    <div>
      {alert(message)}
      {/* <button onClick={notify}>Notify!</button>
      <ToastContainer /> */}

    </div>
  );
}
export default Alert