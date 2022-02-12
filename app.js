const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');
const activities = ["Jousting Tournament", "Artisan Market", "Pub Crawl"]

let sobrietyLevel = 100
let money = 250
let loot = []
let rennFaireRespect = 0
let realWorldRespect = 100
let activityChoice
let playerResponse
let isGameOver = false;


function checkIfGameOver(){
    if(rennFaireRespect >= 100){
        isGameOver = true;
    }
}

function gameOver(){
    console.log("game over")
}

//Artisan market
function artisanMarket(){
    function continueThroughBazaar(){
        money -= 10;
        sobrietyLevel -= 10;
        rennFaireRespect -= 10;
        realWorldRespect += 10;
        console.log("You grab a kragen of beer and continue through the bazzar.")
    }

    function leaveBazaar(){
        sobrietyLevel -= 20
        money -= 20
        realWorldRespect += 20
        rennFaireRespect -= 40
        checkIfGameOver();
        if(isGameOver === true){
            gameOver();
        }
        else{
        console.log("You head back towards the front of the festival,  \ngrabbing a couple goblets of Ye Olde Budwizer on the way.")
        playerChooseActivity();
        }
    }
    
    //first stop in the artisan market
    function gypsyWoman(){
        console.log("You are surrounded by poorly trained actors in peasant garb. \nThey are literally hawking their wares. \nA woman dressed as a gypsy with a stick-on mole approaches. \nShe asks if you would like your tarot cards read.")
        playerResponds();
        if (playerResponse == "y"){     
            money -= 5;
            rennFaireRespect += 10;
            realWorldRespect -= 10;
            console.log(`Your cards are ${readTarot()}.`);
            continueThroughBazaar();
            dragonBoots();
        }

        else if (playerResponse == "n"){
            continueThroughBazaar();
            dragonBoots();
        }
        else{
            devilSpeak();
        }
        
        //second stop in the artisan market
        function dragonBoots(){
            console.log(`You are approached by a man selling poorly stitched boots. \nHe claims they are "Made of the finest of dragon skin". \nDo you buy the boots?`)
            playerResponds();
                if(playerResponse == "y"){
                    rennFaireRespect += 20;
                    realWorldRespect -= 30;
                    money -= 35;
                    loot.push("Dragon boots")
                    console.log("bought boots")
                    continueThroughBazaar();
                    blackSmith();
                }
                else if (playerResponse == "n"){
                    continueThroughBazaar();
                    blackSmith();
                }
                else{
                    devilSpeak();
                }
            }    
        }

        //Third stop in the artisan market
        function blackSmith(){
            console.log(`You approach a man pretending to hammer a sheild over over a small camp fire. \nHe calls out: "Good 'morrow! Ye be needin' some weaponry then?"`)
            playerResponds();
            if (playerResponse == "y"){
                money -= 75
                rennFaireRespect += 30
                realWorldRespect -= 20
                loot.push('Broadsword ("For Decorative Purposes Only")')
                console.log("You bought the fake broadsword!")
                leaveBazaar();
            }
            else if (playerResponse == "n"){
                leaveBazaar();
            }
            else{
                devilSpeak();
            }
        }
    
    
    //calls first stop in artisan market
    gypsyWoman();
}


//for incorrect player entrys
function devilSpeak(){
    console.log("Be gone with ye devil speak!")
    playerChooseActivity();
}


//displays main menu
function displayActivities(){
    console.log(`What what would you like to do? \nPress "1" for ${activities[0]} \nPress "2" for ${activities[1]} \nPress "3" for ${activities[2]} \nPress "4" to check your status \nPress "q" to quit`)
}


//displays all of player's current status
function checkStatus(){
    displayStatus();
    playerChooseActivity();
}

function displayStatus(){
    console.log(`Your level-of-sobriety is ${sobrietyLevel}%. \nYou have $${money} left. \nYou've accquired: ${loot} \nYour renn-faire respect level is ${rennFaireRespect}%. \nYour real-world respect level is ${realWorldRespect}%.`)
}

//exits the program on player request
function exit(){
    console.log("Your final stats are:")
    displayStatus();
    console.log(`Fare thee well!`)
}


//greets player at beginning
function greetPlayer(){
    console.log(`Welcome, ${username} to Ye Olde Rennaissance Faire!`)
}


//player chooses activity
function playerChooseActivity(){
    displayActivities();
    let playerChoice = prompt(`Please make your selection: `);
    activityChoice = playerChoice;
    goToActivity();    
}


//prompts player for input then stores result in variable
function playerResponds(){
    let response = prompt('Type "y" or "n" to respond: ')
    playerResponse = response;
}


//when player chooses jousting tournament
function joustingTournament(){
    console.log(`You enter the jousting arena. \nYou are approached by a grown man wearing pieces of a deconstructed garbage can. \nHe informs you that one of the "knights" has taken ill and cannot compete. \nHe asks if you would be willing to take his spot.`)
    playerResponds()
    if (playerResponse === "y"){
        sobrietyLevel -= 30;
        rennFaireRespect += 80;
        realWorldRespect -= 80;
        checkIfGameOver();
        if(isGameOver === true){
            gameOver();
        }    
        else{
            //do you win anything? 
            console.log(`You accept the "knight's" challenge! \n(But not before slamming back a couple pints of mead to build your courage). \nYou perform admirably and gain the respect of all in attendance.`)
            playerChooseActivity();
        }
    }
    else if (playerResponse === "n"){
        sobrietyLevel -= 50;
        rennFaireRespect -= 65;
        realWorldRespect += 15;
        console.log(`You decline the "knight's" invite. \nWhile it's hard to understand him completely through his fake cockney-accent, \nit's clear you've made an enemy. \nTo help ease your mind, you slam back a couple pints of mead.`)
        playerChooseActivity();
    }
    else{
        devilSpeak()
    }
}


//invokes activity of player choice
function goToActivity(){
    if (activityChoice == 1){
        joustingTournament();
    } 
    else if (activityChoice == 2){
        artisanMarket();
    }
    else if (activityChoice == 3){
        pubCrawl();
    }
    else if (activityChoice == 4){
        checkStatus()
    }
    else if (activityChoice == "q"){
        exit();
    }
    else{
        devilSpeak();
    }
}



//when player chooses pub crawl
function pubCrawl(){
    console.log(`You chose ${activities[2]}`)
    playerChooseActivity();
}


//function for tarot card reading
function readTarot(){
    const tarotCards = [
        "The Fool", 
        "The Magician",
        "The High Priestess",
        "The Empress",
        "The Emperor",
        "The Hierophant",
        "The Lovers",
        "The Chariot",
        "Justice",
        "The Hermit",
        "Wheel of Fortune",
        "Strength",
        "The Hanged Man",
        "Death",
        "Temperance",
        "The Devil",
        "The Tower",
        "The Star",
        "The Moon",
        "The Sun",
        "Judgement",
        "The World",
        "Ace of Cups",
        "The Paige of Cups",
        "The King of Cups",
        "The Knight of Cups",
        "The Queen of Cups",
        "The II of Cups",
        "The III of Cups",
        "The IV of Cups",
        "The V of Cups",
        "The VI of Cups",
        "The VII of Cups",
        "The VIII of Cups",
        "The IX of Cups",
        "The X of Cups",
        "Ace of Pentacles",
        "The Paige of Pentacles",
        "The King of Pentacles",
        "The Knight of Pentacles",
        "The Queen of Pentacles",
        "The II of Pentacles",
        "The III of Pentacles",
        "The IV of Pentacles",
        "The V of Pentacles",
        "The VI of Pentacles",
        "The VII of Pentacles",
        "The VIII of Pentacles",
        "The IX of Pentacles",
        "The X of Pentacles",
        "Ace of Wands",
        "The Paige of Wands",
        "The King of Wands",
        "The Knight of Wands",
        "The Queen of Wands",
        "The II of Wands",
        "The III of Wands",
        "The IV of Wands",
        "The V of Wands",
        "The VI of Wands",
        "The VII of Wands",
        "The VIII of Wands",
        "The IX of Wands",
        "The X of Wands",
        "Ace of Swords",
        "The Paige of Swords",
        "The King of Swords",
        "The Knight of Swords",
        "The Queen of Wands",
        "The II of Swords",
        "The III of Swords",
        "The IV of Swords",
        "The V of Swords",
        "The VI of Swords",
        "The VII of Swords",
        "The VIII of Swords",
        "The IX of Swords",
        "The X of Swords"
    ]
    let playersFirstCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
    let playersSecondCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
    let playersThirdCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
    return(`${playersFirstCard}, ${playersSecondCard}, and ${playersThirdCard}`)
}

//beginning of program

//greets player
greetPlayer()

//puts player into main menu
playerChooseActivity()
