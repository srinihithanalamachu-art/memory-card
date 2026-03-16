import GameHeader from "./components/GameHeader";
import Card from "./components/Card";
import {useState,useEffect} from "react";

import WinMessage from "./components/WinMessage";
const cardValues=[
  "🍎",
  "🍌",
  "🍇",
  "🍓",
   "🍍",
    "🍉",
     "🍑",
      "🍊",
        "🍎",
  "🍌",
  "🍇",
  "🍓",
   "🍍",
    "🍉",
     "🍑",
      "🍊",
      

]
function App() {
 const [cards,setCards]=useState([]);
 const[flippedCards,setFlippedCards]=useState([]);
 //for keeping the state of matched cards , we require a state which is matchedcards
 const[matchedCards,setMatchedCards]=useState([]);
const[score,setScore]=useState(0);
const[moves,setMoves]=useState(0);
const[isLocked,setIsLocked]=useState(false);


//for shuffling the elements

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};


 const initializeGame=()=>
 {
  //SHUFFLE THE CARDS
  const shuffled=shuffleArray(cardValues);
    const finalCards=shuffled.map((value,index)=>
    (
      {
        id:index,
        value,
        isFlipped:false,
        isMatched:false,
      }
    ));
    setCards(finalCards);
    //reseting the values when we reset the game
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);

 };
 //when the component renders , the function need to be called
 useEffect(()=>
{
  initializeGame();
},[]);

  const handleCardClick=(card)=>
  {
    //don't allow clicking if card is already clicked
    if(card.isFlipped || card.isMatched || isLocked || flippedCards.length===2)
    {
       return;
    } 
    //update card flipped state
    const newCards=cards.map((c)=>
    {
      if(c.id===card.id)
      {
        return { ...c,isFlipped:true};
      }
      else{
        return c;
      }
    });
    setCards(newCards);
     const newFlippedCards=[...flippedCards,card.id]
     setFlippedCards(newFlippedCards);
  
     //check for match if cards are flipped

     if(newFlippedCards.length === 2)
{
  setIsLocked(true);
  const firstCard = newCards[newFlippedCards[0]];
  const secondCard = newCards[newFlippedCards[1]];

  if(firstCard.value === secondCard.value)
  {  setTimeout(()=>
  {   
    setMatchedCards((prev)=> [...prev,firstCard.id,card.id]);
    setScore((prev)=>prev+1);
     const newMatchedCards = newCards.map((c)=>{
      if(c.id === firstCard.id || c.id === secondCard.id)
      {
        return {...c,isMatched:true};
      }
      return c;
    });

    setCards(newMatchedCards);
    setFlippedCards([]);
    setIsLocked(false);
  },500);
   
  }

      else
      {
        // flip back card1 ,card2
         setTimeout(()=>{
        const flippedBackCard= newCards.map((c)=>
        {
          if(newFlippedCards.includes(c.id) || c.id===card.id)
          {
            return {...c,isFlipped:false};
          }
          else{
            return c;
          }

        });
        setCards(flippedBackCard); 
      setFlippedCards([]);
      setIsLocked(false);
    },1000);
      }
      setMoves((prev)=> prev+1);
    }
  };
 const isGameComplete=matchedCards.length===cardValues.length;
  return (
    <div className="App">
    <GameHeader score={score} moves={moves} onReset={initializeGame}/>
 {  isGameComplete && <WinMessage moves={moves}/> }
    <div className="cards-grid">
       {cards.map((card)=>(
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
    </div>
    </div>
  );
}

export default App;
