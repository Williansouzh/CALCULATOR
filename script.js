'use strict'

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operator]')
let newNumber = true;
let previousNumber;
let operator;

const pedingOperation = ()=> operator !== undefined

const calculate = ()=>{
    if(pedingOperation()){
        newNumber = true
        let currentNumber = parseInt(display.textContent);
        let result = eval(`${previousNumber}${operator}${currentNumber}`) 
        updateDisplay(result)
        console.log(`${previousNumber}${operator}${currentNumber}`)
    }
}
const updateDisplay = (text)=>{
    if(newNumber){
        display.textContent = text
        newNumber = false;
    }else{
        display.textContent += text
    }
}
const insertNumber = (event)=>{
    updateDisplay(event.target.textContent)
}
numbers.forEach(number => number.addEventListener('click', insertNumber))
const selectOperator = (event)=>{
   if(!newNumber){
        calculate()
        newNumber = true;
        operator = event.target.textContent
        previousNumber = parseInt(display.textContent)
        console.log(operator )
   }
}
operators.forEach(operator=>operator.addEventListener('click', selectOperator))
const cleanDisplay = ()=>{
    display.textContent = ''
}
document.getElementById('cleanDisplay').addEventListener('click', cleanDisplay)
const cleanCalc = ()=>{
    previousNumber = 0;
    currentNumber= 0;
}
document.getElementById('cleanCalc').addEventListener('click', cleanCalc)
const backspace = ()=>display.textContent = display.textContent.slice(0, -1)

document.getElementById('backspace').addEventListener('click', backspace)
