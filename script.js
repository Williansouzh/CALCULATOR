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
let activeEqual = ()=>{
    calculate()
    operator= undefined;
}
document.getElementById('equal').addEventListener('click', activeEqual)
let inverter = ()=>{
    newNumber= true;
    updateDisplay(parseFloat(display.textContent)*(-1))
}
document.getElementById('inverter').addEventListener('click', inverter)

let hasDecimal = ()=>display.textContent.indexOf('.')!=-1;
let hasValue = ()=>display.textContent.length>0;
const toDecimal = ()=>{
    if(!hasDecimal()){
        if(hasValue()){
            updateDisplay('.')
        }else{
            updateDisplay('0.')
        }
    }
}
document.getElementById('decimal').addEventListener('click', toDecimal)

//keyboard

const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operatorDivide',
    '*': 'operatorMultiply',
    '-': 'operatorLess',
    '+': 'operatorPlus',
    '=': 'igual',
    Enter: 'equal',
    Backspace: 'backspace',
    c: 'cleanDisplay',
    Escape: 'cleanDisplay',
    ',': 'decimal',
};

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);