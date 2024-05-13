s.f = 0;
s.bt = s.t = new Date().getTime();
s.e = 1;
s.d = 0;

function draw_enemies() {
	console.time('draw_enemies');
	for (var i in enemy) {
		var timg = 'enemy' + enemy[i].type + '.png';
		dimg(b, cimg(timg), enemy[i].x, enemy[i].y, 0);
		if (enemy[i].dtf) {
			b.globalCompositeOperation = 'lighter';
			dimg(b, cimg(timg), enemy[i].x, enemy[i].y, 0);
			dimg(b, cimg(timg), enemy[i].x, enemy[i].y, 0);
			dimg(b, cimg(timg), enemy[i].x, enemy[i].y, 0);
			b.globalCompositeOperation = 'source-over';
			enemy[i].dtf = false;
		}
		if (enemy[i].hp < enemy[i].mhp) {
			b.fillStyle = 'rgb(64, 0, 0)';
			b.fillRect(enemy[i].x - enemy[i].rad * 1.5, enemy[i].y + enemy[i].rad * 1.5, enemy[i].rad * 3, 2);
			b.fillStyle = 'rgb(0, 128, 0)';
			b.fillRect(enemy[i].x - enemy[i].rad * 1.5, enemy[i].y + enemy[i].rad * 1.5, enemy[i].rad * 3 * (enemy[i].hp / enemy[i].mhp), 2);
		}
	}
	console.timeEnd('draw_enemies');
}

function draw_projectiles() {
	console.time('draw_projectiles');
	for (var p in projectile) {
		if (projectile[p].age >= 0 && projectile[p].owner == 0) {
			var timg = 'projectile.png';
			if (projectile[p].owner == 1) timg = 'projectile_enemy.png';
			if (projectile[p].type == 1) timg = 'beam.png';
			if (projectile[p].type == 2) timg = 'missile.png';
			if (projectile[p].type == 2 && projectile[p].owner == 1) timg = 'missile_enemy.png';
			dimg(b, cimg(timg), projectile[p].x, projectile[p].y, projectile[p].r);
		}
	}
	console.timeEnd('draw_projectiles');
}

function draw_enemy_projectiles() {
	console.time('draw_enemy_projectiles');
	for (var p in projectile) {
		if (projectile[p].age >= 0 && projectile[p].owner == 1) {
			var timg = 'projectile.png';
			if (projectile[p].owner == 1) timg = 'projectile_enemy.png';
			if (projectile[p].type == 1) timg = 'beam.png';
			if (projectile[p].type == 2) timg = 'missile.png';
			if (projectile[p].type == 2 && projectile[p].owner == 1) timg = 'missile_enemy.png';
			dimg(b, cimg(timg), projectile[p].x, projectile[p].y, projectile[p].r);
		}
	}
	console.timeEnd('draw_enemy_projectiles');
}

function draw_particles() {
	console.time('draw_particles');
	for (var p in particle) {
		if (particle[p].life > 0) {
			particle[p].x += particle[p].vx * s.d;
			particle[p].y += particle[p].vy * s.d;
			particle[p].life--;
			var pi = cimg(particle[p].file);
			var w = pi.width;
			fimg(b, pi, particle[p].x, particle[p].y, w, pi.height / particle[p].frames, particle[p].r, particle[p].begin, particle[p].frames, particle[p].rate, particle[p].a);
		} else {
			delete particle[p];
		}
	}
	console.timeEnd('draw_particles');
}

function draw_player() {
	console.time('draw_player');
	if (player.invincible % 10 < 5) {
		if (cimg('ship0.png').width != cimg('ship0.png').height) {
			fimg(b, cimg('ship0.png'), player.x, player.y, cimg('ship0.png').width, cimg('ship0.png').width, 0, cimg('ship0.png').height / cimg('ship0.png').width, 5, 1);
		} else {
			dimg(b, cimg('ship0.png'), player.x, player.y);
		}
	}
	if (player.shield > 0) {
		fimg(b, cimg('shield.png'), player.x, player.y, 64, 64, (Math.floor(s.f / 6) % 4) * (Math.PI / 2), 0, 16, 4, 1);
	}
	console.timeEnd('draw_player');
}

function draw_powerups() {
	for (var p in powerup) {
		fimg(b, cimg(powerup[p].icon), powerup[p].x, powerup[p].y, 16, 16, 0, 0, 6, 5);
	}
}

function draw_stars() {
	//b.globalCompositeOperation = 'lighter';
	for (var i in stars) {
		if (cimg('stars.png').width == 32) {
			if (s.game.fidelity == 'high') b.globalAlpha = stars[i].v;
			b.drawImage(cimg('stars.png'), (stars[i].t % 4) * 8, Math.floor(stars[i].t / 4) * 8, 8, 8, Math.floor(stars[i].x), Math.floor(stars[i].y), 8, 8);
			if (s.game.fidelity == 'high') b.globalAlpha = 1.0;
		}
	}
	//b.globalCompositeOperation = 'source-over';
}

function draw_ui() {
	b.font = '16px \'BMdelico\'';
	b.textAlign = 'right';
	b.textBaseline = 'top';
	b.fillStyle = 'rgb(255,255,255)';
	
	drawString(s.score, v.w-3, 3);
	
	b.fillStyle = 'rgb(64, 64, 64)';
	b.fillRect(v.w - 10, 18, 8, 66);
	b.fillStyle = 'rgb(128, 0, 0)';
	b.fillRect(v.w - 9, 19, 6, 64 * (s.nextWave - s.t) / (s.nextWave - s.lastWave) + 1);
	
	for (var i = 0; i < (player.weapon < 10 ? player.weapon : 10); i++) {
		fimg(b, cimg('power_weapon.png'), v.w - 16 - i * 6, 22, 16, 16, 0, i * 2 + 12, 6, 5);
	}
	for (var i = 0; i < (player.shield < 100 ? Math.ceil(player.shield / 10) : 10); i++) {
		if (i == Math.floor(player.shield / 10) || i == 9) {
			fimg(b, cimg('power_shield.png'), v.w - 16 - i * 6, 34, 16, 16, 0, i * 2, 6, 5, (player.shield % 10) / 10);
		} else {
			fimg(b, cimg('power_shield.png'), v.w - 16 - i * 6, 34, 16, 16, 0, i * 2, 6, 5);
		}
	}
}

function draw_loader() {
	b.fillStyle = 'rgb(128,128,128)';
	b.fillRect(v.w / 2 - 64, v.h / 2 - 4, 128, 8);
	b.fillStyle = 'rgb(0,0,0)';
	b.fillRect(v.w / 2 - 63, v.h / 2 - 3, 126, 6);
	b.fillStyle = 'rgb(255,255,255)';
	b.fillRect(v.w / 2 - 62, v.h / 2 - 2, 124 * (s.loaded / s.toload), 4);
	
	b.font = '16px \'BMdelico\'';
	b.textAlign = 'center';
	b.textBaseline = 'bottom';
	b.fillStyle = 'rgb(255,255,255)';
	drawString('Loading...', v.w / 2, v.h / 2 - 6);
	
	for (var i in s.loadList) {
		if (s.loadList[i].f) {
			if (s.f - s.loadList[i].t < 32) {
				b.fillStyle = 'rgba(128,128,128,'+(1-((s.f - s.loadList[i].t) / 32))+')';
				drawString(i, v.w / 2, v.h / 2 + 26 + (s.f - s.loadList[i].t) * 4);
			} else {
				delete s.loadList[i];
			}
		}
	}
}

function draw_menu() {
	switch (s.game.state) {
		case 'menu':
			b.font = '16px \'BMdelico\'';
			b.textAlign = 'center';
			b.textBaseline = 'middle';
			for (var i in s.menu) {
				if (i == s.menuSelect) {
					b.fillStyle = 'rgb(255,255,255)';
				} else {
					b.fillStyle = 'rgb(128,128,128)';
				}
				drawString(s.menu[i].txt, v.w / 2, v.h / 2 - (16 * (s.menu.length - 1)) + i * 32);
			}
			break;
		case 'options':
			b.font = '16px \'BMdelico\'';
			b.textAlign = 'center';
			b.textBaseline = 'middle';
			for (var i in s.options) {
				if (i == s.menuSelect) {
					b.fillStyle = 'rgb(255,255,255)';
				} else {
					b.fillStyle = 'rgb(128,128,128)';
				}
				if (s.options[i].vals && s.options[i].vals.length > 0) {
					drawString(s.options[i].txt + ': [' + eval(s.options[i].setting) + ']', v.w / 2, v.h / 2 - (16 * (s.options.length - 1)) + i * 32);
				} else {
					drawString(s.options[i].txt, v.w / 2, v.h / 2 - (16 * (s.options.length - 1)) + i * 32);
				}
			}
			break;
		case 'pause':
			b.font = '16px \'BMdelico\'';
			b.textAlign = 'center';
			b.textBaseline = 'middle';
			for (var i in s.pause) {
				if (i == s.menuSelect) {
					b.fillStyle = 'rgb(255,255,255)';
				} else {
					b.fillStyle = 'rgb(128,128,128)';
				}
				drawString(s.pause[i].txt, v.w / 2, v.h / 2 - (16 * (s.pause.length - 1)) + i * 32);
			}
			break;
		case 'gameover':
			b.font = '16px \'BMdelico\'';
			b.textAlign = 'center';
			b.textBaseline = 'middle';
			for (var i in s.gameover) {
				if (i == s.menuSelect) {
					b.fillStyle = 'rgb(255,255,255)';
				} else {
					b.fillStyle = 'rgb(128,128,128)';
				}
				drawString(s.gameover[i].txt, v.w / 2, v.h / 2 - (16 * (s.gameover.length - 1)) + i * 32);
			}
			b.font = '32px \'BMdelico\'';
			b.fillStyle = 'rgb(255,255,255)';
			drawString('Game Over', v.w / 2, v.h / 2 - 128);
			b.font = '16px \'BMdelico\'';
			b.fillStyle = 'rgb(128,128,128)';
			drawString('Score: ' + s.score, v.w / 2, v.h / 2 - 96);
			break;
		case 'lobby':
			b.font = '16px \'BMdelico\'';
			b.textAlign = 'center';
			b.textBaseline = 'middle';
			for (var i in s.lobby) {
				if (i == s.menuSelect) {
					b.fillStyle = 'rgb(255,255,255)';
				} else {
					b.fillStyle = 'rgb(128,128,128)';
				}
				drawString(s.lobby[i].txt, v.w / 2, v.h / 2 - (16 * (s.lobby.length - 1)) + i * 32);
			}
			break;
	}
}

function draw_remap() {
	b.fillStyle = 'rgb(255,255,255)';
	drawString('Remapping Keys', v.w / 2, v.h / 2 - 32);
	b.fillStyle = 'rgb(64,64,64)';
	drawString('Press new key or escape to cancel.', v.w / 2, v.h / 2 - 16);
	switch (s.remap) {
		case 0:
			b.fillStyle = 'rgb(255,255,255)';
			drawString('UP', v.w / 2, v.h / 2 + 16);
			break;
		case 1:
			b.fillStyle = 'rgb(255,255,255)';
			drawString('DOWN', v.w / 2, v.h / 2 + 16);
			break;
		case 2:
			b.fillStyle = 'rgb(255,255,255)';
			drawString('LEFT', v.w / 2, v.h / 2 + 16);
			break;
		case 3:
			b.fillStyle = 'rgb(255,255,255)';
			drawString('RIGHT', v.w / 2, v.h / 2 + 16);
			break;
		case 4:
			b.fillStyle = 'rgb(255,255,255)';
			drawString('FIRE', v.w / 2, v.h / 2 + 16);
			break;
	}
}

function draw_bufferSwap() {
	//g.putImageData(b.getImageData(0, 0, v.w, v.h), 0, 0);
	g.drawImage(be, 0, 0, v.w, v.h);
}