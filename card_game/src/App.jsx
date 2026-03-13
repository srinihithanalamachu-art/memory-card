import GameHeader from "./components/GameHeader";


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
 

  return (
    <div className="App">
      <h1> hello </h1>
    <GameHeader score={3} moves={10}/>
    </div>
  );
}

export default App;
