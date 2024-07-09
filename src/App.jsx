import {BrowserRouter,Routes,Route}  from 'react-router-dom';
import Home from './Page/Home';
import About from './Page/About';
import CourseForm from './Page/CourseForm';
import Mainlayout from './layout/Main layout';
import Instructure from './Page/Instructure';
import Profile from './Page/Profile';


const App = () => {
  return (

    <>
      <BrowserRouter>

        <Routes>
        <Route path='/'  element={<Home/>} />
          <Route path='/Dashboard' element={<Mainlayout/>}>
          <Route path='About' element={<About />}/>
          <Route path='CourseForm' element={<CourseForm />}/>
          <Route path='Instructure' element={<Instructure/>}/>
          <Route path='profile' element={<Profile/>}/>
          
          </Route>
        </Routes>
      </BrowserRouter>

      </>
      
  );
}

export default App;
