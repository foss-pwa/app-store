import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";

const CategoryList = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>
        {props.apps.map((x)=>(
          <div key={x}>
            <Link to={`/${x}`}>{x}</Link>
          </div>
        ))}
      </div>
      <Navbar/>
    </div>
  );
};

export const CategoryPage = () => {
  const { categories } = useContext(ContentContext);
  return (
    <div>
      {categories.map((x)=>(
        <CategoryList key={x.name} name={x.name} apps={x.apps}/>
      ))}
    </div>
  );
};
