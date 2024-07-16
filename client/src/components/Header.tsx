import { ModeToggle } from "./mode-toogel"

function Header() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 h-[70px] flex justify-evenly">
        <div>
            Header
        </div>
        <div>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Header