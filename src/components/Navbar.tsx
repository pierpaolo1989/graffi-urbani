import React, { useState } from "react";
import LoginModal from "./LoginModal.tsx";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 text-white px-4 py-4 h-20 flex justify-between items-center shadow-lg">
        <div className="flex space-x-16">
          <span
            rel="noopener noreferrer"
            className="hover:underline pt-2 bg-red-500 px-4 pt-2 rounded"
          >
            <Link to="/" rel="noopener noreferrer"
              className="hover:underline pt-2">Graffi Urbani</Link>
          </span>
          <Link to="/artists" rel="noopener noreferrer"
            className="hover:underline pt-2">Artisti</Link>
          <Link to="/curiosity" rel="noopener noreferrer"
            className="hover:underline pt-2">Curiosità</Link>
          <a
            href="https://www.amazon.it/Graffi-Urbani-Viaggio-provincia-province-ebook/dp/B09DGHRFH9/ref=sr_1_2?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2PMRLSIDGVVXZ&dib=eyJ2IjoiMSJ9.4ImthW_Kco_p5_1M9kIyPQBqM-c_xRVhivRcE4ExageCq_B2ouOcdzmaqU3kKGp8VYmBcSy3FtZydIzuDLDVxOshcEZhukuIGwkgVT5JRhgWlIBnaHoNwaBfSOoH996sV-CmmvQsjugqgAeuzuLizd8uRwNSudqITSq-19pcxdI.gU9PBtR4Md0OQ6xYZzQ3YMz7Sc5gseSX8ogaj2XQhbU&dib_tag=se&keywords=pierpaolo+di+dato&qid=1750078132&sprefix=pierpaolo+di+dato%2Caps%2C189&sr=8-2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline pt-2"
          >
            Shop
          </a>
        </div>
        {process.env.REACT_APP_NOT_SECRET_CODE ?
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 pt-2 rounded"
          >
            Login
          </button> : <></>}
      </nav>
      {isModalOpen && <LoginModal onClose={toggleModal} />}
    </>
  );
};

export default Navbar;
