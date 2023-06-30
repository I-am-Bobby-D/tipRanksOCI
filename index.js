const tipranksApi = require('tipranks-api-v2');
const readline = require('readline');



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tickersArray = [];

function getUserInput() {
  rl.question('Enter a value (or "done" to finish): ', userInput => {
    if (userInput === 'done') {
      rl.close();
    } else {
      tickersArray.push(userInput);
      getUserInput();
    }
  });
}

rl.on('close', () => {
    console.log(tickersArray);
    getTickrs(); // Call the function after the readline interface is closed
});

getUserInput();

async function getTickrs() {
  try {
    for (const tickr of tickersArray) {
      const result = await tipranksApi.getPriceTargets(tickr);
      const result1 = await tipranksApi.getNewsSentimentData(tickr);
      console.log(result, result1);
    }
  } catch (error) {
    console.error(error);
  }
}

//getTickrs(tickersArray);