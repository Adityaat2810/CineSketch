import { ModeToggle } from "./mode-toogel"

function Header() {
  return (

    <div className="bg-slate-200 dark:bg-slate-800 h-[70px]  pr-2 pt-2 
      flex justify-between">

      <div>

        <h1 className="flex justify-center ml-10 text-2xl
        text-zinc-600 dark:text-zinc-400">
          Cine Draw</h1>

      </div>
      <div className="flex 
        justify-end">
        <div >
          <ModeToggle />
        </div>
      </div>


    </div>



  )
}

export default Header