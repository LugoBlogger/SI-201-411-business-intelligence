import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import ChitChatLogo from './assets/chit-chat-logo.svg';
import ErinLindford from './assets/erin-lindford.jpg';
import user01 from './assets/user01.avif';
import user02 from './assets/user02.avif';
import user03 from './assets/user03.avif';
import user04 from './assets/user04.avif';
import user05 from './assets/user05.avif';

// import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  const contributors = [
    {avatarUrl: user01, handle: "user01"},
    {avatarUrl: user02, handle: "user02"},
    {avatarUrl: user03, handle: "user03"},
    {avatarUrl: user04, handle: "user04"},
    {avatarUrl: user05, handle: "user05"}
  ]

  return (
    <>
      <h1 class="my-3 mx-3 text-3xl font-bold underline">
        Hello World React + Vite + Tailwind CSS</h1>

      <div class="mt-100"></div>
      {/* Overview */}
      <h1 class="my-3 mx-3 text-2xl">Overview</h1>
      <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl 
          bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 
          dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <img class="size-12 shrink-0" src={ChitChatLogo} alt="ChitChat Logo"/>
        <div>
          <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
          <p class="text-gray-500 dark:text-gray-400">
            You have a new message!</p>
        </div>
      </div> 

      <div class="mt-30"></div>
      <div class="mx-auto mt-5 flex flex-col gap-2 p-8 max-w-sm 
          sm:flex-row sm:items-center sm:gap-6 
          sm:py-4 bg-white rounded-xl shadow-md outline outline-black/5">
        <img class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" 
            src={ErinLindford} alt=""/>
        <div class="space-y-2 text-center sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg font-semibold text-black">Erin Lindford</p>
            <p class="font-medium text-gray-500">Product Engineer</p>
          </div>
          <button class="inline-block rounded-full border border-purple-200 
              px-4 py-1 text-sm font-semibold text-purple-600 
              hover:border-transparent hover:bg-purple-600 hover:text-white
              active:bg-purple-700 transition">
            Message
          </button>
        </div>
      </div>
      <div class="mb-50"></div>

      {/* Thinking in utility classes */}
      <h1 class="mx-2 mt-5 mb-3 text-2xl">Thinking in utility classes</h1>

      {/* -- Styling hover and focus states */}
      <h2 class="mx-2 text-xl">Styling hover and focus states</h2>
      <div class="flex flex-col items-center">
      <button class="mx-2 bg-sky-500 rounded-full px-4 py-1 hover:bg-sky-700
          text-white">
        Save changes</button>
      </div>
      <div class="mb-50"></div>

      {/* -- Media queries and breakpoints */}
      <h2 class="mx-2 mt-5 text-xl">Media queries and breakpoints</h2>
      <div class="m-2 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-900">
        <div class="bg-sky-500 text-white font-mono text-center rounded-lg p-6">01</div>
        <div class="bg-sky-500 text-white font-mono text-center rounded-lg p-6">02</div>
        <div class="bg-sky-500 text-white font-mono text-center rounded-lg p-6">03</div>
        <div class="bg-sky-500 text-white font-mono text-center rounded-lg p-6">04</div>
        <div class="bg-sky-500 text-white font-mono text-center rounded-lg p-6">05</div>
        <div class="bg-sky-500 text-white font-mono text-center rounded-lg p-6">06</div>
      </div>
      <div class="mt-50"></div>

      {/* -- Targeting dark mode */}
      <h2 class="mx-2 mt-5 text-xl">Targeting dark mode</h2>      
      <div class="grid grid-cols-2">
        <div class="mx-2 bg-white rounded-lg px-6 py-8 ring 
            shadow-xl ring-gray-900/5">
          <div>
            <span class="inline-flex items-center justify-center rounded-md 
                bg-indigo-500 p-2 shadow-lg">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" 
                  stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" 
                    stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 
                    0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 
                    15H9v-2.828l8.586-8.586z">
                </path>
              </svg>
            </span>
          </div>
          <h3 class="text-gray-900 mt-5 text-base 
              font-medium tracking-tight">Writes upside-down</h3>
          <p class="text-gray-500 mt-2 text-sm">
            The Zero Gravity Pen can be used to write in any orientation, 
            including upside-down. It even works in outer space.
          </p>
        </div>
        <div class="mx-2 bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring 
            shadow-xl ring-gray-900/5">
          <div>
            <span class="inline-flex items-center justify-center rounded-md 
                bg-indigo-500 p-2 shadow-lg">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" 
                  stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" 
                    stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 
                    0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 
                    15H9v-2.828l8.586-8.586z">
                </path>
              </svg>
            </span>
          </div>
          <h3 class="text-gray-900 dark:text-white mt-5 text-base 
              font-medium tracking-tight">Writes upside-down</h3>
          <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            The Zero Gravity Pen can be used to write in any orientation, 
            including upside-down. It even works in outer space.
          </p>
        </div>
      </div>

      {/* Managing duplication */}
      <h1 class="mx-2 mt-5 text-2xl">Managing duplication</h1>
      <div class="mx-2">
        <div class="flex items-center space-x-2 text-base">
          <h4 class="font-semibold text-slate-900">Contributors</h4>
          <span class="bg-slate-100 px-2 py-1 text-xs font-semibold 
              text-slate-700 rounded-full shadow-sm">204</span>
        </div>
        <div class="mt-3 flex -space-x-2 overflow-hidden">
          {contributors.map(user => (
              <img class="inline-block h-12 w-12 rounded-full ring-2 
                  ring-white" src={user.avatarUrl} alt={user.handle}/>
          ))}
        </div>
        <div class="mt-3 text-sm font-medium">
          <a href="#" class="text-blue-500">+198 others</a>
        </div>
      </div>
      <div class="mt-10"></div>
  
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App;
