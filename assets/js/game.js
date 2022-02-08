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

let globalpointsGamer=0;
let globalpointsComputer=0;

//references

const btnNew = document.querySelector('#btnNew');
const btnGive = document.querySelector('#btnGive');
const btnStop = document.querySelector('#btnStop');
const divCardGamer = document.querySelector('#gamer-cards')
const divCardComputer = document.querySelector('#computer-cards')

const smalls = document.querySelectorAll('small');




const inicialize =() => {
   createDeck();
   disableButtons('btnGive&btnStop');


}

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
    console.log( deck );

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

const value_card= (card) => {

    const value = card.substring(0, card.length-1);
    
    return (isNaN( value)) ?
            (value ==='A') ? 11:10
            : value * 1;
            
}

const disableButtons= (parm) => {

    switch (parm) {

        case 'btnGive&btnStop':
            btnGive.disabled = true;
            btnStop.disabled = true;
            btnNew.disabled  = false;
        break;

        case 'btnNew&btnStop':
            btnGive.disabled = false;
            btnStop.disabled = true;
            btnNew.disabled  = true;
        break;
        case 'btnNew':
            btnGive.disabled = false;
            btnStop.disabled = false;
            btnNew.disabled  = true;
        break;


        default:
            console.log('this case is not allow');

    }

}

//computer Time
const computerTime = (minimumPoints) => {


    do{
        const card= give_meCard();
        pointsComputer = pointsComputer + value_card(card);
        smalls[2].innerText=pointsComputer;
        const imgCard = document.createElement('img');
        imgCard.src= `assets/cards/${card}.png`;
        imgCard.classList.add('card-image');
    
        divCardComputer.append( imgCard );

    if( minimumPoints > 21) {
        break;
    }

    }while( ( pointsComputer < minimumPoints ) && ( minimumPoints <= 21 ) );

if(pointsGamer===pointsComputer){
    results('Empate');
}else if(pointsComputer>21){
    results('win');
}else{
    results('lose');
}
}

const results = (parm) => {

    if(parm=='win'){
        globalpointsGamer++;
        console.log('21!BlackJack! GANASTE');
        smalls[1].innerText=globalpointsGamer;

    }else if (parm=='lose'){
        globalpointsComputer++;
        console.log('lo siento TE PASASTE');
        smalls[3].innerText=globalpointsComputer

    }else{

        console.log('Empate');
    }
    }








//events
btnGive.addEventListener('click',() => {

    disableButtons('btnNew');
    const card= give_meCard();
    pointsGamer = pointsGamer + value_card(card);
    smalls[0].innerText=pointsGamer;
    const imgCard = document.createElement('img');
    imgCard.src= `assets/cards/${card}.png`;
    imgCard.classList.add('card-image');

    divCardGamer.append( imgCard );

    if( pointsGamer>21){

        disableButtons('btnGive&btnStop');
        results('lose');
        computerTime(pointsGamer);

    }else if (pointsGamer ===21){

        disableButtons('btnGive&btnStop');
        results('win');
        computerTime(pointsGamer);
    }
    
});

btnStop.addEventListener('click',() => {

    disableButtons('btnGive&btnStop');
    computerTime(pointsGamer);

});

btnNew.addEventListener('click', () => {
    disableButtons('btnNew&btnStop');
    deck =[];
    deck = createDeck();
    pointsGamer=0;
    pointsComputer=0;
    smalls[0].innerText=0;
    smalls[2].innerText=0;
    divCardComputer.innerHTML='';
    divCardGamer.innerHTML='';
    
});

inicialize();















