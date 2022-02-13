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
let isGameOver = false
let reasonForEnd


//Function to hold artisan market 
function artisanMarket(){
    
    //advances players through market
    function continueThroughBazaar(){
        money -= 10;
        sobrietyLevel -= 10;
        console.log("You grab a kragen of beer and continue through the bazzar.")
    }

    //exits artisan market
    function leaveBazaar(){
        sobrietyLevel -= 20
        money -= 20
        
        //stat checkpoint
        checkIfGameOver();
        if(isGameOver === true){
            gameOver();
        }
        
        //sends player back to main menu
        else{
        console.log("You head back towards the front of the festival,\ngrabbing a couple goblets of Ye Olde Budwizer on the way.")
        playerChooseActivity();
        }
    }
    
    //first stop in the artisan market
    function gypsyWoman(){
        console.log("You are surrounded by poorly trained actors in peasant garb. \nThey are literally hawking their wares. \nA woman dressed as a gypsy with a stick-on mole approaches. \nShe asks if you would like your tarot cards read.")
        playerResponds();
        if (playerResponse == "y"){     
            money -= 15;
            rennFaireRespect += 20;
            realWorldRespect -= 20;
            console.log(readTarot());
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
                    realWorldRespect -= 20;
                    money -= 65;
                    loot.push("Dragon boots")
                    console.log("You have purchased the dragon skin boots!")
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
                realWorldRespect -= 30
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


//checks stats to determine if player met objectives (game checkpoints)
function checkIfGameOver(){
    if(rennFaireRespect >= 100 || sobrietyLevel <= 0 || money <= 0){
        if(rennFaireRespect >= 100){
            isGameOver = true;
            reasonForEnd = "rennRespect";
        }
        else if(sobrietyLevel <= 0){
            isGameOver = true;
            reasonForEnd = "sobriety";
        }
        else{
            isGameOver = true;
            reasonForEnd = "money";
        }
    }
}

//for incorrect player entrys
function devilSpeak(){
    console.log("Be gone with ye devil speak!")
    playerChooseActivity();
}


//displays all of player's current status
function checkStatus(){
    displayStatus();
    playerChooseActivity();
}


//displays main menu
function displayActivities(){
    console.log(`What would you like to do? \nPress "1" for ${activities[0]} \nPress "2" for ${activities[1]} \nPress "3" for ${activities[2]} \nPress "4" to Check your Status \nPress "q" to quit`)
}


//prints game over message
function displayGameOver(){
    if(reasonForEnd === "rennRespect"){
        console.log(`Congratulations!!!\nYou won!!!\nYour willingness to sacrafice dignity for renn-faire glory paid off.\nYou are approached by a talent scout for the festival.\nDo you quit your career to go on Renn-Faire tour?`)
        displayStatus();
    }
    else if(reasonForEnd === "sobriety"){
        console.log(`You are officially belligerant!!!\nYou get into an argument with a man about a goat.\nA person dressed as a troll escorts you off the premises.\nYou proceed to your car to sleep it off.`)
        displayStatus();
    }
    else{
        console.log(`You're broke!!!\nYour penchant for cheaply made wares and booze was immense.\nYou leave the fesitval feeling shameful `)
        displayStatus();
    }
}

//displays player stats
function displayStatus(){
    if(rennFaireRespect < 0){
        rennFaireRespect = 0;
    }
    else if(rennFaireRespect > 100){
        rennFaireRespect = 100;
    }
    if(money < 0){
        money = 0;
    }
    if(sobrietyLevel < 0){
        sobrietyLevel = 0;
    }
    else if(sobrietyLevel > 100){
        sobrietyLevel = 100;
    }
    if(realWorldRespect < 0){
        realWorldRespect = 0;
    }
    console.log(`Your sobriety level is: ${sobrietyLevel}%\nYou have $${money} left\nYou've accquired: ${loot} \nYour renn-faire respect level is: ${rennFaireRespect}%\nYour real-world respect level is: ${realWorldRespect}%`)
}


//display stats and exits the program on player request
function exit(){
    console.log("Your final stats are:")
    displayStatus();
    console.log(`Fare thee well!`)
}


//executes when obejectives met
function gameOver(){
    displayGameOver();
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
    console.log(`You enter the jousting arena.\nYou are approached by a grown man wearing pieces of a deconstructed garbage can. \nHe informs you that one of the "knights" has taken ill and cannot compete. \nHe asks if you would be willing to take his spot.`)
    playerResponds()
    if (playerResponse === "y"){
        sobrietyLevel -= 30;
        rennFaireRespect += 30;
        realWorldRespect -= 30;
        checkIfGameOver();
        if(isGameOver === true){
            gameOver();
        }    
        else{
            //do you win anything? 
            console.log(`You accept the "knight's" challenge! \nBut not before slamming back a couple pints of mead to build your courage.\nYou perform admirably and gain the respect of all in attendance.`)
            playerChooseActivity();
        }
    }
    else if (playerResponse === "n"){
        sobrietyLevel -= 50;
        rennFaireRespect -= 65;
        realWorldRespect += 65;
        console.log(`You decline the "knight's" invite. \nWhile it's hard to understand him completely through his fake cockney-accent, \nit's clear you've made an enemy. \nTo help ease your mind, you slam back a couple pints of mead.`)
        playerChooseActivity();
    }
    else{
        devilSpeak()
    }
}


//when player chooses pub crawl
function pubCrawl(){
    console.log(`You decide you're way too sober for the current situation.\nHoping to rectify this, you sign up for a pub crawl.\nUpon arriving at the start location you realize all the other participants\nare adults dressed in poorly sourced pirate costumes. Do you proceed?`)
    playerResponds()
    if(playerResponse == "y"){
        console.log("Really?")
        playerResponds();
        if(playerResponse == "y"){
            rennFaireRespect += 30;
            realWorldRespect -= 30;
            money -= 20;
            sobrietyLevel -=65;
            checkIfGameOver();
            if(isGameOver === true){
                gameOver();
            }
            else{
            console.log(`You decide "f-it" and join the scurvy lot.\nA pirate approaches wearing a realy macaw on his shoulder. \nHe offers you a "Nipperkin from ye olde beer bong".\nDo you accept?`)
            playerResponds();
            if(playerResponse === 'y'){
                rennFaireRespect += 20;
                realWorldRespect -= 20;
                sobrietyLevel -= 30;
                console.log("player takes beer bong")
                playerChooseActivity();
            }
            else if(playerResponse == 'n'){
                console.log("player does not take beer bong")
                playerChooseActivity();
            }
            else{
                devilSpeak();
            }
        }
    }
        else if(playerResponse == "n"){
            playerChooseActivity();
        }
        else{
            devilSpeak();
        }
    }
    else if(playerResponse == "n"){
        playerChooseActivity();
    }
    else{
        devilSpeak();
    }    
}


//function for tarot card reading
function readTarot(){
    const tarotCards = [
        {
            name: "The Fool",
            meaning: `The Fool advises that you lighten up. Let yourself be spontaneous enough to stretch beyond the realm of logic. There is no advantage to be gained by thinking you possess the knowledge, power, or control to direct reality. Open and receive without question, instead of trying to manage what's happening right now. The Fool has no ambition to manipulate a specific outcome. Just be happy to be part of the whole. Release any demands or expectations. Give your complete attention to events as they are occurring in the present moment.`            
                        },  
        {
            name: "The Magician",
            meaning: `Have faith in your innate creativity. The Magician advises you give your questioning nature and free-associating mind plenty of room to explore the subject at hand. Behave just as if you were an open-minded and curious scientist. Through this process, you may bring freshness and clarity into the situation that is both stimulating and catalytic. You do not have to understand it all intellectually. Besides, intuition is your ace in the hole. Respond in a spontaneous manner to what is right in front of you. There is no reason to hold yourself back. Your natural urges are exactly what is needed, and, your ingenuous timing and elegant style will help smooth over any awkwardness.`
        },
        {
            name: "The High Priestess",
            meaning: `The High Priestess advises you to adhere to your chosen spiritual practice on a more regular basis. If you want the benefits of evolution, you'll have to cooperate with spirit. We all have distractions, demands -- a whole life full of reasons why we cannot find the time to retreat into our inner sanctum. Until you consider this as vital to your well-being as the need to eat and sleep, you are likely to be eternally restless and deeply dissatisfied. A spiritual routine that suits your temperament, practiced every day, is the most trustworthy path to freedom.`
        },
        {
            name: "The Empress",
            meaning: `The Empress advises you to trust in the good sense you have shown up to this point. Recognize your good intentions in carrying out your responsibilities as a compassionate human. You are capable of demonstrating the finest aspects of your personality. Demonstrate this through caring actions, a forgiving and generous attitude, and wise understanding of others' needs and struggles. Bring a healing influence to the current situation and take full credit for the supportive part you play.`
        },
        {
            name: "The Emperor",
            meaning: `When the Emperor arises, he advises you get in touch with your inner sovereignty and natural self-possession. Realize that somewhere deep inside you is the memory of royalty. Reach within to find that strain of natural nobility and leadership. These innate qualities will help you manage your current situation. The Emperor suggests that you have the necessary abilities to be the final authority. This situation is an opportunity to showcase your competence and skill. Act with the confidence of someone who knows how to take care of business.`
        },
        {
            name: "The Hierophant",
            meaning: `The Hierophant advises that you return to the role of a meticulous student. Learn everything you can about your chosen area. Let that knowledge become a part of you and an operative influence on your day-to-day awareness. In this way, you can slowly and steadily establish real credibility in your field or chosen subject. Earn respect and recognition by completing your education and broadening your experience. If you already have all the necessary experience you need, then rewrite your resume so others can appreciate who you are and what you can bring to a situation. Focus on your goal and be determined. You may be destined to be a master in your realm.`
        },
        {
            name: "The Lovers",
            meaning: `The Lovers card advises that you study your options and make the wisest choice. Carefully consider your long-term interests. There is no judgment on what you choose to keep from the array of possibilities before you. Just watch out for choices that will produce dissatisfaction and discontent. Be willing to make some compromises, then stick with the commitments you finally make. Trust your intuition along with your rational intellect, and once you make your choice, carry it out with conviction.`
        },
        {
            name: "The Chariot",
            meaning: `The Chariot advises that you be prepared for changes that might include a move or an opportunity to travel. The Charioteer travels light and stays open to fresh experiences that change with every valley or mountain pass. You may be asked to live out of a suitcase and consider every place your home for a while. Be receptive to new people who come into your life. Most especially, become more fluid and taste the joys of freedom. The Charioteer is nothing if not self-sufficient. Be prepared and self-contained for the changes that will sweep in and carry you with them.`
        },
        {
            name: "Justice",
            meaning: `The Justice card advises you to listen carefully as others explain to you their version of events and the parts they played. It is unnecessary to offer feedback. Your role is to observe, listen closely, give a full hearing and keep your wits about you as the story takes shape. As you witness people's account of themselves, your understanding will go beyond the words you hear. Subtle inferences and clues will reveal the truths that will enable you to make a wise and accurate assessment.`
        },
        {
            name: "The Hermit",
            meaning: `The Hermit advises that you think things through carefully. The demands on you have been high, giving you scant time for reflection. While you have a gift for understanding the larger implications involved, you need some private time to consider the steps to take in the future. You can't just lock yourself in your room for fifteen minutes and expect to come up with profound solutions. You need more seclusion and time to assimilate and process. Now may be the moment for you to tell everyone to leave you alone. When you are fully ready, you will be able and willing to give others what they need.`
        },
        {
            name: "Wheel of Fortune",
            meaning: `The Wheel of Fortune advises you follow the flow of events. Physical moves, spiritual awakenings, or dramatically changing social patterns could arise now. Accept these transformations. This is a safe place for you to be. You are watched over and protected as you go round and round the wheel. You will learn a lot. You will also learn it quickly, and what you absorb will benefit you for a long time to come.`
        },
        {
            name: "Strength",
            meaning: `The Strength card advises that you assertively discipline yourself and separate self interest from enlightened wisdom. Deliberately identify with your intuition, even if it works against the desires of your willful ego. Demand and expect the same from others who have some power in this situation. You cannot challenge them to live to a higher standard if you, yourself, have not yet done so. Influence others by setting an example of integrity. Your self-esteem will increase to the degree that you succeed in your efforts.`
        },
        {
            name: "The Hanged Man",
            meaning: `The Hanged Man advises you to surrender illusions of control. Accept that you have been overcome and deceived by your own devices. Having made your bed, you now need to lie in it. This is not a negative judgment. It's just that sometimes there are consequences for being in the wrong place at the wrong time. Bad things can happen to good people. These consequences are not fatal, even if they are inconvenient -- or perhaps even embarrassing. Stop resisting your circumstances and let some time go by. Eventually, you will be released a little wiser and not much the worse for wear. You will come to realize in time how you collaborated with the problem. However, the issues you were stuck on when you were first hung up have subsided and no longer concern you. You are free to take up new endeavors. You will ultimately feel refreshed and grateful that you were derailed from your former track.`
        },
        {
            name: "Death",
            meaning: `The Death card advises you to detach from the old order. You may want to close accounts, complete unfinished tasks, and gather your harvest. It is time to move on. If you cut the cords that have bound you to old ways and outdated conventions, you could free yourself to join the sweep of incoming light. This is not an excuse to reject others or hurt them in any way. It is simply a time to move toward your ultimate interests. Do not allow nostalgia and outworn loyalties to hold you back. Be willing to go through whatever it takes to get to where you really want to be.`
        },
        {
            name: "Temperance",
            meaning: `The Temperance card advises you to identify and seek the missing ingredients in your life. Marshal your known skills and abilities and do what needs to be done to complete your mission. Prepare to use spiritual practices, studies, or lifestyle changes that can assist you in your quest. A tremendous amount of benefit is available if you can organize yourself and be disciplined at this time.`
        },
        {
            name: "The Devil",
            meaning: `The Devil card advises that you show some spunk. There may be nothing to be gained by trying to be subtle or strategic in this situation. Assert your agenda, express yourself honestly, and let the chips fall where they may. Your best bet could be to express your true emotions, possibly even including anger. Acknowledge that you have whatever feelings you have. While it may not be necessary to act out what you feel in every situation, accepting the power and depth of your inner experience enables you to remain true to yourself.`
        },
        {
            name: "The Tower",
            meaning: `With the Tower card, think of yourself as an agent of transformation. This self-sacrificing role is likely to create stressful situations. Your vision shows you that a radical change has already been unleashed by forces much larger than mere mortals, and therefore you are no longer resisting.

            Now you may be at the forefront, acknowledging and accepting the bracing presence of the future bursting in on the present. Try to mediate the harsher parts of the changes as they unfold, so the most vulnerable are the most cushioned. Acknowledge yourself, as well as the others in your life, who are offering their resources to usher in a better future.`
        },
        {
            name: "The Star",
            meaning: `The Star card advises that you rededicate yourself to your higher values, increase your spiritual cultivation and meditation practice, and surrender to the greater good. Connect to your higher self -- a being of a larger realm traveling on an evolutionary course that started long ago and runs indefinitely into the future. This is the part you wish to contact and communicate with. Now is a period for quiet contemplation. Listen for the voice within. Anything that would interfere with this communion may not be serving your best interests right now.`
        },
        {
            name: "The Moon",
            meaning: `The Moon card advises that you trust your instincts and intuitions. Your intuitive body, which is connected to all living things, is sharper and quicker than the cultivated, civilized self. The everyday mind may not be prepared for strange oceanic circumstances. Plus, it has no game plan. Your intuitive body will support you unerringly if you do not interfere with or try to control what you perceive. A better approach would be to meditate. Try to just be a witness. Do nothing; let nature carry you forward. This may be your best option in this situation.`    
        },
        { 
            name: "The Sun",
            meaning: `The Sun card advises you to have confidence in your natural divinity. Throw off any cultural conditioning that keeps you from being authentic with yourself. Step into the full light of truth and reveal your motives and principles. Once done, you will no longer give away power to the people that criticize and shame you. Focus on the positive and the real. Your authentic shining self can be a light for others if you project it without contrivance.`
        },
        { 
            name: "Judgement",
            meaning: `The Judgment card advises that you allow yourself to grow, transform, and release hidden potentials within yourself. Divest yourself of fruitless endeavors without neglecting your duties. At the same time, invest your energies in new growth. It's not necessary to reject others, but refuse to be manipulated by those who cry foul. This process isn't about them anyway. It is about you and the desire you feel to change your life and become a more complete person. Trust your impulses and allow this remarkable awakening to happen.`
        },
        {
            name: "The World",
            meaning: `The World card may be giving you permission to do whatever you want. Presently, your motivation is close to the will of the divine. Even if you commit an error, it will be turned to the greater good. Stay active and just keep moving forward. It is unnecessary to keep checking or interrupting your spontaneity with calculation. Rather than look for consensus or affirmation from others, simply dance the dance. In other words, express yourself, react naturally, and let the chips fall where they may. What matters is divine intention. Whether or not human beings approve is less important. If you allow your ego to inflate, however, you cease to be useful to the greater plan.`
        },
        { 
            name: "Ace of Cups",
            meaning: `The Ace of Cups in this position advises you to challenge yourself and discover what is good about every relationship. Practice looking at the world through the eyes of the Divine. Allow your imagination to perceive the spiritual or evolutionary potential in every person and experience. Look with the eye of a loving parent or companion upon the people and things you come into contact with. Make a conscious decision to approve of and delight in even the quirky developments that make the world turn. No one can be perfect at such unconditional acceptance. Still the practice will sweeten your day to day life. Your magnetism will increase and more loving people may enter your life. The whole world will benefit as this becomes second nature to you.`
        },
        {
            name: "The Page of Cups",
            meaning: `The Page of Cups (in some decks, a Princess) in this position advises you to study the best ways to be of service. Strive to discern what would give more pleasure, comfort and emotional security. Then, provide it. Understand that what is happening has little or nothing to do with you personally. The best you can do is to offer support and listen closely. Make sure you understand what is needed and serve the situation with loyalty. Look at individuals around you as the embodiment of the Divine, and try to fulfill each one's needs. Be unconcerned with the outcome. Later you will understand why you needed to be in this position.`
        },
        {
            name: "The King of Cups",
            meaning: `The King of Cups in this position advises that you closely examine your conscience and bring your personal mission into alignment with what is best for everyone. You can then step into your community or situation with integrity and an ability to communicate the highest wisdom. As this sweetens the environment, others will be inspired to raise their own motives and intentions to match yours. You will be providing an important kind of leadership that uses strong reassurance to help everyone work together. The most persuasive thing about you is the example of generous behavior that you exhibit -- much more powerful than preaching alone.`
        },
        {
            name: "The Knight of Cups",
            meaning: `The Knight of Cups (in some decks, a Prince) in this position advises that you jump into your new situation with both feet. Get involved with what is happening in the present. Think no more about the route you had to travel to get back here. There is no need to be cavalier about what seems familiar. Look deeply at the underlying values here. You may find that they represent something you mistakenly rejected in the past. Be humble enough to look at things through new eyes. At a deep level, your heart and soul are being nourished. Don't be tempted to run away again -- this is where you belong. Your entire journey was designed to bring you home with new appreciation.`
        },
        {
            name: "The Queen of Cups",
            meaning: `The Queen of Cups in this position encourages you to be generous, kind and forgiving. Support the ability of others to get what they want. Nevertheless, remember as with anyone in a caretaking position, you have a fine line to walk. You do not want your loved ones or teammates to become complacent or dependent, as if they can take your support for granted with little or no consideration for your needs. Cultivate an awareness of love as freely giving and receiving. In the process, help clarify the important difference between receiving energy and taking it. Do not allow your willingness to give be misunderstood or abused, as if it were a weakness.`
        },
        {
            name: "The Two of Cups",
            meaning: `The Two of Cups in this position advises you to speak your heart. It may be likely that the person you are trying to connect with feels the same. Still the other needs to hear this more fully. So why not make it clear and why not now? The Two of Cups is the image of the heart making a vow. This card advises that you pledge yourself to this friendship and put your heart on the line. You have nothing to lose and everything to gain. Life is a relationship game. It's a great privilege to share with others who are so complementary and compatible.`
        },
        {
            name: "The Three of Cups",
            meaning: `The Three of Cups in this position advises that you tune in with your family and fully inform them about what's going on with you. Let them add substance to your ideas with their talent and imagination. Think of this occasion as a celebration, where their support helps you find success in your work. There may be something here for everyone to contribute. Put yourself in the loving hands of your family connections and your trust will be well rewarded. The synergy between you could enhance each individual's talent and creativity. You will love the results!`
        },
        {
            name: "The Four of Cups",
            meaning: `The Four of Cups in this position wants you to take a clear look at how stalled or distracted you have become. You may have been bogged down by negativity, hopelessness or a sense of limitation. It is not to your advantage, however, to see the world through such a narrow lens. Cut through some of the forces that undermine you, causing you to feel incapable. Sometimes you have to define what you are "for" by defining what you are "against." Decide that you are not as heavy as the cup of earth, not placid as is the cup of water, not turbulent as is the cup of air. Rather, now may be the time to be as aroused as is the cup of fire. This arousal may constitute liberation from the circumstances that may have brought you here.`
        },
        {
            name: "The Five of Cups",
            meaning: `The Five of Cups in this position advises you to tighten your belt, make do with less and show more appreciation for the things you do have. If something is truly yours, it cannot be lost. When you are experiencing feelings of loss, it may be because of an inappropriate emotional attachment. If you promise things that you cannot deliver, then you might be setting yourself up for disappointment to follow. In overestimating our abilities, we are forced to face our limits. Be grateful that as the cups fell, you lost only three of the five. Two are still intact, pristine and full of sacred energy. Do not cling to the setback. Focus on the potential.`
        },
        {
            name: "The Six of Cups",
            meaning: `When the Six of Cups is in this position, take a look at what is repetitive or cyclical in your life; what links the present situation to the last such experience. A new beginning requires new energy and concentration. Until you analyze the past, you will continue to drift with its current. Distill everything that is worthwhile from your memories and get as much value from it as you can. Then use this as motivation for change. Make the very best use of hindsight, employing new strategies and trying new angles on these recurring issues.`
        },
        {
            name: "The Seven of Cups",
            meaning: `The Seven of Cups in this position advises that you relax your mind and open to the dreams and imaginings your inner child loves to entertain. Allow yourself to imagine a truly positive outcome for this situation. Perform an exercise in creative visualization by relaxing your guard and letting go of your fears. As the dreamscape unfolds, your electro-magnetic chemistry is stimulated to a point of achieving greater confidence in yourself and in what you are doing. Even if it's only a temporary break from your fears, this is a helpful exercise because it gives your psyche and body a dose of unlimited thinking and optimism. Think positively -- the results could truly be amazing.`
        },
        {
            name: "The Eight of Cups",
            meaning: `With the Eight of Cups in this position, look inside and recognize the part of you that still nurses an old grudge from a past injury or trauma. For the most part, your forward-looking self has gotten up and moved along. You are getting on with your life. There may still a part of you, however, that holds out and resists the healing. Are you nursing old wounds from painful losses of faith and trust? If so, now may be a good time to scrutinize your current motives. See if you are still being influenced by the part of yourself that cuts short your enthusiastic, optimistic impulses. Do not deny this pessimistic tendency. Failing to recognize the truth only causes repression that flares up in another part of our psyche. Instead, seek to understand and accept the hesitation and the fear you may feel, and come to terms with them. Then you can put some old emotions in their rightful place--out of the way.`
        },
        {
            name: "The Nine of Cups",
            meaning: `The Nine of Cups in this position advises that you open yourself to circumstances around you. There may be no need to manage a situation that does not require a lot of control or leadership. The tone of the moment is heartfelt and bonded. It is nurturing. Open up and choose to be receptive. Proceed from your heart, relying on your intuition. This is your truest source of information right now. Allow yourself to be attracted to what feels supportive. Avoid what feels harsh, critical and judgmental. If this requires that you change your style, so be it. The results of being intuitive are generally far superior to the results of being emotionally guarded and overly rational.`
        },
        {
            name: "The Ten of Cups",
            meaning: `With the Ten of Cups in this position, prioritize teamwork over your personal goals. Everyone needs to feel they made a contribution. The crew needs to feel they are all in this together, and everyone needs to be rewarded when the ship comes in. It's essential to follow a teamwork approach in order to maximize the benefits for yourself. The good will that will emerge from such an approach will last long after the project is over. You will be generously rewarded later if you take a selfless approach at this time.`
        },
        {
            name: "Ace of Coins",
            meaning: `The Ace of Coins in this position advises that you apply nature's lesson of compound interest and develop your project gradually. A slow and steady buildup -- visible or invisible -- makes change and growth inevitable. Akin to the changing of the seasons, you do not notice this trend from day to day. As the year comes full circle, however, you cannot miss the changes. This card advises that if you work a little bit every day toward your long-term goal, at some time in the future you will discover that you have accumulated magnificent results. The secret of achieving success does not lie in inflating your dreams to grandiose levels; instead it comes about by choosing your direction wisely, while humbly and faithfully taking one step at a time.`
        },
        {
            name: "The Page of Coins",
            meaning: `The Page of Coins (in some decks, a Princess) in this position advises that you study your chosen field seriously, gaining intellectual knowledge plus whatever experiential learning you can pick up as well. Listen to the stories of others, both their successes and their failures, and let yourself be inspired by their dedicated efforts. Leave no stone unturned. See if you can figure out why their experiments went the way they did and what you might do differently that could change the outcome. Passionately hunt for the missing pieces overlooked by those who came before you. Remember that the mind of a beginner is an open channel for genius. Let that openness lead you and you will instinctively penetrate to the heart of the matter.`
        },
        {
            name: "The King of Coins",
            meanging: `The King of Coins in this position advises you to behave as if you already were a success. Project confidence that your plans and goals are in the process of unfolding perfectly. Make your moves with authority and trust in your actions without waiting for acknowledgment or approval. Soon enough you will receive blessing after blessing. If you can learn to feel that kind of confidence in your body and get comfortable with it as your natural state, you will attract the support you desire.`
        },
        {
            name: "The Knight of Coins",
            meaning: `When the Knight of Coins (in some decks, The Prince) falls in this position you are being advised to offer up your services to some project or enterprise in front of you. Your willing participation can make the difference between a marginal performance and a great one. The entire endeavor will be enhanced significantly by the resources you bring to it and you will be blessed tenfold. Expect to supervise and guide the project as well as influence the outcome of events. Without you on board, this endeavor is just another good idea.`
        },
        {
            name: "The Queen of Coins",
            meanging: `The Queen of Coins in this position advises you to trust the forces that have taken care of you up to this point. Continue to express your truth without worrying that you are going to lose the roof over your head or the bed you sleep in. It is your destiny to be safe and sound at this time in your life. Proceed with confidence and do what you so strongly feel must be done. Since the Queen of Coins is often the person with the best intuition in the crowd, you may feel at first as if you are going against the grain, only to later find yourself becoming the leader of a new trend.`
        },
        { 
            name: "The Two of Coins",
            meaning: `The Two of Coins in this position advises you not to choose anything definitive for the time being. Give yourself a little more time to sort out your feelings and any mixed messages you may be receiving from others. Ask yourself -- are all the facts in yet? Or is the coin still flipping in the air? There is no need to be goaded into premature decisions or actions. Act only when you are able to do so with a unified heart and mind.`
        },
        {
            name: "The Three of Coins",
            meaning: `The Three of Coins in this position suggests that you showcase your unique capabilities. Let the world in on who you really are. This is a good time to seek recognition. Once you receive the appreciation you deserve, accept and savor the acknowledgment. Expect new and exciting offers. When they arrive, accept them graciously. Why hide your light under a bushel? It does not become you to display false modesty. Practice saying to yourself, "Thank you, I accept the compliment" until you learn to fully let in this kind of affirmative grace with ease.`
        },
        {
            name: "The Four of Coins",
            meaning: `The Four of Coins in this position signifies a young person, naive and pampered, who has been left an estate. Think conscientiously about all those people whom your activities impact, including those whose work and effort went into building what you inherited and those whose welfare depends upon your right management.

            What you have been given is abundant; still, it is not without limits. If you are prudent and responsible, the endowment will grow. However, if you are frivolous or foolish, your behavior could undermine both your inheritance and the well being of others who are connected to it. In many decks, we see the image of a person who is stuck in his or her misunderstanding of how the material plane works. He's afraid to let go of his four measly coins, because he doesn't know he has to give in order to get. When looked at this way, this is the card of "poverty consciousness."`
        },
        {
            name: "The Five of Coins",
            meaning: `The Five of Coins in this position advises you to create contractual agreements with those around you who have similar interests. In this kind of situation, there is strength in numbers. Put your heads together and devise a bold plan for future objectives and decide how to invest in their success. This Five of Coins recommends teamwork and the mutual benefits a combined effort can yield.`
        },
        {
            name: "The Six of Coins",
            meaning: `The Six of Coins in this position asks you to think of yourself as a cosmic talent agent, seeking individuals who show a spark or gift. You may help them refine and upgrade their skills to fit a larger context. The outcome is a peer relationship with a sense of mutual regard and admiration. This is a delicate operation. You have to constantly check your intentions so that you are not expecting something in return. Do not for a minute feel proud about doing someone a favor. In truth what you are doing is paying back an old debt to those who served as your mentors.`
        },
        {
            name: "The Seven of Coins",
            meaning: `The Seven of Coins in this position advises you to focus on the long run. Look beyond this week or this month. This card exemplifies the magic of compound interest. You'll have much better results with a slow and steady investment of time, energy and labor than you would generate by trying to win the lottery. The path to success is paved by perseverance. Glamorous or flashy moves cannot take the place of consistent steps in the right direction. If you do not understand this, perhaps you are moving in the wrong direction or are not motivated strongly enough.`
        },
        {
            name: "The Eight of Coins",
            meaning: `The Eight of Coins in this position recommends that you focus on your main project and produce as much as you can, while staying healthy. This is an important time for meeting goals. However, do not work so hard that quality suffers. You are in a position where your effort can make a big difference. Apply yourself. Do the work and you will be rewarded with flexibility and freedom.`
        },
        {
            name: "The Nine of Coins",
            meaning: `The Nine of Coins in this position suggests that you prepare yourself for greater resources to be flowing in your direction. If you pay attention -- and keep the faith -- you can make a smooth transition into a state of well being and peace of mind. Hard work has brought you to a place where you could earn and receive grace, comfort, and freedom -- whether that be personal, emotional or financial. Exercise your imagination and create an abundant, sustainable, and enjoyable lifestyle (or relationship) for yourself. Acknowledge the friends and others who were loyal to you during the difficult times. Gather your dreams and get ready. You deserve this happiness.`
        },
        {
            name: "The Ten of Coins",
            meaning: `The Ten of Coins in this position advises that you think of yourself as one who may be of great benefit to people. No matter whether it be a service, an invention or an idea -- you know you are holding a storehouse of value. Your potential treasure is enough to take care of you and yours for a long time. Exactly how are you going to administer the rewards of your talent? Recall the time when you began this current path or endeavor. Remember your sincerity, your innocence and your original vision. Can you reproduce success and sustain inspiration as the administrator of your present abundance? Think of every act of spending and investing and securing as the sowing of seed that will sprout and produce another money tree in somebody else's yard. How can you get really clever and inventive at throwing those seeds? This is your next assignment.`
        },
        {
            name: "Ace of Wands",
            meaning: `The Ace of Wands in this position encourages energetic movement toward activity. Brace yourself and get ready to spring into action. You may need to make your move soon, so make sure you are fully prepared. Trust your instincts and spontaneity. When the opportunity comes, you may want to seize it without hesitation. So quicken your senses and raise your antenna. There's excitement in the air, and supports your immediate ambitions.`
        },
        {
            name: "The Page of Wands",
            meaning: `This card is traditionally entitled a Page, but in some modern decks as a Princess. In this position, this card suggests that you cannot know how to facilitate communication until you have studied your environment. Your task may be to blend into your surroundings so you can gather information and get a clear sense of what is going on around you. Think of yourself as a secret agent for the greater good. In due time, others may recognize the role you play in the transformation from divisiveness to unity. However, right now you are being asked to watch quietly from the sidelines.`
        },
        {
            name: "The King of Wands",
            meaning: `The King of Wands in this position reminds us that our lives are designed to bring us eventually to a place of self-ownership. An opportunity for self-empowerment is presenting itself to you now. Recognize that through your attitude and the way you express yourself to others, you hold the power over your own experiences in life. You are the determining factor in this situation and circumstances will proceed in the direction that you steer them. Indecision or doubt are not appropriate responses when clarity and confidence are critical. As you take on a bigger role, it will begin to feel more comfortable. Seize the opportunity to influence events, because everything is waiting for you.`
        },
        {
            name: "The Knight of Wands",
            meaning: `The Knight of Wands (in some decks, a Prince) in this position advises that you modify your self-image in order to get a sense of yourself as a person of action. No matter what your past patterns have been, it is fully possible to place yourself solidly on the road toward the future. Not only can you get a clear sense of the proper path, but you will also have enough instructions to be self-directing. Necessary skills and resources are available to you, and the time is right for you to act. Once you get started, you may be surprised how easy it can feel, but don't be seduced by that feeling. There will be comfortable stretches of the road and there will be distinctly uncomfortable ones. Know that any form of motion is better than no motion.`
        },
        {
            name: "The Queen of Wands",
            meaning: `The Queen of Wands in this position reveals a need to hold your place in the chain of command and respect the hierarchy (at least for now). This may not be a time for you to be at the helm, even if you are motivated by a strong dedication to completing a project or overcoming a challenge. A perceived deficiency in leadership may make you want to take hold of the reins, but don't do it! Restrain yourself and remain loyal to your higher-ups. Stay focused and energetic. Enthusiastically confront the challenges directly in front of you. Perform in good faith and encourage others to do the same.`
        },
        {
            name: "The Two of Wands",
            meaning: `The Two of Wands in this position advises you to respect your own decision making process. Instead of criticizing yourself for indecisiveness, appreciate the various implications of possible choices. Avoid pushing yourself to make a commitment. Keep meditating, watching the situation and witnessing the forces at work. At some point you will have enough information to see clearly. The decision-making process will be over and the choice will be clear.`
        },
        {
            name: "The Three of Wands",
            meaning: `The Three of Wands in this position advises you to act quickly and powerfully on an idea or desire you have been feeling. This card suggests exquisite timing, staying in the moment and responding to your instinct or intuition. Every fiber of your being may be saying this is a great opportunity, even if those around you aren't as convinced. There's nothing to lose from taking a risk; this is a great moment in your entrepreneurial growth. Make your move and sort out the details later.`
        },
        {
            name: "The Four of Wands",
            meaning: `The Four of Wands in this position supports your good, productive, evolutionary ideas. Concentrate on networking: use your charisma and power to attract like-minded souls so you can significantly increase your sphere of influence -- the more people you can reach, the better. Your enthusiasm empowers your vision, which is thriving with possibilities. As you share more freely what is on your mind and in your heart, others will see themselves in your vision, so you naturally receive approval, support, assistance and abundance. In your own way, you are addressing a universal need`
        },
        {
            name: "The Five of Wands",
            meaning: `The Five of Wands in this position encourages you to find your natural ambition. Identify what energizes you, what you would fight for and what you are passionate about -- even when you're tired or discouraged. Strive to make that the centerpiece of your mission. This is how you find your livelihood and establish your path of service.`
        },
        {
            name: "The Six of Wands",
            meaning: 'The Six of Wands in this position advises taking action on your most burning and passionate convictions, no matter what the social consequences. Continue to articulate and define yourself in light of the torch you are carrying. This inspires others to conceive some new ideas of their own. You may find yourself becoming something of a leader. Usually the first person to break away from conventional thought is the one to define a new trend. Under the circumstances, there is a solid need for a fresh voice and vision -- so make your move. Those around you who are ready for change will support your leadership.'
        },
        {
            name: "The Seven of Wands",
            meaning: `The Seven of Wands in this position tells you that the time for peak performance is now. Even if slightly unprepared, you may want to push yourself beyond your usual limits, thinking in larger terms and tweaking your competitive nature. Time and effort spent in preparation could pay off handsomely. You might be the one who vaults right over the heads of those who thought they could outdo you. Move beyond rhetoric and verbal challenges. Now could be the moment to prove what puts you head and shoulders above the rest by demonstrating it in action.`
        },
        {
            name: "The Eight of Wands",
            meaning: `With the Eight of Wands in this position, learn all you can from recent successful experiences. Take note of what worked before and what did not. You possess awareness as to how to effectively apply your imagination to shape the world in productive and aesthetic ways. Thus, the testament to your talents may be revealed for everyone to see and admire. Even if you had to leave it all behind, you know you could start all over among total strangers and succeed once again. This valuable self-confidence makes you free to strike out in new directions and not just cling to past successes and previous accomplishments.`
        },
        {
            name: "The Nine of Wands",
            meaning: `When the Nine of Wands is in this position, you have done everything you can to bring a situation to a successful conclusion. The full range of possibilities has been exhausted and all the creative energy that is available has already been put to use. This may be a great time to lay down your concerns and enjoy a rest. There is nothing more to bring to the mission unless you regenerate and restore the energy you have put into the cause. While it is praiseworthy to give all you have for something or someone that means a lot to you, masochism and martyrdom are ill advised. Take a break. No one can fault you for it now.`
        },
        {
            name: "The Ten of Wands",
            meaning: `The Ten of Wands in this position advises you to remember the true, simple heart of your youth and all the idealism it held. Now may be the time to reach deep into yourself and identify your purest, most wholesome impulses. As you do this, allow your optimistic and honorable side to see what's good about the world. Look beyond the challenges, setbacks, disappointments and frustrations you tend to see so easily. As you reawaken your high minded inner child, you will refresh your daily life with a joyful purpose.`
        },
        {
            name: "Ace of Swords",
            meaning: `The Ace of Swords in this position advises you to be steady--you are about to reach your objective. There may be no need to hesitate. Just concentrate on making your impact. This could be your moment. The arrow is pointed straight at the target. Your eye is keen, your grip is firm. Let that arrow fly! If you set aside distractions and hit your mark, you will be rewarded with insight and clarity. Remember that this is not the time to hold back, worrying about the consequences. When you access this level of truth, you are very likely to cut through all illusion and nonsense.`
        },
        {
            name: "The Page of Swords",
            meaning: `When the Page of Swords (in some decks, a Princess) is in this position, the situation requires subtle change in order for it to be brought to the highest good for all concerned. In contrast to times when one can best serve the greater good by being visible and heroic, this is a time when you must keep your own counsel, cover your tracks and stealthily accomplish what would be impossible to complete without privacy. Reduce your profile and increase your anonymity, no matter how your self-image might suffer. Although it would be gratifying to accomplish what needs to be done and be aboveboard about it, that cannot be a priority at present.`
        },
        {
            name: "The King of Swords",
            meaning: `In this position, the King of Swords advises that you research your situation and in the process question existing authorities. It may be time to examine underlying assumptions and bring greater clarity into areas that have been left in the dark. Don't wait for others to do it. Instead, draw your own conclusions. Spend time reviewing all the ramifications because this King of Swords requires a thorough, methodical examination of ideas and possibilities. Call forth the sober and wise part of yourself -- the elder father figure. Then act on the instructions given you.`
        },
        {
            name: "The Knight of Swords",
            meaning: `The Knight of Swords in this position advises you to remain open to conflicting ideas instead of surrounding yourself exclusively with people who agree with you. This Knight is most effective when testing his ideas in a debate. Emulate his ability to communicate successfully by keeping your conversations impersonal and humorous so no hurt feelings are provoked. Practice your negotiation skills so you will be in shape for imminent diplomatic challenges as they arise. A sparring partner could help you learn to control impulsive comments and stem your urge to be right at the expense of others being wrong.`
        },
        {
            name: "The Queen of Swords",
            meaning: `The Queen of Swords in this position advises that you refrain from remaining dependent on others at this time. Instead of placing too much confidence in the promises people have made, harbor only those ambitions you know you can accomplish yourself. The Queen of Swords does not want to wait and see what others would think, say or do. She knows what she wants and how to get it. She doesn't ask permission or even subject herself to much influence. There are times in life when no one can take care of you as well as you can. Leave sentimentality behind and take action. Make important decisions for yourself because it's up to you. You are the final judge.`
        },
        {
            name: "The Two of Swords",
            meaning: `The Two of Swords in this position advises that this may not be a good time to make a decision. Neither allow others to push you beyond your boundaries, nor permit yourself to act impulsively. You need to fully assimilate the situation before making any moves -- even if not having a solution as soon as you want causes tension. Have patience. There are circumstances in which action is better than non-action. This, however, is not one of them. Remain silent as much as possible and allow things to settle. A little meditation can help you achieve greater objectivity. You do not have enough information, as all the evidence hasn't come in yet.`
        },
        {
            name: "The Three of Swords",
            meaning: `The Three of Swords in this position advises you to strike out on your own. Become more independent. Separate yourself from people and forces you do not feel compatible with. Grow a thicker skin. Use your creativity and imagination and seek out situations where the way you see things makes sense to those around you. Move towards those who can embrace and appreciate your talents and all you have to contribute.`
        },
        {
            name: "The Four of Swords",
            meaning: `The Four of Swords in this position strongly urges that you keep your own counsel in this situation. There may be too much fear and hostility in the environment for you to be heard. It might be that your ideas are not ripe enough or that you are not ready to listen to feedback from others. If you spend more time in contemplation, you may successfully disregard the emotional occupations and biases of others. For now, closely observe inner events. The time for sharing will come later.`
        },
        {
            name: "The Five of Swords",
            meaning: `The Five of Swords in this position advises you to prepare yourself for disappointment over how your fellow humans are setting their priorities. It seems that the lower end of human nature may be eroding good will in the current situation. Due to a strong cultural trend toward scarcity thinking, a "me first" outlook prevails. If this means that you need to develop a thick skin or carry your sword of truth closer, then do so. Try not to be too quick to anger or jump to conclusions. Just because others may have a pessimistic sense of the world, their reality does not have to undermine yours. There is certainly no point in struggling or competing with them. Your challenge now is to learn how to sidestep confrontation and evoke a more evolved response from people. At the very least, be assertive about setting boundaries for yourself.`
        },
        {
            name: "The Six of Swords",
            meaning: `The Six of Swords in this position reminds you that time is of the essence. You've seen the big picture, and good ideas have occurred to you about what needs to be done. Now it is necessary to take action. There may be no more time for debate. If the game plan has become clear, your next step could be to commit yourself to pursue changes that will lead to improvement. Overcome the tendency to get distracted. You do not have time for approval seeking. Once you initiate action, others will be grateful for your clear thinking and quick reflexes. It's a special gift to be able to navigate in times of rapidly changing and unpredictable circumstances, when a cool head and right timing are most essential.`
        },
        {
            name: "The Seven of Swords",
            meaning: `The Seven of Swords in this position suggests that deep within you already know exactly what has to happen. You know what steps to take and what order to take them in to bring about a desirable outcome in this situation. You may have enough of an overview to see how to advance through the maze and achieve your goal. Continue to envision unobstructed success. Even as the path you are walking changes and the circumstances around you obscure your view, keep the desired outcome clear and sharp in your mind. You will quite likely reach your goal and gain tremendous self esteem in the process.`
        },
        {
            name: "The Eight of Swords",
            meaning: `With the Eight of Swords in this position, you are being reminded that every setback you experience is a teacher awakening you to renewed effort. This is a learn-by-doing situation; there is no formula that guarantees outcome. You can be sure, however, that an open-minded and optimistic attitude will serve you better in the face of surprising developments. Be willing to make the rigorous effort that is being called for now. Perform wholeheartedly, with good faith and hopefulness. As such, you'll forestall bickering and criticism, prevail against negative forces and overcome the demons of doubt and resistance. Get excited about your challenges; be confident that you have what it takes to improve the situation. If you do your internal homework, the external situation will open up for you.`
        },
        {
            name: "The Nine of Swords",
            meaning: `The Nine of Swords in this position advises you to confront your fear of being alone and acknowledge the different limits you may have put on yourself because of that fear. In the name of being safe, you may have adhered to lower standards than you are capable of achieving. If so, then you may have resisted striking out on your own. Perhaps you have bargained away creativity and joy in order to avoid being challenged. These kinds of tradeoffs never work. This could be a time to cut your losses. If so, recognize how much time and energy you have sacrificed to a way of being that's not right for you. If you can do this you will look back at this time in your life as a turning point. This may be an opportunity to heal as you shed a heavy burden that weighs you down.`
        },
        {
            name: "The Ten of Swords",
            meaning: `The Ten of Swords in this position advises that you lay low for a while. Don't make a move. Keep yourself as safe as possible until the drama, even the possible trauma, plays itself out. Once the turmoil dies down, then you can assess the damage and start to make repairs. The situation can be compared to a hurricane moving through the neighborhood. You can't be sure whether it is going to pass over a corner of the field or whether it is going to slam into your house. In the face of such unpredictability, protect yourself, hope for the best and wait it out. Sometimes, an extreme turn of events serves as a pressure relief valve for all the unexpressed and unresolved energy that had been building up. Trust the process even though things may seem pretty drastic right now.`
        }
    ]
    
        playersFirstCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
        return(`You got ${playersFirstCard.name} in the advice position: ${playersFirstCard.meaning}\n*Descriptions from tarot.com`)

}
 console.log(readTarot())


//beginning of program

//greets player
greetPlayer()

//puts player into main menu
playerChooseActivity()
