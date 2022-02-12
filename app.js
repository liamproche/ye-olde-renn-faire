const prompt = require('prompt-sync')();
const username = prompt('What is your name? ');
const activities = ["Jousting Tournament", "Artisan Market", "Pub Crawl"]

let health = 100
let sobrietyLevel = 100
let money = 250
let loot = []
let rennFaireRespect = 20
let realWorldRespect = 100
let foes = []
let activityChoice
let playerResponse


//Artisan market
function artisanMarket(){
    console.log(`You are surrounded by poorly trained actors in peasant garb literally hawking their wares. 
    A woman dressed as a gypsy with a stick-on mole approaches you and asks if you want your tarot cards read.`)
    playerResponds();
    if (playerResponse == "y"){     
        console.log(readTarot());
        playerChooseActivity();
        goToActivity();
    }
       
    else if (playerResponse == "n"){
        console.log("no")
        playerChooseActivity();
        goToActivity();
    }
    else{
        devilSpeak();
    }
}


//for incorrect player entrys
function devilSpeak(){
    console.log("Be gone with ye devil speak!")
    playerChooseActivity();
    goToActivity();
}


//displays main menu
function displayActivities(){
    console.log(`What what would you like to do? \nPress "1" for ${activities[0]} \nPress "2" for ${activities[1]} \nPress "3" for ${activities[2]} \nPress "4" to check your status \nPress "q" to quit`)
}


//displays all of player's current status
function checkStatus(){
    console.log(`Your health is ${health}%. \nYour level-of-sobriety is ${sobrietyLevel}%. \nYou have $${money} left. \nYou've accquired: ${loot} \nYour renn-faire respect level is ${rennFaireRespect}%. \nYour real-world respect level is ${realWorldRespect}%. \nYour current foes are: ${foes}`)
    playerChooseActivity();
    goToActivity();
}


//exits the program on player request
function exit(){
    console.log("Fare thee well!")
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
}


//prompts player for input then stores result in variable
function playerResponds(){
    let response = prompt('Type "y" or "n" to respond: ')
    playerResponse = response;
}


//when player chooses jousting tournament
function joustingTournament(){
    console.log(`While entering the jousting arena you are approached by a grown man wearing pieces of a deconstructed garbage can as "armor". He informs you that one of the "knights" has taken ill and cannot compete. He asks if you would be willing to take his spot.`)
    playerResponds()
    if (playerResponse === "y"){
        health -=20;
        sobrietyLevel -= 20;
        rennFaireRespect += 30;
        realWorldRespect -= 30;
        console.log(`You accept the "knight's" challenge! (But not before slamming back a couple pints of mead to build your courage). You perform admirably and gain the respect of all in attendance even though you fall off your steed and sprain your back. Your significant other posts a photo of you on social media so your real-world-respect takes a hit. \nYour health decreases by 20%. \nYour sobriety-level decreases by 20%. \nYour renn-faire-respect-level increases by 30% \nYour real-world-respect-level is decreases by 30%`)
        playerChooseActivity();
        goToActivity();
    }
    else if (playerResponse === "n"){
        sobrietyLevel -=20;
        rennFaireRespect -=20;
        foes.push("Trash can knight")
        console.log(`You decline the "knight's" invite and while it's hard to understand him completely through his fake cockney-accent, it's clear you've made an enemy. To help ease your mind, you slam back a couple pints of mead to help ease your mind. \nYour sobriety-level is ${sobrietyLevel}, \nYour renn-faire-respect-level is ${rennFaireRespect}%`)
        playerChooseActivity();
        goToActivity();
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
    goToActivity();
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
    return(`${playersFirstCard}, ${playersSecondCard}, ${playersThirdCard}`)
}

//beginning of program

//greets player
greetPlayer()

//puts player into main menu
playerChooseActivity()

//takes player to first activity based on response
goToActivity()










