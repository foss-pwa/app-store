import React, { useContext } from "react";
import { ContentContext } from "../sw/ServiceWrapper";

const CategoryList = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>
        {props.apps.map((x)=>(
          <div>
            <a href={`/${x}`}>{x}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CategoryPage = () => {
  const { categories } = useContext(ContentContext);
  return (
    <div>
      {categories.map((x)=>(
        <CategoryList name={x.name} apps={x.apps}/>
      ))}
    </div>
  );
};
