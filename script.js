import { GoogleGenerativeAI } from "@google/generative-ai";

//current score
var score=0;
var TScore=localStorage.getItem('score')
document.getElementById("score").innerText=TScore;
function updateScore(){
    TScore=Number(TScore)+5;
    document.getElementById("score").innerText=TScore;
    localStorage.setItem('score',TScore);
}
  
// Fetch your API_KEY
const API_KEY = "AIzaSyDFYm0UTir46BJVWHe6mIQ-rKtSUiObdbk";
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


document.getElementById("submit").addEventListener("click", sendToAI);

function getFromAI(){
    run();
    
}
function sendToAI(){
    var question =document.getElementById("questionbox").innerText;
    var solution =document.getElementById("solutionbox").value;
    check(question,solution);
    // document.getElementById("solutionbox").value="";
}

async function run() {
    var query;
    if (score>=0 && score<=10) {
        query = "Give a very simple rendom coding question only not solution, related to mathematics.";
    } else if(score>=15 && score<=20) {
        query = "Give a simple rendom coding question only not solution, related to array, linkedlist, stack and qeues, which ask in interviews.";
    }else{
        query = "Give a rendom coding question only not solution, related to tree and graph, which ask in interview.";
    }
    const prompt=query;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    var aiQns=text;
    document.getElementById("questionbox").innerText=aiQns;
  }

async function check(question, solution){
    var sendQuery="This is the question "+question+" and the solution is "+solution+", check the solution is correct or not if correct just show only yes or if it not correct then give a hint.";
    console.log(sendQuery);
    const result= await model.generateContent(sendQuery);
    const response= await result.response;
    const text=response.text();
    console.log(text)
    const str=text;
    alert(str);
    const substr="yes";
    console.log(str.includes(substr));
    if (str.toLowerCase().includes(substr)) {
        score += 5;
        updateScore();
        run();
    }
}
getFromAI()


// AIzaSyDFYm0UTir46BJVWHe6mIQ-rKtSUiObdbk