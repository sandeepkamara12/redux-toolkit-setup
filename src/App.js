import './App.css';
import { Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
function App() {
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
