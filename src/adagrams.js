
const POOL_OF_LETTERS = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12,
  'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1,
  'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8,
  'P': 2, 'Q': 1, 'R': 6, 'S': 4, 'T': 6,
  'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
};

export const computeCumulativeWeights = (letterPool) => {
  const cumulativeWeightsDict = {};
  let totalWeight = 0;

  for (const [letter, weight] of Object.entries(letterPool)) {
    totalWeight += weight;
    cumulativeWeightsDict[letter] = totalWeight;
  }
  return [cumulativeWeightsDict, totalWeight];
};


export const drawRandomNums = (maxNum) => {
  const randomNums = new Set();

  while (randomNums.size !== 10){
    const randomNum = Math.floor(Math.random() * maxNum);
    randomNums.add(randomNum)
  };
  return Array.from(randomNums);
};


export const drawLetters = () => {
  const result = computeCumulativeWeights(POOL_OF_LETTERS);
  const cumulativeWeightsDict = result[0];
  const totalWeight = result[1];

  let selectedLetters = [];
  let randomNums = [];

  randomNums = drawRandomNums(totalWeight);

  for (const num of randomNums) {
    for (const [letter, weight] of Object.entries(cumulativeWeightsDict)) {
      if (num <= weight) {
        selectedLetters.push(letter);
        break;
      }
    }
  }
  return selectedLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  for (let char of input) {
    if (!(char >= 'A' && char <= 'Z') && !(char >= 'a' && char <= 'z')) {
      return false;
    }
  }
  input = input.toUpperCase();

  const letterCounts = {};

  for (const letter of lettersInHand) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  for (const letter of input) {
    if ((letterCounts[letter] || 0) >= 1) {
      letterCounts[letter] = (letterCounts[letter] || 0) - 1;
    } else {
      return false;
    }
  }
  return true;

};

export const scoreWord = (word) => {
  
  let score = 0
  const scoreChart = { 
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 
    'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  };

  word = word.toUpperCase();

  for (const letter of word) {
    score += scoreChart[letter];
  }

  if (word.length > 6) {
    score += 8;
  }

  return score;
};


export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let highestScoreWord = "";

  for (const currentWord of words) {
    const currentScore = scoreWord(currentWord);

    if (currentScore > highestScore) {
      highestScore = currentScore;
      highestScoreWord = currentWord;
    } else if (currentScore === highestScore) {
      const highestLen = highestScoreWord.length;
      const currentLen = currentWord.length;

      const highestIsTen = (highestLen === 10);
      const currentIsTen = (currentLen === 10);

      if (!highestIsTen && !currentIsTen) {
        if (highestLen > currentLen) {
          highestScoreWord = currentWord;
        }
      } else if (!highestIsTen && currentIsTen) {
        highestScoreWord = currentWord;
      }
    }
  }

  return { word: highestScoreWord, score: highestScore };
};
