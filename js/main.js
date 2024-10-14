/*
Här lägger du din JavaScript-kod
*/

"use strict";

//Variabler

let addToDoEl = document.getElementById("newtodo");
let addToDoButtonEl = document.getElementById ("newtodobutton");
let messageEl = document.getElementById("message");
let clearButtonEl = document.getElementById("clearbutton");
let list = document.getElementById("todolist");
let i;



//Händelsehanterare
addToDoEl.addEventListener("keyup", checkInput, false);
addToDoButtonEl.addEventListener("click", addListItem, false);
window.onload = init;





//Initierings(start)funktion: när sidan laddas in
function init(){
console.log("Initierar......");

//"Lägg-till"-knappen är inaktiverad när sidan laddas in. Man måste börja skriva för att något ska hända, antingen kunna lägga till eller få felmeddelande
addToDoButtonEl.disabled = true;


//Läs in to-do-listan
loadToDoList();


//Klickhanterare för att web storage ska vara rensat när man laddar om sidan, om man har rensat via knappen eller trycka på sakerna i listan
clearButtonEl.addEventListener("click", clearStorage, false);


}


//Kontrollera input, med en funktion som har en if-sats. Är värdet mindre än 4, går det ej att lägga till på listan
function checkInput (){
console.log("Kontrollerar input....");


//Läs in värdet av input-fältet
let input = addToDoEl.value;

//Kontrollera antal tecken i namnet, if-sats
if (input.length > 4){
messageEl.innerHTML = ""; //inget meddelande om det stämmer, en tom textsträng
addToDoButtonEl.disabled = false; //knappen aktiveras om det är 5 tecken långt

} else {
messageEl.innerHTML = "Ange minst 5 tecken";
addToDoButtonEl.disabled = true; //knappen är inaktiv om det är färre än 5 tecken i inputfältet


}
}




//Lägg till item på to-do-list. 
function addListItem (){
console.log("Lägger till item på to-do-list......");

let input = addToDoEl.value;



//Skapa ett nytt article-element att lägga en to-do innanför
let newEl = document.createElement("article"); //ett temporärt element
let newTextNode = document.createTextNode(input);
newEl.appendChild(newTextNode);
newEl.className = "listItem";

//Lägg till en to-do listan
list.appendChild(newEl);


//Lägger till en händelsehanterare. anonym funktion med ett element (e), det element man klickar på

//denna händelsehanterare här gör att man kan ta bort en to-do igen om man raderat den en gång förut. 

newEl.addEventListener("click", function(e){
    e.target.remove();
    
    
    //Lagra lista på nytt efter man raderat något element, anropa funktionen saveToDoList. Tar man bort något raderas det från webstorage 
    saveToDoList();
});



//Radera allt i input-fältet efter man skrivit in en to-do
addToDoEl.value = "";

//Inaktiverar knappen efter man lagt in en lyckad lagring av en to-do, så att man inte kan skapa flera av samma på rad
addToDoButtonEl.disabled = true;



//Anropa lagring att spara listan
saveToDoList();
}


//sparar toDo-listan
function saveToDoList(){
console.log("Lagrar to-do-list.....");



//Läs in listan i web storage, i en temporär array

let toDos = document.getElementsByClassName("listItem");
let tempArr = [];


//loopa igenom listan och lagra till en temporär array
for(i=0; i < toDos.length; i++){
tempArr.push(toDos[i].innerHTML);


}

//konvertera till JSON-sträng för att spara data till webstorage
//arrayer kan inte sparas till webstorage, bara textsträngar

let jsonStr = JSON.stringify(tempArr);


//Lagrar i Web storage
localStorage.setItem("toDos", jsonStr);



console.log(tempArr); //kontrollera arrayen genom att skriva ut till konsollen

}





//Läser in listan från web storage
function loadToDoList(){
    console.log("Läser in to-do-list.....");

//Läser in från webstorage, konverterar från textsträng i JSON till en array

let toDos = JSON.parse(localStorage.getItem("toDos"));



//Kontrollera om arrayen är en array, att något är sparat i den så att värdet inte är 0, med en if-sats
if (Array.isArray(toDos)){

//Loopa med en for-loop igenom arrayen
for(i=0; i < toDos.length; i++){


//Skapa nya article-element, nya to-dos

let newEl = document.createElement("article"); //ett temporärt element
let newTextNode = document.createTextNode(toDos[i]);
newEl.appendChild(newTextNode);
newEl.className = "listItem";


//Lägg till i listan på DOM
list.appendChild(newEl);

//Lägger till en klickhanterare. anonym funktion med ett element, det element man klickar på
//klickar vi på detta element anropar vi en anonym funktion, så skickar vi med vilket element vi har klickat på
//detta element lagrar vi i en variabel som heter e

newEl.addEventListener("click", function(e){
e.target.remove();


//Lagra lista på nytt efter man raderat något element, anropa funktionen saveToDoList. Tar man bort något raderas det från webstorage 
saveToDoList();

});

}
}else{
console.log("Det fanns ingen array att läsa in till web storage, antingen för att web storage är rensat eller för att du inte lagt till någon to-Do");
}
}

//Rensa-knappen. Rensa från webstorage

function clearStorage(){
localStorage.clear();

//Radera innehåll på skärmen genom att lägga in tom textsträng
list.innerHTML ="";

//Kontrollera att allt är rensat och knappen funkar genom en console.log
console.log("Local storage och lista på skärmen är nu rensad");


}


