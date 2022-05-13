import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toaster (){
    return (
        <div>
          <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable={true}
          progress= {undefined}
          pauseOnHover={true}
           />
        </div>
      );
    
}