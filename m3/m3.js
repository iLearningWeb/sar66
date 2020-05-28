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
  {question: "A square wave is composed of:",
  choice1: "Sine waves of all harmonic frequencies except the fundamental.",
  choice2: "A sine wave of fundamental frequencies plus sine waves of  even harmonic frequencies.",
  choice3: "Sines waves of odd harmonic and fundamental frequency.",
  answer: 3},
  {question: "A typical static electricity voltage generated by an aircraft in flight is:",
  choice1: "28 volts.",
  choice2: "2000000 volts.",
  choice3: "20000 volts.",
  answer: 3},
  {question: "During discharge, a NiCad battery will:",
  choice1: "Absorb electrolyte into the plates.",
  choice2: "Release electrolyte from the plates.",
  choice3: "Release oxygen from the negative plates.",
  answer: 3},
  {question: "If a transformer has more turns in its secondary winding than in its primary winding, it will:",
  choice1: "Get over-heated.",
  choice2: "Step-up the primary voltage.",
  choice3: "Step-down the primary voltage.",
  answer: 2},
  {question: "An AC supply of 1000v peak has the same heating value as:",
  choice1: "1000V DC.",
  choice2: "70.7V DC.",
  choice3: "707V DC.",
  answer: 3},
  {question: "For Conductance, the unit is:",
  choice1: "Siemen, the symbol is G.",
  choice2: "Siemen, the symbol is S.",
  choice3: "Conductance, symbol is G.",
  answer: 1},
  {question: "Good electrical insulators have:",
  choice1: "many free electrons.",
  choice2: "few free electrons.",
  choice3: "no free electrons.",
  answer: 3},
  {question: "A material that can be strongly magnetized is called:",
  choice1: "ferromagnetic.",
  choice2: "diamagnetic.",
  choice3: "paramagnetic.",
  answer: 1},
  {question: "Heat generated in a current-carrying conductor:",
  choice1: "varies with square of the current flow.",
  choice2: "varies with square of conductor resistance.",
  choice3: "does not change with changes in current flowing through the conductor.",
  answer: 1},
  {question: "The properties of a material that allows the passage for magnetic flux lines is known as its:",
  choice1: "hysteresis.",
  choice2: "permeability.",
  choice3: "coercivity.",
  answer: 2},
  {question: "In a capacitor, if the plate area is increased and the distance between the plates is decreased, capacitance will:",
  choice1: "increase.",
  choice2: "decrease.",
  choice3: "remain the same.",
  answer: 1},
  {question: "To produce torque on an induction motor, it requires:",
  choice1: "the motor must turn at synchronous speed.",
  choice2: "must have ‘slip’.",
  choice3: "the rotor must have a DC supply to set up a magnetic field.",
  answer: 2},
  {question: "Two resistors of 4 ohms and 10 ohms are connected in parallel in a circuit. If a current of 5 amperes flows through the 4 ohm resistor, the current flowing through the 10 ohm resistor will be:",
  choice1: "2 amperes.",
  choice2: "12.5 amperes.",
  choice3: "5 amperes.",
  answer: 1},
  {question: "When an engine drives a generator, what energy conversion takes place?",
  choice1: "Potential to kinetic.",
  choice2: "Pressure to potential.",
  choice3: "Mechanical to electrical.",
  answer: 3},
  {question: "As the temperature of copper wire increases, its resistance to current flow will:",
  choice1: "increase.",
  choice2: "decrease.",
  choice3: "remains the same.",
  answer: 1},
  {question: "In a practical 3-phase AC circuit, if the load in one phase shows more or less than the other phases, then the load is:",
  choice1: "balanced.",
  choice2: "unbalanced.",
  choice3: "neutral.",
  answer: 2},
  {question: "Capacitance is known as the:",
  choice1: "ability to discharge electrical energy.",
  choice2: "ability to store electrical energy.",
  choice3: "capacity for storing an electrical current.",
  answer: 2},
  {question: "In an avionics circuit, a band-pass filter consists of:",
  choice1: "a high-pass filter and a low-pass filter in parallel.",
  choice2: "a high-pass filter in series and a low-pass filter in parallel.",
  choice3: "a high-pass filter and a low-pass filter in series.",
  answer: 3},
  {question: "Armature reaction in a DC generator:",
  choice1: "increases with an increase in the load.",
  choice2: "reduces with an increase in the load.",
  choice3: "remains unaffected by changes to the load.",
  answer: 1},
  {question: "An electromotive force can be produced by:",
  choice1: "placing a conductor in a varying electrostatic field.",
  choice2: "moving a conductor across a magnetic field.",
  choice3: "placing a conductor in a stationary magnetic field.",
  answer: 2},
  {question: "In Magnetism, saturation means:",
  choice1: "a magnet cannot be demagnetized.",
  choice2: "a magnet cannot be further magnetized.",
  choice3: "a material cannot be magnetized.",
  answer: 2},
  {question: "The total resistance of a circuit containing 5 resistors connected in series is:",
  choice1: "the sum of the reciprocals of the individual resistances.",
  choice2: "the average of the 5 resistances.",
  choice3: "the sum of the resistances.",
  answer: 3},
  {question: "If electrical energy is transferred from one coil to another by a magnetic field, the component is known as:",
  choice1: "an inductor.",
  choice2: "a resistor.",
  choice3: "a transformer.",
  answer: 3},
  {question: "To change the direction of the force acting on a current carrying conductor in a magnetic field:",
  choice1: "the conductor should be bent.",
  choice2: "the direction of the current through the conductor is reversed.",
  choice3: "a permanent magnet is used.",
  answer: 2},
  {question: "The impedance of a series R-L-C circuit at resonance is purely:",
  choice1: "inductive.",
  choice2: "capacitive.",
  choice3: "resistive.",
  answer: 3},
  {question: "Two parallel conductors in close proximity, carrying current in the same direction will:",
  choice1: "repel each other.",
  choice2: "attract each other.",
  choice3: "have no effect on each other.",
  answer: 2},
  {question: "Ohm’s law states that the current flow in a circuit is:",
  choice1: "directly proportional to the potential applied.",
  choice2: "directly proportional to the resistance of the circuit.",
  choice3: "inversely proportional to the potential applied.",
  answer: 1},
  {question: "The ability of a magnet to retain magnetic flux is called:",
  choice1: "reluctance",
  choice2: "retentivity",
  choice3: "resistance",
  answer: 2},
  {question: "A brushless AC generator has:",
  choice1: "a set of permanent magnets located on the stationary member.",
  choice2: "a set of permanent magnets located on the rotating member.",
  choice3: "electromagnets using external DC source for initial excitation.",
  answer: 1},
  {question: "To provide magnetic shielding to a component, the shield must have:",
  choice1: "good permeability.",
  choice2: "good reluctance.",
  choice3: "a smooth surface.",
  answer: 1},
  {question: "Wire-wound variable resistors are normally used to control:",
  choice1: "large voltages.",
  choice2: "small currents.",
  choice3: "large currents.",
  answer: 3},
  {question: "A coil carrying an alternator current will induce ______ back into the coil.",
  choice1: "a current",
  choice2: "an emf",
  choice3: "heat",
  answer: 2},
  {question: "The insulating material on an electrical wire:",
  choice1: "allows the current to flow in one direction only.",
  choice2: "prevents the current flowing to another conductor.",
  choice3: "reduces voltage drop in the conductor.",
  answer: 2},
  {question: "If a constant-current charger is used for recharging a 40-Ah nickel-cadmium battery, the applied charge should be:",
  choice1: "8 amps for 5 hours.",
  choice2: "8 amps for 7 hours.",
  choice3: "4 amps for 10 hours.",
  answer: 1},
  {question: "The poles of a magnet are the regions where the:",
  choice1: "magnetic lines of force are most concentrated.",
  choice2: "magnetic lines of force are least concentrated.",
  choice3: "dielectric effect is m",
  answer: 1},
  {question: "A simple power supply filter consists of:",
  choice1: "a large value inductor connected in parallel with the rectifier output.",
  choice2: "a large value capacitor connected in parallel with the rectifier output.",
  choice3: "an inductor and small value capacitor connected in series with the rectifier output.",
  answer: 2},
  {question: "In an AC circuit, the current in a pure inductor:",
  choice1: "leads the applied voltage.",
  choice2: "lags the applied voltage.",
  choice3: "is in phase with the applied voltage.",
  answer: 2},
  {question: "A fully charged Ni-Cad battery measures a SG of 1.275. When measured at 1.263 at 90 degrees Fahn, what is the status of the battery?",
  choice1: "Fully charged",
  choice2: "90% charged",
  choice3: "80% charged",
  answer: 1},
  {question: "In comparing an AC voltage to a DC voltage, the AC value to be considered is the:",
  choice1: "effective value.",
  choice2: "peak value.",
  choice3: "average value.",
  answer: 1},
  {question: "A DC power supply has an internal resistance of 2 ohms and an open circuit output voltage of 12volts. What is the output voltage if the supply is connected to a 10 ohm load?",
  choice1: "8 V",
  choice2: "10 V",
  choice3: "12 V",
  answer: 2},
  {question: "The power dissipated in a resistive circuit:",
  choice1: "product of current and voltage.",
  choice2: "product of current and voltage and resistance.",
  choice3: "product of current and resistance.",
  answer: 1},
  {question: "The amount of heat produced by an electrical heater depends on the:",
  choice1: "weight of the heating element.",
  choice2: "current flow through the heating element.",
  choice3: "temperature difference between the terminals.",
  answer: 2},
  {question: "Electrical current is generated in a thermocouple by:",
  choice1: "pressure.",
  choice2: "heat.",
  choice3: "chemical action.",
  answer: 2},
  {question: "The force that creates the flow of current in an electrical circuit is known as:",
  choice1: "magnetomotive force.",
  choice2: "electromagnetic force.",
  choice3: "electromotive force.",
  answer: 2},
  {question: "An advantage of AC over DC for aircraft use is that:",
  choice1: "voltage can be easily transformed.",
  choice2: "radio interference is eliminated.",
  choice3: "the need for electrical bonding is eliminated.",
  answer: 1},
  {question: "If an AC wave completed 50 cycles in 1 second, the frequency is said to be:",
  choice1: "25 Hz.",
  choice2: "50 Hz.",
  choice3: "100 Hz.",
  answer: 2},
  {question: "The resistance between two points A and B in a circuit is 30ohms. On adding a resistor between A and B, the resistance to 20 Ohms. The resistance of the added resistor is:",
  choice1: "60 Ohms.",
  choice2: "10 Ohms.",
  choice3: "50 Ohms.",
  answer: 1},
  {question: "The unit of capacitance is the:",
  choice1: "henry.",
  choice2: "farad.",
  choice3: "coulomb.",
  answer: 2},
  {question: "The frequency of A.C. is measured in:",
  choice1: "coulombs.",
  choice2: "hertz.",
  choice3: "henrys.",
  answer: 2},
  {question: "The capacity of a battery is expressed in:",
  choice1: "amperes.",
  choice2: "ampere hours.",
  choice3: "watt hours.",
  answer: 2},
  {question: "If 4 identical cells are connected in series and each is rated at 3V, the total voltage of the battery is:",
  choice1: "27 V",
  choice2: "12 V",
  choice3: "7 V",
  answer: 2},
  {question: "Static charges on a flat conducting surface:",
  choice1: "are uniformly distributed.",
  choice2: "are concentrated at one point.",
  choice3: "leave the surface immediately.",
  answer: 1},
  {question: "If two batteries are connected in parallel, the circuit voltage:",
  choice1: "decrease.",
  choice2: "remain the same.",
  choice3: "increase.",
  answer: 2},
  {question: "Static electricity is produced by:",
  choice1: "friction.",
  choice2: "light.",
  choice3: "magnetism.",
  answer: 1},
  {question: "In a primary cell:",
  choice1: "electricity energy is produced from heat energy.",
  choice2: "electricity energy is produced from mechanical energy.",
  choice3: "electricity energy is produced from chemical energy.",
  answer: 3},
  {question: "Static electrical on an irregular shaped object is:",
  choice1: "greatest its center off mass.",
  choice2: "distributed uniformly on the surface.",
  choice3: "greatest at its points of sharpest curvature.",
  answer: 3},
  {question: "The smallest particle of an element having the same properties as the element is:",
  choice1: "a molecule.",
  choice2: "an atom.",
  choice3: "an electron.",
  answer: 2},
  {question: "The frequency of a electrical power is:",
  choice1: "the time taken to complete one full cycle.",
  choice2: "the number of cycles per second.",
  choice3: "a set of positive & negative values of A.C.",
  answer: 2},
  {question: "In a brushless alternator, the diodes are located on:",
  choice1: "the rotor assembly.",
  choice2: "the stator assembly.",
  choice3: "both the rotor and stator assemblies.",
  answer: 1},
  {question: "Electricity produced by pressure is known as the:",
  choice1: "triboelectric effect.",
  choice2: "thermoelectric effect.",
  choice3: "piezoelectric effect.",
  answer: 3},
  {question: "Electron flow:",
  choice1: "occurs when there is no potential different.",
  choice2: "always from positive to negative.",
  choice3: "is opposite to conventional current flow.",
  answer: 3},
  {question: "The specific gravity of the electrolyte in a fully charged lead-acid battery should be:",
  choice1: "1.280.",
  choice2: "1.175.",
  choice3: "1.200.",
  answer: 1},
  {question: "The electrolyte in the nickel cadmium battery is:",
  choice1: "cadmium hydroxide.",
  choice2: "sulphuric acid.",
  choice3: "potassium hydroxide.",
  answer: 3},
  {question: "The smallest particle that a compound can be reduced to and still retain its property is called:",
  choice1: "a neutron.",
  choice2: "an atom.",
  choice3: "a molecule.",
  answer: 3},
  {question: "Which of the following types of battery will indicate its state of charge when the specific gravity of the electrolyte is measured?",
  choice1: "Lead acid.",
  choice2: "Ni-cad",
  choice3: "Dry cell",
  answer: 1},
  {question: "An autotransformer:",
  choice1: "provides electrical isolation between input and output.",
  choice2: "has the same winding for both the primary and secondary.",
  choice3: "has more primary and secondary windings than an isolation transformer.",
  answer: 2},
  {question: "Which one of the following devices is used to protect equipment from an external magnetic influence?",
  choice1: "A magnetic shield",
  choice2: "A magnetic insulation",
  choice3: "A megger.",
  answer: 1},
  {question: "One lead-acid cell has a nominal voltage of :",
  choice1: "2V",
  choice2: "4V",
  choice3: "1.2V",
  answer: 3},
  {question: "In a transformer, the core is laminated to:",
  choice1: "reduce eddy current losses.",
  choice2: "increase current flow in the secondary windings.",
  choice3: "increase the output voltage.",
  answer: 1},
  {question: "Which motor has high starting torque and is relative easy to control the speed?",
  choice1: "Series wound.",
  choice2: "Shunt wound.",
  choice3: "Compound Wound.",
  answer: 3},
  {question: "The unit of electrical potential is the:",
  choice1: "voltage.",
  choice2: "coulomb.",
  choice3: "ampere.",
  answer: 1},
  {question: "When a negatively charged rubber rod is held close to an aluminum rod, without touching it:",
  choice1: "the aluminum rod will not be affected.",
  choice2: "negative charges in the aluminum rod will be attracted by the rubber rod.",
  choice3: "the aluminum rod will have positive charges at the end near the rubber rod.",
  answer: 3},
  {question: "An ion of an atom will have:",
  choice1: "the same number of electrons but less protons.",
  choice2: "the same number of protons but a different number of electrons.",
  choice3: "fewer number of electrons but more protons.",
  answer: 2},
  {question: "A primary cell:",
  choice1: "must be used together with a battery charger.",
  choice2: "can be recharged after use.",
  choice3: "cannot be recharged.",
  answer: 3},
  {question: "The electrical current in a wire is a measure of the:",
  choice1: "total charge present in the wire.",
  choice2: "number of protons in the nucleus of the atoms.",
  choice3: "number of electrons that pass a given point in one second.",
  answer: 3},
  {question: "A thermocouple produces electricity from:",
  choice1: "heat.",
  choice2: "light.",
  choice3: "mechanical energy.",
  answer: 1},
  {question: "A voltmeter put across a functioning component in a open circuit will read:",
  choice1: "the battery voltage.",
  choice2: "zero.",
  choice3: "total voltage drop across the circuit.",
  answer: 2},
  {question: "The total resistance for 10 ohms, 25 ohms, 50 ohms in a parallel circuit is:",
  choice1: "6.25 ohms",
  choice2: "62.5 ohms",
  choice3: "80 ohms",
  answer: 1},
  {question: "In an inductance circuit, the voltage and current is ____ out of phase.",
  choice1: "0 degrees",
  choice2: "45 degrees",
  choice3: "90 degrees",
  answer: 3},
  {question: "Static electricity is generated and stored on:",
  choice1: "non-conductive materials and discharge to a ground source if available.",
  choice2: "conducting materials and discharges through wicks on the airframe.",
  choice3: "stationary surface and will discharge to non-conductive materials.",
  answer: 2},
  {question: "A filter that attenuates the higher frequencies is a:",
  choice1: "low-pass filter.",
  choice2: "high-pass filter.",
  choice3: "band-pass filter.",
  answer: 1},
  {question: "The voltage output of a DC generator is varied by changing the:",
  choice1: "speed.",
  choice2: "field current.",
  choice3: "no of turns in the field windings.",
  answer: 2},
  {question: "The strength of a permanent magnet is reduced when it is:",
  choice1: "placed in a DC field.",
  choice2: "vibrated or dropped.",
  choice3: "rubbed with a strong magnet in one direction only.",
  answer: 2},
  {question: "By doubling the distance between 2 charge particle, the force is:",
  choice1: "decrease by a factor of 2.",
  choice2: "decrease by a factor of 4.",
  choice3: "increase by a factor of 2.",
  answer: 2},
  {question: "If the cross-sectional area of a conductor is reduced, its resistance will:",
  choice1: "decrease.",
  choice2: "be unaffected.",
  choice3: "increase.",
  answer: 3},
  {question: "In a single-phase induction motor, the rotor is:",
  choice1: "powered by 28 volt DC.",
  choice2: "a permanent magnet.",
  choice3: "not connected to any source of power.",
  answer: 3},
  {question: "In a particular pulsed system, the peak power is 10 kilowatts and the average power 100 watt. The duty cycle of the system is:",
  choice1: "0.01.",
  choice2: "0.0001.",
  choice3: "0.001.",
  answer: 1},
  {question: "AC synchronous motors:",
  choice1: "operate at speeds below the speed of the magnetic field.",
  choice2: "rotate at the same speed as the magnetic field.",
  choice3: "operate at speeds above the speed of the magnetic field.",
  answer: 2},
  {question: "A thermocouple of an oil temperature bulb consists of:",
  choice1: "a temperature dependent resistor.",
  choice2: "two wires of different materials (copper and constantan) joined together.",
  choice3: "a bipolar junction transistor.",
  answer: 2},
  {question: "The strength of an electromagnet:",
  choice1: "is decreased when its air core is replaced by an iron core.",
  choice2: "is increased when the current through it is increased.",
  choice3: "is decreased when the number of turns is increased.",
  answer: 2},
  {question: "Which of the following is considered to be one AC cycle?",
  choice1: "Zero to peak to zero to peak to zero.",
  choice2: "Zero to peak to zero.",
  choice3: "Zero to peak to peak to zero.",
  answer: 1},
  {question: "The manganese dioxide which surrounds the positive electrode in a Leclanche dry cell acts as:",
  choice1: "an electrolyte.",
  choice2: "a negative electrode.",
  choice3: "a depolariser.",
  answer: 3},
  {question: "The practical unit of electrical energy consumed is the:",
  choice1: "kw (kilowatt).",
  choice2: "ampere-hour.",
  choice3: "kwh (kilowatt-hour).",
  answer: 3},
  {question: "If the pulse repetition frequency (PRF) of a radar system is 1000 pulses per second and the pulse width is 5 micro seconds, the resting period between pulses will equal:",
  choice1: "995 microseconds.",
  choice2: "995 milliseconds.",
  choice3: "5000 microseconds.",
  answer: 1},
  {question: "Negative ions are atoms with an excess of:",
  choice1: "electrons.",
  choice2: "protons.",
  choice3: "neutrons.",
  answer: 1},
  {question: "An 8-pole alternator is designed to produce 115 volts at 400 Hertz. Therefore, the design speed of the alternator is:",
  choice1: "6000 RPM.",
  choice2: "1600 RPM.",
  choice3: "3000 RPM.",
  answer: 1},
  {question: "In a rotating-armature alternator, the slip rings carry the:",
  choice1: "AC excitation current.",
  choice2: "AC output current.",
  choice3: "DC output current.",
  answer: 2},
  {question: "The capacitive reactance (Xc) increases with:",
  choice1: "an increase in frequency.",
  choice2: "an increase in voltage.",
  choice3: "the decrease in frequency.",
  answer: 3},
  {question: "The purpose of a rheostat in an electrical circuit is to:",
  choice1: "protect the circuit.",
  choice2: "discharge the static electricity.",
  choice3: "vary the current.",
  answer: 3},
  {question: "What is the total resistance if 2ohm, 10ohm and 5 ohm are connected in series?",
  choice1: "2 ohm",
  choice2: "0 ohm",
  choice3: "17 ohm",
  answer: 3},
  {question: "A current of resistance of 4 ohm carrying a current of 5 amp has a power of:",
  choice1: "20W",
  choice2: "80W",
  choice3: "100W",
  answer: 3},
  {question: "When ferrite cone is place in a coil, the flux density:",
  choice1: "increase due to the relative permeability of the core.",
  choice2: "increase due to the magnetism force.",
  choice3: "decrease due to the increased reluctance of the core.",
  answer: 1},
  {question: "In a parallel RC circuit, what is the phase relationship between voltage and current in the capacitor?",
  choice1: "Current leads voltage.",
  choice2: "Voltage leads current.",
  choice3: "They are in phase.",
  answer: 1},
  {question: "Electromagnet is defined as:",
  choice1: "permanent magnet.",
  choice2: "current thru the coil.",
  choice3: "a magnet in a current carrying coil.",
  answer: 3},
  {question: "A starter generator is normally employed in:",
  choice1: "gas turbine generator engine.",
  choice2: "reciprocating engine.",
  choice3: "ground power supply.",
  answer: 1},
  {question: "A length of resistance wire has to be placed to obtain 50% increase resistance, the new wire of the same material should have the same:",
  choice1: "diameter and increase 50% in length.",
  choice2: "length and increase 50% in diameter.",
  choice3: "length and decrease 50% in diameter.",
  answer: 1},
  {question: "True power in ac circuit express in term of:",
  choice1: "Watt.",
  choice2: "joule.",
  choice3: "Volt-amp.",
  answer: 1},
  {question: "The piezoelectric effect produces voltage by:",
  choice1: "magnetism.",
  choice2: "light.",
  choice3: "pressure.",
  answer: 3},
  {question: "A potentiometer is a:",
  choice1: "variable-resistance, three-terminal device.",
  choice2: "variable-current, two-terminal device.",
  choice3: "fixed-voltage, variable-current device.",
  answer: 1},
  {question: "Which motor has equal stator rotor speed?",
  choice1: "squirrel cage motor",
  choice2: "Synchronous motor",
  choice3: "Inductance motor",
  answer: 2},
  {question: "If 4amp exists in the circuit, the quantity of charge in 8 secs is:",
  choice1: "12c",
  choice2: "2c",
  choice3: "32c",
  answer: 3},
  {question: "Capacitor plates Q1 and Q2 are separated by a distance D. If the area of Q1 and Q2 are doubled, the force is:",
  choice1: "Increase by a factor of 2",
  choice2: "Increase by a factor of 4",
  choice3: "Decrease by a factor of 4",
  answer: 2},
  {question: "When discharging of lead acid batt:",
  choice1: "electrolytes dilutes.",
  choice2: "electrolytes does not dilute.",
  choice3: "electrolytes composition remain constant.",
  answer: 1},
  {question: "When discharging of nic-cad batt:",
  choice1: "Electrolytes dilutes.",
  choice2: "Electrolytes does not dilute.",
  choice3: "Electrolytes composition remain the same.",
  answer: 3},
  {question: "Paramagnetic permeability:",
  choice1: "Greater than unity.",
  choice2: "Less than unity.",
  choice3: "Equal to unity.",
  answer: 1},
  {question: "3 phase generator",
  choice1: "120 degree windings",
  choice2: "90 degree",
  choice3: "180 degree",
  answer: 1},
  {question: "Current in DC generator armature is",
  choice1: "Pulsating DC.",
  choice2: "AC.",
  choice3: "DC.",
  answer: 1},
  {question: "When discharging a capacitor, current____:",
  choice1: "increase.",
  choice2: "decrease.",
  choice3: "same.",
  answer: 2},
  {question: "Star wound generator live volt is:",
  choice1: "Equal to phase.",
  choice2: "V3 x phase voltage.",
  choice3: "V3 / phase voltage.",
  answer: 2},
  {question: "What is resistance?",
  choice1: "Opposite of flow of electric charge",
  choice2: "Voltage x current",
  choice3: "Time take to resist voltage",
  answer: 1},
  {question: "Thermocouple measure________",
  choice1: "Hot junction.",
  choice2: "Cold junction.",
  choice3: "Difference between hot and cold junction.",
  answer: 3},
  {question: "Inside in a battery, what reaction will occur?",
  choice1: "Electrical",
  choice2: "Chemical",
  choice3: "Electromagnetic",
  answer: 2},
  {question: "___poles ,RPM will be____. Refer M3 Softcopy Textbook page 284 of 319.",
  choice1: "Increase, increase.",
  choice2: "Decrease, decrease.",
  choice3: "Increase, decrease.",
  answer: 3},
  {question: "What is impedance?",
  choice1: "resistance and reactance",
  choice2: "resistance and voltage",
  choice3: "resistance and voltage",
  answer: 1},
  {question: "What is aircraft commonly used power?",
  choice1: "115v 400Hz 3 phase",
  choice2: "400v 115Hz 3 phase",
  choice3: "230v 50Hz 1 phase",
  answer: 1},
  {question: "Definition of work:",
  choice1: "transfer of energy.",
  choice2: "not related to energy.",
  choice3: "inversely related to energy.",
  answer: 1},
  {question: "The electrons on the outer most shell:",
  choice1: "valence of electrons.",
  choice2: "valence of neutrons.",
  choice3: "both of the above.",
  answer: 1},
  {question: "Band stop filter:",
  choice1: "formed from a low-pass and a high-pass filter.",
  choice2: "pass a mid range of frequencies and block lower and higher frequencies.",
  choice3: "pass high ac frequencies and block low frequencies.",
  answer: 1},
  {question: "Eddy current losses can be minimize by:",
  choice1: "increasing the laminations.",
  choice2: "decreasing the laminations.",
  choice3: "remain the same.",
  answer: 1},
  {question: "An advantage of AC over DC for aircraft use is that:",
  choice1: "radio interference is eliminated.",
  choice2: "voltage can be easily transformed.",
  choice3: "the need for electrical bonding is eliminated.",
  answer: 2},
  {question: "Current flow in:",
  choice1: "A conductor than is connected to only one terminal of a battery.",
  choice2: "A closed circuit.",
  choice3: "An open circuit.",
  answer: 2},
  {question: "Electrons are parts of an atom that have:",
  choice1: "positive charge.",
  choice2: "negative charge.",
  choice3: "neutral charge.",
  answer: 2},
  {question: "In an electrical circuit, electrons flow:",
  choice1: "in either direction, from positive to negative or negative to positive potential.",
  choice2: "from a negative potential to a positive potential.",
  choice3: "from a positive potential to a negative potential.",
  answer: 2},
  {question: "In primary cell the negative electrode is make of:",
  choice1: "copper.",
  choice2: "copper.",
  choice3: "zinc.",
  answer: 3},
  {question: "The electrolyte in a lead-acid battery is dilute:",
  choice1: "Potassium hydroxide.",
  choice2: "hydrochloric acid.",
  choice3: "sulphuric acid.",
  answer: 3},
  {question: "Two positively charged objects will:",
  choice1: "attract each other.",
  choice2: "repel each other.",
  choice3: "have no effect on each other.",
  answer: 2},
  {question: "Static electricity is normally reduced in aircraft during flight by:",
  choice1: "a silicon coating over the aircraft surface.",
  choice2: "the static discharge points or wicks.",
  choice3: "single point earthing that prevents high voltage earth loops occurring.",
  answer: 2},
  {question: "The unit of resistance is the:",
  choice1: "Ohm, with the symbol Ω.",
  choice2: "Siemen, with the symbol S.",
  choice3: "Ohm, with the symbol Ω.",
  answer: 1},
  {question: "Where a filter attenuates the lower frequencies in an avionics system, it is called a:",
  choice1: "low-pass filter.",
  choice2: "high-pass filter.",
  choice3: "band-pass filter.",
  answer: 2},
  {question: "Materials with a large number of free electrons are:",
  choice1: "good conductors of electricity.",
  choice2: "poor conductors of electricity.",
  choice3: "used in semiconductors.",
  answer: 1},
  {question: "Lamination of the stator and rotor cores in a DC motor will:",
  choice1: "reduces the weight of the motor.",
  choice2: "reduce the eddy current losses.",
  choice3: "prevent the motor from overspeeding.",
  answer: 2},
  {question: "The phase angle difference between the voltage and current in an inductor is:",
  choice1: "0°.",
  choice2: "90°.",
  choice3: "180°.",
  answer: 2},
  {question: "In a paper-type capacitor, the dielectric is:",
  choice1: "aluminium foil.",
  choice2: "impregnated paper.",
  choice3: "fibreglass.",
  answer: 2},
  {question: "Power in a simple DC circuit is calculated from the following formula:",
  choice1: "Power = voltage x current",
  choice2: "Power = voltage x current x resistance",
  choice3: "Power = voltage x resistance",
  answer: 1},
  {question: "The specific gravity of the electrolyte in a fully charged lead acid battery should be:",
  choice1: "more than 1.0 and less than 1.275.",
  choice2: "at least 1.275.",
  choice3: "less than 1.13.",
  answer: 2},
  {question: "When a magnetic substance has reached saturation point, its magnetic field:",
  choice1: "cannot be increased.",
  choice2: "can be increased by an increase in the ampere-turns.",
  choice3: "can be increased by using additional wire round the solenoid.",
  answer: 1},
  {question: "If the specific gravity of a fully-charged lead-acid battery is 1.275, a battery with an SG of 1.263 measured at 90 degrees F is considered to be approximately:",
  choice1: "fully charged.",
  choice2: "90% charged.",
  choice3: "80% charged.",
  answer: 2},
  {question: "A series-wound DC motor has:",
  choice1: "high staring torque.",
  choice2: "low starting torque.",
  choice3: "shunt and series field windings.",
  answer: 1},
  {question: "The frequency of the AC voltage produced by an alternator is:",
  choice1: "dependent on both the speed of rotation and the number of alternator field poles.",
  choice2: "dependent only on the speed of rotation.",
  choice3: "proportional to the excitation current.",
  answer: 1},
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 52; //For CAT B2, total number of questions is 52.

startGame = () => {
  questionCounter = 0;
  score = 0;
  //SAR66 each topic scores
  localStorage.setItem("maxMark", MAX_QUESTIONS);
  availableQuesions = [...questions];
  quizname.innerText = `M3: Electrical`;
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