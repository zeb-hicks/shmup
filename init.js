window.addEventListener('load', function() {

	// Set up the canvases
	be = document.createElement('canvas');
	ce = document.createElement('canvas');
	ce.className = 'game';
	document.body.appendChild(ce);
	b = be.getContext('2d');
	g = ce.getContext('2d');

	hookInput();

	// Set up the viewport
	v = {
		w: WIDTH,	// Width
		h: HEIGHT,	// Height
		s: SCALE	// Scale
	}

	recalcSize();

	// Set up the game settings object
	s = {
		f: 0,						// Frame number
		t: new Date().getTime(),	// Last frame time
		bt: new Date().getTime(),	// Game start time
		pt: 0,						// Paused elapsed time
		e: 1,						// Elapsed since last frame
		d: 1,						// Elapsed delta value
		inter: 16,					// Frame interval
		lastWave: new Date().getTime(),
		nextWave: new Date().getTime(),
		loaded: 0,
		toload: 0,
		loadList: {},

		remap: 0,

		assets: {
			images: [
				'beam.png',
				'beam_flame.png',
				'beam_stop.png',
				'enemy0.png',
				'enemy1.png',
				'enemy2.png',
				'enemy3.png',
				'enemy4.png',
				'enemy5.png',
				'explosion.png',
				'flame.png',
				'missile.png',
				'missile_enemy.png',
				'placeholder.png',
				'power_shield.png',
				'power_weapon.png',
				'projectile.png',
				'projectile_enemy.png',
				'projectile_hit.png',
				'projectile_enemy_hit.png',
				'shield.png',
				'shield_hit.png',
				'ship0.png',
				'small_explosion.png',
				'smoke.png',
				'stars.png'
			],
			sounds: [
				'bullet_hit',
				'explode0',
				'explode1',
				'explode2',
				'fire',
				'player_die',
				'pickup'
			],
			music: [
			]
		},

		playerAcceleration: 0.6,
		maxPlayerVelocity: 3,
		playerFireDelay: 5,
		playerMissileDelay: 20,
		playerThrustDelay: 2,
		muzzleShear: 0.08,
		enemyFireDelay: 150,
		postDeathInvincible: 120,

		keys: {
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			fire: 32,
			menu: 27,
			select: 13
		},

		level: {
			rightEdge: WIDTH + 32,
			leftEdge: -32,
			topEdge: -32,
			bottomEdge: HEIGHT + 32,
			playerMargin: 40
		},

		stage: {
			time: 0,
			waves: {}
		},

		lowestEnemy: 0,
		lowestEnemyID: 0,

		score: 0,

		game: {
			state: 'load',
			sound: 'on',
			fidelity: 'high'
		},

		menuSelect: 0,
		lastMenu: [],

		menu: [
			{txt:'Start',act:'gameReset();s.game.state=\'game\';'},
			{txt:'Multiplayer',act:'gameReset();s.game.state=\'lobby\';'},
			{txt:'Options',act:'s.game.state=\'options\';'}
		],

		lobby: [
			{txt: 'Back',act:'s.game.state=\'menu\';'}
		],

		options: [
			{txt:'Fidelity',setting:'s.game.fidelity',vals:['high','low']},
			{txt:'Sound',setting:'s.game.sound',vals:['on','off']},
			{txt:'Scale',setting:'v.s',vals:[1,2,3,4],act:'recalcSize()'},
			{txt:'Remap Controls',act:'s.game.state=\'remap\';'},
			{txt:'Back',act:'s.game.state=s.lastMenu.shift();'}
		],

		pause: [
			{txt:'Resume',act:'s.game.state=\'game\';'},
			{txt:'Options',act:'s.game.state=\'options\';'},
			{txt:'Main Menu',act:'gameReset();s.game.state=\'menu\';'}
		],

		gameover: [
			{txt:'Retry',act:'gameReset();s.game.state=\'game\';'},
			{txt:'Options',act:'s.game.state=\'options\';'},
			{txt:'Main Menu',act:'gameReset();s.game.state=\'menu\';'}
		]
	};

	k.prev = {};

	gameReset();

	for (var i = 0; i < 40; i++) {
		stars.push(new Star({
			x: Math.random() * v.w,
			y: Math.random() * (v.h + 64) - 32,
			t: Math.floor(Math.random() * 10),
			v: Math.random() * 0.5
		}));
	}

	sfx = new AudioEngine();
	sfx.init();

	s.toload++;

	setTimeout(function() {

		for (var a in s.assets.images) {
			loadImage(s.assets.images[a]);
		}
		for (var a in s.assets.sounds) {
			sfx.loadSound({'file': s.assets.sounds[a]});
		}
		for (var a in s.assets.music) {
			sfx.preMusic({'file': s.assets.music[a]});
		}

		s.loaded++;

	}, 500);

	update();

}, false);