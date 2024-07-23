import { ModeToggle } from "./mode-toogel"

function Header() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 h-[70px] flex 
    justify-end pr-2 pt-2">
        <div>
            
        </div>
        <div >
            <ModeToggle />
        </div>
    </div>
  )
}

export default Header