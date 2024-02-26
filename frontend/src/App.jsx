import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import LoginComponent from "./pages/LoginComponent";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SongUpload from "./pages/SongUpload";
import MySongs from "./pages/MySongs";
import ArtistSongs from "./pages/ArtistSongs";
import SingleSong from "./pages/SingleSong";
import SearchSong from "./pages/SearchSong";

function App() {
  
  return (
    <div className=" font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />

          <Route path="/signup" element={<Signup />} />

         
            <Route path="/" element={<Home></Home>} />

            <Route path="/uploadSong" element={<SongUpload />} />

            <Route path="/allSong" element={<MySongs />} />

            <Route path="/artistSongs" element={<ArtistSongs />} />

            <Route path="/singleSong" element={<SingleSong />} />
          
            <Route path="/searchSong" element={<SearchSong />} />
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
