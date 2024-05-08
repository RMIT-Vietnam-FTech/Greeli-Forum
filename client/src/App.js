import './App.css';
import "./scss/custom.scss";
import 'bootstrap/dist/css/bootstrap.css';

import { Route, Routes } from 'react-router-dom';

import ThreadPage from './pages/ThreadPage/ThreadPage';
import DashBoardPage from './pages/DashBoardPage';
import PostPage from './pages/PostPage/PostPage';

function App() {
  
  return (
    <Routes>
      <Route path='/forum' element={<DashBoardPage/>}/>
     <Route path='threads/:threadId' element={<ThreadPage/>}/>
     <Route path='posts/:postId' element={<PostPage/>}/> 
    </Routes>
  );
}

export default App;
