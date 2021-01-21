function generateMap() {
    let mapName;

    switch (randomInt(1, 4)) {
        case 1: // Island in ocean
            mapName = "Island in Ocean";
            island(mapName);
            break;
        case 2: // City
            mapName = "Cityscape";
            city(mapName);
            break;
        case 3: // Floating Island
            mapName = "Floating Island";
            floatingIsland(mapName);
    }

    return mapName;
}

function island() {
    turn.scenario.push({
        name: "Flood",
        description: "A wild flood comes down!",
        function: 'for (let i = 0; i < players.length; i++) { if (randomInt(0, 10) > 5) { let dam = 10; players[i].hp -= dam; text = `<li>A Storm deals ${dam} to ${players[i].name}</li>`; logEl.innerHTML += text; log2El.innerHTML += text;}}',
        last: 3
    }, {
        name: "Warm Sunlight!",
        description: "Warmsunlight makes you stronger!",
        function: 'let dam = 1000; damage += dam; text = `<li>The warm sunlight gives the warrior + ${dam} damage!</li>`; logEl.innerHTML += text; log2El.innerHTML += text;',
        last: 3
    }, {
        name: "Prickly Jungle!",
        description: "The jungle is so full of stuff...",
        function: 'for (let i = 0; i < players.length; i++) { if (randomInt(0, 3) == 1) { let dam = randomInt(0, 10); players[i].hp -= dam; text = `<li>${players[i].name} is dealt ${dam} by stumbling in the overgrown jungle! All damage equals 1.</li>`; logEl.innerHTML += text; log2El.innerHTML += text;} damage = 1; }',
        last: 3
    }, {
        name: "Poisonious Frogs!",
        description: "Deadly animals that can kill you!",
        function: '    for (let i = 0; i < players.length; i++) { if (randomInt(1, 8) == 1) { players[i].hp = 0; text = `<li>${players[i].name} is stunned by a deadly animal!</li>`; logEl.innerHTML += text; log2El.innerHTML += text; } }',
        last: 3
    });
}

function city() {
    turn.scenario.push({
        name: "Skyscraper Hiding",
        description: "Hiding in a tower!",
        function: "let dam = randomInt(1, 20); shield = 0; damage += dam; text = `<li>Hiding in a tower, ${players[attacker].name} sneak attacks ${players[defender].name}! Any defense is pierced and the attacker gains +${dam} damage!</li>`; logEl.innerHTML += text; log2El.innerHTML += text;",
        last: 1
    }, {
        name: "Scavange Car",
        description: "Scavange a car!",
        function: "for (let i = 0; i < players.length; i++) { let hpGain = randomInt(5, 10); text = `<li>Scavanging a car, ${players[i].name} gains +${hpGain} hp!</li>`; logEl.innerHTML += text; log2El.innerHTML += text;}",
        last: 1
    }, {
        name: "Collapsing Tower",
        description: "A tower collapses!",
        function: 'text = `A tower collapses and hits `; if (randomInt(1, 10) < 5) { players[defender].hp = 0; text += `${players[defender].name}!`; } else { players[attacker].hp = 0; text += `${players[attacker].name}!`; } logEl.innerHTML += text; log2El.innerHTML += text;',
        last: 1
    }, {
        name: "Brainwashing machine!",
        description: "Government machine malfunctions!",
        function: 'for (let i = 0; i < players.length; i++) { if (randomInt(1, 5) < 2) { text = `<li>${players[i].name} got brainwashed by a broken government machine! They went from ${players[i].type.personality} to `; players[i].type.personality = "Brain Dead"; players[i].type.bonus = "shield += 5"; players[i].type.applied = "offense"; text += `being Brain Dead!</li>`; document.getElementById(`personality${players[i].tribute}`).innerHTML = "Brain Dead"; logEl.innerHTML += text; log2El.innerHTML += text; } }'
    });
}

function floatingIsland() {
    turn.scenario.push({
        name: "Fall",
        description: "Fall of the side!",
        function: "for (let i = 0; i < players.length; i++) { if (randomInt(0, 10) < 5) { players[i].hp = 1; text = `<li>The shifting island causes ${players[i].name} to fall and is down to 1 HP.</li>`; document.getElementById('health' + players[i].tribute).innerHTML = `Hp: ${players[i].hp}`; logEl.innerHTML += text; log2El.innerHTML += text; } }",
        last: 1
    }, {
        name: "Dragon attack!",
        description: "a flying dragon decides to attack!",
        function: "let attacks = randomInt(1, 10); do { let random = randomInt(0, players.length); players[random].hp -= 10; attacks -= 1; text += `<li>${players[random].name} is attacked by the dragon!</li>`; } while (attacks > 0); logEl.innerHTML += text; log2El.innerHTML += text;",
        last: 2
    }, {
        name: "HEAVY WIND!",
        description: "Heavy windows blows the players!",
        function: "text = `<li>Heavy wind blows and blows away `; if (players[attacker].hp < 10) { players[attacker].hp = 0; text += `${players[attacker].name}!`; } else { players[defender].hp = 0; text += `${players[defender].name}!`; } logEl.innerHTML += text; log2El.innerHTML += text;",
        last: 2
    }, {
        name: "HEAVENLY BLSS!",
        description: "The sky fills players with bliss!",
        function: "let dam = 0; if (randomInt(1, 10) > 5) { dam = 100; } else { dam = 10; } damage += dam; text = `${players[attacker].name} gains +${dam} damage due to heavenly bliss!`; logEl.innerHTML += text; log2El.innerHTML += text;",
        last: 3
    });
}