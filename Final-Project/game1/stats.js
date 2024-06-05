
let statNames = ["highscore", "totalscore", "multiplier", "unlocks", "upgrades", "wave", "level", "prestige", "defeats", "enemiesDefeated", "BossesDefeated", "totalStardust", "totalTimeSpent", "totalDistance"];
let stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let statMap = new Map();

function loadStats() {
    let i = 0;
    statNames.forEach((sname) => {
        stats[i] = getCookie(sname);
        statMap.set(sname, stats[i]);
        i++;
    });
}

function updateStats() {
    let i = 0;
    statNames.forEach((sname) => setCookie(sname, stats[i++], 100));
}

function debugStats() {
    for (let [key, value] of myMap) {
        console.log(`${key}: ${value}`);
    }
}
