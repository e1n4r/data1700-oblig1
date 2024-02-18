class ticketinfo {
    ticketid;
    film;
    numberoftickets;
    firstname;
    lastname;
    tlf;
    email;

    constructor(ticketid,film,numberoftickets,firstname,lastname,tlf,email){
        this.ticketid = ticketid;
        this.film = film;
        this.numberoftickets = numberoftickets;
        this.firstname = firstname;
        this.lastname = lastname;
        this.tlf = tlf;
        this.email = email;
    }
}
let tickets = [];   //Array where all ticket-purchases are placed
let idgenerator = 1;    //Variable that gives each purchase a unique ID
let valid = true;   //Boolean used to tell whether the input in the form is valid
const films = ["Aquaman","Argylle","Sau"];      //Array that contains all the film you can buy tickets to
let ticketText = getTicketText(0);      //Variable used to spell "ticket" or "tickets", whichever is correct

//Runs through both options for the for-loop described below
filmsForLoop(true);
filmsForLoop(false);

function findElement(id, isValue = true) {
    if (isValue) {
        return document.getElementById(id).value;
    }
    else {
        return document.getElementById(id);
    }
}

function filmsForLoop(isShowTicketSection){
    for (let film of films){
        //If true, the loop prints out the div where all the tickets are shown with all movies in the array
        if (isShowTicketSection){
            findElement("tickets",false).insertAdjacentHTML("beforeend",`<div id="${film.toLowerCase()}"><ul><h3>${film} (<span id="${film.toLowerCase()}tickets">0 </span>${ticketText})</h3></ul></div>`);
        }
        //If false, the loop fills out the dropdown menu where you choose which film to attend with the films from the array
        else{
            findElement("films",false).insertAdjacentHTML("beforeend",`<option>${film}</option>`);
        }


    }
}
//Fixes singular/plural grammar in the form
function getTicketText(numberOfTickets){
    if (numberOfTickets===1){
        return " ticket";
    }
    else{
        return " tickets";
    }
}
//function that the number of ticket for each movie
function updateNumberofTickets(film, isDelete=false){
    //Whenever a purchase is made, this part of the code runs
    if (!isDelete){
        let ticketCounter = parseInt(findElement(`${film}tickets`,false).innerText);    //ticketCounter is set to the number of tickets the relevant film had before the purchase
        ticketCounter += parseInt(tickets[tickets.length-1].numberoftickets);       //Then the number of tickets purchased is being added to the number
        findElement(`${film}tickets`,false).innerText = ticketCounter.toString();   //Updates the form with the correct number of tickets
    }
    //This only runs when all tickets are deleted
    else{
        findElement("tickets",false).innerHTML="";      //Entire div is emptied
        filmsForLoop(true);     //Runs the for-loop again to fill out the div with the movies
    }
}

//function that runs when the button for buying tickets is pressed
function buyTicket(){
    valid = true; //Valid is true by default

    let ticket = new ticketinfo(idgenerator,inputValidation(findElement("films"),"films"),      //creates the object ticket using the class ticketinfo in the beginning of the code
        inputValidation(findElement("number"),"number"),
        inputValidation(findElement("firstname"),"name"),
        inputValidation(findElement("lastname"),"name"),
        inputValidation(findElement("tlf"),"tlf"),
        inputValidation(findElement("email"),"email"));

    if (valid){ //This section will only run if the input validation is passed

        idgenerator ++; //Id-generator increases to ensure no duplicate id's
        ticketText = getTicketText(ticket.numberoftickets); //ticketText is updated with the number of tickets the user has bought
        tickets.push(ticket); //The object is then added to the array containing all tickets
        findElement(`${ticket.film.toLowerCase()}`,false).insertAdjacentHTML("beforeend",`<li id="${ticket.ticketid}">${ticket.firstname} ${ticket.lastname} has ${ticket.numberoftickets}${ticketText}</li>`); //Adds an li-item of the purchase to the section that shows all purchases
        updateNumberofTickets(ticket.film.toLowerCase());
    }
}

//Function that runs when the button for deleting all tickets is pressed
function deleteTickets(){
    tickets.length = 0;     //Array with all tickets is emptied
    updateNumberofTickets(films,true);      //Runs the function described above

}


//Input validation. If it passes all, nothing is changed. If fail an alert pops up with the reason and valid is set to false (second part of buyTicket function will not run as a result)

function inputValidation(input, type){
    if (input.trim()===""){
        alert("One of the fields were not given a value. Please check your input")
        valid = false;
    }
    else if(type === "number"){
        if (isNaN(parseInt(input)) || !isBetweenOneAndTwenty(input)){
            alert("You must choose between 1 and 20 tickets")
            valid = false;
        }
    }
    else if (type === "tlf"){
        if (isNaN(parseInt(input)) || !isEightDigits(input)){
            alert("The phone number entered is not valid")
            valid = false;
        }
    }
    else if (type === "email"){
        let emailPattern = /^\S+@\S+\.\S+$/; //Regular expression for email-validation
        if (!emailPattern.test(input)){
            alert("The email you entered was not valid.")
            valid = false;
        }
    }
    return input;
}
function isEightDigits(input){
    return input.toString().length === 8;
}
function isBetweenOneAndTwenty(input){
    return input >= 0 && input <= 20;

}


