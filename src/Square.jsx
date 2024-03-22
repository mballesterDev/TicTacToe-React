
const Square = ({ children, updateBoard, isSelected, index, changeTurn }) => {

    const handleClick = () => {
        changeTurn();
        updateBoard(index);
       
  }

  
    //si selected es true y se cumple la condicion se le pasa esta clase que tiene un hver asi sabemos a quien le toca
  const className = `square ${isSelected ? "is-selected" : ""}`;
    return (
        <div onClick={handleClick} className={className}> {/* Se corrige el nombre de la función */}
            {children}
        </div>
    )
}

    
    
    
    
    
    
    
    
    
    
  

  export default Square;