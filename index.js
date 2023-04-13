//Generates Random Number
const generateRandom = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

//Total number of mines to be planted
const minesCount = 10

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

