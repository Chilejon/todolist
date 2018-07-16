import React, { Component } from 'react';
import './TodoList.css';
//import TodoItems from './TodoItems';

class TodoList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      monthlyCost: "No data",
      todaysDate: new Date(),
      lastPaymentDate: "",
      monthsLeft: 0,
      debt:0
    };
  }

  handleChange = (event) => {
    var lastPaymentDate = new Date()
    //testing jan feb march dates
    //lastPaymentDate = new Date("2018", "10", "1")
    var todaysDate = lastPaymentDate 
    this.setState({ todaysDate: lastPaymentDate })

    if ((lastPaymentDate.getMonth() + 1) > 3)
     {
       //2 = March due to zero indexing
      var c = new Date(lastPaymentDate.getFullYear() + 1, "2", "31")
      lastPaymentDate = c 
     } 
     else
     {
      var c = new Date(lastPaymentDate.getFullYear(), "2", "31")
      lastPaymentDate = c
     }
     
     this.setState({ lastPaymentDate: lastPaymentDate })

     var months;
     months = (todaysDate.getFullYear() - lastPaymentDate.getFullYear()) * 12;
     months -= lastPaymentDate.getMonth() + 1;
     months += todaysDate.getMonth();
     months = Math.abs(months)
     this.setState({ monthsLeft: months})
     
     var debt = this._inputElement.value / months
     debt = Math.round(debt*100)/100  
     this.setState({ monthlyCost: debt, debt: this._inputElement.value })
  };

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.calculatePayments}>
            <input ref={(a) => this._inputElement = a}
              placeholder="debt" required id="txtDebt" onChange={this.handleChange}>
            </input>
            <select id="payDate" ref = {(input)=> this.menu = input} required>
            <option value="1" selected>1st</option>
            <option value="15">15th</option>
            <option value="25th">25th</option>
            </select>
            
            {/* <select id="months" onChange={this.handleChange}  ref = {(input)=> this.menu = input} required>
            <option value="">Select</option>
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
            </select> */}
          </form>
        </div>
        
        
        
        <div>
          <br/>

          Monthy cost: <strong> {this.state.monthlyCost} </strong>
          
          <br/>
          Debt: <strong> {this.state.debt} </strong>
          
          <br/>
          Months Left: <strong> {this.state.monthsLeft} </strong>
          
          <br/>
          Today's date: <strong> {new Intl.DateTimeFormat('en-GB', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        }).format(this.state.todaysDate) } </strong>
          
          <br/>
          Last day of financial year: <strong>
          {new Intl.DateTimeFormat('en-GB', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        }).format(this.state.lastPaymentDate)} </strong>

      </div>  
      </div>
    );
  }
};

export default TodoList;