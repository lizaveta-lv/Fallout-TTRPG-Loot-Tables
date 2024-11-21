//CONST
const generateBtn = document.getElementById("generateBtn");
const generateClear = document.getElementById("generateClear")
const generatedList = ""
let loadedDB;



//=========== UTILITY ===========
  function loadJSONData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "db.json", false); // false makes the request synchronous
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                loadedDB = JSON.parse(xhr.responseText); // Parse the JSON data
                console.log("Loaded JSON Data:", loadedDB); // Verify the loaded data
            } catch (error) {
                console.error("Error parsing JSON data:", error);
            }
        } else if (xhr.readyState === 4) {
            console.error("Failed to load JSON data. Status:", xhr.status);
        }
    };
    xhr.send();
}
  
  function rollDice(diceExpression) {
    const regex = /(\d+)d(\d+)(?:\s*x\s*(\d+))?/i;
    const match = diceExpression.match(regex);

    if (!match) throw new Error("Invalid dice expression: " + diceExpression);

    const [, numDice, sides, multiplier] = match.map(Number);
    let total = 0;

    for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }

    return total * (multiplier || 1);
}
  
//todo: refractor init roll
  generateBtn.addEventListener("click", function() {
    let initLuckRoll = document.getElementById("initLuckRoll").value.trim();
    generateLoot(initLuckRoll);
  });

  generateClear.addEventListener("click", function(){
    clearLoot();
  });
//======== TOTAL SECTION ==========
  function generateLoot(luckRoll){
    if (luckRoll === ""){
        console.log("No number inputed", luckRoll)
        return;
    }

    if(luckRoll <= 2){
        console.log("You find NO LOOT")
    }else if (luckRoll >= 3 && luckRoll <= 4){
        toggleVisibility("secCaps", 1) //caps
        toggleVisibility("secJunk", 1) //junk

    }else if (luckRoll >= 5 && luckRoll <= 9){
        toggleVisibility("secCaps", 1) //caps
        toggleVisibility("secJunk", 1) //junk
        toggleVisibility("secFood", 1) //food
        toggleVisibility("secDrinks", 1) //drinks
        toggleVisibility("secMinChems", 1) //chems
        toggleVisibility("secAmmo", 1) //ammo

    }else if (luckRoll >= 10 && luckRoll <= 16){
        toggleVisibility("secCaps", 1) //caps
        toggleVisibility("secJunk", 1) //junk
        toggleVisibility("secFood", 1) //food
        toggleVisibility("secDrinks", 1) //drinks
        toggleVisibility("secMinChems", 1) //chems
        toggleVisibility("secAmmo", 1) //ammo
        toggleVisibility("secWeapons", 1) //weapons
        toggleVisibility("secExplosives", 1)//explosives (no table exists)

    }else if (luckRoll >= 17 ){
        //find caps, junk, food, drinks, chems, meds, ammo, Ranged Weapons, Melee Weapons, explosives, armour, skill magazine
        toggleVisibility("secCaps", 1) //caps
        toggleVisibility("secJunk", 1) //junk
        toggleVisibility("secFood", 1) //food
        toggleVisibility("secDrinks", 1) //drinks
        toggleVisibility("secMinChems", 1) //chems
        toggleVisibility("secAmmo", 1) //ammo
        toggleVisibility("secWeapons", 1) //weapons
        toggleVisibility("secExplosives", 1)//explosives (no table exists)
        toggleVisibility("secArmor", 1)//armor (no table exist)
        toggleVisibility("secMagazine", 1) //magazines
    }

    
        
        

  }

//========== SECTIONS ========
// Caps
  function getCapsResult(){
    let result = getCaps()
    document.getElementById("capsResult").textContent  = result + " caps"
  }

  function getCaps(){
    roll = document.getElementById("capsLuckRoll").value;
   
    for (const item of loadedDB.lootTable.Caps) {
        if (roll >= item.minRoll && roll <= item.maxRoll) {
            return rollDice(item.dice);
        }
    }

  }

// Junk
//TODO: add junk table fully, handle choice
  function getJunkResult(){
    let result = getJunk()
    document.getElementById("junkResult").textContent  = result 
  }
  function getJunk(){
    roll = document.getElementById("junkLuckRoll").value;

    for (const item of loadedDB.lootTable.Junk) {
      if (roll >= item.minRoll && roll <= item.maxRoll) {
          if (item.choice) {
              
              return handleChoice(item.choice);
          } else if (item.dice) {
              return rollDice(item.dice) + " (grade " + item.grade + ") junk";
          } else {
              return "No valid loot result";
          }
        }
      }
  }
// Food
function getFoodResult(){
  let result = getFood()
  document.getElementById("foodResult").textContent  = result
}
function getFood(){
  roll = document.getElementById("foodLuckRoll").value;
  for(const item of loadedDB.lootTable.Food) {
    if (roll == item.roll) {
      return item.name
    }
  }
}
//Drinks
function getDrinksResult(){
  let result = getDrinks()
  document.getElementById("drinksResult").textContent  = result
}
function getDrinks(){
  roll = document.getElementById("drinksLuckRoll").value;

  for (const item of loadedDB.lootTable.Drinks) {
    if (roll >= item.minRoll && roll <= item.maxRoll) {
        if (item.choice) {
            
            return handleChoice(item.choice);
        } else if (item.name) {
            return item.name;
        } else {
            return "No valid loot result";
        }
      }
    }
}
//Chems
function getChemsResult(){
  let result = getChems()
  document.getElementById("chemsResult").textContent  = result
}
function getChems(){
  roll = document.getElementById("chemsLuckRoll").value;
  for (const item of loadedDB.lootTable.Minor_Chems) {
    if (roll >= item.minRoll && roll <= item.maxRoll) {
        if (item.choice) {
            
            return handleChoice(item.choice);
        } else if (item.name) {
            return item.name;
        } else {
            return "No valid loot result";
        }
      }
    }
}
//Ammo
function getAmmoResults(){
  let result = getAmmo()
  document.getElementById("ammoResult").textContent  = result
}
function getAmmo(){
  roll = document.getElementById("ammoLuckRoll").value;
  for (const item of loadedDB.lootTable.Ammo) {
    if (roll >= item.minRoll && roll <= item.maxRoll) {
        if (item.choice) {
            
            return handleChoice(item.choice);
        } else if (item.name) {
            return "x" + rollDice(item.dice) + " " + item.name;
        } else {
            return "No valid loot result";
        }
      }
    }
}
//Weapon
function getWeaponResult(){
  let result = getWeapon()
  document.getElementById("weaponsResult").textContent  = result
}
function getWeapon(){
  roll = document.getElementById("weaponsLuckRoll").value;
  for (const item of loadedDB.lootTable.Weapons) {
    if (roll >= item.minRoll && roll <= item.maxRoll) {
        if (item.choice) {
            
            return handleChoice(item.choice);
        } else if (item.name) {
            return item.name;
        } else {
            return "No valid loot result";
        }
      }
    }
}

//========= UI =========
  function clearLoot(){
    document.getElementById("initLuckRoll").value = ""

    toggleVisibility("secCaps", 0) //caps
    toggleVisibility("secJunk", 0) //junk
    toggleVisibility("secFood", 0) //food
    toggleVisibility("secDrinks", 0) //drinks
    toggleVisibility("secMinChems", 0) //chems
    toggleVisibility("secAmmo", 0) //ammo
    toggleVisibility("secWeapons", 0) //weapons
    toggleVisibility("secExplosives", 0)//explosives (no table exists)
    toggleVisibility("secArmor", 0)//armor (no table exist)
    toggleVisibility("secMagazine", 0) //magazines
  }
  function clearSection(roll){

    document.getElementById(roll).value = ""
    
  }
function toggleVisibility(elementId, action) {
  const element = document.getElementById(elementId);
  
  if (action === 0) {
    element.classList.add("hidden");
  } else if (action === 1) {
    element.classList.remove("hidden");
  }
}
//========= MAIN ============
function main() {
    loadJSONData();
  }

main();
