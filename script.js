const cellElementos = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessageTextElement = document.querySelector(".win");
const winningMessege = document.querySelector(".winnig-messege");
const restartButton = document.querySelector(".btn")

let isClircleTurn= false;

const winningCombinations =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
    


const startGame =()=>{
    isClircleTurn =false;
    for(const cell of cellElementos){
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click',handleClick,{ once:true})
    }
    setBoardHoverClass();
    winningMessege.classList.remove("aparecer")
};

const endGame = (isDraw)=>{
    if(isDraw){
        winningMessageTextElement.innerText= "Empate"
    }else{
        winningMessageTextElement.innerText = isClircleTurn ? "O Venceu" : "X Venceu"
    }

    winningMessege.classList.add("aparecer");
}

const checkForWin = (currentPlayer) =>{
    return winningCombinations.some(combination =>{
        return combination.every(index =>{
            return cellElementos[index].classList.contains(currentPlayer);
        })
    });
}

const checkForDraw = ()=>{
    return [...cellElementos].every(cell =>{
       return cell.classList.contains("x")|| cell.classList.contains("circle")
    })
}

const placeMark =(cell,classToAdd) =>{
    cell.classList.add(classToAdd);
};

const setBoardHoverClass= ()=>{
    board.classList.remove("circle");
    board.classList.remove("x");
    if(isClircleTurn){
        board.classList.add("circle");
    }else{
        board.classList.add("x")
    }
}

const swapTurns = ()=>{
    isClircleTurn = !isClircleTurn;
    setBoardHoverClass();
   
};

const handleClick = (e)=>{
    const cell = e.target;
    const classToAdd = isClircleTurn ? "circle" : "x";
    placeMark(cell,classToAdd);
    
    const isDraw = checkForDraw();
    const isWin = checkForWin(classToAdd);
    if(isWin){
        endGame(false)
    }else if(isDraw){
        endGame(true)
    }else{
        swapTurns();
    }

};
startGame();

restartButton.addEventListener('click',startGame);

