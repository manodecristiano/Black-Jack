/*
* 2c = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/



let deck = [];
const types = [ 'C', 'D', 'H', 'S' ];
const specials = [ 'A', 'J', 'Q', 'K' ];

let pointsGamer=0;
let pointsComputer=0;

//references


const btnGive = document.querySelector('#btnGive');
const divCardGamer = document.querySelector('#gamer-cards')
const smalls = document.querySelectorAll('small');


const createDeck = () => {

    for ( let i= 2; i <=10; i++ ){
        for( let type of types ){
            deck.push(i + type);
        }
    }

    for ( type of types){
        for(let spe of specials){
            deck.push(spe+type);
        }       
    } 
    
    
    deck = _.shuffle( deck );
    //console.log( deck );

    return deck;
}



const give_meCard = () =>{

    if( deck.length ===0){
        throw 'No hay cartas en el deck';
    }

    const cardRemove=deck.pop();
    //console.log("carta borrada: "+cardRemove);
    return cardRemove;
}

const value_card =(card) => {

    const value = card.substring(0, card.length-1);
    
    return (isNaN( value)) ?
            (value ==='A') ? 11:10
            : value * 1;
            
}



createDeck();
const value = value_card(give_meCard());
//console.log({value});



//events
btnGive.addEventListener('click',() => {

    const card= give_meCard();
    pointsGamer = pointsGamer + value_card(card);
    smalls[0].innerText=pointsGamer;
    
})








