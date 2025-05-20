import {BaggageClaim} from "lucide-react";

const Logo = (props) => {
  return (
    <div className={`flex items-center gap-1 text-2xl 
        ${props.className && props.className}`}>
      <BaggageClaim className="text-primary size-8"/>
      <h1 className="font-semibold font-Inter">
        Sora<span className="text-primary">sale</span>
      </h1>
    </div>
  )
}

export default Logo;