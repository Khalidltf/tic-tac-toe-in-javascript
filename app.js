const gameBoard = document.getElementById('gameboard')
const infoDisplay = document.getElementById('info')

const startCells = [
  "", "", "", "", "", "", "", "", ""
]

let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div")
    cellElement.classList.add("square")
    cellElement.id = index
    cellElement.addEventListener('click', addGo)
    gameBoard.append(cellElement)
  })
}

createBoard()

function addGo(e) {
  const goDisplay = document.createElement("div")
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === "circle" ? "cross" : "circle"
  infoDisplay.textContent = `it's now ${go}'s go.`
  e.target.removeEventListener("click", addGo)
  checkScore()
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square")
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ]

  // ================== CIRCLE WINS ==================
  winningCombos.forEach(arr => {
    const circleWins  = arr.every(cell =>
      allSquares[cell].firstChild?.classList.contains("circle")
    )

    if (circleWins) {
      infoDisplay.textContent = "Circle WINS"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

  // ================== CROSS WINS ==================
  winningCombos.forEach(arr => {
    const crossWins  = arr.every(cell =>
      allSquares[cell].firstChild?.classList.contains("cross")
    )

    if (crossWins) {
      infoDisplay.textContent = "Cross WINS"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })



}
