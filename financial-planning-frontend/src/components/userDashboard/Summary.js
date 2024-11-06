import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./Summary.css";

const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="w-[1200px] bg-white shadow rounded-lg p-8 flex flex-col items-center">  <h2 className="font-title text-2xl font-bold text-neutral-950 mb-6">Financial Products Overview</h2>
    	  <div className="w-full flex flex-wrap gap-6 justify-center">
    	    <div className="bg-red-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">favorite</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">Life Insurance</h3>
    	    </div>
    	    <div className="bg-green-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">elderly_woman</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">Long Term Care</h3>
    	    </div>
    	    <div className="bg-green-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">savings</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">Tax Exempt</h3>
    	    </div>
    	    <div className="bg-green-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">paid</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">Cash Flow</h3>
    	    </div>
    	    <div className="bg-green-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">school</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">College Savings</h3>
    	    </div>
    	    <div className="bg-red-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">health_and_safety</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">Longevity Risk</h3>
    	    </div>
    	    <div className="bg-red-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">trending_down</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">Market Risk</h3>
    	    </div>
    	    <div className="bg-green-200 rounded-full p-4 w-[250px] flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    	      <span className="material-symbols-outlined text-4xl text-neutral-950 mb-2">science</span>
    	      <h3 className="font-bold text-neutral-950 text-lg text-center">Education</h3>
    	    </div>
    	  </div>
    	</div> 
                </div>
  )
}

export default MyPlugin;
