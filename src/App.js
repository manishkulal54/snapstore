import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import './stylesheets/App.css'
import React from "react";

function App() {

  return (
    
    <div className="container">
      <Navbar />
      <main>
        <Home />
      </main>
      <p style={{textAlign:"center",background:"#5fbd03",width:"100vw"}}>Images are by pexel  |	&#169;manishkulal</p>
    </div>
  );
}

export default App;
