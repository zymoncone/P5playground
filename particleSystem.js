var system;                                                 //new variable called system

function setup() {                                          //new method called setup
  createCanvas(720, 400);                                   //sets canvas size
  system = new ParticleSystem(createVector(width/2, 50));   //creates an instance of the "class" ParticleSystem in the system
}

function draw() {                                       //new method called draw
  background(51);                                       //sets background color
  system.addParticle();                                 //adds new property called addParticle; defined as a prototype constructor function
  system.run();                                         //adds new property called run; defined as a prototype constructor function
}

// A simple Particle class
var Particle = function(position) {                                 //creates new "unofficial" Class called Particle with the position property
  this.acceleration = createVector(0, 0.05);                        //defines acceleration property of Particle Class as a vector
  this.velocity = createVector(random(-1, 1), random(-1, 0));       //defines velocity property of Particle Class as random vector
  this.position = position.get();                                   //gets the position of the Particle through the position property
  this.lifespan = 255.0;                                            //defines the lifespan property of Particle Class as 255.0
};

Particle.prototype.run = function() {                   //new prototype constructor function called run
  this.update();                                        //refers to and runs update prototype constructor function
  this.display();                                       //refers to and runs display protoype constructor function
};

// Method to update position
Particle.prototype.update = function(){                 //new prototype constructor function called update
  this.velocity.add(this.acceleration);                 //adds accelaration value to velocity
  this.position.add(this.velocity);                     //adds velocity value to position propety
  this.lifespan -= 2;                                   //subtracts 2 from lifespan each time update prototype constructor function is called
};

// Method to display
Particle.prototype.display = function() {               //new prototype constructor function called display
  stroke(200, this.lifespan);                           //sets transparency of the Particle's border
  strokeWeight(2);                                      //sets border weight of the Particle
  fill(127, this.lifespan);                             //sets transparency of the Particle
  ellipse(this.position.x, this.position.y, 12, 12);    //sets Particle size
};

// Is the particle still useful?
Particle.prototype.isDead = function(){                 //new prototype constructor function called isDead
  if (this.lifespan < 0) {                              //checks if lifespan is less than 0
    return true;                                        //if so return boolean true
  } else {
    return false;                                       //if not return boolean false
  }
};

var ParticleSystem = function(position) {               //new constructor function called ParticleSystem with the position property
  this.origin = position.get();                         //gets the origin of the function through the position property
  this.particles = [];                                  //creates new particle property defined as empty array
};

ParticleSystem.prototype.addParticle = function() {     //new prototype constructor function
  this.particles.push(new Particle(this.origin));       //creates a new instance of the Particle "class" at the origin property; pushes this value                                                          into the property particles array
};

ParticleSystem.prototype.run = function() {             //new prototype constructor function
  for (var i = this.particles.length-1; i >= 0; i--) {  //takes the length of the property particles and subtracts it by one and defines it as i
    var p = this.particles[i];                          //takes the property particles and passes in i
    p.run();                                            //runs run method and refers to the constructor function Particles.prototype.run
    if (p.isDead()) {                                   //checks if boolean isDead is true
      this.particles.splice(i, 1);                      //splices property particle array
    }
  }
};
