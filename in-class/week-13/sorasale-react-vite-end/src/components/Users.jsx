import profile from '../assets/profile.jpg';

const Users = () => {
  return (
    <>
      <div className="p-4 text-center hidden md:block">
        <div className="size-12 rounded-full overflow-hidden m-auto">
          <img src={profile} alt="" />
        </div>
        <div className="py-1 px-4 bg-primary/10 mt-4 border 
            border-bordercolor/30 rounded-lg">
          <h1 className="font-semibold text-sm">Emmanuel Eze</h1>
          <p className="text-tmuted text-xs">Manager</p>
        </div>
        <a href="#" className="py-2 px-4 bg-primary rounded-lg text-white 
            hover:bg-primary/10 text-sm hover:text-primary inline-block mt-4">
          View details
        </a>
      </div>

      <div className="mt-8 bg-primary bg-bg-texture bg-contain text-center py-8 
          px-4 rounded-lg text-white">
        <h1 className="text-xl font-semibold mb-2"> Boost Your Brand's Reach</h1>
        <p className="text-white/80 mb-2">
          Essential tools to create, share, and profit seamlessly</p>
        <a href="#" className="py-2 px-4 bg-primary rounded-lg text-white 
            hover:bg-primary/70 text-sm inline-block">Boost Now</a>
      </div>
    </>
  )
}

export default Users;