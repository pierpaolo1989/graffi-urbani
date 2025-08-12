import React, { useState } from "react";
import LoginModal from "./LoginModal.tsx";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="bg-gray-800 text-white px-4 py-4 h-20 flex justify-between items-center shadow-lg">
        {/* Brand */}
        <span
          onClick={() => navigate("/")}
          className="hover:underline bg-red-500 px-4 py-2 rounded cursor-pointer font-bold"
        >
          Graffi Urbani
        </span>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/artists" className="hover:underline">Artisti</Link>
          <Link to="/curiosity" className="hover:underline">Curiosità</Link>
          <a
            href="https://www.amazon.it/Graffi-Urbani-Viaggio-provincia-province-ebook/dp/B09DGHRFH9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Shop
          </a>
          {process.env.REACT_APP_NOT_SECRET_CODE && (
            <button
              onClick={toggleModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger menu button (mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Menu">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-4 space-y-4 shadow-lg">
          <Link to="/artists" className="block hover:underline" onClick={toggleMenu}>Artisti</Link>
          <Link to="/curiosity" className="block hover:underline" onClick={toggleMenu}>Curiosità</Link>
          <a
            href="https://www.amazon.it/Graffi-Urbani-Viaggio-provincia-province-ebook/dp/B09DGHRFH9"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
            onClick={toggleMenu}
          >
            Shop
          </a>
          {process.env.REACT_APP_NOT_SECRET_CODE && (
            <button
              onClick={() => {
                toggleModal();
                toggleMenu();
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Login modal */}
      {isModalOpen && <LoginModal onClose={toggleModal} />}
    </>
  );
};

export default Navbar;
