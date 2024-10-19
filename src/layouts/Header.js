import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';


function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between p-6"> 
        <div className="flex items-center space-x-3">
            <FontAwesomeIcon 
                icon={faPiggyBank} 
                className="text-3xl"
            />
          <span className="text-2xl font-bold">SuperVision+</span>
        </div>
    </header>
  );
}

export default Header;
