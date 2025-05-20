import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitch = (props) => {

  const storageKey = "theme";
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem(storageKey)));
  
  useEffect(() => {
    if (dark) {
      document.firstElementChild.setAttribute("data-theme", "dark");
      localStorage.setItem(storageKey, JSON.stringify(true));
    } else {
      document.firstElementChild.setAttribute("data-theme", "light");
      localStorage.setItem(storageKey, JSON.stringify(false));
    }
  }, [dark])

  return (
    <label className="flex items-center gap-3 cursor-pointer 
        bg-secondary rounded-full py-2 px-3">
      <input type="checkbox" checked={dark} 
        onChange={(event) => setDark(event.target.checked)}
        className="opacity-0 w-0 h-0 invisible absolute top-[-999px] peer"/>
      <Sun className="rounded-full p-1 peer-[:not(:checked)]:bg-primary
          peer-[:not(:checked)]:text-white"/>
      <Moon className="rounded-full p-1 peer-checked:bg-primary 
          peer-checked:text-white" />
    </label>
  )
}

export default ThemeSwitch;