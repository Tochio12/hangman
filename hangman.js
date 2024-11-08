/* Movies */
let movies = [
	'School of Rock',
	'Forrest Gump',
	'The Dark Knight',
	'The Godfather',
	'Inception',
	'Fight Club',
	'Goodfellas',
	'Interstellar',
	'Toy Story',
	'Back to the Future',
	'The Shining',
	'To Kill a Mockingbird',
	'Inside Out',
	'Up',
	'The Wolf of Wall Street',
	'Batman Begins',
	'Die Hard',
	'The Hangover',
	'A Quiet Place',
	'Happy Gilmore',
	'Logan',
	'Hacksaw Ridge',
	'Gone Girl',
	'Guardians of the Galaxy',
	'How to Train Your Dragon',
	'Finding Nemo',
	'Jurassic Park',
	'Rocky',
	'Mean Girls',
	'The Notebook',
	'Pearl Harbor',
	'Pretty Woman',
	'Clueless',
	'Sleepless in Seattle',
	'The Wedding Singer',
	'Sweet Home Alabama',
	'What Women Want',
	'Jerry Maguire',
	'Hidden Figures',
	'The Social Network',
	'Lincoln',
	'The Green Mile',
	'Titanic',
	'Cast Away',
	'Big',
	'Sully',
	'Captain Phillips',
	'Catch Me If You Can',
	'The Polar Express',
	'How the Grinch Stole Christmas',
	'Dumb and Dumber',
	'Liar Liar',
	'The Mask',
	'Bruce Almighty',
	'Black Panther',
	'Captain Marvel',
	'Venom',
	'Deadpool',
	'The Avengers',
	'Iron Man',
	'Thor',
	'The Incredibles',
	'Robin Hood',
	'Bee Movie',
	'Aladdin',
	'The Wizard of Oz',
	'It',
	'Top Gun',
	'Suicide Squad',
	'Zombieland',
	'The Lego Movie',
	'Get Out',
	'Jaws',
	'Unbreakable',
	'Glass',
	'Split',
	'Scream',
	'The Fugitive',
	'The Conjuring',
	'Sinister',
	'Insidious',
];

const youWon = "You Won!";
const youLost = "You Lost!";
let wins = 0; // variable to track wins 
let losses = 0; // variable to track losses

// Function to update display
function updateScore() {
    document.getElementById("score").innerHTML = `Wins: ${wins} | Losses ${losses}`
}

function Game() {
    let word = movies[Math.floor(Math.random()*movies.length)];
    word = word.toUpperCase();
    let guessedLetters = [];
    let maskedWord = "";
    let incorrectGuesses = 0;
    let possibleGuesses = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let won = false;
    let lost = false;
    const maxGuesses = 7;

    for ( let i = 0; i < word.length; i++ ) {
            let space = " ";
            let nextCharacter = word.charAt(i) === space ? space : "_";
            maskedWord += nextCharacter;
        }
    
        let guessWord = function( guessedWord ) {
            guessedWord = guessedWord.toUpperCase();
            if( guessedWord === word ) {
                guessAllLetters();
                wins++ // Increment wins
                updateScore(); // call function 
            } else {
                handleIncorrectGuess();
            }
        }
    
        let guessAllLetters = function() {
            for ( let i = 0; i < word.length; i++ ) {
                guess( word.charAt( i ) );
            }
        }
    
        let guess = function( letter ) {
            letter = letter.toUpperCase();
            if( !guessedLetters.includes( letter )) {	
                guessedLetters.push(letter);
                possibleGuesses = possibleGuesses.replace(letter,"");
                if( word.includes( letter ) ) {
                    let matchingIndexes = [];
                    for ( let i = 0; i < word.length; i++ ) {
                        if( word.charAt(i) === letter ) {
                            matchingIndexes.push( i );
                        }
                    }
    
                    matchingIndexes.forEach( function(index) {
                        maskedWord = replace( maskedWord, index, letter );
                    });	

                    // Check for win here and update the score
                    if (!lost && maskedWord === word) {
                        won = true; // Game is won
                        wins++; // Increment wins
                        updateScore(); // Update the score on win
            }	
                } else {
                    handleIncorrectGuess();
                }
            }
        }
    
        let handleIncorrectGuess = function() {
            incorrectGuesses++;
            lost = incorrectGuesses >= maxGuesses;
            if( lost ) {
                guessAllLetters();
                losses++ // Increment losses
                updateScore(); // Call function
            }
        }
    
        return {
            "getWord": function(){ return word; },
            "getMaskedWord": function(){ return maskedWord; },
            "guess": guess,
            "getPossibleGuesses": function(){ return [... possibleGuesses]; },
            "getIncorrectGuesses": function(){ return incorrectGuesses; },
            "guessWord": guessWord,
            "isWon": function(){ return won; },
            "isLost": function(){ return lost; },
        };
    }
    
    function replace( value, index, replacement ) {
        return value.substr(0, index) + replacement + value.substr(index + replacement.length);
    }
    
    function listenForInput( game ) {
        let guessLetter = function( letter ) {
            if( letter ) {
                let gameStillGoing = !game.isWon() && 
                                     !game.isLost();
                if( gameStillGoing ) {
                    game.guess( letter );
                    render( game );
                }
            }
        };
    
        let handleClick = function( event ) {
            if (event.target.classList.contains('guess') ) {
                guessLetter( event.target.innerHTML );
            }
        }
    
        let handleKeyPress = function( event ) {
            let letter = null;
            const A = 65;
            const Z = 90;
            const ENTER = 13;
            let isLetter = event.keyCode >= A && event.keyCode <= Z;
            let guessWordButton = document.getElementById("guessWordButton");
            let newGameButton = document.getElementById("newGameButton");
            let guessBox = document.getElementById("guessBox");
            let gameOver = guessBox.value === youWon || guessBox.value === youLost;
    
            if( event.target.id !== "guessBox" && isLetter ) {
                letter = String.fromCharCode( event.keyCode );
            } else if( event.keyCode === ENTER && gameOver ) {
                newGameButton.click();
            } else if( event.keyCode === ENTER && guessBox.value !== "" ) {
                guessWordButton.click();
            }
            guessLetter( letter );
        }
    
        document.addEventListener('keydown', handleKeyPress );
        document.body.addEventListener('click', handleClick );
    }
    
    function guessWord( game )
    {
        let gameStillGoing = !game.isWon() && 
                             !game.isLost();
        let guessedWord = document.getElementById('guessBox').value;
        if( gameStillGoing ) {
            game.guessWord( guessedWord );
            render( game );
        }
    }
    
    function render( game ) {
        document.getElementById("word").innerHTML = game.getMaskedWord(); 
        document.getElementById("guesses").innerHTML = "";
        game.getPossibleGuesses().forEach( function(guess) {
            let innerHtml = "<span class='guess'>" + guess + "</span>";
            document.getElementById("guesses").innerHTML += innerHtml;
        });
        document.getElementById("hangmanImage").src = "img/hangman" + game.getIncorrectGuesses() + ".png";
    
        let guessBox = document.getElementById('guessBox');
        if( game.isWon() ) {
            guessBox.value = youWon;
            guessBox.classList = "win";
        } else if( game.isLost() ) {
            guessBox.value = youLost;
            guessBox.classList = "loss";
        } else {
            guessBox.value = "";
            guessBox.classList = "";
        }
    }
    
    function newGame() {
        game = new Game(); // Starts a new game without resetting the score 
        render(game); // Renders the new game state
        listenForInput(game); // attaches the event listeners
    }
    document.getElementById('newGameButton').addEventListener('click', newGame); 

    let game = new Game();
    render( game );
    listenForInput( game );
