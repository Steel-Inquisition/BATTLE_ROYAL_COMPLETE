// Library of Random Functions

// return a random decimal between low (inclusive) and high (exclusive)
function randomDec(low, high) {
    return Math.random() * (high - low) + low;
}
// return a random interger between low (inclusive) and high (exclusive)
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// return a random rgb string
function randomRGB() {
    let r = randomInt(0, 256);
    let g = randomInt(0, 256);
    let b = randomInt(0, 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// return a random array element
function randomElement(grades) {
    return grades[randomInt(0, grades.length)];
}

// Return random health
function randomHealth() {
    return randomInt(20, 30);
}

// Return random type of personality
function randomType() {
    let array = [
        { personality: "Brawny", bonus: "if (players[attacker].wep.type == 'physical'){temp += 5}", applied: 'offense' }, // if attacker's weapon is physical, damage + 5,
        { personality: "Vampire", bonus: "if (players[attacker].wep.type == 'magic'){temp += 5}", applied: 'offense' }, // if attacker's weapon is physical, damage + 5,
        { personality: "Clown", bonus: "if (players[attacker].hp <= 10){temp += 8}", applied: '' }, // If attacker is bellow ten hp, damage + 8
        { personality: "Smart", bonus: "if (players[defender].type.personality == 'Dumb'){temp += 15}", applied: 'offense' }, // if defender personality is dumb, damage + 15
        { personality: "Dumb", bonus: "if (players[attacker].hp >= '10'){temp += 5}", applied: 'offense' }, // if attacker is above ten HP, damage + 5
        { personality: "Saiyan", bonus: "if (randomInt(1, 10) > 5){temp += 5}", applied: 'offense' }, // If random number from 1-10 above 5, + 5 damage.
        { personality: "Paladin", bonus: "if (players[defender].hp < 10){temp -= 5}", applied: 'defence' }, // if defender bellow ten hp, + 5 shield
        { personality: "Ailen", bonus: "if (players[defender].hp > 20){temp -= 3}", applied: 'defence' }, // if defender above 20 HP, shield + 3
        { personality: "Slave", bonus: "if (players[attacker].type.personality == 'Clown'){temp += 15}", applied: 'offense' }, // If attacker personality is clown, + 15 damage
        { personality: "Military", bonus: "if (players[attacker].wep.weapon == 'ranged'){temp += 5}", applied: 'offense' }, // if weapon is ranged, + 5 damage
        { personality: "Brain Dead", bonus: "if (randomInt(0, 10) < 5){temp -= 10}", applied: 'offense' }, // if a number between 1 and 10 bellow 5, opponet shield += 10
    ]

    let random = randomInt(0, array.length);
    return array[random];
}

// Return random type of weapon
function randomWeapon() {
    let array = [
        { weapon: "Sword", type: "physical", ability: "randomInt(4, 12)", deathNote: "was sliced in half by a sword!" },
        { weapon: "Shovel", type: "physical", ability:"randomInt(3, 10)", deathNote: "got dugged by a shovel!" },
        { weapon: "Pistol", type: "ranged", ability: "randomInt(7, 20)", deathNote: "was shot by a pistol!" },
        { weapon: "Knife", type: "physical", ability: "randomInt(6, 9)", deathNote: "was stabbed in the throat!" },
        { weapon: "Shotgun", type: "ranged", ability: "randomInt(4, 12)", deathNote: "was blasted to rubble!" },
        { weapon: "Spear", type: "ranged", ability: "randomInt(1, 20) + randomInt(1, 10)", deathNote: "got pierced by a spear!" },
        { weapon: "Molotov", type: "ranged", ability: "randomInt(4, 7) + randomInt(4, 7)", deathNote: "screamed as fire from a broken molotov seared thy skin." },
        { weapon: "Machine Gun", type: "ranged", ability: "randomInt(4, 5) + randomInt(6, 7) + randomInt(7, 8)", deathNote: "was ripped apart by bullets!" },
        { weapon: "Frying Pan", type: "magic", ability: "randomInt(10, 12)", deathNote: "was fried by a frying pan!" },
        { weapon: "Blood Magic", type: "magic", ability: "randomInt(0, 22)", deathNote: "was destroyed inside-out by inner blood turmoil!" },
        { weapon: "Laser Sword", type: "magic", ability: "randomInt(11, 13)", deathNote: "was cut in half by pure plasma!" },
        { weapon: "Grenade", type: "ranged", ability: "10", deathNote: "was blew up by a grenade!" },
        { weapon: "Shield", type: "physical", ability: "randomInt(7, 10) - 5", deathNote: "neck broke by getting bashed by a shield!" },
       { weapon: "Rocket Launcher", type: "physical", ability: "randomInt(20, 50) - 30", deathNote: "torn apart by a missle!" },
        { weapon: "Holy Cross", type: "magic", ability: "randomInt(1, 12) + 10", deathNote: "was smited by a holy might!" },
        { weapon: "Railgun", type: "ranged", ability: "randomInt(1, 100) - 40", deathNote: "was fried by a plasma beam!" }
    ];

    let random = randomInt(0, array.length);
    return array[random];
}

// Return random name number
function randomName() {
    return randomInt(0, 200);
}

// Return random face number
function randomFace() {
    let faces = []
    for (let i = 0; i < 64; i++) {
        faces.push(i);
    }
    return faces;
}

// Return random monster face number (optional)
function randomMFace() {
    let faces = []
    for (let i = 0; i < 3; i++) {
        faces.push(i);
    }
    return faces;
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("keydown", keydownHandlerLib);
document.addEventListener("keyup", keyupHandlerLib);

// Get the modal
let modal = document.getElementById("myModal");
let modal2 = document.getElementById("myModal2");
let keyIsDown = {};

// If key is pressed, oprn up menu
function keydownHandlerLib(event) {

    if (event.keyCode == 49) {
        keyIsDown[event.keyCode] = true;
        modal.style.display = "block";
    }

    if (event.keyCode == 50) {
        keyIsDown[event.keyCode] = true;
        modal2.style.display = "block";
    }

}

// If key is not pressed, close menu
function keyupHandlerLib(event) {
    keyIsDown[event.keyCode] = false;
    modal.style.display = "none";
    modal2.style.display = "none";
}