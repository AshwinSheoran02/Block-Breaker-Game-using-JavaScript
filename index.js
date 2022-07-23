const grid = document.querySelector('.grid');
const scroreDisplay = document.querySelector('#score')
const blockwidth = 130
const blockheight = 20
const boardWidth = 770
const boardHeight = 300
const ballDiameter = 20
let timerid
let xDirection = -2
let yDirection = 2
let score = 0
let time = 20

const userstart = [230 , 10];
let currentpos = userstart

// Enemy Block
class Block{
    constructor(xAxis , yAxis){
        this.bottomLeft = [xAxis , yAxis]
        this.bottomRight = [xAxis +blockwidth , yAxis]
        this.topLeft = [xAxis ,yAxis + blockheight]
        this.topRight = [xAxis+ blockwidth , yAxis+blockheight]
    }
}

const ballstart =[270 , 40]
let ballcurrentpos = ballstart

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(560,270),
    new Block(670,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(560,240),
    new Block(670,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
    new Block(560,210),
    new Block(670,210),
    new Block(10,180),
    new Block(120,180),
    new Block(230,180),
    new Block(340,180),
    new Block(450,180),
    new Block(560,180),
    new Block(670,180),

]

function addBlocks(){
    for (let i = 0 ; i < blocks.length ; i++){
        const block   = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0]+'px'
        block.style.bottom = blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block);
    }
}
addBlocks()

function drawUser(){
    user.style.left = currentpos[0]+'px'
user.style.bottom = currentpos[1]+'px'
}

function drawball(){
    ball.style.left = ballcurrentpos[0]+'px'
ball.style.bottom = ballcurrentpos[1]+'px'
}

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// Moving block
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if (currentpos[0]> 0 ){
                currentpos[0] -= 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;
    
        case 'ArrowRight':
            if (currentpos[0] < boardWidth - blockwidth ){
                currentpos[0] += 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;
        

        case 'a':
            if (currentpos[0]> 0 ){
                currentpos[0] -= 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;
        case 'd':
            if (currentpos[0] < boardWidth - blockwidth ){
                currentpos[0] += 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;
    }
}

document.addEventListener('keydown' , moveUser)


const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)

function moveball(){
    // ballcurrentpos[0] += 2
    // ballcurrentpos[1] += 2
    ballcurrentpos[0] += xDirection
    ballcurrentpos[1] += yDirection
    drawball()
    collision()
}

timerid = setInterval(moveball , time)

// Collisions

function collision(){

    for (let i = 0 ; i< blocks.length ; i++){   // ball hits blocks
        if (
            ballcurrentpos[0] > blocks[i].bottomLeft[0] &&  ballcurrentpos[0] < blocks[i].bottomRight[0] &&
            (ballcurrentpos[1] +ballDiameter) > blocks[i].bottomLeft[1] && (ballcurrentpos[1] ) < blocks[i].topLeft [1]
        ){
            const allblocks = Array.from(document.querySelectorAll('.block'))
            allblocks[i].classList.remove('block')
            blocks.splice(i,1)
            score++
            scroreDisplay.innerHTML = score
            //time = time+2
            changeDirection()

            if (blocks.length == 0 ){
                scroreDisplay.innerHTML = ' You Win ! '
                clearInterval(timerid)
                document.removeEventListener('keydown' , moveUser)
            }
        }
    }


    if (ballcurrentpos[0]>=(boardWidth - ballDiameter) ||   //boundary
        ballcurrentpos[1]>= (boardHeight - ballDiameter )||
        ballcurrentpos[0]<=0
        ){
        changeDirection()
    }

    //User block collision
    if ( ballcurrentpos[0] > currentpos[0] && ballcurrentpos[0] < currentpos[0]+ blockwidth &&
        ballcurrentpos[1] > currentpos[1] && ballcurrentpos[1] <currentpos[1]+ blockheight
        ){
            changeDirection()
        }



    if (ballcurrentpos[1]<=0){ // game over
        clearInterval(timerid)
        scroreDisplay.innerHTML = ' You Lose !'
        document.removeEventListener('keydown' , moveUser)
    }
}

function changeDirection(){
    if (xDirection===2 && yDirection===2){
        yDirection = -2
        return
    }
    else if (xDirection===2 && yDirection===-2){
        xDirection = -2
        return
    }
    else if (xDirection===-2 && yDirection===-2){
        yDirection = 2
        return
    }
    else if (xDirection===-2 && yDirection===2){
        xDirection = 2
        return
    }
}