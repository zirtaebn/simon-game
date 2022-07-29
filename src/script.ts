const colorArray = ['green', 'red', 'yellow', 'blue'];
let randomSequenceArray:number[] = [];
let clickedSequenceArray:number[] = [];
let started = false;
let level = 0;


$('#level-title').on('click', () => {

    if (!started) {

       $("#level-title").text("Level " + level);
       randomSequence();
       started = true;
    }
  });

const randomColor = () => {

    return Math.floor(Math.random() * 4);
}


const randomSequence = () => {

    const colorIndex = randomColor();

    clickedSequenceArray = [];
    level++;
    $("#level-title").text("Level " + level);

    randomSequenceArray.push(pressedButton(colorIndex));
}


colorArray.forEach((color, index) => {

    $(`button#${color}`).on('click', function getClickedSequence(){

        if(started) {

            
            clickedSequenceArray.push(index);
            pressedButton(index);
            checkingAnswer(clickedSequenceArray.length - 1);
        }

      
    });

})

const checkingAnswer = (currentLevel:number) => {

    if(randomSequenceArray[currentLevel] === clickedSequenceArray[currentLevel]) {

        if (randomSequenceArray.length === clickedSequenceArray.length){

            setTimeout(() => {

                randomSequence();
            }, 1000);
        }
        
    } else {

        playingSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Here to Restart");
  
        setTimeout(() => {

          $("body").removeClass("game-over");

        }, 200);

        startOver();
    }   
}

const startOver = () => {

    started = false;
    clickedSequenceArray = [];
    randomSequenceArray = [];
    level = 0;
}


const pressedButton = (colorIndex:number) => {

    switch (colorIndex) {

        case 0:
            buttonAnimation('green');
            break;

        case 1:
            buttonAnimation('red');
            break;
        
        case 2:
            buttonAnimation('yellow');
            break;
        
        case 3:
            buttonAnimation('blue');
            break;

        default:
            console.log('Index not found!');
            break;
    }

    return colorIndex;
}


const buttonAnimation = (color:string) => {

    playingSound(color);
    
    $(`#${color}`).addClass('pressed');
    setTimeout(() => {

        $(`#${color}`).removeClass('pressed');

    },200)
}

const playingSound = (color:string) => {

    const audio = new Audio(`./dist/sounds/${color}.mp3`);
    audio.play();


}





