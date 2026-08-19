import React from 'react';
import callBall from './images/call-ball.png';
import {
  chime1,
  chime2,
  chime3,
  chime4,
  chime5,
  chime6,
  chime7,
  chime8,
  chime9,
  chime10,
  chime11,
  chime12,
  pop1,
  pop2,
  pop3,
  pop4,
} from './chimes';

const SETTINGS_STORAGE_KEY = 'lpb-settings';

/**
 * Generates the needed bingo balls
 *
 * @var  {Object}
 */
export const generateBingoBoard = () => {
  let board = {};
  let letters = ["B", "I", "N", "G", "O"];
  let count = 1;
  letters.forEach(letter => {
    board[letter] = [];
    for (let i = 1; i <= 15; i++) {
      let obj = {
        letter: letter,
        color: getColor(letter),
        number: count,
        display: letter + count,
        called: false,
        active: false
      }
      board[letter].push(obj);
      count++;
    }
  })

  function getColor(letter) {
    switch (letter) {
      case "B":
        return 'c-f096be';
      case "I":
        return 'c-f9a13e';
      case "N":
        return 'c-8cc540';
      case "G":
        return 'c-85459a';
      case "O":
        return 'c-62ccef';
      default:
        return 'c-8cc540';
    }
  }
  return board;
}

/**
 * Generates a random number between 1-75
 *
 * @var  {Integer}
 */
export const getRandomBingoNumber = () => {
  return Math.floor(Math.random() * 75) + 1;
}

/**
 * Returns the list of available audible chimes
 *
 * @var  {Array}
 */
export const getChimeOptions = () => {
  return [
    { label: 'Chime 1', value: chime1 },
    { label: 'Chime 2', value: chime2 },
    { label: 'Chime 3', value: chime3 },
    { label: 'Chime 4', value: chime4 },
    { label: 'Chime 5', value: chime5 },
    { label: 'Chime 6', value: chime6 },
    { label: 'Chime 7', value: chime7 },
    { label: 'Chime 8', value: chime8 },
    { label: 'Chime 9', value: chime9 },
    { label: 'Chime 10', value: chime10 },
    { label: 'Chime 11', value: chime11 },
    { label: 'Chime 12', value: chime12 },
    { label: 'Pop 1', value: pop1 },
    { label: 'Pop 2', value: pop2 },
    { label: 'Pop 3', value: pop3 },
    { label: 'Pop 4', value: pop4 },
  ];
}

/**
 * Returns the default game settings
 *
 * @var  {Object}
 */
export const getDefaultSettings = () => {
  return {
    skipUnused: true,
    wildBingo: false,
    evensOdds: false,
    chime: false,
    selectedChime: getChimeOptions()[0],
    audibleShuffle: false,
  };
}

/**
 * Loads persisted game settings, merged over the defaults
 *
 * @var  {Object}
 */
export const loadSettings = () => {
  let saved = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY));
  return { ...getDefaultSettings(), ...(saved || {}) };
}

/**
 * Persists game settings
 *
 * @var  {Object}  settings
 */
export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Returns a list of preset patterns
 *
 * @var  {Object}
 */
export const getPresetPatterns = () => {
  return [
    {
      value: "Standard Bingo",
      label: "STANDARD BINGO",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [true, false, false, false, false],
        I: [true, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, false, false, false, false],
        O: [true, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [false, true, false, false, false],
        G: [false, true, false, false, false],
        O: [false, true, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, true, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, true, false, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, true, false],
        I: [false, false, false, true, false],
        N: [false, false, false, true, false],
        G: [false, false, false, true, false],
        O: [false, false, false, true, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, true, true, true, true],
      },
      {
        B: [false, false, false, false, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [false, false, false, false, true],
        O: [false, false, false, false, true],
      },
      {
        B: [true, false, false, false, false],
        I: [false, true, false, false, false],
        N: [false, false, true, false, false],
        G: [false, false, false, true, false],
        O: [false, false, false, false, true],
      },
      {
        B: [false, false, false, false, true],
        I: [false, false, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      },
      ],
    },
    {
      value: "6 Pack As Shown",
      label: "6 PACK AS SHOWN",
      unusedLetters: ["G", "O"],
      pattern: [{
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "6 Pack Anywhere",
      label: "6 PACK ANYWHERE",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, false, false],
        I: [true, true, true, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, true, false, false],
        N: [true, true, true, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, true, true],
        N: [false, false, false, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, true, false, false],
        G: [true, true, true, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, false, false],
        O: [true, true, true, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, true, true, false],
        G: [false, false, true, true, false],
        O: [false, false, true, true, false],
      },
      {
        B: [false, true, true, true, false],
        I: [false, true, true, true, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, true, true, false],
        N: [false, false, true, true, false],
        G: [false, false, true, true, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, true, true, true, false],
        N: [false, true, true, true, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, true, true, false],
        I: [false, false, true, true, false],
        N: [false, false, true, true, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, true, true, true, false],
        G: [false, true, true, true, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, true, true, false, false],
        G: [false, true, true, false, false],
        O: [false, true, true, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, true, true, true, false],
        O: [false, true, true, true, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, true, true, false, false],
        N: [false, true, true, false, false],
        G: [false, true, true, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, true, true, true],
        I: [false, false, true, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, true, true, false, false],
        I: [false, true, true, false, false],
        N: [false, true, true, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, true, true, true],
        N: [false, false, true, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, true, true, true],
        G: [false, false, true, true, true],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [true, true, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, true, true, true],
        O: [false, false, true, true, true],
      },
      {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      ],
    },
    {
      value: "8 Pack As Shown",
      label: "8 PACK AS SHOWN",
      unusedLetters: ["O"],
      pattern: [{
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "8 Pack Anywhere",
      label: "8 PACK ANYWHERE",
      unusedLetters: [],
      pattern: [{
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [true, true, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, true, true, true, true],
        G: [false, true, true, true, true],
        O: [false, false, false, false, false],
      }, {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, true, true, true, true],
        O: [false, true, true, true, true],
      },
      {
        B: [false, true, true, false, false],
        I: [false, true, true, false, false],
        N: [false, true, true, false, false],
        G: [false, true, true, false, false],
        O: [false, false, false, false, false],
      }, 
      {
        B: [false, false, false, false, false],
        I: [false, true, true, false, false],
        N: [false, true, true, false, false],
        G: [false, true, true, false, false],
        O: [false, true, true, false, false],
      }, 
      {
        B: [false, true, true, true, true],
        I: [false, true, true, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      }, 
      {
        B: [false, false, false, false, false],
        I: [false, true, true, true, true],
        N: [false, true, true, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, true, true, false],
        I: [false, false, true, true, false],
        N: [false, false, true, true, false],
        G: [false, false, true, true, false],
        O: [false, false, false, false, false],
      }, 
      {
        B: [false, false, false, false, false],
        I: [false, false, true, true, false],
        N: [false, false, true, true, false],
        G: [false, false, true, true, false],
        O: [false, false, true, true, false],
      }, 
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, true, true, false],
        G: [true, true, true, true, false],
        O: [false, false, false, false, false],
      }, 
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, true, false],
        O: [true, true, true, true, false],
      }, 
      {
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, false],
      }, 
      {
        B: [false, false, false, false, false],
        I: [false, false, false, true, true],
        N: [false, false, false, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true],
      }, 
      {
        B: [true, true, true, true, false],
        I: [true, true, true, true, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      }, 
      {
        B: [false, false, false, false, false],
        I: [true, true, true, true, false],
        N: [true, true, true, true, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      }, 
      ],
    },
    {
      value: "9 Pack As Shown",
      label: "9 PACK AS SHOWN",
      unusedLetters: ["B", "I"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, true, true, true],
        G: [false, false, true, true, true],
        O: [false, false, true, true, true],
      }],
    },
    {
      value: "9 Pack Anywhere",
      label: "9 PACK ANYWHERE",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, false, false],
        I: [true, true, true, false, false],
        N: [true, true, true, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, true, false, false],
        N: [true, true, true, false, false],
        G: [true, true, true, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, true, false, false],
        G: [true, true, true, false, false],
        O: [true, true, true, false, false],
      },
      {
        B: [false, true, true, true, false],
        I: [false, true, true, true, false],
        N: [false, true, true, true, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, true, true, true, false],
        N: [false, true, true, true, false],
        G: [false, true, true, true, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, true, true, true, false],
        G: [false, true, true, true, false],
        O: [false, true, true, true, false],
      },
      {
        B: [false, false, true, true, true],
        I: [false, false, true, true, true],
        N: [false, false, true, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, true, true, true],
        N: [false, false, true, true, true],
        G: [false, false, true, true, true],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, true, true, true],
        G: [false, false, true, true, true],
        O: [false, false, true, true, true],
      }
      ],
    },
    {
      value: "Add Subtract",
      label: "ADD & SUBTRACT",
      unusedLetters: ["B", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, true, false, false, true],
        N: [true, true, true, false, true],
        G: [false, true, false, false, true],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "Airplane",
      label: "AIRPLANE",
      unusedLetters: ["N"],
      pattern: [{
        B: [false, true, true, true, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [true, true, true, true, true],
        O: [false, false, true, false, false],
      }],
    },
    {
      value: "Anchor",
      label: "ANCHOR",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, true, true],
        I: [true, false, false, false, true],
        N: [true, true, true, true, true],
        G: [true, false, false, false, true],
        O: [false, false, false, true, true],
      }],
    },
    {
      value: "Arrowhead",
      label: "ARROWHEAD",
      unusedLetters: ["B", "I"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, true, false, false],
      }],
    },
    {
      value: "Blackout",
      label: "BLACKOUT",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "BO",
      label: "B AND O",
      unusedLetters: ["I", "N", "G"],
      pattern: [{
        B: [true, true, true, true, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "Bow Tie",
      label: "BOW TIE",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, true, true, true, true],
        I: [false, true, true, true, false],
        N: [false, false, true, false, false],
        G: [false, true, true, true, false],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "Brackets",
      label: "BRACKETS",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, true, false, true, true],
        I: [true, false, false, false, true],
        N: [false, false, false, false, false],
        G: [true, false, false, false, true],
        O: [true, true, false, true, true],
      }],
    },
    {
      value: "Broken Frame",
      label: "BROKEN FRAME",
      unusedLetters: ["I", "G"],
      pattern: [{
        B: [true, false, true, false, true],
        I: [false, false, false, false, false],
        N: [true, false, false, false, true],
        G: [false, false, false, false, false],
        O: [true, false, true, false, true],
      }],
    },
    {
      value: "Candlestick",
      label: "CANDLESTICK",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, false, false],
        I: [false, false, true, false, true],
        N: [true, true, true, true, true],
        G: [false, false, true, false, true],
        O: [true, true, true, false, false],
      }],
    },
    {
      value: "Cent Sign",
      label: "CENT SIGN",
      unusedLetters: ["B", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, true, true, true, false],
        N: [true, true, false, true, true],
        G: [false, true, false, true, false],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "Checkerboard",
      label: "CHECKERBOARD",
      unusedLetters: [],
      pattern: [{
        B: [true, false, true, false, true],
        I: [false, true, false, true, false],
        N: [true, false, true, false, true],
        G: [false, true, false, true, false],
        O: [true, false, true, false, true],
      }],
    },
    {
      value: "Clover",
      label: "CLOVER",
      unusedLetters: [],
      pattern: [{
        B: [false, true, true, true, false],
        I: [true, true, false, true, false],
        N: [true, false, true, true, true],
        G: [true, true, false, true, false],
        O: [false, true, true, true, false],
      }],
    },
    {
      value: "Clover Leaf",
      label: "CLOVER LEAF",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, true, false, true, true],
        I: [true, true, false, true, true],
        N: [false, false, false, false, false],
        G: [true, true, false, true, true],
        O: [true, true, false, true, true],
      }],
    },
    {
      value: "Champagne Glass",
      label: "CHAMPAGNE GLASS",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, false],
        I: [true, true, false, false, true],
        N: [true, true, true, true, true],
        G: [true, true, false, false, true],
        O: [true, false, false, false, false],
      }],
    },
    {
      value: "Checkmark",
      label: "CHECKMARK",
      unusedLetters: ["N"],
      pattern: [{
        B: [false, false, true, true, true],
        I: [false, false, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      }],
    },
    {
      value: "Coverall",
      label: "COVERALL",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "Crazy Arrow",
      label: "CRAZY ARROW",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, false, true],
        I: [false, false, false, true, false],
        N: [true, false, true, false, false],
        G: [true, true, false, false, false],
        O: [true, true, true, false, false],
      }],
    },
    {
      value: "Crazy Arrowhead",
      label: "CRAZY ARROWHEAD",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, true, false, false],
      }],
    },
    {
      value: "Crazy Kite",
      label: "CRAZY KITE",
      unusedLetters: ["N"],
      pattern: [{
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      }],
    },
    {
      value: "Crazy L",
      label: "CRAZY L",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, false, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [false, false, false, false, true],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "Crazy T",
      label: "CRAZY T",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      }],
    },
    {
      value: "Cross",
      label: "CROSS",
      unusedLetters: [],
      pattern: [{
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [true, true, true, true, true],
        G: [false, true, false, false, false],
        O: [false, true, false, false, false],
      }],
    },
    {
      value: "Diamond",
      label: "DIAMOND",
      unusedLetters: [],
      pattern: [{
        B: [false, false, true, false, false],
        I: [false, true, false, true, false],
        N: [true, false, false, false, true],
        G: [false, true, false, true, false],
        O: [false, false, true, false, false],
      }],
    },
    {
      value: "Diamond Filled",
      label: "DIAMOND FILLED",
      unusedLetters: [],
      pattern: [{
        B: [false, false, true, false, false],
        I: [false, true, true, true, false],
        N: [true, true, true, true, true],
        G: [false, true, true, true, false],
        O: [false, false, true, false, false],
      }],
    },
    {
      value: "Diamond Inside",
      label: "DIAMOND INSIDE",
      unusedLetters: ["B", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, false, true, false, false],
        N: [false, true, true, true, false],
        G: [false, false, true, false, false],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "Dog Bone",
      label: "DOG BONE",
      unusedLetters: ["N"],
      pattern: [{
        B: [false, true, true, true, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, true, true, true, false],
      }],
    },
    {
      value: "Double Bingo",
      label: "DOUBLE BINGO",
      unusedLetters: [],
      pattern: [
        {
        B: [false, false, true, false, false],
        I: [true, true, true, true, true],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      },
      {
        B: [false, false, false, false, true],
        I: [false, false, false, true, false],
        N: [true, true, true, true, true],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      },
      {
        B: [false, false, true, false, true],
        I: [false, false, true, false, true],
        N: [false, false, true, false, true],
        G: [false, false, true, false, true],
        O: [false, false, true, false, true],
      },
      {
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [false, true, false, false, false],
        G: [false, true, false, false, false],
        O: [true, true, true, true, true],
      },
      {
        B: [true, false, false, true, false],
        I: [false, true, false, true, false],
        N: [false, false, true, true, false],
        G: [false, false, false, true, false],
        O: [false, false, false, true, true],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      }
    ],
    },
    {
      value: "Double Chevron",
      label: "DOUBLE CHEVRON",
      unusedLetters: [],
      pattern: [{
        B: [false, false, true, false, true],
        I: [false, true, false, true, false],
        N: [true, false, true, false, false],
        G: [false, true, false, true, false],
        O: [false, false, true, false, true],
      }],
    },
    {
      value: "Double X",
      label: "DOUBLE X",
      unusedLetters: [],
      pattern: [{
        B: [true, false, true, false, false],
        I: [false, true, false, false, false],
        N: [true, false, true, false, true],
        G: [false, false, false, true, false],
        O: [false, false, true, false, true],
      }],
    },
    {
      value: "Field Goal",
      label: "FIELD GOAL",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, false, false],
        I: [false, false, true, false, false],
        N: [true, false, true, true, true],
        G: [false, false, true, false, false],
        O: [true, true, true, false, false],
      }],
    },
    {
      value: "Flag",
      label: "FLAG",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [true, true, true, false, false],
        N: [true, true, true, false, false],
        G: [true, true, true, false, false],
        O: [true, true, true, false, false],
      }],
    },
    {
      value: "Four Corners",
      label: "FOUR CORNERS",
      unusedLetters: ["I", "N", "G"],
      pattern: [{
        B: [true, false, false, false, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, false, false, false, true],
      }],
    },
    {
      value: "Four Corners Small",
      label: "FOUR CORNERS SMALL",
      unusedLetters: ["B", "N", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, true, false, true, false],
        N: [false, false, false, false, false],
        G: [false, true, false, true, false],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "GO",
      label: "GO",
      unusedLetters: ["B", "I", "N"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "Hardway",
      label: "HARDWAY",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, false],
        I: [true, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, false, false, false, false],
        O: [true, false, false, false, false],
      },
      {
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [false, true, false, false, false],
        G: [false, true, false, false, false],
        O: [false, true, false, false, false],
      },
      {
        B: [false, false, false, true, false],
        I: [false, false, false, true, false],
        N: [false, false, false, true, false],
        G: [false, false, false, true, false],
        O: [false, false, false, true, false],
      },
      {
        B: [false, false, false, false, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [false, false, false, false, true],
        O: [false, false, false, false, true],
      },
      {
        B: [true, true, true, true, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, true, true, true, true],
      },

      ],
    },
    {
      value: "Heart",
      label: "HEART",
      unusedLetters: [],
      pattern: [{
        B: [false, true, true, false, false],
        I: [true, true, true, true, false],
        N: [false, true, true, true, true],
        G: [true, true, true, true, false],
        O: [false, true, true, false, false],
      }],
    },
    {
      value: "Hourglass",
      label: "HOURGLASS",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, true],
        I: [true, true, false, true, true],
        N: [true, false, true, false, true],
        G: [true, true, false, true, true],
        O: [true, false, false, false, true],
      }],
    },
    {
      value: "ING Game",
      label: "ING GAME",
      unusedLetters: ["B", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "Ladder",
      label: "LADDER",
      unusedLetters: ["B", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, true, false, true, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "Large Frame",
      label: "LARGE FRAME",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [true, false, false, false, true],
        N: [true, false, false, false, true],
        G: [true, false, false, false, true],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "Layer Cake",
      label: "LAYER CAKE",
      unusedLetters: [],
      pattern: [{
        B: [true, false, true, false, true],
        I: [true, false, true, false, true],
        N: [true, false, true, false, true],
        G: [true, false, true, false, true],
        O: [true, false, true, false, true],
      }],
    },
    {
      value: "Letter X",
      label: "LETTER X",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, false, false, false, true],
        I: [false, true, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, true, false],
        O: [true, false, false, false, true],
      }],
    },
    {
      value: "Love Letter",
      label: "LOVE LETTER",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [true, true, false, false, true],
        O: [true, true, false, false, true],
      }],
    },
    {
      value: "Lucky 7",
      label: "LUCKY 7",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, true],
        I: [true, false, false, true, false],
        N: [true, false, true, false, false],
        G: [true, true, false, false, false],
        O: [true, false, false, false, false],
      }],
    },
    {
      value: "Number Sign",
      label: "NUMBER SIGN",
      unusedLetters: [],
      pattern: [{
        B: [false, true, false, true, false],
        I: [true, true, true, true, true],
        N: [false, true, false, true, false],
        G: [true, true, true, true, true],
        O: [false, true, false, true, false],
      }],
    },
    {
      value: "One Away",
      label: "ONE AWAY",
      unusedLetters: [],
      pattern: [{
        B: [false, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      },
      {
        B: [true, true, true, true, true],
        I: [true, false, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      },
      {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, false, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, false],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, false],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, false],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, false],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, false],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, false, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, false, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [false, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [false, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [false, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [false, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, false, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, false, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, false, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, false, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, false, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, false, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, false, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, false, true, true],
      }, {
        B: [true, true, true, false, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, true, true, true],
        I: [true, true, true, true, true],
        N: [true, true, true, true, true],
        G: [true, true, true, true, true],
        O: [true, true, true, false, true],
      },
      ],
    },
    {
      value: "Percent Sign",
      label: "PERCENT SIGN",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, true, false, false, true],
        I: [true, true, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, true, true],
        O: [true, false, false, true, true],
      }],
    },
    {
      value: "Picnic Table",
      label: "PICNIC TABLE",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, true],
        I: [true, true, false, true, false],
        N: [true, false, true, false, false],
        G: [true, true, false, true, false],
        O: [true, false, false, false, true],
      }],
    },
    {
      value: "Plus Sign",
      label: "PLUS SIGN",
      unusedLetters: [],
      pattern: [{
        B: [false, false, true, false, false],
        I: [false, false, true, false, false],
        N: [true, true, true, true, true],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      }],
    },
    {
      value: "Postage Stamp",
      label: "POSTAGE STAMP",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, false, false, false],
      },
      ],
    },
    {
      value: "Pyramid",
      label: "PYRAMID",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, false, true],
        I: [false, false, false, true, true],
        N: [false, false, true, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, true],
      }],
    },
    {
      value: "Railroad Tracks",
      label: "RAILROAD TRACKS",
      unusedLetters: ["B", "N", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "Regular or 4 Corners",
      label: "REGULAR OR 4 CORNERS",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, false, false, false, true],
      },
      {
        B: [true, true, true, true, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [true, false, false, false, false],
        I: [true, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, false, false, false, false],
        O: [true, false, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [false, true, false, false, false],
        G: [false, true, false, false, false],
        O: [false, true, false, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, true, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, true, false, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, true, false],
        I: [false, false, false, true, false],
        N: [false, false, false, true, false],
        G: [false, false, false, true, false],
        O: [false, false, false, true, false],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, true, true, true, true],
      },
      {
        B: [false, false, false, false, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [false, false, false, false, true],
        O: [false, false, false, false, true],
      },
      {
        B: [true, false, false, false, false],
        I: [false, true, false, false, false],
        N: [false, false, true, false, false],
        G: [false, false, false, true, false],
        O: [false, false, false, false, true],
      },
      {
        B: [false, false, false, false, true],
        I: [false, false, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      },
      ],
    },
    {
      value: "Small Frame",
      label: "SMALL FRAME",
      unusedLetters: ["B", "O"],
      pattern: [{
        B: [false, false, false, false, false],
        I: [false, true, true, true, false],
        N: [false, true, false, true, false],
        G: [false, true, true, true, false],
        O: [false, false, false, false, false],
      }],
    },
    {
      value: "Smile",
      label: "SMILE",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, true, false],
        I: [false, true, false, false, true],
        N: [false, false, true, false, true],
        G: [false, true, false, false, true],
        O: [false, false, false, true, false],
      }],
    },
    {
      value: "Sputnik",
      label: "SPUTNIK",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, true],
        I: [false, true, true, true, false],
        N: [false, true, true, true, false],
        G: [false, true, true, true, false],
        O: [true, false, false, false, true],
      }],
    },
    {
      value: "Staircase",
      label: "STAIRCASE",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, false, true],
        I: [false, false, false, true, true],
        N: [false, false, true, true, true],
        G: [false, true, true, true, true],
        O: [true, true, true, true, true],
      }],
    },
    {
      value: "Stamp and 4 Corners",
      label: "STAMP AND 4 CORNERS",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, false, false, false, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, false, false, true],
      },
      {
        B: [true, true, false, false, true],
        I: [true, true, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, false, false, false, true],
      },
      {
        B: [true, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, false, false, false, true],
      },
      {
        B: [true, false, false, false, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, true, true],
        O: [true, false, false, true, true],
      },
      ],
    },
    {
      value: "Stamp and Line",
      label: "STAMP AND LINE",
      unusedLetters: [],
      pattern: [{
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, true, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [true, true, true, false, false],
        I: [true, true, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      }, {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      }, {
        B: [true, true, false, true, false],
        I: [true, true, false, true, false],
        N: [false, false, false, true, false],
        G: [false, false, false, true, false],
        O: [false, false, false, true, false],
      }, {
        B: [true, true, false, false, false],
        I: [true, true, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, true, true, true, true],
      }, {
        B: [true, true, false, false, true],
        I: [true, true, false, false, true],
        N: [false, false, false, false, true],
        G: [false, false, false, false, true],
        O: [false, false, false, false, true],
      }, {
        B: [true, true, false, false, true],
        I: [true, true, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, false, false],
        O: [true, false, false, false, false],
      }, {
        B: [true, false, false, true, true],
        I: [true, false, false, true, true],
        N: [true, false, false, false, false],
        G: [true, false, false, false, false],
        O: [true, false, false, false, false],
      },{
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [true, true, true, true, true],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, true, false, true, true],
        I: [false, true, false, true, true],
        N: [false, true, false, false, false],
        G: [false, true, false, false, false],
        O: [false, true, false, false, false],
      },{
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, false, false],
        G: [true, true, true, true, true],
        O: [false, false, false, false, false],
      },{
        B: [false, false, true, true, true],
        I: [false, false, true, true, true],
        N: [false, false, true, false, false],
        G: [false, false, true, false, false],
        O: [false, false, true, false, false],
      },{
        B: [false, false, false, true, true],
        I: [false, false, false, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [true, true, true, true, true],
      },{
        B: [true, false, false, true, true],
        I: [false, true, false, true, true],
        N: [false, false, true, false, false],
        G: [false, false, false, true, false],
        O: [false, false, false, false, true],
      },{
        B: [true, true, true, true, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true],
      },
      {
        B: [true, false, false, false, false],
        I: [true, false, false, false, false],
        N: [true, false, false, false, false],
        G: [true, false, false, true, true],
        O: [true, false, false, true, true],
      },{
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true],
      },{
        B: [false, true, false, false, false],
        I: [false, true, false, false, false],
        N: [false, true, false, false, false],
        G: [false, true, false, true, true],
        O: [false, true, false, true, true],
      },{
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, true, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, true, true],
      },{
        B: [false, false, true, false, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [false, false, true, true, true],
        O: [false, false, true, true, true],
      },{
        B: [false, false, false, false, true],
        I: [false, false, false, true, false],
        N: [false, false, true, false, false],
        G: [false, true, false, true, true],
        O: [true, false, false, true, true],
      },{
        B: [true, true, true, true, true],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, false, false, false],
      },{
        B: [false, false, true, false, false],
        I: [false, false, true, false, false],
        N: [false, false, true, false, false],
        G: [true, true, true, false, false],
        O: [true, true, true, false, false],
      },{
        B: [false, false, false, false, false],
        I: [true, true, true, true, true],
        N: [false, false, false, false, false],
        G: [true, true, false, false, false],
        O: [true, true, false, false, false],
      },{
        B: [false, false, false, true, false],
        I: [false, false, false, true, false],
        N: [false, false, false, true, false],
        G: [true, true, false, true, false],
        O: [true, true, false, true, false],
      },{
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [true, true, true, true, true],
        G: [true, true, false, false, false],
        O: [true, true, false, false, false],
      },{
        B: [false, false, false, false, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, true],
        G: [true, true, false, false, true],
        O: [true, true, false, false, true],
      },{
        B: [true, false, false, false, false],
        I: [false, true, false, false, false],
        N: [false, false, true, false, false],
        G: [true, true, false, true, false],
        O: [true, true, false, false, true],
      },
      ],
    },
    {
      value: "Starburst",
      label: "STARBURST",
      unusedLetters: [],
      pattern: [{
        B: [true, false, true, false, true],
        I: [false, true, true, true, false],
        N: [true, true, true, true, true],
        G: [false, true, true, true, false],
        O: [true, false, true, false, true],
      }],
    },
    {
      value: "Top and Bottom",
      label: "TOP AND BOTTOM",
      unusedLetters: [],
      pattern: [{
        B: [true, false, false, false, true],
        I: [true, false, false, false, true],
        N: [true, false, false, false, true],
        G: [true, false, false, false, true],
        O: [true, false, false, false, true],
      }],
    },
    {
      value: "Top Hat",
      label: "TOP HAT",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, false, true],
        I: [false, true, true, true, true],
        N: [false, true, true, true, true],
        G: [false, true, true, true, true],
        O: [false, false, false, false, true],
      }],
    },
    {
      value: "Tree",
      label: "TREE",
      unusedLetters: [],
      pattern: [{
        B: [false, false, false, true, false],
        I: [false, true, true, true, false],
        N: [true, true, true, true, true],
        G: [false, true, true, true, false],
        O: [false, false, false, true, false],
      }],
    },
    {
      value: "Triangle Game",
      label: "TRIANGLE GAME",
      unusedLetters: [],
      pattern: [{
        B: [true, true, true, true, true],
        I: [true, true, true, true, false],
        N: [true, true, true, false, false],
        G: [true, true, false, false, false],
        O: [true, false, false, false, false],
      },
      {
        B: [false, false, false, false, true],
        I: [false, false, false, true, true],
        N: [false, false, true, true, true],
        G: [false, true, true, true, true],
        O: [true, true, true, true, true],
      },
      {
        B: [true, true, true, true, true],
        I: [false, true, true, true, true],
        N: [false, false, true, true, true],
        G: [false, false, false, true, true],
        O: [false, false, false, false, true],
      },
      {
        B: [true, false, false, false, false],
        I: [true, true, false, false, false],
        N: [true, true, true, false, false],
        G: [true, true, true, true, false],
        O: [true, true, true, true, true],
      }
      ],
    },
    {
      value: "Turtle",
      label: "TURTLE",
      unusedLetters: [],
      pattern: [{
        B: [false, true, false, false, true],
        I: [false, true, true, true, false],
        N: [true, true, true, true, false],
        G: [false, true, true, true, false],
        O: [false, true, false, false, true],
      }],
    },
    {
      value: "Two Brackets",
      label: "TWO BRACKETS",
      unusedLetters: ["N"],
      pattern: [{
        B: [true, true, false, false, false],
        I: [true, false, false, false, false],
        N: [false, false, false, false, false],
        G: [false, false, false, false, true],
        O: [false, false, false, true, true],
      },
      {
        B: [false, false, false, false, false],
        I: [false, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, false, false, false, true],
        O: [true, true, false, true, true],
      },
      {
        B: [true, true, false, true, true],
        I: [true, false, false, false, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, false],
        O: [false, false, false, false, false],
      },
      {
        B: [false, false, false, true, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, false],
        G: [false, false, false, false, true],
        O: [false, false, false, true, true],
      },
      {
        B: [true, true, false, false, false],
        I: [true, false, false, false, false],
        N: [false, false, false, false, false],
        G: [true, false, false, false, false],
        O: [true, true, false, false, false],
      },
      {
        B: [false, false, false, true, true],
        I: [false, false, false, false, true],
        N: [false, false, false, false, false],
        G: [true, false, false, false, false],
        O: [true, true, false, false, false],
      },
      ],
    },
    {
      value: "Umbrella",
      label: "UMBRELLA",
      unusedLetters: [],
      pattern: [{
        B: [false, true, true, false, false],
        I: [true, true, false, false, true],
        N: [true, true, true, true, true],
        G: [true, true, false, false, false],
        O: [false, true, true, false, false],
      }],
    },
    // { value: "",
    //   label: "",
    //   unusedLetters: [],
    //   pattern: {
    //     B: [false, false, false, false, false],
    //     I: [false, false, false, false, false],
    //     N: [false, false, false, false, false],
    //     G: [false, false, false, false, false],
    //     O: [false, false, false, false, false]
    //   },
    // },
  ];
}

/**
 * Returns the default bingo ball display
 *
 * @return  {JSX}  JSX element
 */
export const getLogoBallDisplay = () => {
  return (
    <div className="ball-display graphic relative">
      <div className="content">
        <div className="ball-content">
          <img src={callBall} alt="Drag Queen Bingo" />
        </div>
      </div>
    </div>
  )
}

/**
 * Returns a bingo ball display using the selected ball object
 *
 * @return  {JSX}  JSX element
 */
export const getBallDisplay = (ball) => {
  return (
    <div className={"ball-display " + ball.color + " relative"}>
      <div className="content">
        <div className="ball-content">
          <div className="ball-letter">{ball.letter}</div>
          <div className="ball-number">{ball.number}</div>
        </div>
      </div>
    </div>
  )
}
