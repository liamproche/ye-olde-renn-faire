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


function devilSpeak(){
    console.log("Be gone with your devil speak!")
    playerChooseActivity()
    goToActivity()
}

function displayActivities(){
    console.log(`What what would you like to do? \nPress "1" for ${activities[0]} \nPress "2" for ${activities[1]} \nPress "3" for ${activities[2]} \nPress "4" to check your status \nPress "q" to quit.`)
}

function exit(){
    console.log("Fare thee well!")
}

function checkStatus(){
    console.log(`Your health is ${health}%. \nYour level-of-sobriety is ${sobrietyLevel}%. \nYou have $${money} left. \nYou've accquired: ${loot} \nYour renn-faire respect level is ${rennFaireRespect}%. \nYour real-world respect level is ${realWorldRespect}%. \nYour current foes are: ${foes}`)
    playerChooseActivity();
    goToActivity();
}

function greetPlayer(){
    console.log(`Welcome, ${username} to Ye Olde Rennaissance Faire!`)
}

function playerChooseActivity(){
    displayActivities();
    let playerChoice = prompt(`Please make your selection: `);
    activityChoice = playerChoice;
}

function playerResponds(){
    let response = prompt('Type "y" or "n" to respond: ')
    playerResponse = response;
}

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


function artisanMarket(){
    console.log(`You chose ${activities[1]}`)
    playerChooseActivity();
    goToActivity();
}

function pubCrawl(){
    console.log(`You chose ${activities[2]}`)
    playerChooseActivity();
    goToActivity();
}

greetPlayer()
playerChooseActivity()
goToActivity()











