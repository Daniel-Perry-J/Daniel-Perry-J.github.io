
let statNames = ["highscore", "totalscore", "multiplier", "unlocks", "upgrades", "wave", "level", "prestige", "defeats", "enemiesDefeated", "BossesDefeated", "totalStardust", "totalTimeSpent", "totalDistance"];
let stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let statMap = new Map();

let expires = 100;

function loadStats() {
    let i = 0;
    statNames.forEach((sname) => {
        stats[i] = (Number(getCookie(sname)) != NAN ? Number(getCookie(sname)) : 0);
        statMap.set(sname, stats[i]);
        i++;
    });
}

function updateStat(sname) {
    let index = statNames.indexOf(sname);
    if (index != -1) {
        setCookie(sname, stats[index], expires);
    } else {
        console.error(sname + " is not a Valid stat name!");
    }
}

function updateStats() {
    let i = 0;
    statNames.forEach((sname) => setCookie(sname, stats[i++], expires));
}

function debugStats() {
    for (let [key, value] of myMap) {
        console.log(`${key}: ${value}`);
    }
}
