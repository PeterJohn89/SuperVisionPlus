import React from 'react';
import Header from '../layouts/Header.js';

function Layout({ children }) { 

  return (
    <div>
      <Header />
      <main className='container mx-auto p-6'>
        {children}
      </main>
    </div>
  );
}

export default Layout;
