import React from 'react'


const MenuBar = () => {

  return (
    <div id="menu-bar" className="menu-bar">
      <p className="whitespace"></p>
       <h2 id="main-title" className="menu-cat"> CatWalk <i className=" fas fa-cat"></i></h2>
       <p className="whitespace"></p>
       <p className="whitespace"></p>
       <p className="whitespace"></p>

       <a className="menu-link" onClick={()=> {
         document.getElementById("productOverview-link").scrollIntoView({behavior: "smooth"})}}>product overview</a>

       <p className="whitespace"></p>
       <hr className="menu-link"/>
       <p className="whitespace"></p>

       <a className="menu-link" onClick={()=> {
         document.getElementById("relatedProducts-link").scrollIntoView({behavior: "smooth"})
       }}>related products</a>

       <p className="whitespace"></p>
       <hr className="menu-link"/>
       <p className="whitespace"></p>

       <a className="menu-link" onClick={()=> {
         document.getElementById("qa-link").scrollIntoView({behavior: "smooth"})}}>questions&answers</a>

       <p className="whitespace"></p>
       <hr className="menu-link"/>
       <p className="whitespace"></p>

       <a className="menu-link" onClick={()=> {
         document.getElementById("child-ratings-reviews").scrollIntoView({behavior: "smooth"})}}>reviews</a>

       <p className="whitespace"></p>
       <p className="whitespace"></p>
       <p className="whitespace"></p>



    </div>
  )
}

export default MenuBar