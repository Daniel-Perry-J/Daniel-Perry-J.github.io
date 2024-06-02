// Set the base in game prices of various items

// upgrades
const baseDamage = 10;
const baseHealth = 25;
const baseShield = 125;
const baseSpeed = 500;
const baseCooldown = 1000;
const baseImproveMultiplier = 1250;

// boosts
const freeRevive = 1000;
const extraMultiplier = 250;
const doubleDamage = 500;
const doubleStarDust = 250;
const headStart = 50;

// items
const bomb = 25;
const freeze = 125;
const luckyCharm = 500;
const timewarp = 100;
const nuke = 2500;

// Objects
// Upgrades
let damageUpgrade;
let healthUpgrade;
let shieldUpgrade;
let speedUpgrade;
let cooldownUpgrade;
let multiplierUpgrade;

// Boosts
let freeReviveBoost;
let extraMultiplierBoost;
let doubleDamageBoost;
let doubleStarDustBoost;
let headStartBoost;

// Items
let bombItem;
let freezeItem;
let luckyCharmItem;
let timewarpItem;
let nukeItem;

function initializeMarket() {
    // Upgrades
    damageUpgrade = new Upgrade(baseDamage);
    healthUpgrade = new Upgrade(baseHealth);
    shieldUpgrade = new Upgrade(baseShield);
    speedUpgrade = new Upgrade(baseSpeed);
    cooldownUpgrade = new Upgrade(baseCooldown);
    multiplierUpgrade = new Upgrade(baseImproveMultiplier);

    // Boosts
    freeReviveBoost = new Boost(freeRevive, 3);
    extraMultiplierBoost = new Boost(extraMultiplier, 100);
    doubleDamageBoost = new Boost(doubleDamage, 5);
    doubleStarDustBoost = new Boost(doubleStarDust, 100);
    headStartBoost = new Boost(headStart, 20);

    // Items
    bombItem = new Item(bomb);
    freezeItem = new Item(freeze);
    luckyCharmItem = new Item(luckyCharm);
    timewarpItem = new Item(timewarp);
    nukeItem = new Item(nuke);
}

// Contains logic to set prices on various items
class ShopItem {
    constructor(basePrice) {
        this.basePrice = basePrice;
        this.unitsSold = 0;
    }

    get price() {
        return this.basePrice;
    }

    sell() {
        this.unitsSold++;
    }
}

class Item extends ShopItem {
    // Powerups have fixed prices
    constructor(basePrice) {
        super(basePrice);
    }
}

class Upgrade extends ShopItem {
    constructor(basePrice) {
        super(basePrice);
        this.markupFactor = 1.05; // Exponential growth factor for price
    }

    get price() {
        // Price scales exponentially with each unit sold
        return this.basePrice * Math.pow(this.markupFactor, this.unitsSold);
    }
}

class Boost extends ShopItem {
    constructor(basePrice, maxUnits) {
        super(basePrice);
        this.maxUnits = maxUnits;
    }

    get price() {
        // Price increases based on the number of units sold
        const priceIncrease = (this.unitsSold / this.maxUnits) * this.basePrice;
        return this.basePrice + priceIncrease;
    }
}

// Random sales that reduce prices
function applyRandomSale(shopItem) {
    const salePercentage = Math.random()/5; // 0% to 20% sale
    shopItem.basePrice *= (1 - salePercentage);
}

// Usage of another currency at a certain point
class CurrencyAdjustedItem extends ShopItem {
    constructor(basePrice, threshold, secondaryCurrencyPrice) {
        super(basePrice);
        this.threshold = threshold;
        this.secondaryCurrencyPrice = secondaryCurrencyPrice;
    }

    get price() {
        if (this.unitsSold >= this.threshold) {
            return {
                primary: this.basePrice,
                secondary: this.secondaryCurrencyPrice
            };
        }
        return this.basePrice;
    }
}

// Example usage:
// const powerup = new Item(100); // Fixed price
// const upgrade = new Upgrade(200); // Price scales exponentially
// const boost = new Boost(50, 100); // Price increases with each unit sold, up to 100 units
// const specialItem = new CurrencyAdjustedItem(300, 10, 50); // After 10 units sold, requires secondary currency

// // Apply a random sale to an item
// applyRandomSale(powerup);

// // Sell some items
// powerup.sell();
// upgrade.sell();
// boost.sell();
// specialItem.sell();

// console.log(powerup.price); // Outputs price after sale
// console.log(upgrade.price); // Outputs exponentially scaled price
// console.log(boost.price); // Outputs price based on units sold
// console.log(specialItem.price); // Outputs price in primary or both currencies
