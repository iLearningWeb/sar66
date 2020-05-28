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
  {question: "The radome protective coating cannot easily dissipate static electricity because it is made of:",
  choise1: "a metallic material.",
  choise2: "non-conductive material.",
  choise3: "conductive material.",
  answer: 2},
  {question: "The metal points of the null field dischargers are:",
  choise1: "positioned at right angles to the direction of flight.",
  choise2: "positioned parallel to the direction of flight.",
  choise3: "protected from the slipstream during flight.",
  answer: 2},
  {question: "The data in a digital computer is stored in the:",
  choise1: "central processor unit.",
  choise2: "memory unit.",
  choise3: "power supply.",
  answer: 2},
  {question: "An optical fibre cleaver is a tool:",
  choise1: "for joining the cable.",
  choise2: "for polishing the fibre.",
  choise3: "that precisely breaks the fibre.",
  answer: 3},
  {question: "The two display units used in a typical electronic flight instrument system are an electronic:",
  choise1: "attitude direction indicator and an electronic direction indicator.",
  choise2: "attitude direction indicator and an electronic horizontal situation indicator.",
  choise3: "?",
  answer: 2},
  {question: "Lighting diverters are:",
  choise1: "rubber insulators attached to the radome abrasion shield.",
  choise2: "metal covers which protect the primary flight control surfaces.",
  choise3: "thin metallic foil strips adhered to the radome abrasion shield.",
  answer: 3},
  {question: "A three-input logic gate with a high output when two-inputs are low and one-input is high is:",
  choise1: "an “AND” gate",
  choise2: "an “NOR” gate",
  choise3: "an “OR” gate",
  answer: 3},
  {question: "In an aircraft computer system, a “peripheral device” is:",
  choise1: "the power supply used by the computer.",
  choise2: "the wiring loom connecting external devices to the CPU.",
  choise3: "an external accessory that is not part of the basic computer system.",
  answer: 3},
  {question: "For the numeral eight to be shown on a 7 segment liquid crystal display, there would need to be:",
  choise1: "five segments displayed.",
  choise2: "seven segments displayed.",
  choise3: "six segments displayed.",
  answer: 2},
  {question: "Any Field Loadable Software (FLS) should be recorded in the:",
  choise1: "aircraft’s Technical Log, with a copy kept in the operator’s maintenance records.",
  choise2: "Aircraft Configuration List, and a copy kept on board the aircraft and another copy kept in the operator’s maintenance records.",
  choise3: "aircraft’s Maintenance Manual, with a copy kept in the operator’s maintenance records.",
  answer: 2},
  {question: "In a computer system the term “PROM” is an abbreviation for:",
  choise1: "Programmers Repair and Operation Manual.",
  choise2: "Prominent device.",
  choise3: "Programmable Read Only Memory.",
  answer: 3},
  {question: "An ARINC 429 word has ____ bits.",
  choise1: "32",
  choise2: "16",
  choise3: "64",
  answer: 1},
  {question: "The captain’s electronic attitude director indicator displays:",
  choise1: "pitch and roll attitude indications.",
  choise2: "altitude and direction indications.",
  choise3: "altitude, windspeed and wind direction data.",
  answer: 1},
  {question: "For a LCD crystal display pixel to be dark, the LCD pixel shutter:",
  choise1: "remains in its normal opaque condition.",
  choise2: "transparent.",
  choise3: "is back lit.",
  answer: 1},
  {question: "Computer storage media should be clearly labeled and stored in:",
  choise1: "an anti-static bag.",
  choise2: "a non-metallic container.",
  choise3: "lint-free material, sealed in a closed box.",
  answer: 1},
  {question: "The truth table for a three-input “OR” gate has:",
  choise1: "three true output conditions.",
  choise2: "four true output conditions.",
  choise3: "seven true output conditions.",
  answer: 3},
  {question: "Over-tightening cable ties supporting a fibre optic cable can:",
  choise1: "increase the attenuation.",
  choise2: "increase the impedance.",
  choise3: "increase the resistance.",
  answer: 1},
  {question: "The hexadecimal number A is equivalent to the octal number:",
  choise1: "12.",
  choise2: "8.",
  choise3: "C.",
  answer: 1},
  {question: "When failure of data signals occurs, indication is given on EFIS display units by flags displayed in:",
  choise1: "yellow.",
  choise2: "red.",
  choise3: "magenta.",
  answer: 1},
  {question: "The logic symbol for inversion is a:",
  choise1: "triangle.",
  choise2: "semi-circle.",
  choise3: "small circle.",
  answer: 3},
  {question: "An analogue to digital converter:",
  choise1: "decodes the binary input and generates a binary coded output.",
  choise2: "samples the input voltage and generates a binary coded output.",
  choise3: "decodes the digital input and generates a continuous electrical output.",
  answer: 2},
  {question: "A Procured Loadable Aircraft Software Part must be accompanied by a:",
  choise1: "release form signed by a senior maintenance officer.",
  choise2: "FAA 8130-3 or equivalent.",
  choise3: "list of the aircraft that the software is approved for.",
  answer: 2},
  {question: "The aircraft configuration list (ACL) is an aircraft-specific list of:",
  choise1: "line replaceable units and modules with a loadable software aircraft part (LSAP).",
  choise2: "software versions of the components that comprise the flight management system.",
  choise3: "software which can be used by a variety of different aircraft types.",
  answer: 1},
  {question: "The analogue to digital converter output is a:",
  choise1: "series of electrical pulses.",
  choise2: "sine wave.",
  choise3: "continuous electrical signal.",
  answer: 1},
  {question: "In regard to aircraft avionics systems ESDS stands for:",
  choise1: "electrostatic discharge sensitive.",
  choise2: "electronic safety and design standard.",
  choise3: "equalisation safe device surface.",
  answer: 1},
  {question: "Inertial navigation systems derive their basic information from:",
  choise1: "vertical gyros.",
  choise2: "rate gyro.",
  choise3: "accelerometers.",
  answer: 3},
  {question: "A decimal number can be converted into an equivalent binary number by repeated dividing the number by:",
  choise1: "8.",
  choise2: "2.",
  choise3: "10.",
  answer: 2},
  {question: "What is the format of the data in a wire carrying multiplexed data?",
  choise1: "Serial data words.",
  choise2: "Parallel data words.",
  choise3: "Both serial and parallel data words can be used.",
  answer: 1},
  {question: "In a de-multiplexer or data selector, the AND gate that is open for passage of data from one input is the one whose inputs are:",
  choise1: "all “1”.",
  choise2: "connected to the “true” input line.",
  choise3: "connected to the “complement” input line.",
  answer: 1},
  {question: "The data from the Inertial Reference System (IRS) is used for:",
  choise1: "pitch and roll displays.",
  choise2: "pitch, roll and yaw displays.",
  choise3: "pitch and yaw displays.",
  answer: 2},
  {question: "The four modes of the electronic horizontal situation indicator are:",
  choise1: "VOR, ILS, Map and Plan.",
  choise2: "VOR, ILS, DME and Map.",
  choise3: "VOR, ILS, DME and Plan.",
  answer: 1},
  {question: "The octal number 15 is equivalent to the hexadecimal number:",
  choise1: "21",
  choise2: "D",
  choise3: "13",
  answer: 2},
  {question: "An altitude digital encoder in a central air data computer is used:",
  choise1: "only in turbine powered aircraft.",
  choise2: "for transmission to ATC.",
  choise3: "only in glass-cockpit aircraft.",
  answer: 2},
  {question: "To produce a quality splice in a fibre optic cable, the fibre ends must be cut at ___ degrees to the fibre length.",
  choise1: "90",
  choise2: "85",
  choise3: "45",
  answer: 1},
  {question: "When installing an ESD bonding jumper it is important that the clips:",
  choise1: "make a good electrical connection.",
  choise2: "are not connected during electrical storms.",
  choise3: "are fully insulated from ground.",
  answer: 1},
  {question: "A disadvantage of the liquid crystal display (LCD) is:",
  choise1: "a lack of proper heat dissipation.",
  choise2: "excessive weight.",
  choise3: "limited off-axis viewing.",
  answer: 3},
  {question: "The binary number 1010 is equivalent to the decimal number:",
  choise1: "22.",
  choise2: "12.",
  choise3: "10.",
  answer: 3},
  {question: "The digital to analogue converter output is a:",
  choise1: "series of electrical pulses.",
  choise2: "continuous electrical signals.",
  choise3: "sine wave.",
  answer: 2},
  {question: "An In-Circuit Emulator (ICE) is:",
  choise1: "a device to test and debug a computer system.",
  choise2: "a multi-plug adapter used to interface dissimilar computer systems.",
  choise3: "an analogue to digital converter used when modernizing older aircraft.",
  answer: 1},
  {question: "Which of the following encoders can be found in the ARINC 429?\n1. Discrete\n2. BCD\n3. Octal\n4. Grey\n5. BNR\n6. Excess-3\n7. Hexadecimal\n8. ASCII:",
  choise1: "1, 2 and 5",
  choise2: "1, 2 and 3",
  choise3: "2, 5 and 8",
  answer: 1},
  {question: "The individual pixels of a 256 x 256 display is driven by the output from a:",
  choise1: "multiplexer.",
  choise2: "de-multiplexer",
  choise3: "modulator",
  answer: 2},
  {question: "The electronic distribution of software by the producer or supplier is:",
  choise1: "not supported by aircraft manufacturers.",
  choise2: "only approved for software with a file size of less than 1 megabyte.",
  choise3: "an acceptable means of distributing software.",
  answer: 1},
  {question: "An electrostatic discharge caused by incorrect handling procedures:",
  choise1: "does not harm electronic components.",
  choise2: "can partially weaken the component but not immediately affect its performance.",
  choise3: "will only occur during the removal and installation of avionics equipment.",
  answer: 3},
  {question: "The main building blocks of a digital computer are:",
  choise1: "LC input devices, control unit, output devices, arithmetic unit, and memory.",
  choise2: "LC display, CPU, hard disk drive, application software, and printer.",
  choise3: "RAM, ROM, ALU, clock, and registers.",
  answer: 1},
  {question: "Multiplexer “data select” inputs control:",
  choise1: "which input will be switched to the output.",
  choise2: "when the inputs will be clocked to the output.",
  choise3: "how many inputs will be switched to the output.",
  answer: 1},
  {question: "Where are the Flight Director pitch and roll bars or ‘V-Bars’ typically displayed?",
  choise1: "On the Electronic Attitude Direction Indicator (EADI)",
  choise2: "On the Electronic Horizontal Situation Indicator (EHSI)",
  choise3: "Electronic Centralised Aircraft Monitoring Display Unit (ECAM DU)",
  answer: 1},
  {question: "In a computer, the arithmetic and logic unit is:",
  choise1: "basically a combined logic element that can do both arithmetic and logic operations on integer numbers.",
  choise2: "a logic element that arithmetically converts high level programming language into computer code.",
  choise3: "additional hardware that can be added to the computer to increase arithmetic and logic calculations.",
  answer: 1},
  {question: "Mathematical calculations such as addition and subtraction are executed by the:",
  choise1: "register.",
  choise2: "arithmetic logical unit.",
  choise3: "control bus.",
  answer: 2},
  {question: "A triangle with a single input and a “o” on the output (right hand side corner of the triangle) is the symbol for a:",
  choise1: "“NOR” gate.",
  choise2: "“NOT” gate.",
  choise3: "“NAND” gate.",
  answer: 2},
  {question: "On a typical EFIS cockpit display, aircraft airspeed is indicated on the:",
  choise1: "PFD.",
  choise2: "ND.",
  choise3: "EICAS.",
  answer: 1},
  {question: "Single mode optical fibre:",
  choise1: "is usually used for long distance communications.",
  choise2: "uses incandescent lamps as the light source.",
  choise3: "is only used to manufacture patch cords.",
  answer: 1},
  {question: "How many lines can a 4-bit word address?",
  choise1: "16",
  choise2: "4",
  choise3: "256",
  answer: 1},
  {question: "A register is:",
  choise1: "an application subroutine.",
  choise2: "an external computer interface.",
  choise3: "a temporary storage location.",
  answer: 3},
  {question: "Aircraft speeds are displayed on the:",
  choise1: "EFIS display.",
  choise2: "EICAS display.",
  choise3: "ECAM display.",
  answer: 1},
  {question: "Which one of the following logic gates produces a high output when all inputs are low?",
  choise1: "NAND gate",
  choise2: "NOR gate",
  choise3: "Exclusive OR gate",
  answer: 1},
  {question: "An electrostatic discharge is caused by:",
  choise1: "electronic equipment being disconnected from the electrical system when the battery is still connected.",
  choise2: "the static discharge current created when the battery is disconnected.",
  choise3: "the transfer of a static electricity charge between two objects at different electrical potentials.",
  answer: 3},
  {question: "Static dischargers are usually connected to the:",
  choise1: "nose cone and leading edge of the primary flight control surfaces.",
  choise2: "fuselage and engine cowling.",
  choise3: "trailing edges of the primary flight control surfaces.",
  answer: 3},
  {question: "A two input NAND gate will have a low output when both of the inputs are:",
  choise1: "high.",
  choise2: "low.",
  choise3: "different.",
  answer: 1},
  {question: "A two input OR gate will have a low output when both of the inputs are:",
  choise1: "high.",
  choise2: "low.",
  choise3: "different.",
  answer: 2},
  {question: "Which one of the following types of cockpit display could experience an implosion if the screen is broken?",
  choise1: "LCD display",
  choise2: "Plasma display",
  choise3: "CRT display",
  answer: 3},
  {question: "The function of a “NOT” gate is to:",
  choise1: "invert the input condition.",
  choise2: "prevent loading on the output.",
  choise3: "disable the output.",
  answer: 1},
  {question: "A decoder that controls 256 separate outputs requires a device with a minimum of:",
  choise1: "8 input lines.",
  choise2: "16 input lines.",
  choise3: "128 input lines.",
  answer: 1},
  {question: "The purpose of the “parity bit” in communicating a group of bits from one system to another is to:",
  choise1: "tell whether there is an odd or even number of “1’s” in the group.",
  choise2: "provide a “word mark” to show that the character is the first of a group read together.",
  choise3: "warn the receiving unit that the message to follow contains an extra bit to detect errors in transmission.",
  answer: 3},
  {question: "The preferred way of joining a fibre-optic cable is by:",
  choise1: "a fusion splice.",
  choise2: "the application of an indexing gel.",
  choise3: "a mechanical splice.",
  answer: 1},
  {question: "An electronic flight indicating system (EFIS) control panel would include the:",
  choise1: "barometric altitude.",
  choise2: "captain’s display switching module.",
  choise3: "flight data recorder.",
  answer: 2},
  {question: "When making a fibre-optic termination, a microscope is used to:",
  choise1: "check the accuracy of a fusion splice.",
  choise2: "inspect the cable for cracks.",
  choise3: "inspect the end surface of a connector for flaws or dirt.",
  answer: 3},
  {question: "The shield on ARINC 429 cable should:",
  choise1: "be grounded at one end only.",
  choise2: "be grounded at both ends.",
  choise3: "not be grounded.",
  answer: 2},
  {question: "The voltage difference between the cathode and the anode of a colour cathode ray tube (CRT) screen is:",
  choise1: "approximately 400 volts.",
  choise2: "nominally 100 volts to 230 volts.",
  choise3: "greater than 10k volts.",
  answer: 3},
  {question: "In the Boolean statement F=(A+B)(C+D), if A = 1, B = 1, C = 1 and D = 0, then F must equal:",
  choise1: "1",
  choise2: "0",
  choise3: "2",
  answer: 1},
  {question: "To transmit several low bandwidth channels over a wide banthwidth channel requires the signals to be:",
  choise1: "amplified to the same voltage levels.",
  choise2: "modulated at the same frequency.",
  choise3: "multiplexed together.",
  answer: 2},
  {question: "The instrument system which displays hydraulic pressure is the:",
  choise1: "Electronic Horizontal Situation Indicator.",
  choise2: "Electronic Attitude Director Indicator.",
  choise3: "Engine Indication and Crew Alerting System.",
  answer: 3},
  {question: "Information which is being processed by a CPU is stored in the:",
  choise1: "registers.",
  choise2: "hard disk.",
  choise3: "peripheral devices.",
  answer: 1},
  {question: "Prior to servicing any Electro Static Discharge Sensitive component, a technician should:",
  choise1: "ensure no one else is working on the aircraft.",
  choise2: "wear a wrist strap connected to the aircraft electrical ground.",
  choise3: "unplug the battery cart from the aircraft.",
  answer: 2},
  {question: "For computing the position of an aircraft, the inertial navigation system measures:",
  choise1: "aircraft acceleration.",
  choise2: "airspeed.",
  choise3: "aircraft velocity.",
  answer: 3},
  {question: "The central processor unit of a computer consists of the:",
  choise1: "control, internal memory and the arithmetical logic unit.",
  choise2: "input/output devices and the external memory.",
  choise3: "arithmetical logic unit and the external memory.",
  answer: 1},
  {question: "Demultiplexer “data select” inputs control:",
  choise1: "which output line will be selected.",
  choise2: "when the inputs will be clocked to the output.",
  choise3: "how many inputs will be switched to the output.",
  answer: 1},
  {question: "EICAS (Engine Indication and Crew Alerting System) alert messages displayed on the aircraft upper display unit normally have how many levels?",
  choise1: "1",
  choise2: "2",
  choise3: "3",
  answer: 3},
  {question: "A flight management computer is an example of target:",
  choise1: "software.",
  choise2: "hardware.",
  choise3: "database.",
  answer: 3},
  {question: "The electrostatic “susceptibility symbol” is a:",
  choise1: "triangle, a reaching hand, and a slash through the reaching hand.",
  choise2: "red “X” on a white background.",
  choise3: "red “X” on a black background.",
  answer: 1},
  {question: "Timing for a CPU is generated from the:",
  choise1: "software.",
  choise2: "control bus.",
  choise3: "clock signal.",
  answer: 3},
  {question: "The illumination of a “carrier loss warning light” would probably indicate a:",
  choise1: "break in a fibre optic cable.",
  choise2: "loss of primary power.",
  choise3: "loss of information from the primary sensors.",
  answer: 3},
  {question: "A decoder with outputs of 0 to 7 requires:",
  choise1: "3 data select lines.",
  choise2: "2 data select lines.",
  choise3: "8 data select lines.",
  answer: 1},
  {question: "An eight-line multiplexer requires:",
  choise1: "eight data select control inputs.",
  choise2: "three data select control inputs.",
  choise3: "one data select control input.",
  answer: 2},
  {question: "An electronic attitude direction indicator (EADI) uses:",
  choise1: "an electronic display.",
  choise2: "an electro-mechanical display.",
  choise3: "a mechanical compass display system.",
  answer: 2},
  {question: "Information is transported to a CPU for processing by the:",
  choise1: "address bus.",
  choise2: "data bus.",
  choise3: "control bus.",
  answer: 2},
  {question: "Do all flip-flops in a register receive the same clock signal?",
  choise1: "Yes",
  choise2: "No",
  choise3: "Only in the case of shift registers.",
  answer: 1},
  {question: "Decoding of the two least significant bits would produce:",
  choise1: "a single output.",
  choise2: "two different outputs.",
  choise3: "four different outputs.",
  answer: 3},
  {question: "Turbine engine speed is usually indicated by:",
  choise1: "percentage.",
  choise2: "revolutions per second.",
  choise3: "revolutions per minute.",
  answer: 3},
  {question: "An ‘interrupt’ in computer technology is a:",
  choise1: "momentary but correctable break in communication between the CPU and an external device.",
  choise2: "signal that instructs the computer to perform a higher priority function.",
  choise3: "short delay in transmission to allow data synchronisation.",
  answer: 1},
  {question: "An electronic flight instrument system (EFIS) would normally present which of the following data to the flight crew?",
  choise1: "Attitude and navigation data.",
  choise2: "Attitude and engine data.",
  choise3: "Attitude and communication data.",
  answer: 1},
  {question: "The hexadecimal number that follows 9 is:",
  choise1: "A.",
  choise2: "10.",
  choise3: "F.",
  answer: 1},
  {question: "In microprocessors, the clock signal is:",
  choise1: "the master signal used for the pilot’s cockpit clock.",
  choise2: "the timing generator within the microprocessor.",
  choise3: "a device for measuring airframe hours",
  answer: 2},
  {question: "The strength in a fibre optic cable is provided by:",
  choise1: "having multiple fibre optic cores within the same cable sheath.",
  choise2: "a steel wire situated in the middle of the cable.",
  choise3: "an external steel catenary wire to support the fibre optic cable.",
  answer: 3},
  {question: "The main optical sources used in fibre optic transmission are:",
  choise1: "light emitting and laser diodes.",
  choise2: "low voltage quartz halogen bulbs and laser diodes.",
  choise3: "low voltage quartz halogen bulbs and light emitting diodes.",
  answer: 1},
  {question: "The binary representation of the decimal number 2 is:",
  choise1: "10.",
  choise2: "01.",
  choise3: "11.",
  answer: 1},
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 72; //For CAT B2, total number of questions is 52.

startGame = () => {
  questionCounter = 0;
  score = 0;
  //SAR66 each topic scores
  localStorage.setItem("maxMark", MAX_QUESTIONS);
  availableQuesions = [...questions];
  quizname.innerText = `M5: Digital`;
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