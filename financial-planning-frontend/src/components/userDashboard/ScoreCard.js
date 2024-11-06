import React from "react";
import Chart from "react-apexcharts";

/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./ScoreCard.css";
const primary = {
	100: "#FFFFFF",
	500: "#611BF8",
	600: "#4F46E5",
  };
const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="w-[800px] bg-white rounded-lg shadow-md flex justify-between p-8">  {/* Current Score Card */}
    	  <div className="w-[380px] bg-gray-50 rounded-lg p-6 flex flex-col items-center">
    	    <h2 className="font-title text-xl text-neutral-950 mb-4">Current Score</h2>
    	    <div className="relative w-full h-[220px]">
    	      <Chart
    	        type="radialBar"
    	        series={[65]} // Example value for current score
    	        options={{
    	          chart: {
    	            animations: {
    	              enabled: true,
    	            },
    	          },
    	          colors: [primary[500]],
    	          plotOptions: {
    	            radialBar: {
    	              hollow: { size: '55%' },
    	              track: {
    	                background: primary[100],
    	              },
    	              dataLabels: {
    	                show: false, // This hides the series value
    	              },
    	              startAngle: -90,
    	              endAngle: 90,
    	              fill: {
    	                type: 'gradient',
    	                gradient: {
    	                  gradientToColors: [primary[600]],
    	                },
    	              },
    	            },
    	          },
    	        }}
    	      />
    	      <div className="absolute inset-0 flex flex-col items-center justify-center">
    	        <div className="text-neutral-950 text-4xl font-semibold">65</div>
    	        <div className="text-neutral-500">Current Financial Score</div>
    	      </div>
    	    </div>
    	  </div>
    	
    	  {/* Score with Controlled Plan Card */}
    	  <div className="w-[380px] bg-gray-50 rounded-lg p-6 flex flex-col items-center">
    	    <h2 className="font-title text-xl text-neutral-950 mb-4">Score with Controlled Plan</h2>
    	    <div className="relative w-full h-[220px]">
    	      <Chart
    	        type="radialBar"
    	        series={[90]} // Example value for projected score
    	        options={{
    	          chart: {
    	            animations: {
    	              enabled: true,
    	            },
    	          },
    	          colors: [primary[500]],
    	          plotOptions: {
    	            radialBar: {
    	              hollow: { size: '55%' },
    	              track: {
    	                background: primary[100],
    	              },
    	              dataLabels: {
    	                show: false, // This hides the series value
    	              },
    	              startAngle: -90,
    	              endAngle: 90,
    	              fill: {
    	                type: 'gradient',
    	                gradient: {
    	                  gradientToColors: [primary[600]],
    	                },
    	              },
    	            },
    	          },
    	        }}
    	      />
    	      <div className="absolute inset-0 flex flex-col items-center justify-center">
    	        <div className="text-neutral-950 text-4xl font-semibold">90</div>
    	        <div className="text-neutral-500">Projected Score</div>
    	      </div>
    	    </div>
    	  </div>
    	</div> 
                </div>
  )
}

export default MyPlugin;
