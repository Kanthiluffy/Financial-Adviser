import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./Articles.css";

const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
                	<div className='w-[800px] bg-white shadow-lg rounded-lg p-6'>  <section className='min-h-[600px]'>
    	    
    	      <h1 className='text-4xl font-title text-neutral-950'>Latest Articles</h1>
    	    
    	    <article className='mb-8'>
    	      <h2 className='text-2xl font-semibold text-primary-950 mb-2'>Building a Scalable Web Application</h2>
    	      <p className='text-neutral-700'>In this article, I share my experience on building scalable web applications from scratch, focusing on best practices and performance optimization. Learn how to scale your project and manage a growing codebase.</p>
    	    </article>
    	    <article className='mb-8'>
    	      <h2 className='text-2xl font-semibold text-primary-950 mb-2'>Improving User Experience with Microinteractions</h2>
    	      <p className='text-neutral-700'>Microinteractions are small, delightful responses to user actions that make a significant impact on user experience. Explore how to integrate them effectively in your UI design, enhancing interactivity and engagement.</p>
    	    </article>
    	    <article className='mb-8'>
    	      <h2 className='text-2xl font-semibold text-primary-950 mb-2'>Understanding JavaScript Closures</h2>
    	      <p className='text-neutral-700'>Closures are foundational to mastering JavaScript. This tutorial breaks down the concept, explaining why they are important, and how you can apply closures in your projects to improve your code.</p>
    	    </article>
    	  </section>
    	</div> 
                </div>
  )
}

export default MyPlugin;