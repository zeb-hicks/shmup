var g = {}; // Graphics Context
var b = {}; // Buffer Context
var ce = {}; // Viewport Canvas Element
var be = {}; // Buffer Canvas Element
var v = {}; // Viewport State Object
var s = {}; // Game Settings Hash
var m = {}; // Mouse Object
var k = {}; // Keyboard Object
var sfx = {}; // Audio Engine
var player = {};
var enemy = [];
var projectile = [];
var particle = [];
var powerup = [];
var wave = [];
var stars = [];
var img = {};

function proto(o,obj) { for (var arg in o) { obj[arg] = o[arg]; } }

function Player(o){proto(o,this);}
Player.prototype = {
	x: 0,
	y: 0,
	mx: 0,
	my: 0,
	radius: 4,
	shieldRadius: 32,
	reload: 0,
	missileReload: 0,
	shield: 0,
	invincible: 20,
	weapon: 0,
	bombs: 0,
	thrustRepeat: 0,
	ship: 'ship0'
};
function Enemy(o){proto(o,this);}
Enemy.prototype = {
	x: 0,
	y: 0,
	rad: 10,
	reload: 0,
	type: 0,
	hp: 1,
	mhp: 1,
	dtf: false, // Damage this frame
	ptn: [],
	score: 1
};
function Projectile(o){proto(o,this);}
Projectile.prototype = {
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	type: 0,
	damage: 0,
	owner: 0,
	r: 0,
	age: 0,
	thrustRepeat: 0,
	target: 0
};
function Particle(o){proto(o,this);}
Particle.prototype = {
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	file: '',
	frames: 1,
	life: 0,
	begin: 0,
	rate: 1,
	a: 1
};
function Wave(o){proto(o,this);}
Wave.prototype = {
	time: 0,
	enemies: []
};
function Powerup(o){proto(o,this);}
Powerup.prototype = {
	x: 0,
	y: 0,
	icon: 'power_weapon.png',
	action: 'player.weapon++'
};
function Star(o){proto(o,this);}
Star.prototype = {
	x: 0,
	y: 0,
	t: 0,
	v: 0
};

var WIDTH = 240;
var HEIGHT = 400;
var SCALE = 2;

var imgCache = {0:new Image()};
imgCache[0].src = 'data/placeholder.png';
var undefined;

function cimg(f) {
	if (imgCache[f] != undefined) {
		if (imgCache[f].loaded) {
			return imgCache[f];
		} else {
			return imgCache[0];
		}
	} else {
		imgCache[f] = new Image();
		imgCache[f].addEventListener('load', function() {
			this.loaded = true;
		}, false);
		imgCache[f].src = 'data/' + f;
		return imgCache[0];
	}
}
function dimg(ctx,img,x,y,r) {
	if (x < -32 || y < -32 || x > s.level.rightEdge + 32 || y > s.level.bottomEdge + 32) return;
	if (r == 0) {
		ctx.drawImage(img, Math.round(x - img.width / 2), Math.round(y - img.height / 2));
	} else {
		var state = ctx.save();
		
		ctx.translate(Math.round(x), Math.round(y));
		ctx.rotate(r);
		ctx.drawImage(img, Math.round(-img.width / 2), Math.round(-img.height / 2));
		
		ctx.restore(state);
	}
}
function fimg(ctx,img,x,y,w,h,r,st,l,rate,alpha) {
	if (!r) r = 0;
	if (!rate) rate = 1;
	if (!alpha) alpha = 1;
	//console.log('Particle draw.', x, y, w, h, r);
	//console.log((Math.floor(s.f) % Math.floor(img.height / h)));
	if (alpha != 1) {
		ctx.globalAlpha = alpha;
	}
	if (r == 0) {
		ctx.drawImage(img, 0, (Math.floor((s.f - st) / rate) % Math.floor(img.height / h)) * h, w, h, Math.round(x - w / 2), Math.round(y - h / 2), w, h);
	} else {
		var state = ctx.save();
		ctx.translate(Math.round(x), Math.round(y));
		ctx.rotate(r);
		ctx.drawImage(img, 0, (Math.floor((s.f - st) / rate) % Math.floor(img.height / h)) * h, w, h, Math.round(-w / 2), Math.round(-h / 2), w, h);
		ctx.restore(state);
	}
	if (alpha != 1) {
		ctx.globalAlpha = 1;
	}
}
function loadImage(f) {
	if (imgCache[f] != undefined) {
		return;
	} else {
		s.toload++;
		s.loadList[f] = {'t':0,'f':false};
		imgCache[f] = new Image();
		imgCache[f].addEventListener('load', function() {
			s.loaded++;
			this.loaded = true;
			s.loadList[f].f = true;
			s.loadList[f].t = s.f;
		}, false);
		imgCache[f].src = 'data/' + f;
	}
}

function drawString(str,x,y) {
	x = Math.round(x);
	y = Math.round(y);
	if (b.measureText(str).width % 2 == 1 && b.textAlign == 'center') {
		b.fillText(str, x + 0.5, y);
	} else {
		b.fillText(str, x, y);
	}
}