import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Route/Router';

function App() {
  return (
    <div className='App max-w-[1040px] mx-auto border-2'>
      <RouterProvider router={router}/>
      <Toaster></Toaster>
    </div>

  );
}

export default App;
