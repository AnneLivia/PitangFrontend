import AppointmentContextProvider from './contexts/AppointmentsContext';
import Router from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
      />
      <AppointmentContextProvider>
        <div className='App'>
          <Router />
        </div>
      </AppointmentContextProvider>
    </>
  );
}

export default App;
