import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./PrimaryHome.css";


const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="w-[800px] bg-white rounded-lg shadow-lg p-6 grid grid-cols-3 gap-4">  <div className="bg-green-500 hover:bg-green-600 transition-colors duration-300 rounded-md h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer">
    	    <span className="material-symbols-outlined text-white text-4xl">home</span>
    	    <h2 className="text-white font-title text-2xl">Primary Home</h2>
    	  </div>
    	  <div className="bg-red-400 hover:bg-red-500 transition-colors duration-300 rounded-md h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer">
    	    <span className="material-symbols-outlined text-white text-4xl">school</span>
    	    <h2 className="text-white font-title text-2xl">Student Loans</h2>
    	  </div>
    	  <div className="bg-red-400 hover:bg-red-500 transition-colors duration-300 rounded-md h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer">
    	    <span className="material-symbols-outlined text-white text-4xl">credit_card</span>
    	    <h2 className="text-white font-title text-2xl">Other Debts</h2>
    	  </div>
    	  <div className="bg-green-500 hover:bg-green-600 transition-colors duration-300 rounded-md h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer">
    	    <span className="material-symbols-outlined text-white text-4xl">real_estate_agent</span>
    	    <h2 className="text-white font-title text-2xl">Investment Home</h2>
    	  </div>
    	  <div className="bg-red-400 hover:bg-red-500 transition-colors duration-300 rounded-md h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer">
    	    <span className="material-symbols-outlined text-white text-4xl">school</span>
    	    <h2 className="text-white font-title text-2xl">Student Expenses</h2>
    	  </div>
    	  <div className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-md h-[150px] flex flex-col items-center justify-center gap-2 cursor-pointer">
    	    <span className="material-symbols-outlined text-neutral-950 text-4xl">hourglass_empty</span>
    	    <h2 className="text-neutral-950 font-title text-2xl">Future Entry</h2>
    	  </div>
    	</div> 
                </div>
  )
}



export default MyPlugin;
