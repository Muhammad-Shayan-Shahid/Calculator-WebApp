let ac = document.querySelector("#btn-ac")
let inp = document.querySelector("input")
let del = document.querySelector("#btn-del")
let num = document.querySelectorAll(".num")
let pw = document.querySelectorAll(".power")
let trignometricfnc = document.querySelectorAll(".tgf")
let equalbtn = document.querySelector("#btn-equal")

function ace(){
    ac.addEventListener("click", function(){
        inp.value = "";
    })
}
ace();

function dele(){
    del.addEventListener("click", function(){
        inp.value = inp.value.slice(0, -1); 
    })
}
dele();

function numInput() {
    num.forEach((btn) => {
        btn.addEventListener("click", function() {
            inp.value += btn.innerText;  
        });
    });
}
numInput();

function power(){
    pw.forEach((evt)=>{
        evt.addEventListener("click" , function(e){
            if(e.target.innerText === "x²"){
                inp.value = inp.value+'^2';
            }else if(e.target.innerText === "x³"){
                inp.value = inp.value+'^3';
            }else if(e.target.innerText === "xʸ"){
                inp.value = inp.value+'^';
            }else if(e.target.innerText === "sqrt"){
                inp.value = inp.value+'sqrt(';
            }else if(e.target.innerText === "e"){
                inp.value = inp.value+'e^';
            }
            else{
                inp.value = inp.value+'!';
            }
        })
    })
}
power();

function trignometric(){
    trignometricfnc.forEach((evt)=>{
        evt.addEventListener("click" , function(e){
                inp.value = inp.value + `${e.target.innerText}(`;
        })
    })
}
trignometric();

function formatExpression(expr) {
    return expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
}

equalbtn.addEventListener("click" ,async function(){
        try {
            if (!inp.value.trim()) return;
            let userInput = inp.value;              
            let formatted = formatExpression(userInput);
            let expression = encodeURIComponent(formatted);
            let response = await fetch(`https://api.mathjs.org/v4/?expr=${expression}`);
            let data = await response.text();
      
            if (data.includes("Error") || data === "NaN" || data === "Infinity") {
                inp.value = "Error";
            } else {
                inp.value = data;
                    }
    } catch (err) {
        inp.value = "Error";
    }
})
