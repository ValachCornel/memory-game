import { useEffect, useState } from 'react';
import './App.css';

function Square({value,id,checkCard}){
  const statusClass = value.status ? " active" + value.status : "";
  return(
    <button className={'square'+ statusClass} onClick={() => checkCard(id)}>
      <img src={value.img}/>
    </button>
  );
}

function Board(){

  function restartGame(){
    items.forEach((item) => {
      item.status = "";
    });
    setItems([...items]);
    setPrev(-1); 
    setMoves(0);
    setGoodMoves(0);
    setWinMessage("");
    setTimeout(() => {
      items.sort(() => Math.random() - 0.5);
      setItems(items);
    }, 200);
  }

  function checkCard(id){
    setMoves(moves + 1);
    if(prev === -1){
      items[id].status = " active";
      setItems([...items]);
      setPrev(id);
    }else {
      check(id);
    }
  }

  function check(current){
    if(items[current].id == items[prev].id){
      setGoodMoves(goodMoves + 1);
      items[current].status = " correct";
      items[prev].status = " correct";
      setItems([...items]);
      setPrev(-1); 
    }else{
      items[current].status = " wrong";
      items[prev].status = " wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].status = "";
        items[prev].status = "";
        setItems([...items]);
        setPrev(-1); 
      }, 500);
    }
  }
  const [winMessage, setWinMessage] = useState("");
  const [moves, setMoves] = useState(0);
  const [goodMoves, setGoodMoves] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [items, setItems] = useState([
    {id:1, img: '/img/alarm-clock.png', status:""},
    {id:1, img: '/img/alarm-clock.png', status:""},
    {id:2, img: '/img/apple.png', status:""},
    {id:2, img: '/img/apple.png', status:""},
    {id:3, img: '/img/cat.png', status:""},
    {id:3, img: '/img/cat.png', status:""},
    {id:4, img: '/img/home.png', status:""},
    {id:4, img: '/img/home.png', status:""},
    {id:5, img: '/img/pencil.png', status:""},
    {id:5, img: '/img/pencil.png', status:""},
    {id:6, img: '/img/search.png', status:""},
    {id:6, img: '/img/search.png', status:""},
    {id:7, img: '/img/settings.png', status:""},
    {id:7, img: '/img/settings.png', status:""},
    {id:8, img: '/img/tree.png', status:""},
    {id:8, img: '/img/tree.png', status:""}
  ].sort(() => Math.random() - 0.5));
  useEffect(() => {
    if(goodMoves == 8){
      setWinMessage("You Win!");
    }
  },[goodMoves]);

  return(
    <div className='main'>
      <span>{winMessage}</span>
      <div className='board'>
        {items.map((item, index) =>(
          <Square key={index} id={index} value={item} checkCard={checkCard}/>
        ))}
      </div>
      <div className='media'>
        <p>Moves: {moves}</p>
        <button onClick={restartGame}>
          <img src='/img/restart.png'/>
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
