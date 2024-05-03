import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { useState } from 'react';
import ForumPage from "./pages/ForumPage";
import ThreadPage from './pages/ThreadPage/ThreadPage';
import DashBoardPage from './pages/DashBoardPage';
import PostPage from './pages/PostPage';
import { Route, Routes } from 'react-router-dom';
function App() {
  
  return (
    <ThemeProvider
    breakpoints={[ 'lg', 'md', 'sm']}
    minBreakpoint="sm"
  >
   <ForumPage>
    <Routes>
      <Route path='/' element={<DashBoardPage/>}/>
     <Route path='threads/:threadId' element={<ThreadPage/>}/>
     <Route path='posts/:postId' element={<PostPage/>}/> 
    </Routes>
   </ForumPage>
  </ThemeProvider>
  );
}

export default App;
