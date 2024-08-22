const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanNumeralValues = [    
        {name: "M",    val: 1000},
        {name: "MM",   val: 2000},
        {name: "MMM",  val: 3000},    
        {name: "CM",   val: 900},
        {name: "DCCC", val: 800},
        {name: "DCC",  val: 700},
        {name: "DC",   val: 600},
        {name: "D",    val: 500},
        {name: "CD",   val: 400},
        {name: "CCC",  val: 300},
        {name: "CC",   val: 200},
        {name: "C",    val: 100},    
        {name: "XC",   val: 90},
        {name: "LXXX", val: 80},
        {name: "LXX",  val: 70},
        {name: "LX",   val: 60},
        {name: "L",    val: 50},
        {name: "XL",   val: 40},
        {name: "XXX",  val: 30},
        {name: "XX",   val: 20},
        {name: "X",    val: 10},    
        {name: "IX",   val: 9},
        {name: "VIII", val: 8},
        {name: "VII",  val: 7},
        {name: "VI",   val: 6},
        {name: "V",    val: 5},
        {name: "IV",   val: 4},
        {name: "III",  val: 3},
        {name: "II",   val: 2},
        {name: "I",    val: 1},    
];
Object.freeze(romanNumeralValues); 


const checkInput = () => {
    const numberInput = parseInt(number.value);

    if(!number.value || isNaN(numberInput)){
        output.innerHTML=`<p>Please enter a valid number.</p>`;
        return;
    }else if (numberInput<=0){
        output.innerHTML=`<p>Please enter a number greater than or equal to 1.</p>`;
    }else if (numberInput>3999){
        output.innerHTML=`<p>Please enter a number less than or equal to 3999.</p>`;
    }else if (number.value.includes('.')){
        output.innerHTML=`<p>Please enter a valid value. The two nearest valid values are ${numberInput-1} and ${numberInput+1}.</p>`;
    }else{        
        output.innerHTML=`<p style='font-family: "Noto Serif", serif';>${convertToRoman(numberInput)}</p>`;
    }
};

const convertToRoman = num => {
    const breakDownArr = breakDown(num);
    const romanArr = breakDownArr.map(indexNum => {
        const match = romanNumeralValues.find(item => item.val === indexNum);
        return match ? match.name : null;
      }).join('');
    return romanArr;
  };

//returned data is an array
const breakDown = (num) => {
    const breakDownArr = [];

    const thousands = Math.floor(num / 1000) * 1000;
    const hundreds = Math.floor((num-thousands) / 100) *100;
    const tens = Math.floor((num-thousands-hundreds) / 10) * 10;
    const ones = Math.floor((num-thousands-hundreds-tens)) % 10;

    breakDownArr.push(thousands,hundreds,tens,ones);
    return breakDownArr;
};


convertBtn.addEventListener("click", checkInput);
number.addEventListener("keydown", (e)=>{
    if (e.key === "Enter") {    //checks if ENTER key is pressed
        checkInput();
      }
});
