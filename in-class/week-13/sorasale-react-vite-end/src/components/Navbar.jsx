import Logo from './Logo.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';
import { Bell, Menu } from 'lucide-react';

const Navbar = (props) => {
  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 z-20 
        w-full bg-base py-2 px-4 sm:static">
      <h1 className="font-semibold text-2xl hidden lg:block">Overview</h1>
      <Logo className={"lg:hidden"}/>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <a href="#" className="relative">
          <Bell />
          <span className="block size-2 bg-red-500 rounded-full 
              absolute top-0 right-0"></span>
        </a>
        <label htmlFor="toggle-sidebar" className="cursor-pointer block 
            lg:hidden">
          <Menu />
        </label>
      </div>
    </nav>
  )
}

export default Navbar;