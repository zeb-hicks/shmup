function AudioChannel(o) {proto(o,this);}
AudioChannel.prototype = {
	element: {},
	file: '',
	loc: {
		x: 0,
		y: 0
	},
	vol: 1
};

function AudioEngine(o) {proto(o,this);}
AudioEngine.prototype = {
	channels: 8,
	channel: {},
	music: {},
	curMusic: '',
	musicState: 'off',
	wav: '',
	init: function(o) {
		this.channel = {};
		if (new Audio().canPlayType('audio/wave') !== '') {
			this.wav = true;
		} else {
			this.wav = false;
		}
	},
	loadSound: function(o) {
		if (!o.file) return false;
		if (this.channel[o.file] == undefined) {
			this.channel[o.file] = [];
			for (var i = 0; i < this.channels; i++) {
				s.loadList[o.file+'['+i+']'] = {'t':0,'f':false};
				this.channel[o.file][i] = new Audio('./data/' + o.file + (this.wav ? '.wav' : '.mp3'));
				this.channel[o.file][i].ind = o.file+'['+i+']';
				this.channel[o.file][i].addEventListener('loadeddata', function() { s.loaded++; s.loadList[this.ind].f = true; s.loadList[this.ind].t = s.f; });
				this.channel[o.file][i].addEventListener('error', function() { s.loaded++; s.loadList[this.ind].f = true; s.loadList[this.ind].t = s.f; });
				this.channel[o.file][i].load();
				s.toload++;
			}
		}
	},
	playSound: function(o) {
		if (this.channel[o.file] == undefined) {
			this.loadSound(o);
			return;
		}
		if (!o.file || s.game.sound == 'off') return;
		// Plays a sound.
		// Arguments:
		//   file: str - Filename of the sound to be played. Relative to './data/sfx/'
		//   loc: {int x, int y} - Location of the sound's source, if any.
		//   vol: float - Volume of the sound. [ Range 0.0 - 1.0 | Default 1.0 ]
		if (!o.vol) o.vol = 1.0;
		if (!o.loc) o.loc = {x:0,y:0};
		if (!o.play && o.play !== false) o.play = true;
		
		for (var i = 0; i < this.channels; i++) {
			if (this.channel[o.file][i].paused == true || this.channel[o.file][i].ended !== false) {
				this.channel[o.file][i].volume = o.vol;
				this.channel[o.file][i].play();
				break;
			}
		}
	},
	preMusic: function(o) {
		s.loadList[o.file] = {'t':0,'f':false};
		this.music[o.file] = new Audio('./data/' + o.file + '.mp3');
		this.music[o.file].ind = o.file;
		this.music[o.file].addEventListener('loadeddata', function(c) { s.loaded++; s.loadList[this.ind].f = true; s.loadList[this.ind].t = s.f; if (!!c) { c(this.ind); }}(o.callback));
		this.music[o.file].addEventListener('error', function(c) { s.loaded++; s.loadList[this.ind].f = true; s.loadList[this.ind].t = s.f; if (!!c) { c(this.ind); }}(o.callback));
		this.music[o.file].load();
		s.toload++;
	},
	setMusic: function(o) {
		if (this.music[o.file]) {
			if (this.curMusic != '') this.music[this.curMusic].stop();
			this.music[o.file].play();
			this.musicState = 'play';
			o.curMusic = o.file;
		} else {
			this.preMusic({'file':o.file, 'callback':function(file){this.setMusic({'file':file})}});
		}
	},
	pauseMusic: function() {
		console.log(this.music[this.curMusic]);
		//if (this.music[this.curMusic]this.music[this.curMusic].pause();
	}
};