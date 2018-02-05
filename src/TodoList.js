import React, { Component } from 'react';
import './TodoList.css';
import TodoItems from './TodoItems';
import { toASCII } from 'punycode';

class TodoList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.strikeOut = this.strikeOut.bind(this);
  }

  addItem(e) {
    var itemArray = this.state.items;

    if (this._inputElement.value !== "") {
      
      itemArray.unshift(
        {
          text: this._inputElement.value,
          key: Date.now(),
          priority: this.menu.value,
          stat: "toDo"
        }
      );

      this.setState({
        items: itemArray
      });

      this._inputElement.value = "";
      this.menu.value = "";
    }

    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      if (item.key === key && item.stat === "done")
      {

    //write to c drive
    
    var element = document.createElement("a");
       
   // var file = new Blob([document.getElementById('myInput').value], {type: 'text/plain'});
    var file = new Blob([item.text], {type: 'text/plain'});
    
    element.href = URL.createObjectURL(file);
    element.download = "file://c:/todoList/today.txt";
    element.click();



          return (item.key !== key);
        };
      
        if (item.key === key && item.stat !== "done") 
       {
        return (item.stat = "done");
        };
    
      if (item.key !== key)
      {
        return (item)
      }


    });


    

    this.setState({
      items: filteredItems
    });
  }

  strikeOut(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a}
              placeholder="enter task" required>
            </input>
            <select id="priority" ref = {(input)=> this.menu = input} required >
            <option value="">Select priority</option>
            <option value="3">High</option>
            <option value="2">Med</option>
            <option value="1">Low</option>
          </select>
            <button type="submit">add</button>
          </form>
        </div>
        
          <TodoItems entries={this.state.items}
                   
                    delete={this.deleteItem}
                    strikeOut={this.strikeOut}/>

      </div>

    );
  }
};

export default TodoList;