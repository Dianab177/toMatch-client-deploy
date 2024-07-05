import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function LoginIcon() {
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  }

  return (
    <div className="flex justify-end my-7 mx-10">
      <div className="relative h-8">
        <button onClick={handleButtonClick} className="flex space-x-2 items-end">
          <FontAwesomeIcon icon={faUser} className="text-orange fa-xl" />
        </button>
        {showOptions && (
          <div className="absolute right-0 top-full mr-3 mt-2 w-40 bg-stone3 rounded-lg shadow-lg z-10">
            <button className="w-full text-white text-left px-4 py-2 hover:bg-gray-100">
              Mi perfil
            </button>
            <button className="w-full text-white text-left px-4 py-2 hover:bg-gray-100">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginIcon;

