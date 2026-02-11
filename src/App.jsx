import { useState } from "react";
import "./App.css";
// import logo from "./assets/logo.png"; // path to your image
import photo1 from "./assets/photo1.jpg"; // path to your image
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg";
import photo4 from "./assets/photo4.jpg";
function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (

    <div className="container">

      <div className="card">
        {/* Logo */}
        <div className="logo">
          <h1>KÖFTECİ ÖMER</h1>


        </div>

        {/* Buttons */}
        <div className="buttons">
          <a
            href="https://www.instagram.com/kofteci_omer_jo?igsh=eWtib2xmNG85ZnNs&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Instagram
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Facebook
          </a>

          <a href="https://maps.app.goo.gl/zbXYyMqXgELmYTpw7" className="btn">
            Location & Google Review
          </a>
          <a href="tel:+962791000440" className="btn">

            Contact Us
          </a>

          <button
            className="btn menu-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? "Hide Menu" : "View Menu"}
          </button>
        </div>

        {/* Menu Section */}
        {showMenu && (
          <div className="menu">
            <img src={photo1} alt="menu1" />
            <img src={photo2} alt="menu2" />
            <img src={photo3} alt="menu3" />
            <img src={photo4} alt="menu4" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
