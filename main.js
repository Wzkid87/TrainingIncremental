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
    
    this.cacheWorkout();
    
  	var latestWorkout = this.workoutHistory(this.workoutHistory.length-1);
	
	  this.fitness = this.calcCurrentFitness(latestWorkout.currentFitness, latestWorkout.duration, latestWorkout.intensity, latestWorkout.currentFatigue);
    this.fatigue = this.calcCurrentFatigue(latestWorkout.currentFitness, latestWorkout.duration, latestWorkout.intensity);

    $('#fitness').text(this.fitness);
  	$('#fatigue').text(this.fatigue);
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
    var self = this;
    
    var _workout = {
      ID: this.workoutID,
      currentTime: this.time,
      currentFitness: this.fitness,
      currentFatigue: this.fatigue,
       duration: $('#durationInput').value,
      intensity: $('#intensityInput').value,
    };
    
    this.workoutID++;
    
    self.workoutHistory.push(_workout);
  },
  
  init: function() {
    var self = this;
    
    this.advanceButton = $('#advance');
    this.timeDisplay = $('#time');
    this.numWorkoutsButton = $('#selectNumWorkouts');
       
    this.advanceButton.click(function() {
      self.advance();
    });
    

    
  },
};


Game.init();
