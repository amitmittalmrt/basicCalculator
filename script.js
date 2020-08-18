const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn=document.getElementById('clear-btn');
// calculate first and second value depending on operator
const calculate ={
    '/': (firstNumber,secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber,secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber,secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber,secondNumber) => firstNumber - secondNumber,
    '=':(firstNumber,secondNumber)=> secondNumber,
};
let firstValue=0;
let operatorValue=0;
let awaitNextValue= false;

function sendNumberValue(number){
// replace current display value if first value is entered
if(awaitNextValue){
    calculatorDisplay.textContent=number;
    awaitNextValue=false;
}else{
    //    if current display value is 0, replace it, if not add number
   const displayValue= calculatorDisplay.textContent;
   calculatorDisplay.textContent = displayValue ==='0'? number : displayValue + number;
}
}
// Add decimal function 
function addDecimal(){
    // if operator pressed, dont add decimal
    if (awaitNextValue)return;
    // if no decimal,add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`
    }
}
// use Operator 
function useOperator(operator){
    const currentValue= Number(calculatorDisplay.textContent);
    // prevent multiple operator
    if (operatorValue && awaitNextValue){
    operatorValue = operator;
    return;
    }
    // assign first value if no value
    if(!firstValue){
        firstValue= currentValue;
    }else{
     const calculation = calculate[operatorValue](firstValue,currentValue);
     calculatorDisplay.textContent= calculation;
     firstValue= calculation;
    }
    // ready for next value,store operator 
    awaitNextValue = true;
    operatorValue=operator;
}

// Reset display

function resetAll(){
 firstValue=0;
 operatorValue=0;
 awaitNextValue= false;
 calculatorDisplay.textContent='0';
}
// Add event listners for numbers, operaotrs ,decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0){
     inputBtn.addEventListener('click',()=>sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')){
     inputBtn.addEventListener('click',()=>useOperator(inputBtn.value));  
    }else if (inputBtn.classList.contains('decimal')){
     inputBtn.addEventListener('click',()=>addDecimal());  
    }
 });
 // event listner for clear button 
clearBtn.addEventListener('click',resetAll);