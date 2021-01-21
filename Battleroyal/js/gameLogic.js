// Activate combat one times
function combat() {
    attack();
}

// Activate combat five times
function fiveCombat() {
    for (let i = 0; i < 5; i++) {
        attack();
    }
}

// Get attacker, defender, events, to get damage. Damage is boosted by events, classes, weapons, bonus, and subtracted by shield. Calculate if player is dead. If only one player is left, they win!
function attack() {

    // Get attacker and defender from list from players.length
    let attacker = randomInt(0, players.length);
    let defender = randomInt(0, players.length);
    let shield = 0;
    let text;
    turn.cause_of_death = "";
    let logEl = document.getElementById('log');
    let log2El = document.getElementById('log2');

    if (players.length > 1) {
        // Set up damage based on attackers weapon and deal that damage to defender
        let damage = eval(players[attacker].wep.ability);

        turnChange(logEl, log2El, text);
        damage += applyClass(damage, attacker, defender, shield);
        event = randomEvent(logEl, log2El, text, defender, attacker, damage);
        eval(event);
        damage = ifDamageZero(damage);
        calculateDamage(damage, defender, shield);
        attackStatus(defender, attacker, damage, logEl, log2El, text);
        playerIsDead(attacker, defender, text, logEl, log2El);

    } else {
        endGame(logEl);
    }

}

// Change the turn and round. One turn is the same as running the attack function once.
function turnChange(logEl, log2El, text) {
    // Set up Timer
    turn.round++;
    turn.storage++;

    // if turn > 5, change log
    if (turn.round > 10) {
        turn.round = 1;
        logEl.innerHTML = `<li id="log"><strong>Game Log!</strong></li>`;
    }

    // Change HTML to reflect change
    text = `<li><strong>Turn: ${turn.storage}</strong></li>`
    logEl.innerHTML += text;
    log2El.innerHTML += text;
}

// Change the damage dealt based on weapon class and type ability
function applyClass(damage, attacker, defender, shield) {
    // Add or subtract damage based on weapon type

    let temp = 0;

    switch (players[attacker].wep.type) {
        case "physical": // If defender has a physical weapon + 6 damage
            if (players[defender].wep.type == "ranged") {
                temp = -6;
            }
            break;
        case "ranged": // If attacker has a ranged weapon and opponet has ranged, -= 6 damage
            if (players[defender].wep.type == "ranged") {
                temp = -6;
            }
            break;
        case "magic": // If defender has ranged or physical + 3 dam, otherwise -5 dam
            if (players[defender].wep.type == "ranged") {
                temp = 3;
            } else if (players[defender].wep.type == "physical") {
                temp = 3;
            } else {
                temp = -5;
            }
            break;
        default:
            console.log("IMPOSSIBLE!");
    }

    // Based on type, add the ability
    if (players[attacker].type.applied == 'offense') {
        eval(players[attacker].type.bonus);
    }

    if (players[defender].type.applied == 'defence') {
        eval(players[defender].type.bonus);
    }

    return temp;
}

// Activate a random event that copuld change up the battle!
function randomEvent(logEl, log2El, text, defender, attacker, damage) {
    // RANDOM EVENT
    if (randomInt(0, 100) > 90) {
        let random = randomInt(0, turn.scenario.length);
        event = turn.scenario[random].function;
        console.log("BREAK THROUGH!");
        turn.cause_of_death = "event ";

        return event;
    }
}

function ifDamageZero(damage) {
    // If damage bellow 0, go to 0
    if (damage < 0) {
        return damage = 0;
    }
    return damage;
}

// Calcuate the damage donne from attacker to defender
function calculateDamage(damage, defender, shield) {
    // Deal Damage
    players[defender].hp -= damage;

    //Change HTML to reflect health change
    document.getElementById('health' + players[defender].tribute).innerHTML = `Hp: ${players[defender].hp}`;
}

// deal damage and check whose the one attacking and defending. Display HTML.
function attackStatus(defender, attacker, damage, logEl, log2El, text) {

    if (players[defender].hp <= 0) {
        turn.cause_of_death += "killed";
    }

    if (players[attacker].tribute != players[defender].tribute) {
        text = `<li>${players[attacker].name} attacks ${players[defender].name}, dealing ${damage} damage!</li>`;
        logEl.innerHTML += text;
        log2El.innerHTML += text;

    } else {
        text = `<li>${players[attacker].name} accidently hits themselves, dealing ${damage} damage!</li>`;
        logEl.innerHTML += text;
        log2El.innerHTML += text;

    }
}

// Check players array and see if they are dead or not
function playerIsDead(attacker, defender, text, logEl, log2El, eventSignal) {

    // REMOVE PLAYER IF DEAD
    for (let i = 0; i < players.length; i++) {

        if (players[i].hp <= 0) {

            causeOfDeath(attacker, defender, text, logEl, log2El, i);
            pushStatus(i);

        }

    }
}

// Return their exact cause of death!
function causeOfDeath(attacker, defender, text, logEl, log2El, i) {
    if (turn.cause_of_death == "killed") {
        text = `<li>${players[defender].name} ${players[attacker].wep.deathNote}</li>`;
        logEl.innerHTML += text;
        log2El.innerHTML += text;

        text = `|->${players[defender].name} is dead!`;
        logEl.innerHTML += text;
        log2El.innerHTML += text;
        turn.killedBy.push(players[i].name);

        players[attacker].kills += 1;
    } else if (turn.cause_of_death == "event ") {
        text = `<li>${players[i].name} is killed by the event!</li>`;
        logEl.innerHTML += text;
        log2El.innerHTML += text;
        turn.killedBy.push("EVENT");
    } else if (turn.cause_of_death == "event killed") {
        text = `<li>${players[i].name} is killed by ${players[attacker].name}, helped by the event!</li>`;
        logEl.innerHTML += text;
        log2El.innerHTML += text;
        turn.killedBy.push(`${players[i].name} and EVENT!`);

        players[attacker].kills += 1;
    }

}

// Push death tributes status into other arrays and then erase them by splicing!
function pushStatus(i) {
    document.getElementById(players[i].tribute).innerHTML = '';
    turn.position.push(players[i].name);
    turn.murders.push(players[i].kills);
    turn.turnsAlive.push(turn.storage);
    players.splice(i, 1);
}

// End Game: Display who wins, the tributes position, etc.
function endGame(logEl) {
    logEl.innerHTML = `<strong>The last survivor is: ${players[0].name}! This game lasted ${turn.storage} turns!</strong>`;

    turn.position.push(players[0].name);
    turn.murders.push(players[0].kills);
    turn.killedBy.push("N/A");
    turn.turnsAlive.push(turn.storage);

    for (let i = (turn.end) - 1; i > -1; i--) {
        logEl.innerHTML += `<li>Position: ${i}: Name: ${turn.position[i]} ||| Kills: ${turn.murders[i]} ||| Survived ${turn.turnsAlive[i]} turns! ||| Was killed by: ${turn.killedBy[i]}</li>`;
    }
}