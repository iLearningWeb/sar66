const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const quizname = document.getElementById("quizname");
//mod here to match the SAR66 Topic content

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
//set your questions here
let questions = [
  {question: "SCRs (or thyristors) are:",
  choice1: "two-terminal devices that can be used for AC power control.",
  choice2: "three-terminal devices that can be used for voltage stabilisation.",
  choice3: "three-terminal devices that can be used for AC power control.",
  answer: 3},
  {question: "A voltage amplifier feeds back a signal from its output to its input. If this signal is in phase with the input signal it is called:",
  choice1: "positive feedback",
  choice2: "degenerative feedback",
  choice3: "negative feedback",
  answer: 1},
  {question: "A diode will pass current:",
  choice1: "when the cathode is positive with respect to the anode.",
  choice2: "in both directions when connected to an AC supply.",
  choice3: "in one direction only.",
  answer: 3},
  {question: "In a P type semiconductor, the current is carried by:",
  choice1: "electrons.",
  choice2: "holes.",
  choice3: "atoms.",
  answer: 2},
  {question: "Printed circuit board material used in high frequency application is made from:",
  choice1: "PTFE",
  choice2: "phenolic",
  choice3: "glass-epoxy",
  answer: 1},
  {question: "The gain of an operational amplifier is usually controlled by utilizing:",
  choice1: "positive feedback.",
  choice2: "negative feedback.",
  choice3: "integration.",
  answer: 2},
  {question: "In a transistor, the N-type material:",
  choice1: "has “free” electrons.",
  choice2: "is always silicon.",
  choice3: "has “free” holes.",
  answer: 2},
  {question: "Printed circuit board tracks are made from:",
  choice1: "copper.",
  choice2: "zinc.",
  choice3: "aluminum.",
  answer: 1},
  {question: "In a PN junction diode,?? LED is forward bias. Negative side batteries flows to N junction is forward bias. A negative side batteries flow to P junction is reverse bias.",
  choice1: "no bias.",
  choice2: "reverse bias.",
  choice3: "forward bias.",
  answer: 3},
  {question: "In an N type semiconductor, the current is carried by",
  choice1: "electrons.",
  choice2: "holes.",
  choice3: "atoms.",
  answer: 1},
  {question: "A silicon chip would not normally conduct on",
  choice1: "diode.",
  choice2: "transistor.",
  choice3: "inductor.",
  answer: 3},
  {question: "Which servomechanism system has feedback?",
  choice1: "An open-loop system.",
  choice2: "A closed-loop system.",
  choice3: "Both open and closed system.",
  answer: 2},
  {question: "The width of the PCB track increase determine the:",
  choice1: "increase current capacity.",
  choice2: "reduce current capacity.",
  choice3: "None.",
  answer: 1},
  {question: "The series of 2 diodes of forward biased add together gives",
  choice1: "1.2V",
  choice2: "0.2",
  choice3: "1V",
  answer: 1},
  {question: "An audio amplifier only amplifies output to half wave.",
  choice1: "Class A amplifier.",
  choice2: "Class B amplifier.",
  choice3: "Class C amplifier.",
  answer: 2},
  {question: "The arrowhead on a transmitter symbol indicates the direction of:",
  choice1: "base current",
  choice2: "conventional current flow",
  choice3: "electron flow",
  answer: 2},
  {question: "That part of a transistor symbol which includes an arrowhead is the:",
  choice1: "emitter",
  choice2: "collector",
  choice3: "base",
  answer: 1},
  {question: "A diode will allow current to pass through it:",
  choice1: "in one direction only.",
  choice2: "in both directions if it is connected in an AC circuit.",
  choice3: "only when it is connected in a battery power source.",
  answer: 1},
  {question: "In an E & I analogue transducer the:",
  choice1: "’E’ bar has an AC powered input winding on its outer limbs.",
  choice2: "’E’ bar has an AC powered input winding on its centre limb.",
  choice3: "’E’ bar has a DC-powered input.",
  answer: 2},
  {question: "Which type of transistor amplifier inverts the phase of the amplified signal?",
  choice1: "Common emitter.",
  choice2: "Common collector.",
  choice3: "Common base.",
  answer: 1},
  {question: "A common emitter amplifier configuration is one in which the input is applied in between",
  choice1: "base and emitter which output is taken between collector and emitter.",
  choice2: "emitter and collector which output is taken between emitter and base.",
  choice3: "base and emitter which output is taken between collector and base.",
  answer: 1},
  {question: "SCR Characteristics………..when turned off, still on???",
  choice1: "Refer to Diodes page 38",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "In a NPN or PNP transistor in order to conduct from base to emitter → How? Reverse biased conduct from base to emitter for both transistors.",
  choice1: "Forward biased.",
  choice2: "Reverse biased.",
  choice3: "Both directions.",
  answer: 1},
  {question: "Integrator: Remember how the circuit is patch up by using Resistor and Capacitor connected to inverting input.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Differentiator: Remember how the circuit is patch up by using Resistor and Capacitor connected to inverting input.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Negative feedback produces an exact value of gain.",
  choice1: "a = Ic / Ie",
  choice2: "B = Ic / Ib",
  choice3: "???",
  answer: 1},
  {question: "Inverting amplifier where the output is the inverse or 180° out of phase with the input. Phase signal phased shifted by 180° at the output.",
  choice1: "Common emitter.",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Zener diode used for what?",
  choice1: "Voltage regulator.",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Which material is suitable to prevent oxidation?",
  choice1: "Gold.",
  choice2: "Silver.",
  choice3: "Copper.",
  answer: 1},
  {question: "Null point → Parallel. Refer to servomechanisms pages 9 to 10.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Open-loop got no feedback. Refer to servomechanisms page 2.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Surface mounted components (SMC’s) are connected to a printed circuit board using:",
  choice1: "conducting pads.",
  choice2: "solder pads.",
  choice3: "edge connectors.",
  answer: 2},
  {question: "Comparator with reference with input and output, how? Refer to Integrated Circuits page 37.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Closed-loop got feedback. Refer to servomechanisms page 5.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "In a synchro resolver (winding) has",
  choice1: "3 phase stator, 2 phase rotors.",
  choice2: "2 stators.",
  choice3: "90° at each other.",
  answer: 3},
  {question: "Anode and Cathode → Anode more positive than Cathode.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Bipolar transistor → Independent.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "Rate feedback use tacho-generator for rate control servomechanism. Application: Aircraft automatic flight control system.",
  choice1: "Servomotor drives a tachometer generator to provide inverse feedback to the",
  choice2: "amplifier for speed limiting and smoothing.",
  choice3: "???",
  answer: 1},
  {question: "SCR is known as Thyristor → 3 terminals and AC-powered control. Go and check SCR and TRIAC gate characteristics!!! Convert AC to DC.",
  choice1: "???",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "What happens to the internal resistance of a transistor when the temperature is increased? Remarks: CE current will increase.",
  choice1: "Increase.",
  choice2: "Decrease.",
  choice3: "Decrease in base emitter and increase in base collector.",
  answer: 2},
  {question: "What is used to connect a multilayer PCB?",
  choice1: "through holes",
  choice2: "edge connectors",
  choice3: "pin",
  answer: 1},
  {question: "What is a main characteristic of a JFET transistor?",
  choice1: "low internal resistance 10 Ohm",
  choice2: "medium internal resistance 50 Ohm",
  choice3: "high internal resistance 100 Ohm",
  answer: 2},
  {question: "When does the current in a transistor is switched on?",
  choice1: "when the current is forward biased",
  choice2: "when the current is reverse biased",
  choice3: "???",
  answer: 1},
  {question: "What is a synchro?",
  choice1: "sensing device",
  choice2: "drive heavy load",
  choice3: "transformer",
  answer: 3},
  {question: "Which is true about the rotor and stator windings of a torque synchro?",
  choice1: "2 stator and 3 rotor windings",
  choice2: "1 rotor and 3 stator windings",
  choice3: "3 rotor and 3 stator windings",
  answer: 2},
  {question: "When do you get a low output for a NAND gate?",
  choice1: "when both inputs are high",
  choice2: "when both inputs are low",
  choice3: "when both inputs are different",
  answer: 1},
  {question: "The N region of a diode provides,",
  choice1: "electron",
  choice2: "protons",
  choice3: "holes",
  answer: 1},
  {question: "The rotor in a synchro is powered by,",
  choice1: "AC voltage",
  choice2: "DC voltage",
  choice3: "permanent magnet",
  answer: 1},
  {question: "The AC rotor transmitter is always connected to,",
  choice1: "AC power",
  choice2: "stator of the receiver",
  choice3: "DC power",
  answer: 1},
  {question: "If the current gain in a common emitter is 125 and the collector current is 50mA, what is the base current? β = Ic / IB, IE = IC + IB",
  choice1: "250 μA",
  choice2: "400 μA",
  choice3: "4 mA",
  answer: 2},
  {question: "What can be said about the base current?",
  choice1: "smaller than the emitter current but larger than collector current",
  choice2: "smaller than the collector current but larger than collector emitter",
  choice3: "always smaller than any other current",
  answer: 3},
  {question: "What does the width of the track determines in PCB?",
  choice1: "current carrying capability",
  choice2: "voltage carrying capability",
  choice3: "total resistance",
  answer: 1},
  {question: "What is the N part of a PNP?",
  choice1: "Extra electron",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "What is the output for Exclusive-OR gate for inputs of '1'?",
  choice1: "Both 1",
  choice2: "Both different for synchro",
  choice3: "0",
  answer: 3},
  {question: "For synchro, the exciting voltage?",
  choice1: "AC",
  choice2: "DC",
  choice3: "???",
  answer: 1},
  {question: "Edge connected pin:",
  choice1: "Gold plated pin connected to edge connected is for reliability and prevent oxidation",
  choice2: "???",
  choice3: "???",
  answer: 1},
  {question: "What are the ideal characteristics of an Op Amp?",
  choice1: "Infinite gain, infinite input impedance and zero output impedance.",
  choice2: "???",
  choice3: "???",
  answer: 1},
  ];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 40; //For CAT B2, total number of questions is 52.

startGame = () => {
  questionCounter = 0;
  score = 0;
  //SAR66 each topic scores
  localStorage.setItem("maxMark", MAX_QUESTIONS);
  availableQuesions = [...questions];
  quizname.innerText = `M4: Electronic`;
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //Generating the topic results
    //go to the end page
    return window.location.assign("../end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {incrementScore(CORRECT_BONUS);};

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
