//Generates Random Number
const generateRandom = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

//Total number of mines to be planted
const minesCount = 10
//Range of Attack
const range = 2;
let playground = new Array(minesCount).fill('')
    .map(a => new Array(minesCount).fill(' '));
console.table(playground)

//All filled indices in the playground
const filledIndices = [];

const plantBombs=()=>{
    for (let i = 0; i < minesCount; i++) {
        let pickedIndex = generateRandom(0, minesCount * minesCount);
        let foundIndex = filledIndices.findIndex(ind => pickedIndex === ind)
        //Check if the picked index is filled before.
        if (foundIndex !== -1) i--;
        else {
            filledIndices.push(pickedIndex);
            let j = Math.floor(pickedIndex / minesCount)
            let k = pickedIndex % minesCount;
            playground[j][k] = 'B'
        }
    
    }
    console.table(playground)
}
plantBombs();

const actions = [];
let totalDefusedBombsCount = 0;
let attacksCount = 0;

const attack = () => {
    const attackIndex = generateRandom(0, minesCount * minesCount);
    let foundIndex = filledIndices.findIndex(ind => attackIndex === ind)
    //If the index is filled before, retry
    if (foundIndex !== -1) return attack();

    //Export 2D indices from 1D index
    let j = Math.floor(attackIndex / minesCount)
    let k = attackIndex % minesCount;
    //Flag the index as Attacked.
    playground[j][k] = 'A'

    //Find surrounding objects of the attacked index.
    for (let counter1 = j - range; counter1 <= j + range; counter1++) {
        for (let counter2 = k - range; counter2 <= k + range; counter2++) {
            if (counter1 >= 0 && counter2 >= 0 && counter1 < playground.length && counter2 < playground[counter1].length) {

                //If there is a bomb, defuse it.
                if (playground[counter1][counter2] === 'B') {
                    playground[counter1][counter2] = 'X'
                    totalDefusedBombsCount++;
                }
                //If there is nothing in the index, flag it as discovered.
                else if (playground[counter1][counter2] === ' ')
                    playground[counter1][counter2] = '#'

                filledIndices.push((counter1*minesCount)+counter2);

            }
        }
    }
    attacksCount++;
    const action = { attack: attacksCount, location: [j, k], bombs: totalDefusedBombsCount };

    actions.push(action)
    console.log(">> Step Attack",action.attack,":",action.location)
    console.table(playground);
    console.log(actions);
}
while (totalDefusedBombsCount < minesCount) {
    attack();
}
