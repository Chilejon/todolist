import React, { Component } from "react";
 
class TodoItems extends Component {
  constructor(props, context) {
    super(props, context);
 
    this.createTasks = this.createTasks.bind(this);
  }
 
  createTasks(item) {

    if (item.stat === "done")
    {
    return <div className="Done" onClick={() => this.delete(item.key)} 
              key={item.key}><span>{item.stat}: </span>{item.text} 
           </div>
    };
    if (item.priority === "3")
    {
    return <div className="Top" onClick={() => this.delete(item.key)} 
              key={item.key}><span>{item.stat}: </span>{item.text} 
           </div>
    };
    if (item.priority === "2")
    {
    return <div className="Middle" onClick={() => this.delete(item.key)} 
              key={item.key}><span>{item.stat}: </span>{item.text} 
           </div>
    };
    if (item.priority === "1")
    {
    return <div className="Bottom" onClick={() => this.delete(item.key)} 
              key={item.key}><span>{item.stat}: </span>{item.text} 
           </div>
    };
  }

  delete(key) {
      this.props.delete(key);
  }

  strikeOut(key) {
      
      this.props.strikeOut(key);
  }
 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (

      <div className="theList">
          {listItems}
      </div>
      
    );

  }
};
 
export default TodoItems;