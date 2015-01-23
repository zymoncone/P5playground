var system;                                                 //new variable called system

function setup() {                                          //EDIT: new function called setup
  createCanvas(720, 400);                                   //sets canvas size
  system = new ParticleSystem(createVector(width/2, 50));   //creates a new instance of the "class" ParticleSystem
}

function draw() {                                       //EDIT: new function called draw
  background(51);                                       //sets background color
  system.addParticle();                                 //EDIT: runs the addParticle method from the ParticleSystem.prototype on the system, which is a new instance of the ParticleSystem
  system.run();                                         //EDIT: runs the run method from the ParticleSystem.prototype on the system, which is a new instance of the ParticleSystem
}

// A simple Particle class
var Particle = function(position) {                                 //EDIT: creates a new constructor function which passes in the position parameter
  this.acceleration = createVector(0, 0.05);                        //defines acceleration property of Particle Class as a vector
  this.velocity = createVector(random(-1, 1), random(-1, 0));       //defines velocity property of Particle Class as random vector
  this.position = position.get();                                   //EDIT: defines the position property of the Particle constructor function as the position through the get method
  this.lifespan = 255.0;                                            //defines the lifespan property of the Particle Class as 255.0
};

Particle.prototype.run = function() {                   //EDIT: defines the run method on the particle prototype
  this.update();                                        //EDIT: runs the update method on this, the particle prototype
  this.display();                                       //EDIT: runs the display method on this, the particle prototype
};

// Method to update position
Particle.prototype.update = function(){                 //EDIT: defines the update method on the particle prototype
  this.velocity.add(this.acceleration);                 //EDIT: runs the add method on the velocity property
  this.position.add(this.velocity);                     //EDIT: runs the add method on the position propety
  this.lifespan -= 2;                                   //EDIT: redefines the lifespan property by subtracting 2 every time the update method is run
};

// Method to display
Particle.prototype.display = function() {               //EDIT: defines the display method on the particle prototype
  stroke(200, this.lifespan);                           //sets transparency of the Particle's border
  strokeWeight(2);                                      //sets border weight of the Particle
  fill(127, this.lifespan);                             //sets transparency of the Particle
  ellipse(this.position.x, this.position.y, 12, 12);    //sets Particle size
};

// Is the particle still useful?
Particle.prototype.isDead = function(){                 //EDIT: defines the isDead method on the particle prototype
  if (this.lifespan < 0) {                              //checks if lifespan is less than 0
    return true;                                        //if so return boolean true
  } else {
    return false;                                       //if not return boolean false
  }
};

var ParticleSystem = function(position) {               //EDIT: new constructor function called ParticleSystem passing through the position       parameter
  this.origin = position.get();                         //EDIT: sets the orgin property as the position recieved through the get method
  this.particles = [];                                  //creates new particle property defined as empty array
};

ParticleSystem.prototype.addParticle = function() {     //EDIT: defines the addParticle method on the ParticleSystem prototype
  this.particles.push(new Particle(this.origin));       //EDIT: creates a new instance of the Particle constructor function at the origin property; runs the push method on the property particles array, putting the new instance of the Particle constructor function inside the property particles array
};

ParticleSystem.prototype.run = function() {             //EDIT: defines the run method on the ParticleSystem prototype
  for (var i = this.particles.length-1; i >= 0; i--) {  //takes the length of the property particles and subtracts it by one and defines it as i; does this until the value of i is 0
    var p = this.particles[i];                          //EDIT: defines the the property particle array as p temporarily, and passes the value of i through it, which is a number between 127 and 0
    p.run();                                            //EDIT: runs the run method of Particle.prototype on p
    if (p.isDead()) {                                   //checks if boolean isDead is true
      this.particles.splice(i, 1);                      //splices property particle array
    }
  }
};
