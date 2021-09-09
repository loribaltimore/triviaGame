let turnCounter = 0;
let player1 = 'Player 1';
let player2 = 'Player 2'
let success = false;
let gotHit = false;
let reRoll = 0;
let isDuplicate = false;
let correct = false;
let commentaryContainer = [];
let j = 0;
let placeHolder = ['attack', 'ability'];
let i = 0;
let difficulty = 'easy';
let fountain = false;
function isPlayerUp() {
    console.log('playerUp '+ turnCounter)
    if (turnCounter % 2 !== 0 || turnCounter === 0) {
        playerUp = player1;
        playerOff = player2;
    }
    else {
        playerUp = player2;
        playerOff = player1;
    }
    console.log(playerUp);
    p = playerUp.powerUp.length - 1;
        return playerUp;
    };
class Abilities {
    constructor(name, damage, ratio, fn) {
        this.name = name,
            this.damage = damage,
            this.ratio = ratio,
            this.fn = fn
    }
    ability() {
        console.log(`Ability Phase ${turnCounter}`);
        console.log(this)
        trivia();
        for (let button of answer) {
            button.addEventListener('click', endPhase);
        }
    }
    randomAbl() {
        let wheel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let hitWheel = [];
        this.ratio += (0.1 * playerUp.powerUp.length);
        let hit = wheel.length * this.ratio;
        console.log(hit);
        for (let i = 0; i < hit; i++) {
            let x = Math.floor(Math.random() * wheel.length);
            hitWheel.push(x);
        }
        for (let i = 0; i < hit; i++) {
            let y = Math.floor(Math.random() * wheel.length);
            let z = wheel[y];
            if (hitWheel.indexOf(z) !== -1) {
                let success = true;
                console.log('hit');
                return this.ability();
            }
            else {
                commentaryA.innerText = `In it's arrogance ${playerUp.name} attempted an attack it was not able to land...`;
                commentaryB.innerText = `You lose your turn...`
                console.log('miss')
                if (this.name === 'Miss') {
                    console.log('You missed!');
                    ;
                }
            }
        }
    };
}
let heal = new Abilities('Heal', 5, 0.8, ()=> {
    commentaryB.innerText = `${playerUp.name} healed itself! ${playerUp.name} gained ${playerUp.abilities[j].damage} LP!`
    playerUp.lifePoints = playerUp.lifePoints + playerUp.abilities[j].damage;
    playerName.innerText = `${playerUp.name} : ${playerUp.lifePoints} LP`;
});
let duplicate = new Abilities('Duplicate', 0, 0.9, () => {
    commentaryB.innerText = `${playerUp.name} has duplicated itself and ${playerOff.name} can't tell who to target! ${playerOff.name} has lost 20% of it's accuracy!`;
    let a = 0;
    while (a < 2 && playerOff.powerUp.length > 0) {

        for (let power of playerOff.powerUp) {
            a++;
            console.log(playerOff.powerUp)
            console.log(a);
            if (a <= 2) {
                playerOff.powerUp.pop();
                console.log(playerOff.powerUp)
            }
            else {
                console.log('done');
            }
        }
    }    
});
let fountainOfYouth = new Abilities('Fountain of Youth', 5, 0.9, () => {
    fountain = true;
    commentaryB.innerText = `${playerUp.name} has drank water from the Fountain of Youth! They will gain 5 lifepoints per turn..`;
});
let implosion = new Abilities('Implosion', 55, 0.3, () => {
    commentaryB.innerText = `${playerUp.name} has sacrificed itslef to kill their enemy! ${playerOff.name} and ${playerUp.name} lost ${playerUp.abilities[j].damage} LP!`;
    playerUp.lifePoints = playerUp.lifePoints - playerUp.abilities[j].damage;
    playerOff.lifePoints = playerOff.lifePoints - playerUp.abilities[j].damage;
    playerName.innerText = `${playerUp.name} : ${playerUp.lifePoints} LP`;
});
let fleet = new Abilities('Fleet', 25, 0.3, () => {
    commentaryB.innerText = `${playerUp.name}'s cavalry has arrived to reinforce their position! ${playerOff.name} lost ${playerUp.abilities[j].damage} LP`;
    playerOff.lifePoints = playerOff.lifePoints - playerUp.abilities[j].damage;
    playerName.innerText = `${playerUp.name} : ${playerUp.lifePoints} LP`;
});
let necromance = new Abilities('Necromancer', 15, 0.3, () => {
    commentaryB.innerText = `${playerUp.name} summoned  Elven souls in a barrage! ${playerUp.name} gained ${playerUp.abilities[j].damage} LP 
    and ${playerOff.name} lost ${playerUp.abilities[j].damage} LP`
    playerUp.lifePoints = playerUp.lifePoints + playerUp.abilities[j].damage;
    playerOff.lifePoints = playerOff.lifePoints - playerUp.abilities[j].damage;
    playerName.innerText = `${playerUp.name} : ${playerUp.lifePoints} LP`;
})
let frenzy = new Abilities('Frenzy', 8, 0.6, () => {
    commentaryB.innerText = `${playerUp.name} is in a Frenzy! ${playerOff.name} lost ${playerUp.abilities[j].damage} LP!`
    playerUp.lifePoints = playerUp.lifePoints + playerUp.abilities[j].damage;
    playerName.innerText = `${playerUp.name} : ${playerUp.lifePoints} LP`;
});
let enrage = new Abilities('Enrage', 0, 0.6, () => {
    commentaryB.innerText = `Ork is Enraged! It gained ${playerUp.maxLife - playerUp.lifePoints} LP!`;
    playerUp.lifePoints = playerUp.maxLife - playerUp.lifePoints;
});
let crit = new Abilities('Crit', 16, 0.6, () => {
    commentaryB.innerText = `Elf got a Critical Hit! ${playerOff.name} lost ${playerUp.abilities[j].damage} LP!`;
    playerOff.lifePoints = (playerOff.lifePoints - playerUp.abilities[j].damage);
});
var miss = new Abilities('Miss', 0, 0.9);

class Attack {
    constructor(name, damage, ratio, weight) {
        this.name = name,
            this.damage = damage,
            this.ratio = ratio,
            this.weight = weight
    }
    attack() {
        console.log(`Attack Phase ${turnCounter}`);
        console.log(this)
        trivia();
        for (let button of answer) {
            button.addEventListener('click', endPhase);
        }
    }
    random() {
        let wheel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let hitWheel = [];
        this.ratio += (0.1 * playerUp.powerUp.length);
        console.log('attack ratio ' + this.ratio);
        let hit = wheel.length * this.ratio;
        console.log(hit);
        for (let i = 0; i < hit; i++) {
            let x = Math.floor(Math.random() * wheel.length);
            hitWheel.push(x);
            console.log(hitWheel)
        }
        for (let i = 0; i < hit; i++) {
            let y = Math.floor(Math.random() * wheel.length);
            let z = wheel[y];
            console.log(z)
            if (hitWheel.indexOf(z) !== -1) {
                success = true;
                console.log('hit');
                this.ratio -= (0.1 * playerUp.powerUp.length);
                return this.attack();
            }
            else {
                commentaryA.innerText = `In it's arrogance ${playerUp.name} attempted an attack it was not able to land...`;
                commentaryB.innerText = `You lose your turn...`
                console.log('miss')
                if (this.name === 'Miss') {
                    console.log('You missed!');
                   ;
                }
            }
        }
    }
}
let thrash = new Attack('Thrash', 25, 0.4, 'hard');
let spellCast = new Attack('Spellcast', 12, 0.4, 'hard');
let lancer = new Attack('Lance', 16, 0.4, 'hard');
let multiArrow = new Attack('Multi-Arrow', [5,15], 1, 'hard');
let clobber = new Attack('Clobber', 8, 0.6, 'medium');
let nip = new Attack('Nip', 3, 0.6, 'medium');
let saber = new Attack('Saber', 4, 0.6, 'medium');
let longshot = new Attack('Longshot', [3,5], 1, 'medium');
let scrap = new Attack('Scrap', 2, 1, 'light');
var miss = new Attack('Miss', 0, 0.1,);

class Character {
    constructor(lifePoints, attacks, name, abilities) {
        this.lifePoints = lifePoints,
            this.attacks = [miss, scrap, ...attacks],
            this.name = name,
            this.abilities = { light: heal, med: abilities[0], heavy: abilities[1]}
        this.maxLife = this.lifePoints
        this.powerUp = [];
    }
    turn() {
        let n = 0;
        turnCounter++;
        console.log('start of turn ' + turnCounter)
        isPlayerUp();
        atkList.classList.toggle('collapse');
        playerName.innerText = `${playerUp.name}'s turn :  ${playerUp.lifePoints} LP`;
            if (p !== -1) {
            atkRef[p].classList.toggle('power'); 
            }
    }
        
    }
let ork = new Character(75, [clobber, thrash], 'Ork', [enrage, implosion], []);
let elf = new Character(90, [nip, spellCast], 'Elf', [crit, necromance], []);
let squire = new Character(120, [saber, lancer], 'Squire', [frenzy, fleet], []);
let woodsman = new Character(80, [longshot, multiArrow], 'Woodsman', [duplicate, fountainOfYouth], []);

let orkChoose = document.querySelector('#orkChoose');
let playerChoose = document.querySelectorAll('.choice');
let playerChooseTitle = document.querySelector('#playerChooseTitle');
let playerChooseBox = document.querySelector('#playerChooseBox');
let playCard = document.querySelector('#playCard');
let playerWheel = [];
let playerChoice = function (event) {
    console.log(event.target);
    playerWheel.push('Player Chosen');
    switch (event.path[0]) {
        case orkChoose:
            if (playerWheel.length === 1) {
                player1 = ork;
            }
            else {
                player2 = ork;
            }
            break;
        case elfChoose:
            if (playerWheel.length === 1) {
                player1 = elf;
            }
            else {
                player2 = elf;
            }
            break;
        case squireChoose:
            if (playerWheel.length === 1) {
                player1 = squire;
            }
            else {
                player2 = squire;
            };
            break;
        case woodsmanChoose:
            if (playerWheel.length === 1) {
                player1 = woodsman;
            }
            else {
                player2 = woodsman;
            };
    };
    isPlayerUp();
    if (player2 !== 'Player 2') {
        playerChooseTitle.innerText = `You have chosen ${player2.name}`
        console.log('players Chosen')
        setTimeout(() => {
            playerChooseBox.classList.toggle('collapse');
            playCard.classList.toggle('collapse');
            playerOff.turn();
        }, 2000);
    }
    else {
        playerChooseTitle.innerText = `You have chosen ${playerUp.name}`
    }
    return playerUp;
};
for (let players of playerChoose) {
    players.addEventListener('click', playerChoice);
}
let playerName = document.querySelector('#playerName');
let playerDescription = document.querySelector('#playerDescription');
let atkButton = document.querySelector('#flush-headingOne');
let ablButton = document.querySelector('#ablButton');
let atk1 = document.querySelector('#atk1');
let atk2 = document.querySelector('#atk2');
let atk3 = document.querySelector('#atk3');
let collapser = document.querySelector('#collapser')
let collapseAbl = document.querySelector('#collapseAbl')
let abl1 = document.querySelector('#abl1');
let abl2 = document.querySelector('#abl2');
let abl3 = document.querySelector('#abl3');
let scrapButton = document.querySelector('#atk1');
let answer0 = document.querySelector('#answer1');
let answer1 = document.querySelector('#answer2');
let answer2 = document.querySelector('#answer3');
let answer3 = document.querySelector('#answer4');
let commentaryA = document.querySelector('#commentaryA');
let commentaryB = document.querySelector('#commentaryB');
let allCommentary = document.querySelectorAll('.commentary');
let allAnswers = [answer0, answer1, answer2, answer3];
let atkList = document.querySelector('#atkList');
let atkRef = document.querySelectorAll('.atkRef');
let allAnswersPOS = [];
let answer = document.querySelectorAll('.answer');
let atkButt = document.querySelectorAll('.collapser');
let ablButt = document.querySelectorAll('.ablButt');
let question = document.querySelector('.question')
let rolls = [];
let rollAmt = 0;

let roller = function (roll, status) {
    isDuplicate = status;
    console.log(roll)
    if (rolls.indexOf(roll) !== -1) { 
        reRoll = Math.floor(Math.random() * 4);
        isDuplicate = true;
        roller(reRoll, true);
    }
    else {
        rollAmt++;
        rolls.push(roll);
        allAnswersPOS.push(allAnswers[roll]) 
    }
    return roll;
}
let trivia = async () => {
    try {
        let response = await axios.get(`https://opentdb.com/api.php?amount=50&difficulty=${difficulty}`);
        console.log(response.data.results[0]);
        question.classList.toggle('collapse');
        question.innerText = response.data.results[0].question;
        let wrongAnswers = response.data.results[0].incorrect_answers;
        let rightAnswer = response.data.results[0].correct_answer;
        for (let button of answer) {
            button.classList.toggle('collapse');
        }
        
        for (let answerB of wrongAnswers) {
            let roll = Math.floor(Math.random() * allAnswers.length);
            roller(roll, isDuplicate);
            if (isDuplicate === false) {
                allAnswers[roll].innerText = answerB;
            }
            else {
                allAnswers[rolls[rollAmt-1]].innerText = answerB;
                isDuplicate = false;
            }
        }
        for (let answerA of allAnswers) {
            if (allAnswersPOS.indexOf(answerA) === -1) {
                answerA.innerText = rightAnswer;
                console.log('THIS IS THE CORRECT ANSWER')
                answerA.classList.toggle('correct');
            }
            else {
                answerA = answerA;
                console.log('uhOHHHHHH')
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
atkButton.addEventListener('click', (event) => {
        atk1.innerText = `${playerUp.attacks[1].name} | ${playerUp.attacks[1].damage}LP | ${playerUp.attacks[1].ratio*100}%`;
        atk2.innerText = `${playerUp.attacks[2].name} | ${playerUp.attacks[2].damage}LP | ${playerUp.attacks[2].ratio*100+(playerUp.powerUp.length*10)}%`;
        atk3.innerText = `${playerUp.attacks[3].name} | ${playerUp.attacks[3].damage}LP | ${playerUp.attacks[3].ratio*100+(playerUp.powerUp.length*10)}%`;
  
});
ablButton.addEventListener('click', (event) => {
    abl1.innerText = `${playerUp.abilities['light'].name} | ${playerUp.abilities['light'].damage}LP | ${playerUp.abilities['light'].ratio*100}%`;
    abl2.innerText = `${playerUp.abilities['med'].name} | ${playerUp.abilities['med'].damage}LP | ${playerUp.abilities['med'].ratio*100+(playerUp.powerUp.length*10)}%`;
    abl3.innerText = `${playerUp.abilities['heavy'].name} | ${playerUp.abilities['heavy'].damage}LP | ${playerUp.abilities['heavy'].ratio*100+(playerUp.powerUp.length*10)}%`;
});
for (let atk of atkButt) {
    atk.addEventListener('click', (event) => {
        console.log(event.path[0]);
        switch (event.path[0].classList.contains('light')) {
            case  true:
                playerUp.attacks[1].random();
                commentaryContainer.push(playerUp.attacks[1])
                j = 1;
                break;
            case false:
                if (event.path[0].classList.contains('medium')) {
                    difficulty = 'medium';
                    playerUp.attacks[2].random();
                    commentaryContainer.push(playerUp.attacks[2])
                    j = 2;
                    break;
                }
                else {
                    difficulty = 'hard';
                    playerUp.attacks[3].random();
                    commentaryContainer.push(playerUp.attacks[3]);
                    j = 3;
                    break;
                } 
        }
        atkList.classList.toggle('collapse');
        commentaryA.classList.toggle('collapse');
        commentaryA.innerText = `${playerUp.name} wants to ${playerUp.attacks[j].name}...`;
        commentaryB.classList.toggle('collapse');
        if (difficulty === 'easy') {
            commentaryB.innerText = `but they'll have to answer an easy question first..`;
        }
        else {
            commentaryB.innerText = `but they'll have to answer a ${difficulty} question first..`
        }
        setTimeout(() => {
            collapser.classList.toggle('show');
        }, 1500);
        })
    }
for (let abl of ablButt) {
    abl.addEventListener('click', (event) => {
        i = 1;
        console.log(event.path[0]);
        switch (event.path[0].classList.contains('light')) {
            case  true:
                playerUp.abilities['light'].randomAbl();
                commentaryContainer.push(playerUp.abilities[1])
                j = 'light';
                break;
            case false:
                if (event.path[0].classList.contains('medium')){
                    difficulty = 'medium';
                    playerUp.abilities['med'].randomAbl();
                    commentaryContainer.push(playerUp.abilities[2])
                    j = 'med';
                    break;
                }
                else {
                    difficulty = 'hard';
                    playerUp.abilities['heavy'].randomAbl();
                    commentaryContainer.push(playerUp.abilities[3]);
                    j = 'heavy';
                }
        }
        atkList.classList.toggle('collapse');
        commentaryA.classList.toggle('collapse');
        commentaryA.innerText = `${playerUp.name} wants to ${playerUp.abilities[j].name}...`;
        commentaryB.classList.toggle('collapse');
        commentaryB.innerText = `but they'll have to answer a ${difficulty} question first..`
        setTimeout(() => {
            collapseAbl.classList.toggle('show');
        }, 1500);
    })
    }
function endPhase(event) {
        if (event.path[0].classList.contains('correct')) {
            console.log(event.path[0])
            commentaryA.innerText = `${playerUp.name}'s ${placeHolder[i]} was...SUCCESSFUL!`;
            if (i === 1) {
                playerUp.abilities[j].fn();
            }
            else {
                if (commentaryContainer[0] === longshot || commentaryContainer[0] === multiArrow) {
                    let strength = Math.floor(Math.random() * 10 + 1);
                    if (strength > 5) {
                        commentaryB.innerText = `${playerOff.name} lost ${commentaryContainer[0].damage[0]} lifepoints!`;
                        playerOff.lifePoints = playerOff.lifePoints - commentaryContainer[0].damage[0];
                    }
                    else {
                        commentaryB.innerText = `${playerOff.name} lost ${commentaryContainer[0].damage[1]} lifepoints!`;
                        playerOff.lifePoints = playerOff.lifePoints - commentaryContainer[0].damage[1];
                    }
                }
                else {
                    commentaryB.innerText = `${playerOff.name} lost ${commentaryContainer[0].damage} lifepoints!`;
                    playerOff.lifePoints = playerOff.lifePoints - commentaryContainer[0].damage;
                }
            }
            if (playerUp.powerUp.length < 3) {
                playerUp.powerUp.push('correct');
            }
    }
        else {
            commentaryA.innerText = `${playerUp.name}'s ${placeHolder[i]} FAILED! Better Luck next time..`;
            commentaryB.innerText = `${playerOff.name} laughs at your incompetence!`;
            playerUp.powerUp = [];
        }
        commentaryContainer = [];
        console.log('TurnOver ' + turnCounter)
        j = 0;
        i = 0;
        difficulty = 'easy';
        console.log(event.path[0]);
        for (let answers of answer) {
            if (answers.classList.contains('correct')) {
                answers.classList.toggle('correct');
            }
        }
    for (let atk of atkRef) {
        if (atk.classList.contains('power')) {
            atk.classList.toggle('power');
        }
    }
        console.log('yikes');
        allAnswersPOS = [];
        success = false;
        rolls = [];
        rollAmt = 0;
        question.classList.toggle('collapse');
        for (let button of answer) {
            button.classList.toggle('collapse');
        }
    if (fountain === true && playerUp === woodsman) {
        woodsman.lifePoints += 5; 
    }
        setTimeout(() => {
            commentaryA.classList.toggle('collapse');
            commentaryB.classList.toggle('collapse');
            playerUp.turn()
        }, 3000);
    }
