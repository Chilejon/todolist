import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./TodoList";
import Calculation from "./Calculation";
  
var destination = document.querySelector("#container");
  
ReactDOM.render(
    //<div>
    //   <TodoList/>
    //</div>,
    <div>
        <Calculation/>
    </div>
    ,
    destination
);
