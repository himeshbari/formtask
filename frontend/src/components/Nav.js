import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="text-center mx-auto z-1">
        <div className="list-group dashboard-menu" >
          <h4 className="d-flex align-items-center fs-5 justify-content-center font-fam my-0" style={{height:"100px"}}>DASHBOARD</h4>

          <NavLink
            to="/"
            className="list-group-item list-group-item-action pt-3"
          >
            Reg Form
          </NavLink>
          
          <NavLink
            to="/reg-list"
            className="list-group-item list-group-item-action pt-3"
          >
            Reg List
          </NavLink>

         

       

          
                        
        
          
        </div>
      </div>
    </>
  );
};

export default Nav;





