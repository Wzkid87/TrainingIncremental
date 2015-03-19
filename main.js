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
  
  advance: function() {
    this.time++;
    this.timeDisplay.text(this.parseTime(this.time));    
    
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
  
  cacheWorkout: function() {
    var self = this;
    
    var _workout = {
      ID: this.workoutID,
      currentFitness: this.fitness,
      currentFatigue: this.fatigue,
       duration: $('#durationInput'),
      intensity: $('#intensityInput'),
    };
    
    this.workoutID++;
    
    var newWorkout = Workout(_workout).init();
    self.workoutHistory.push(newWorkout);
  },
  
  init: function() {
    var self = this;
    
    this.advanceButton = $('#advance');
    this.timeDisplay = $('#time');
    this.numWorkoutsButton = $('#selectNumWorkouts');
       
    this.advanceButton.click(function() {
      self.advance();
    });
    
    this.numWorkoutsButton.click(function() {
      Workout.workoutBuild(document.getElementById("numWorkouts"));
    });
    
  },
};

var Workout = function(options) {
  return $.extend({
        
    init: function() {
      var self = this;
      return this;
          }
  }, options)
};

Game.init();
