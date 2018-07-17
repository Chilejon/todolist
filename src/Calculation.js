import React, { Component } from 'react';
import './TodoList.css';
//import TodoItems from './TodoItems';

class TodoList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      monthlyPayment: 0.00,
      todaysDate: new Date(),
      lastPaymentDate: "",
      monthsLeftToPay: 0,
      totalDebt:0.00,
      paymentDay:15, //1 15 or 25
      debt:0.00,
      paymentSchedule: [],
      payDiff:0.00,
      firstPaymentDate:""
    };

    this.addDays = this.addDays.bind(this);

  }

 addDays = (date) => {
    var result = new Date(date);
    result.setDate(date.getDate() + 21);
    return result;
}
  
  handleChange = (event) => {
    var lastPaymentDate = new Date()
    
    var firstPaymentDate = lastPaymentDate.getDate() + "/" + (lastPaymentDate.getMonth()+1) + "/" + lastPaymentDate.getFullYear();
    
    var paymentDay = this.menu.value
    var tempDate = new Date(lastPaymentDate.getFullYear(), (lastPaymentDate.getDate() + 1), paymentDay)
    
    
    var dateNow = new Date()
    var twentyOneDaysLater = new Date(dateNow.getFullYear(), dateNow.getDate(), dateNow.getDay())
    alert(dateNow) 
    //twentyOneDaysLater.setDate(twentyOneDaysLater.getDate() + 21)

    alert(this.addDays(dateNow))

    //var date1 = new Date(2018, 6, 16)
    //var date2 = new Date(2018, 6, 13)
    
   
    // if (date1 > date2) {

    //   //alert(date1 + "Date One is greather then Date Two." + date2);

    // }else {

    //   //alert(date1 + "Date Two is greather then Date One." + date2);

    // }



    




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
     this.setState({ monthsLeftToPay: months})
     
     var inputDebt = this._inputElement.value

     var debt = inputDebt / months
     debt = Math.round(debt*100)/100  
     this.setState({ monthlyPayment: debt, debt: inputDebt })

    var paymentSchedule = []
    var i;
    for (i = 0; i < months; i++) { 
      paymentSchedule.push(firstPaymentDate + " : " + debt)
    }

    var willPay = months*debt
    var payDiff
    if(willPay < inputDebt)
    {
      payDiff = inputDebt-willPay
      //payDiff = (Math.round(payDiff + "e+2")  + "e-2")
      payDiff = parseFloat(Math.round(payDiff*100)/100).toFixed(2) 

      var temp = paymentSchedule[0] + payDiff
      
      temp = parseFloat(Math.round(temp*100)/100).toFixed(2)
      
      if(isNaN(temp) == false)
      {
        paymentSchedule[0] = temp
      }
    }

    if(willPay > inputDebt)
    {
      payDiff = willPay-inputDebt
      payDiff = parseFloat(Math.round(payDiff*100)/100).toFixed(2) 
      //payDiff = (Math.round(payDiff + "e+2")  + "e-2") 

      var temp = paymentSchedule[0] - payDiff
      temp = parseFloat(Math.round(temp*100)/100).toFixed(2) 

      if(isNaN(temp) == false)
      {
        paymentSchedule[0] = temp
      }
    }
     this.setState({paymentSchedule: paymentSchedule})
  };

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.calculatePayments}>
            <input ref={(a) => this._inputElement = a}
              placeholder="debt" required id="txtDebt" onChange={this.handleChange}>
            </input>
            Preferred day of month:
            <select id="paymentDay" ref = {(input)=> this.menu = input} required>
            <option value="1">1st</option>
            <option value="15" selected>15th</option>
            <option value="25th">25th</option>
            </select>
            
            
          </form>
        </div>
        <div>
          <br/>

          Monthly cost: <strong> {this.state.monthlyPayment} </strong>
          
          <br/>
          Total Debt: <strong> {this.state.debt} </strong>
          
          <br/>
          Months Left: <strong> {this.state.monthsLeftToPay} </strong>
          <hr/>
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

        <hr/>
        
        {this.state.paymentSchedule.map (function(item, i){
          return <div>Month:{i+1} Pay:{item}</div>
        }
        )}

      </div>  
      </div>
    );
  }
};

export default TodoList;

/* <select id="months" onChange={this.handleChange}  ref = {(input)=> this.menu = input} required>
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
            </select> */