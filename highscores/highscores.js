const highScoresList = document.getElementById("highScoresList");
const topicScore = document.getElementById("topicScore");
const recentScore = document.getElementById("recentScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const topicScoreTable = JSON.parse(localStorage.getItem("topicScore")) || [];

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name}: ${score.score} - ${score.time}</li>`;
  }).join("");

recentScore.innerText = (Number(mostRecentScore)/52*100).toPrecision(3) + "%";
