/*
 * 2c = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const modul = (() => {
  "use strict";

  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  let deck = [];

  let pointsGamers = [];
  let compuTurn = 0;

  let globalpointsGamer = 0;
  let globalpointsComputer = 0;

  //references
  const btnNew = document.querySelector("#btnNew"),
    btnGive = document.querySelector("#btnGive"),
    btnStop = document.querySelector("#btnStop"),
    divCards = document.querySelectorAll(".divCards");

  const small = document.querySelectorAll(".Small");
  const global = document.querySelectorAll(".globalPoints");

  //Creation of Deck and disable Buttons
  const initialize = (numGamers = 2) => {
    deck = createDeck();
    disableButtons("btnGive&btnStop");

    pointsGamers = [];
    for (let i = 0; i < numGamers; i++) {
      pointsGamers.push(0);
    }
    compuTurn = pointsGamers.length - 1;

    small.forEach((element) => {
      element.innerText = 0;
    });

    divCards.forEach((element) => {
      element.innerText = "";
    });
  };

  //Creation the Name of every Images in the Cars folder
  const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }

    for (let type of types) {
      for (let spe of specials) {
        deck.push(spe + type);
      }
    }
    return _.shuffle(deck);
  };

  //Injecting the value of the card
  const value_card = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  //removing the last card
  const give_meCard = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop();
  };

  //disable Buttons depending on which button you press
  const disableButtons = (parm) => {
    switch (parm) {
      case "btnGive&btnStop":
        btnGive.disabled = true;
        btnStop.disabled = true;
        btnNew.disabled = false;
        break;

      case "btnNew&btnStop":
        btnGive.disabled = false;
        btnStop.disabled = true;
        btnNew.disabled = true;
        break;
      case "btnNew":
        btnGive.disabled = false;
        btnStop.disabled = false;
        btnNew.disabled = true;
        break;

      default:
        console.log("this case is not allow");
    }
  };

  //turn:0 = first Gamer and the last always be the Computer
  const accumulatingPoints = (card, turn) => {
    pointsGamers[turn] = pointsGamers[turn] + value_card(card);
    small[turn].innerText = pointsGamers[turn];
    return pointsGamers[turn];
  };

  //counter of total Wins and Loses
  const totalWinsandLose = (parm) => {
    if (parm === "Gamer") {
      globalpointsGamer++;
      global[0].innerText = globalpointsGamer;
    } else {
      globalpointsComputer++;
      global[1].innerText = globalpointsComputer;
    }
  };

  //Put the card at DOM
  const createCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add("card-image");
    divCards[turn].append(imgCard);
  };

  //computer Time
  const computerTime = (minimumPoints) => {
    let pointsComputer = 0;
    do {
      const card = give_meCard();
      pointsComputer = accumulatingPoints(card, compuTurn);
      createCard(card, compuTurn);
    } while (pointsComputer < minimumPoints && minimumPoints <= 21);
    BlackjackOrmore21(minimumPoints, pointsComputer);
  };

  //checked if the points are more or iqual of 21
  const BlackjackOrmore21 = (pointsG, pointsC) => {
    if (pointsG === 21 && pointsC != pointsG && pointsG === 0) {
      disableButtons("btnGive&btnStop");
      console.log("21!BlackJack! GANASTE");
      totalWinsandLose("Gamer");
    } else if (pointsG > 21) {
      disableButtons("btnGive&btnStop");
      console.log("lo siento TE PASASTE");
      totalWinsandLose("Computer");
    } else if (pointsG === pointsC) {
      console.log("Empate");
    } else if (pointsC > 21) {
      console.log("GANASTE, el Casino se pasó");
      totalWinsandLose("Gamer");
    } else if (pointsG < pointsC) {
      console.log("lo siento, Casino gana");
      disableButtons("btnGive&btnStop");
      totalWinsandLose("Computer");
    }

    /* switch ((pointsG, pointsC)) {
      case pointsG === 21 && pointsC != pointsG && pointsG === 0:
        disableButtons("btnGive&btnStop");
        console.log("21!BlackJack! GANASTE");
        totalWinsandLose("Gamer");
        break;
      case pointsG > 21:
        disableButtons("btnGive&btnStop");
        console.log("lo siento TE PASASTE");
        totalWinsandLose("Computer");
        break;

      case pointsG === pointsC:
        console.log("Empate");
        break;

      case pointsC > 21:
        console.log("GANASTE, el Casino se pasó");
        totalWinsandLose("Gamer");
        break;

      case pointsG < pointsC:
        console.log("lo siento, Casino gana");
        disableButtons("btnGive&btnStop");
        totalWinsandLose("Computer");
        break;

      default:
        console.log("this case is not allow");
     
    }*/
  };

  //events
  btnGive.addEventListener("click", () => {
    disableButtons("btnNew");
    const card = give_meCard();
    const pointsGamer = accumulatingPoints(card, 0);
    createCard(card, 0);
    BlackjackOrmore21(pointsGamer, 0);
  });

  btnStop.addEventListener("click", () => {
    disableButtons("btnGive&btnStop");
    console.log("puntos Jugador a batir: " + pointsGamers);
    computerTime(pointsGamers[0]);
  });

  btnNew.addEventListener("click", () => {
    console.clear();
    initialize();
    disableButtons("btnNew&btnStop");
  });

  return { NewGame: initialize };
})();
