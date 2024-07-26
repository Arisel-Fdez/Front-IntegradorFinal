import React from 'react';
import menu from '../assets/menu.svg';

const Navbar = () => {
  return (
    <header className='bg-[#0C1826]'>
      <nav className='w-[90%] mx-auto max-w-screen-xl h-20 flex items-center justify-between'>
        <a className='w-1/3 max-w-[140px]' href="/">
          <h1 className='font-bold text-xl text-white'>GITEMPERATURE</h1>
        </a>
        <button className='z-10 md:hidden'>
          <img className='w-12' src={menu} alt="Menu" />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
