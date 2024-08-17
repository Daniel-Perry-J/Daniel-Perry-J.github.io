
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

function updateStats() {
    for(let i = 0; i < stats.length; i++) {
        switch (i) {
            case 0:
                stats[0] = getHighScore();
                break;
            case 1:
                stats[1] += score;
                break;
            case 2:
                stats[2] = multiplier;
                break;
            case 3:
                stats[3] = 0;
                break;
            case 4:
                stats[4] = 0;
                break;
            case 5:
                stats[5] = Math.max(wave, stats[5]);
                break;
            case 6:
                stats[6] = 0//Math.max(level, stats[6]);
                break;
            case 7:
                stats[7] = 0;
                break;
            case 8:
                stats[8] += 1;
                break;
            case 9:
                stats[9] += enemiesDefeated;
                break;
            case 10:
                stats[10] = 0;
                break;
            case 11:
                stats[11] += stardust;
                break;
            case 12:
                stats[12] += time;
                break;
            case 13:
                stats[13] += time * 100;
                break;
            default:
                console.log("Error : Out of bounds!");
                break;
        }
    }
}

function saveStats() {
    updateStats();
    let i = 0;
    statNames.forEach((sname) => setCookie(sname, stats[i++], expires));
}

function debugStats() {
    for (let [key, value] of myMap) {
        console.log(`${key}: ${value}`);
    }
}
