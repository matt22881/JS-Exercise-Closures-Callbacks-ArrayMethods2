// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 *
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 *
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 *
 * 1. What is the difference between counter1 and counter2?
 * counter1 is a callback function for counterMaker...counter2 is a stand-alone (?) fumction that increments count
 * 2. Which of the two uses a closure? How can you tell?
 * counter1...i has to reach outside it's scope to process counterMaker
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 * in most cases i'd think counter1 to be preferable unless there was only one thing to count and that variable could be global in which case counter2 would be acceptable
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning()

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

let home = 0
 let away = 0
let score = {
  "Home": home,
  "Away": away
}

function inning(){

    return Math.floor(Math.random() * 3)

}
// console.log(inning())


/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example,

finalScore(inning, 9) might return:
{
  "Home": 11,
  "Away": 5,
}

*/

function finalScore(cb, inns){
  let score = {
    "Home": 0,
    "Away": 0
  }
   for (let i=0; i < inns; i++){
    score["Home"] = score["Home"] + cb()
    score["Away"] = score["Away"] + cb()
    // console.log(score)
  }
return score
}

// console.log(finalScore(inning, 9))

/* Task 4:

Create a function called `scoreboard` that accepts the following parameters:

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function getInningScore(cb){
   let innScore = {
    home: cb(),
    away: cb()
   }
    return innScore
}
function scoreboard(cb1, cb2, inns) {
  let inningScore = {
    home: 0,
    away: 0
  }
  let totalScore = {
    home: 0,
    away: 0
  }
  let score = [
    {
      inn: 0,
      home: 0,
      away: 0,
      homeTotal: 0,
      awayTotal: 0
    }
]
   for (let i = 1; i < inns + 1; i++){
    inningScore.home = cb2(cb1).home
    inningScore.away = cb2(cb1).away
    score.push ({
       inn: i,
       home: inningScore.home,
       away: inningScore.away,
       homeTotal: (totalScore.home + inningScore.home),
       awayTotal: (totalScore.away + inningScore.away)
      })
      totalScore.home = totalScore.home + score[i].home
      totalScore.away = totalScore.away + score[i].away
  }
  return (totalScore, score)
}
console.log(scoreboard(inning, getInningScore, 9))
