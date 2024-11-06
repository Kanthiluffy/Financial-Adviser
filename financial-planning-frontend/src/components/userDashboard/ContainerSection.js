import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./ContainerSection.css";

const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="w-[1000px] bg-white rounded-lg p-6 shadow-lg grid grid-cols-3 gap-6">  {[
    	    'Tax Now',
    	    'Tax Deferred',
    	    'Tax Exempt',
    	    'HSA',
    	    'Term Life Insurance',
    	    'Cash Value Insurance',
    	    'Long Term Care',
    	    'Annuity',
    	    'Inheritance'
    	  ].map((label) => (
    	    <div 
    	      key={label} 
    	      className="relative bg-neutral-200 rounded-md p-6 h-[120px] w-[300px] transition-transform hover:scale-105 hover:bg-neutral-300"
    	    >
    	      <div className="absolute top-[-10px] right-[-10px] bg-neutral-300 rounded-full p-1 hover:bg-neutral-400">
    	        <span className="material-symbols-outlined text-neutral-800">help_outline</span>
    	      </div>
    	      <div className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-primary-500 rounded-full p-1 hover:bg-primary-600">
    	        <span className="material-symbols-outlined text-primary-50">add</span>
    	      </div>
    	      <h3 className="text-neutral-950 font-semibold text-lg">{label}</h3>
    	    </div>
    	  ))}
    	</div> 
                </div>
  )
}

export default MyPlugin;
