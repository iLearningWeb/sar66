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
  {question: "Poor performance can be a result of narrowing our attention, to only key information. Narrowing of attention can be caused by:",
  choice1: "complacency",
  choice2: "boredom",
  choice3: "over aroused",
  answer: 3},
  {question: "The main hazard when working on an aircraft in cold condition is that:",
  choice1: "fingers can become numb, reducing the engineer’s ability to perform precise task.",
  choice2: "frostbite may affect fingers.",
  choice3: "fuel, oils and lubricants may freeze so preventing the performance of some maintenance tasks.",
  answer: 1},
  {question: "The achievement of air maintenance engineering safety standards depends mainly on the:",
  choice1: "effectiveness of the company’s safety program.",
  choice2: "technical competence of the company management.",
  choice3: "competence and attitude of maintenance engineers",
  answer: 1},
  {question: "A hazard warning sign advising of “DANGER”, would have which one of the following backgrounds?",
  choice1: "Yellow and black",
  choice2: "Red, black and white",
  choice3: "Red and green",
  answer: 1},
  {question: "When a new type of aircraft is introduce into the fleet, it is normally the responsibility of the:",
  choice1: "engineer to find a suitable course of training then take annual leave to attend the courses.",
  choice2: "company to provide appropriate training and allow staff time off to undertake the training.",
  choice3: "aircraft manufacturer to provide the training with engineer taking leave to attend the courses.",
  answer: 2},
  {question: "What does the term “group polarisation” mean?",
  choice1: "An individual is isolated from the group.",
  choice2: "The group can not agree on a decision.",
  choice3: "A group tends to make decisions that are more extreme than an individual member’s original position.",
  answer: 3},
  {question: "The three interacting components of the working environment are:",
  choice1: "physical environment, social environment, tasks.",
  choice2: "social environment, physical environment, stimuli.",
  choice3: "social environment, regulator environment, hazard.",
  answer: 1},
  {question: "Murphy’s Law can be recorded as the notion that:",
  choice1: "If something that can go wrong, it will.",
  choice2: "Of course, at least we tell ourselves the interest.",
  choice3: "We should try eventually help will come.",
  answer: 1},
  {question: "If an engineer forgot to replace all of the screws in a wing panel and the aircraft was released to service, this would be regard as a:",
  choice1: "lapse.",
  choice2: "slip.",
  choice3: "violation.",
  answer: 1},
  {question: "It is common for people age above 40 years to wear glasses when:",
  choice1: "reading safety signs posted around the hangar.",
  choice2: "reading maintenance manual and checklists while working on aircraft.",
  choice3: "seeing control tower signals when towing aircraft to the run up area.",
  answer: 2},
  {question: "If you are told that you are a “motivated person”, this would mean that you:",
  choice1: "like to do work beyond your capability.",
  choice2: "readily do the work that you are capable of doing.",
  choice3: "always do the right thing.",
  answer: 2},
  {question: "A Circadian rhythm is:",
  choice1: "the slow-wave sleep stages that relate to body restoration.",
  choice2: "the physiological and behavioural function that has a regular cycle of approximately one day.",
  choice3: "a rolling shift work pattern that has the least adverse affect on sleep deficit.",
  answer: 2},
  {question: "A person with defective color version may not be able to distinguish between the colour.",
  choice1: "red and green",
  choice2: "white and black",
  choice3: "red and yellow",
  answer: 1},
  {question: "The responsibility for the engineers to keep their skills and knowledge up-to-date:",
  choice1: "lies solely on the individual engineer.",
  choice2: "lies on the individual engineer and the organisation for which they work.",
  choice3: "is most important when working on a new aircraft type.",
  answer: 2},
  {question: "If an engineer forgot to replace the inspection plugs after a borescope inspection on a turbine engine, this would be regarded as a:",
  choice1: "mistake.",
  choice2: "lapse.",
  choice3: "violation.",
  answer: 2},
  {question: "In a maintenance organisation the most important function of the shift supervisor is to:",
  choice1: "act as back-up engineer in case of staff shortages.",
  choice2: "ensure that adequate resources are available for staff to carry out their tasks.",
  choice3: "maintain discipline and report any breaches of company standard to carry out their tasks.",
  answer: 2},
  {question: "Which of the following is the correct wording for a hazard warning sign?",
  choice1: "Danger - Electric Shock - Keep Out.",
  choice2: "Electric Shock - Wear Protective Clothing - Know CPR.",
  choice3: "Keep out - Danger - Refer to Hazard Register.",
  answer: 1},
  {question: "How can the safety culture of an organisation be best judged?",
  choice1: "By looking at what is done rather than what is said in an organisation.",
  choice2: "By auditing the organisation’s procedure and paperwork.",
  choice3: "By monitoring the organization’s safety system.",
  answer: 1},
  {question: "Which statement is true of the “Error Chain” Model?",
  choice1: "A broken link in the error chain may cause an accident.",
  choice2: "A broken link in the error chain may prevent an accident.",
  choice3: "A broken link in the error chain is due to poor maintenance.",
  answer: 2},
  {question: "A likely consequence of carrying out a visual inspection when feeling tired or fatigued is that:",
  choice1: "vision will be less sharp.",
  choice2: "vision will be too sensitive.",
  choice3: "a blind spot will occur.",
  answer: 3},
  {question: "While working as part of a team has a member of potential benefit, a disadvantage you may feel is :",
  choice1: "having to share the rewards for good performance with other team members.",
  choice2: "a lack of personal achievement.",
  choice3: "a feeling of pressure to adhere to the group’s views.",
  answer: 3},
  {question: "When carrying out an inspection that may take a considerable time, it is best to:",
  choice1: "not take a break but fully concentrate until the inspection is completed.",
  choice2: "take a short break when small elements of the inspection task have been completed.",
  choice3: "pause for regular breaks at any time during the inspection process.",
  answer: 2},
  {question: "When a flying control system is deactivated for maintenance, the engineer must:",
  choice1: "place a notice on the hangar notice board advising the status of the control system.",
  choice2: "place adequate placards in key locations.",
  choice3: "verbally advice the shift manager and all other members of the shift.",
  answer: 2},
  {question: "What is most important before beginning a new task?",
  choice1: "Making sure you have the correct manuals.",
  choice2: "Proper planning.",
  choice3: "Checking with your supervisor.",
  answer: 1},
  {question: "The responsibility for assessing your day-to-day fitness for work as a licensed aircraft maintenance engineer rests with:",
  choice1: "your doctor.",
  choice2: "yourself.",
  choice3: "your supervisor.",
  answer: 2},
  {question: "If the ladder you are using to inspect inside an engine pylon is unsteady, you may:",
  choice1: "be unable to concentrate on performing the inspection task properly.",
  choice2: "require another person to carry out a second inspection.",
  choice3: "need to stop the inspection and get your supervisor to complete the inspection.",
  answer: 1},
  {question: "What constitutes a good work handover?",
  choice1: "A written document of the work done.",
  choice2: "A verbal account of the work done.",
  choice3: "A written documentation and verbal account of the work done.",
  answer: 3},
  {question: "What is the minimum time weighted average (TWA) noise level considered hazardous?",
  choice1: "85 dB for 8 hours",
  choice2: "80 dB for 4 hours",
  choice3: "140 dB for 8 hours",
  answer: 1},
  {question: "An error most commonly known as a “slip” is most likely to occur:",
  choice1: "When a maintenance task is actually being performed",
  choice2: "When a maintenance task is in the planning stage",
  choice3: "At management level when major decisions are being made",
  answer: 1},
  {question: "If an engineer is having trouble distinguishing between blue and yellow wire in an electrical loom, it is probable that the person is suffering from:",
  choice1: "forgetfulness.",
  choice2: "an inner ear infection.",
  choice3: "a form of colour blindness.",
  answer: 3},
  {question: "Previous studies show the percentage of accidents due to maintenance and inspection deficiencies is about:",
  choice1: "98 percent.",
  choice2: "33 percent.",
  choice3: "12 percent.",
  answer: 3},
  {question: "It is important that the engineer working away from base at line stations familiarise themselves with new work-related information:",
  choice1: "on a regular basis.",
  choice2: "once a year.",
  choice3: "only on return to base.",
  answer: 1},
  {question: "What is the main danger when performing repetitive tasks?",
  choice1: "Not consulting the Maintenance Manual or Job card",
  choice2: "Not using adequate lighting",
  choice3: "Performing the task too quick",
  answer: 1},
  {question: "Identify the factor that would provide the greatest health benefit to a person in terms of maintaining personal fitness.",
  choice1: "Stop smoking altogether",
  choice2: "Take a walk twice a week",
  choice3: "Stop the consumption of alcohol",
  answer: 1},
  {question: "When performing inspection tasks high up on the aircraft structure to reduce fear of height and allow concentration on the job it is best to:",
  choice1: "Wear non-slip shoes",
  choice2: "Use harness and safety rope",
  choice3: "Have another engineer work with you",
  answer: 2},
  {question: "If an aircraft engineer makes an inadvertent error, he should:",
  choice1: "expect to be punished by his supervisor.",
  choice2: "dismiss it as just a fact of life as everyone makes mistakes.",
  choice3: "own up to it, correct the cause of the problem.",
  answer: 3},
  {question: "A situation where you find that your attention is divided because you have been asked to do two jobs at once will probably result in:",
  choice1: "both being performed equally well.",
  choice2: "one not being performed as well as the other.",
  choice3: "both not being finished on time.",
  answer: 2},
  {question: "Which of the following signs displayed in a hangar would warn of the greatest risk to personal safety?",
  choice1: "Caution.",
  choice2: "Danger.",
  choice3: "Attention.",
  answer: 2},
  {question: "In a Supervisory Role, it is important to:",
  choice1: "strike the right balance between carrying out your supervisory duties and maintaining your engineering skills and knowledge.",
  choice2: "know all your team members personally.",
  choice3: "be involved in all tasks personally within your team.",
  answer: 1},
  {question: "The responsibility for providing a written statement of general policy with respect to health and safety in the workplace rests with:",
  choice1: "the Occupational Safety and Health Authority.",
  choice2: "senior management of the company.",
  choice3: "company employees.",
  answer: 1},
  {question: "In the SHEL Model, study of Human Factor in people is:",
  choice1: "Liveware.",
  choice2: "Hardware.",
  choice3: "Software.",
  answer: 1},
  {question: "If there is a hazard area within the working place, what you do?",
  choice1: "Stay 2 metres away from the hazard area.",
  choice2: "Identify the “Red and White” label.",
  choice3: "Read the details of the Hazard and define the information.",
  answer: 3},
  {question: "Latent Failure",
  choice1: "Failure occuring at design stage",
  choice2: "Action which can result in active failure at latter time",
  choice3: "???",
  answer: 2},
  {question: "Good communication at the workplace is important for a job to be carried out effectively. Good communication will be hindered at the shop area because",
  choice1: "there are too many bosses to give instruction",
  choice2: "instruction will be difficult to provide for the many foreign workers",
  choice3: "the people in-charge does not know how to give proper instructions",
  answer: 1},
  {question: "Your maintenance organization has decided to increase your current shift from 8 to 12 hours per day (plus meals breaks) to meet new maintenance demands. In order to minimize biological effects on the shift workers, it would be best to",
  choice1: "Start at 4am and finish at 5pm",
  choice2: "Extend the existing shift hours to cover the period 8am to 9pm",
  choice3: "Start at 6am and finish at 7pm",
  answer: 1},
  {question: "When doing a job that require repetitive carrying of heavy objects, the force that can be applied in any given posture is dependent on the strength available and",
  choice1: "the weight of the object.",
  choice2: "the mechanical advantage provided by the position of the load, muscle connections and joints.",
  choice3: "the friction between the sliding surfaces.",
  answer: 2},
  {question: "In Human Factor, violation means:",
  choice1: "deliberate illegal action",
  choice2: "unintentional illegal action",
  choice3: "combination of deliberate and unintentional illegal action",
  answer: 1},
  {question: "Error management in an organization is aimed to seek:",
  choice1: "eliminate human error and contain the effect of error that occurs.",
  choice2: "accountable for all error incident through error reporting system",
  choice3: "prevent human error and eliminate……",
  answer: 3},
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 20; //For CAT B2, total number of questions is 52.

startGame = () => {
  questionCounter = 0;
  score = 0;
  //SAR66 each topic scores
  localStorage.setItem("maxMark", MAX_QUESTIONS);
  availableQuesions = [...questions];
  quizname.innerText = `M7: Maintenance`;
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
