var Game = {
  fitness: 0,
  fatigue: 0,
  time: 0,
  maxDuration: .5,
  workoutID: 1,
  
  workoutHistory: [],

  advanceButton: undefined,
  numWorkoutsButton: undefined,
  timeDisplay: undefined,
  fatigueDisplay: undefined,
  fitnessDisplay: undefined,
  
  //durInput: undefined,
  //intInput: undefined,
  
  advance: function() {
    this.time++;
    this.timeDisplay.text(this.parseTime(this.time));    
    
    this.cacheWorkout();
    
    var latestWorkout = this.workoutHistory[this.workoutHistory.length-1];
    
    this.fitness = this.calcCurrentFitness(latestWorkout.currentFitness, latestWorkout.duration, latestWorkout.intensity, latestWorkout.currentFatigue);
    this.fatigue = this.calcCurrentFatigue(latestWorkout.currentFitness, latestWorkout.duration, latestWorkout.intensity);

    this.fitnessDisplay.text(this.fitness);
    this.fatigueDisplay.text(this.fatigue);
  },
  
  parseTime: function(time) {
    var numWeeks = (time % 52) + 1 ;
    var years = Math.floor(time / 52) + 1;
    return "Year " + years + ", Week " + numWeeks;
  },
  
  calcCurrentFatigue: function(_fitness, _duration, _intensity) {
    var fitBit = 0.8 * Math.exp(0.001 * _fitness);
    var intBit = 0.009 * _intensity + 0.05;
    var durBit = (-1 / (0.1 * _duration + 1) + 1);
    
    var currentFatigue = 100 * fitBit * intBit * durBit;
    
    return currentFatigue;
  },
  
  calcCurrentFitness: function(_fitness, _duration, _intensity, _fatigue) {
    var durBit = Math.sqrt(_duration);
    var intBit = 0.009 * _intensity + 0.05;
    var fitBit = Math.exp(0.001 * _fitness);
    var fatBit = -0.009 * _fatigue + 0.95;
    
    var newFitness = durBit * intBit * fitBit * fatBit;
    
    return newFitness;
  },
  
  cacheWorkout: function() {
    var _workout = new Workout();
    
    this.workoutID++;
    
    this.workoutHistory.push(_workout);
  },
  
  init: function() {
    var self = this;
    
    this.advanceButton = $('#advance');
    this.timeDisplay = $('#time');
    this.numWorkoutsButton = $('#selectNumWorkouts');
    
    this.fitnessDisplay = $('#fitness');
    this.fatigueDisplay = $('#fatigue');
       
    this.advanceButton.click(function() {
      self.advance();
    });
    

    
  },
};

var Workout = function() {
	var _durInput = document.getElementById('durationInput');
	var _intInput = document.getElementById('intensityInput');
	this.ID = Game.workoutID;
	this.currentTime = Game.time;
	this.currentFitness = Game.fitness;
	this.currentFatigue = Game.fatigue;
	this.duration = _durInput.value;
	this.intensity = _intInput.value;
};

Game.init();
