import GameHeader from "./components/GameHeader";
import Card from "./components/Card";
import {useState,useEffect} from "react";
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
 const initializeGame=()=>
 {
  //SHUFFLE THE CARDS

    const finalCards=cardValues.map((value,index)=>
    (
      {
        id:index,
        value,
        isFlipped:false,
        isMatched:false,
      }
    ));
    setCards(finalCards);

 };
 //when the component renders , the function need to be called
 useEffect(()=>
{
  initializeGame();
},[]);

  const handleCardClick=(card)=>
  {
    //don't allow clicking if card is already clicked
    if(card.isFlipped || card.isMatched)
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

     if(flippedCards.length===1)
     {
      const firstCard=cards[flippedCards[0]];
      if(firstCard.value===card.value)
      {
        alert("Match");
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
    },1000);
      }
     }
  };

  return (
    <div className="App">
    <GameHeader score={3} moves={10}/>
    <div className="cards-grid">
       {cards.map((card)=>(
        <Card card={card} onClick={handleCardClick} />
      ))}
    </div>
    </div>
  );
}

export default App;
