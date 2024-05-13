window.raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(f){setTimeout(f,16);};

function update() {

	// Find elapsed time
	s.e = new Date().getTime() - s.t;
	// Update elapsed value
	s.d = s.e / 16;
	// Get current time
	s.t = new Date().getTime();
	s.frame += s.e / s.inter;

	switch (s.game.state) {

		case 'game':
			logic_input();
			logic_playerProjectiles();
			logic_player();
			logic_enemies();
			logic_projectiles();
			logic_particles();
			locig_powerups();
			setTimeout(logic_waves,1);
			break;
		case 'menu':

			break;
		case 'options':

			break;
		case 'pause':
			logic_paused();
			break;
		case 'gameover':
			logic_enemies();
			logic_projectiles();
			logic_particles();
			locig_powerups();
			break;
		case 'load':
			if (s.loaded != 0 && s.loaded >= s.toload) {
				s.game.state = 'menu';
			}
			break;
		case 'remap':
			logic_remap();
	}
	logic_stars();

	raf(update);

	draw();
}

function draw() {

	var st = new Date().getTime();
	s.f = Math.floor(st / s.inter);

	b.fillStyle = 'rgb(0, 0, 0)';
	b.fillRect(0, 0, v.w, v.h);

	draw_stars();

	switch (s.game.state) {

		case 'game':
			draw_enemies();
			draw_projectiles();
			draw_particles();
			draw_player();
			draw_powerups();
			draw_enemy_projectiles();
			draw_ui();
			if (wave.length <= 0 && enemy.length <= 0) s.game.state = 'gameover';
			break;
		case 'menu':
			draw_menu();
			break;
		case 'options':
			draw_menu();
			break;
		case 'pause':
			draw_menu();
			break;
		case 'gameover':
			draw_enemies();
			draw_projectiles();
			draw_particles();
			draw_powerups();
			draw_enemy_projectiles();
			draw_menu();
			break;
		case 'load':
			draw_loader();
			break;
		case 'lobby':
			draw_menu();
			break;
		case 'remap':
			draw_remap();
	}
	draw_bufferSwap();

	// var ct = new Date().getTime();
	// if (ct - st > s.inter) {
	// 	draw();
	// } else {
	// 	setTimeout(draw, (s.inter - (ct - st)));
	// }

}