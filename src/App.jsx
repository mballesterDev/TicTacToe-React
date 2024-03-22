import { useState } from "react";
import Square from "./Square";
import Modal from "./Modal";


const TURNS = {
  X: "X",
  O: "O"
}

  const winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  
function App(){

  const [board, setBoard]= useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null)
  

  const checkForWinner = (boardToCheck) => {
    for (const combo of winnerCombos) { //usamos un for of para iterar sobre cada elemento
      const [a, b, c] = combo; //asigna a b c A combo y entones combo itera 
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  }
  /*a, b y c son 0, 1 y 2 respectivamente, entonces boardToCheck[a], boardToCheck[b] y boardToCheck[c] representan los valores en las primeras tres posiciones del tablero. 
  Estos valores pueden ser "X", "O" o null, que representan si una casilla está ocupada por un jugador o está vacía.*/ 
  //compprueba si BoardToCheck[a] o sea si X u O o nada en la poscion a es igual Xen la posicion 2...
    const updateBoard = (index) => {

      if (board[index]) return //si existe si es true el indice devuelvelo y lo sobreescribas asi no podemos remplazar fichas ya puestas
      const newBoard = [...board];/* Es importante hacer una copia del tablero antes de actualizarlo en React debido a la naturaleza asíncrona de las actualizaciones de estado. Cuando llamas a setBoard(newBoard), 
                                    React no actualiza el estado del tablero inmediatamente. En cambio, programa una actualización para el siguiente renderizado. asi evitamos errores */
      newBoard[index] = turn;//para poner las fichas 
      setBoard(newBoard)

      const newWinner = checkForWinner(newBoard) //simplemente pasamos la funcion y el argumento 

      if(newWinner){
        setWinner(newWinner)
         
        
      }

      
    }



  const changeTurn = (index) =>{ //1 creamos esta funcion para actualizar el estado del turno
    if (board[index]) return
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; //si al darle click el turno pertenece a la x, se cambiará a la O y viceversa
    setTurn(newTurn);// y usamos el set turn para guardar los cambios
  }

  const resetBoard = () =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    
  }

  
  return(
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard} changeTurn ={changeTurn}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>


      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square> {/*pasamos como prop el isSlected si la condicion se cumple el valor pasa como tur sino pasa como flase  */}
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>{/*Esto lo usaremos para ver a  quien le toca gracias  a la clase is slected que le dará un hover*/}

      </section>

      


        {
          winner !== null && ( // el && es una abreviatura del if el winner puede ser o null(que no haya ganador) false empate o true qeu haya ganador
            <section className="winner"> {/*Si no es null, es decir que hay un ganador o un empate se ejecuta este componente que es un modal */}
              <div className="text">
                <h2>
                  {
                    winner === false ? 'empate': ` ganó ${winner}` //si es false el texto erá empate si es true habrá ganador
                  }
                </h2>
                <button onClick={resetBoard}>Reiniciar</button>
              </div>
            </section>
          )
        }





    </main>
    
  ) 
}

export default App


/* PASOS A SEGUIR
1 dibujar tablero
2 definir estaod y turnos
3 el hover para saber los turnos
4 actualizar tablero al drle click
5 comporbar ganador
*/