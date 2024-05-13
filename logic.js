
function logic_input() {
	// Calculate input
	if (k.left && !k.right) {
		if (player.mx - s.playerAcceleration * s.d > -s.maxPlayerVelocity) { player.mx -= s.playerAcceleration * s.d; } else { player.mx = -s.maxPlayerVelocity; }
	} else if (k.right && !k.left) {
		if (player.mx + s.playerAcceleration * s.d < s.maxPlayerVelocity) { player.mx += s.playerAcceleration * s.d; } else { player.mx = s.maxPlayerVelocity; }
	} else {
		if (player.mx < 0) {
			if (player.mx + s.playerAcceleration * s.d < 0) {
				player.mx += s.playerAcceleration * s.d;
			} else {
				player.mx = 0;
			}
		}
		if (player.mx > 0) {
			if (player.mx - s.playerAcceleration * s.d > 0) {
				player.mx -= s.playerAcceleration * s.d;
			} else {
				player.mx = 0;
			}
		}
	}
	if (k.up && !k.down) {
		if ((player.my - s.playerAcceleration * s.d) > -s.maxPlayerVelocity) { player.my -= (s.playerAcceleration * s.d); } else { player.my = -s.maxPlayerVelocity; }
	} else if (k.down && !k.up) {
		if ((player.my + s.playerAcceleration * s.d) < s.maxPlayerVelocity) { player.my += (s.playerAcceleration * s.d); } else { player.my = s.maxPlayerVelocity; }
	} else {
		if (player.my < 0) {
			if (player.my + s.playerAcceleration * s.d < 0) {
				player.my += s.playerAcceleration * s.d;
			} else {
				player.my = 0;
			}
		}
		if (player.my > 0) {
			if (player.my - s.playerAcceleration * s.d > 0) {
				player.my -= s.playerAcceleration * s.d;
			} else {
				player.my = 0;
			}
		}
	}
}





function logic_playerProjectiles() {
	// Fire player projectiles
	if (k.fire) {
		if (player.reload <= 0) {
			sfx.playSound({
				file: 'fire',
				loc: [0,0],
				vol: 0.1,
				play: true
			});
			player.reload = s.playerFireDelay;
			if (player.weapon === 0 || player.weapon == 2) {
				projectile.push(new Projectile({
					x: player.x,
					y: player.y - 10,
					vx: player.mx * s.muzzleShear,
					vy: player.my * s.muzzleShear - 2.5 * 4,
					damage: 1
				}));
			}
			if (player.weapon !== 0 && player.weapon != 2 && player.weapon < 10) {
				projectile.push(new Projectile({
					x: player.x - 7,
					y: player.y - 4,
					vx: player.mx * s.muzzleShear,
					vy: player.my * s.muzzleShear - 2.5 * 4,
					damage: 1
				}));
				projectile.push(new Projectile({
					x: player.x + 7,
					y: player.y - 4,
					vx: player.mx * s.muzzleShear,
					vy: player.my * s.muzzleShear - 2.5 * 4,
					damage: 1
				}));
			}
			if (player.weapon == 2) {
				projectile.push(new Projectile({
					x: player.x + 7,
					y: player.y - 4,
					vx: player.mx * s.muzzleShear + 0.2 * 4,
					vy: player.my * s.muzzleShear - 2.3 * 4,
					damage: 1
				}));
				projectile.push(new Projectile({
					x: player.x - 7,
					y: player.y - 4,
					vx: player.mx * s.muzzleShear - 0.2 * 4,
					vy: player.my * s.muzzleShear - 2.3 * 4,
					damage: 1
				}));
			}
			if (player.weapon > 2) {
				for (var i = 0; i < player.weapon - 2 && i < 5; i++) {
					projectile.push(new Projectile({
						x: player.x + 7 + 2 * i,
						y: player.y - 4 + 1 * i,
						vx: player.mx * s.muzzleShear + (0.2 + i * 0.1) * 4,
						vy: player.my * s.muzzleShear - (2.3 - i * 0.1) * 4,
						r: Math.PI / 32 * i,
						damage: 1
					}));
					projectile.push(new Projectile({
						x: player.x - 7 - 2 * i,
						y: player.y - 4 + 1 * i,
						vx: player.mx * s.muzzleShear - (0.2 + i * 0.1) * 4,
						vy: player.my * s.muzzleShear - (2.3 - i * 0.1) * 4,
						r: 0 - Math.PI / 32 * i,
						damage: 1
					}));
				}
			}
		}
		if (player.weapon >= 9) {
			if (player.missileReload <= 0) {
				player.missileReload = s.playerMissileDelay / 2;
				projectile.push(new Projectile({
					x: player.x,
					y: player.y,
					vx: player.mx / 3,
					vy: player.my / 3 - 5,
					type: 2,
					damage: 10,
					r: Math.atan2(player.mx / 3, -(player.my / 3 - 5))
				}));
			}
		} else if (player.weapon >= 8) {
			if (player.missileReload <= 0) {
				player.missileReload = s.playerMissileDelay;
				projectile.push(new Projectile({
					x: player.x,
					y: player.y,
					vx: player.mx / 3,
					vy: player.my / 3 - 5,
					type: 2,
					damage: 10,
					r: Math.atan2(player.mx / 3, -(player.my / 3 - 5))
				}));
			}
		}
		if (player.weapon >= 10) {
			projectile.push(new Projectile({
				x: player.x,
				y: player.y - 4,
				vx: 0,
				vy: -8,
				type: 1,
				damage: 1
			}));
		}
	}
	if (player.reload - s.d >= 0) {
		player.reload -= s.d;
	} else {
		player.reload = 0;
	}
	if (player.missileReload - s.d >= 0) {
		player.missileReload -= s.d;
	} else {
		player.missileReload = 0;
	}
}




function logic_player() {
	console.time('logic_player');
	if (player.invincible > 0) {
		player.invincible -= s.d;
	} else {
		player.invincible = 0;
	}

	// Change player momentum
	if (player.mx > 0) {
		if (player.x + player.mx < s.level.rightEdge - s.level.playerMargin) {
			player.x += player.mx * s.d;
		} else {
			player.x = s.level.rightEdge - s.level.playerMargin;
			player.mx = 0;
		}
	} else if (player.mx < 0) {
		if (player.x + player.mx > s.level.leftEdge + s.level.playerMargin) {
			player.x += player.mx * s.d;
		} else {
			player.x = s.level.leftEdge + s.level.playerMargin;
			player.mx = 0;
		}
	}
	if (player.my > 0) {
		if (player.y + player.my < s.level.bottomEdge - s.level.playerMargin) {
			player.y += player.my * s.d;
		} else {
			player.y = s.level.bottomEdge - s.level.playerMargin;
			player.my = 0;
		}
	} else if (player.my < 0) {
		if (player.y + player.my > s.level.topEdge + s.level.playerMargin) {
			player.y += player.my * s.d;
		} else {
			player.y = s.level.topEdge + s.level.playerMargin;
			player.my = 0;
		}
	}
	
	// Create thrust particles
	if (player.thrustRepeat <= 0) {
		particle.push(new Particle({
			x: player.x + Math.random() * 4 - 2,
			y: player.y + 18 + Math.random() * 4 - 2,
			vx: player.mx / 4,
			vy: 0.2,
			file: 'flame.png',
			frames: 8,
			life: 8,
			begin: s.f,
			rate: 1,
			r: 0
		}));
		particle.push(new Particle({
			x: player.x + Math.random() * 4 - 2,
			y: player.y + 18 + Math.random() * 4 - 2,
			vx: player.mx / 4,
			vy: 0.2,
			file: 'smoke.png',
			frames: 4,
			life: 12,
			begin: s.f,
			rate: 3,
			r: 0,
			a: 0.46
		}));
		if (s.game.fidelity == 'high') {
			if (k.up && !k.down) {
				player.thrustRepeat = s.playerThrustDelay / 2;
			} else if (k.down && !k.up) {
				player.thrustRepeat = s.playerThrustDelay * 2;
			} else {
				player.thrustRepeat = s.playerThrustDelay;
			}
		} else {
			player.thrustRepeat = s.playerThrustDelay * 4;
		}
	} else {
		player.thrustRepeat -= s.d;
	}
	console.timeEnd('logic_player');
}






function logic_enemies() {
	console.time('logic_enemies');
	// Move and fire enemies
	s.lowestEnemy = 0;
	s.lowestEnemyID = 0;
	for (var i in enemy) {
		if (enemy[i].ptn.length > 0) {
			if (enemy[i].ptn[0].steps > 0) {
				var fn = eval('function(me,delta){'+enemy[i].ptn[0].action+'}');
				fn(enemy[i], s.d);
				enemy[i].ptn[0].steps -= s.d;
			} else {
				delete enemy[i].ptn[0];
				continue;
			}
		} else { // Move down off screen.
			if (enemy[i].y + 1.3 * s.d > s.level.bottomEdge + 32) {
				enemy[i].y -= v.h * 1.25;
			} else if (enemy[i].hp <= 0) {
				s.score += enemy[i].score;
				for (var p in enemy[i].drops) {
					enemy[i].drops[p].x = enemy[i].x;
					enemy[i].drops[p].y = enemy[i].y;
					powerup.push(enemy[i].drops[p]);
				}
				particle.push(new Particle({
					x: enemy[i].x,
					y: enemy[i].y,
					vx: 0,
					vy: 0.66,
					file: 'explosion.png',
					frames: 8,
					life: 32,
					begin: s.f,
					rate: 4,
					r: 0
				}));
				sfx.playSound({
					file: 'explode'+(enemy[i].type%3),
					loc: [0,0],
					vol: 1,
					play: true
				});
				delete enemy[i];
				continue;
			} else {
				enemy[i].y += 1.3 * s.d;
			}
		}
		if (enemy[i] && s.lowestEnemy < enemy[i].y) {
			s.lowestEnemy = enemy[i].y;
			s.lowestEnemyID = i;
		}
		if (enemy[i].reload <= 0 && enemy[i].y >= 0 && s.game.state != 'gameover') {
			enemy[i].reload = s.enemyFireDelay * (0.5 + Math.random());
			var dir = Math.atan2(player.x - enemy[i].x, -(player.y - enemy[i].y));
			projectile.push(new Projectile({
				x: enemy[i].x,
				y: enemy[i].y,
				vx: Math.sin(dir) * 4,
				vy: -Math.cos(dir) * 4,
				type: enemy[i].type == 2 ? 2 : 0,
				r: dir,
				damage: 1,
				owner: 1
			}));
		} else {
			enemy[i].reload -= s.d;
		}
	}
	console.timeEnd('logic_enemies');
}





function logic_projectiles() {
	console.time('logic_projectiles');

	/*for (var p in projectile) {
		if (projectile[p].age >= 0) {
			// Move projectiles
			projectile[p].x += projectile[p].vx * s.d;
			projectile[p].y += projectile[p].vy * s.d;
		}
	}*/


	// Move and collide projectiles
	for (var p in projectile) {
		projectile[p].age += s.d;
		// For all projectiles with age left
		if (projectile[p].age >= 0) {
			// Move projectiles
			projectile[p].x += projectile[p].vx * s.d;
			projectile[p].y += projectile[p].vy * s.d;
			
			// If owned by player, and missile, and enemies exist
			if (projectile[p] && projectile[p].owner === 0 && projectile[p].type == 2 && enemy.length > 0) {
				if (s.lowestEnemyID !== 0 && enemy[projectile[p].target] !== undefined && enemy[projectile[p].target].x !== undefined) {
					try {
						projectile[p].target = s.lowestEnemyID;
						var tx = projectile[p].x;
						tx -= enemy[projectile[p].target].x;
						var ty = projectile[p].y;
						ty -= enemy[projectile[p].target].y;
						projectile[p].r = Math.atan2(-tx, ty);
						projectile[p].vx *= 1 - s.d * 0.5;
						projectile[p].vy *= 1 - s.d * 0.5;
						projectile[p].vx += s.d * Math.sin(projectile[p].r) * 3;
						projectile[p].vy -= s.d * Math.cos(projectile[p].r) * 3;
					} catch (e) {
						console.log('Projectile error!');
					}
				} else {
					var le = 0;
					for (var enm in enemy) {
						if (enemy[enm].y > le) projectile[p].target = enm;
					}
				}
			// Otherwise if owner is enemy, and type is missile
			} else if (projectile[p].owner == 1 && projectile[p].type == 2 && player.hp > 0) {
				projectile[p].target = -1;
				projectile[p].r = Math.atan2(-(projectile[p].x - player.x), (projectile[p].y - player.y));
				projectile[p].vx *= 1 - s.d * 0.65;
				projectile[p].vy *= 1 - s.d * 0.65;
				projectile[p].vx += s.d * Math.sin(projectile[p].r);
				projectile[p].vy -= s.d * Math.cos(projectile[p].r);
			} else if (projectile[p].owner == 1 && projectile[p].type === 0 && player.hp > 0) {
				projectile[p].target = -1;
				projectile[p].r = Math.atan2(-(projectile[p].x - player.x), (projectile[p].y - player.y));
				projectile[p].vx *= 1 - s.d * 0.65;
				projectile[p].vx += s.d * Math.sin(projectile[p].r);
			}
			
			if (projectile[p].x < s.level.leftEdge || projectile[p].x > s.level.rightEdge || projectile[p].y < s.level.topEdge || projectile[p].y > s.level.bottomEdge) {
				delete projectile[p];
			} else {
				if (projectile[p].type == 2) {
					if (projectile[p].thrustRepeat <= 0) {
						projectile[p].thrustRepeat = s.playerThrustDelay;
						var ang;
						if (s.game.fidelity == 'high') {
							ang = Math.atan2(-projectile[p].vx, projectile[p].vy);
						} else {
							if (projectile[p].vx > 0.1) {
								if (projectile[p].vy > 0.1) { // SE
									ang = 0.78;
								} else if (projectile[p].vy < 0.1) { // NE
									ang = -0.78;
								} else { // E
									ang = 0;
								}
							} else if (projectile[p].vx < 0.1) { // SW
								if (projectile[p].vy > 0.1) {
									ang = 2.35;
								} else if (projectile[p].vy < 0.1) { // NW
									ang = -2.35;
								} else { // W
									ang = -3.14;
								}
							} else {
								if (projectile[p].vy > 0.1) { // S
									ang = 1.57;
								} else if (projectile[p].vy < 0.1) { // N
									ang = -1.57;
								} else { // Wut.
									ang = 0;
								}
							}
						}
						particle.push(new Particle({
							x: projectile[p].x + Math.random() * 4 - 2 + Math.sin(ang) * 8,
							y: projectile[p].y + Math.random() * 4 - 2 - Math.cos(ang) * 8,
							vx: 0,
							vy: 0,
							file: 'flame.png',
							frames: 8,
							life: 8,
							begin: s.f,
							rate: 1,
							r: ang
						}));
						particle.push(new Particle({
							x: projectile[p].x + Math.random() * 4 - 2 + Math.sin(ang) * 8,
							y: projectile[p].y + Math.random() * 4 - 2 - Math.cos(ang) * 8,
							vx: 0,
							vy: 0,
							file: 'smoke.png',
							frames: 4,
							life: 8,
							begin: s.f,
							rate: 2,
							r: ang
						}));
					} else {
						projectile[p].thrustRepeat -= s.d;
					}
				}
				if (projectile[p].owner === 0 && projectile[p].y <= s.lowestEnemy + 10) {
					for (var i in enemy) {
						if (!projectile[p]) break;
						if (enemy[i].y > -32 && enemy[i].y > projectile[p].y - enemy[i].rad && enemy[i].y < projectile[p].y + enemy[i].rad) {
							var xd = Math.abs(enemy[i].x - projectile[p].x);
							var yd = Math.abs(enemy[i].y - projectile[p].y);
							if (xd < enemy[i].rad && yd < enemy[i].rad && xd * xd + yd * yd <= enemy[i].rad * enemy[i].rad) {
								// Collision
								if (s.game.fidelity == 'high') {
									switch (projectile[p].type) {
										case 0:
											particle.push(new Particle({
												x: projectile[p].x,
												y: projectile[p].y,
												file: 'projectile_hit.png',
												frames: 8,
												life: 8,
												begin: s.f,
												rate: 1,
												r: projectile[p].r
											}));
											break;
										case 1:
											particle.push(new Particle({
												x: projectile[p].x,
												y: projectile[p].y,
												file: 'beam_flame.png',
												frames: 6,
												life: 6,
												begin: s.f,
												rate: 1
											}));
											break;
									}
								}
								enemy[i].hp -= projectile[p].damage;
								enemy[i].dtf = true;
								delete projectile[p];
								sfx.playSound({
									file: 'bullet_hit',
									loc: [0,0],
									vol: 0.3,
									play: true
								});
							}
						}
					}
				} else if (projectile[p].owner == 1 && s.game.state != 'gameover') {
					if (projectile[p].type == 2) {
						for (var i in projectile) {
							if (p != i && Math.abs(projectile[p].x - projectile[i].x) <= 4 && Math.abs(projectile[p].y - projectile[i].y) <= 4) {
								projectile[p].age += 75;
							}
						}
					}
					if (projectile[p].age > 400) {
						if (s.game.fidelity == 'high')
						particle.push(new Particle({
							x: projectile[p].x,
							y: projectile[p].y,
							file: 'small_explosion.png',
							frames: 7,
							life: 14,
							begin: s.f,
							rate: 2
						}));
						delete projectile[p];
					} else if (projectile[p].y >= player.y - player.shieldRadius) {
						if (projectile[p].y <= player.y + player.shieldRadius) {
							if (projectile[p].x >= player.x - player.shieldRadius) {
								if (projectile[p].x <= player.x + player.shieldRadius) {
									var x = player.x - projectile[p].x;
									var y = player.y - projectile[p].y;
									if (player.invincible <= 0 && x * x + y * y <= (player.shield > 0 ? player.shieldRadius * player.shieldRadius : player.radius * player.radius)) {
										// Player was hit.
										if (player.shield > 0) {
											player.shield -= projectile[p].damage;
											particle.push(new Particle({
												x: player.x,
												y: player.y,
												file: 'shield_hit.png',
												frames: 4,
												life: 4,
												begin: s.f,
												rate: 1,
												r: Math.atan2(projectile[p].x - player.x, -(projectile[p].y - player.y))
											}));
										} else if (player.weapon > 0) {
											player.weapon = 0;
											player.invincible = s.postDeathInvincible;
										} else {
											sfx.playSound({
												file: 'player_die',
												loc: [0,0],
												vol: 1,
												play: true
											});
											s.game.state = 'gameover';
										}
										switch (projectile[p].type) {
											case 0:
												particle.push(new Particle({
													x: projectile[p].x,
													y: projectile[p].y,
													file: 'projectile_enemy_hit.png',
													frames: 8,
													life: 8,
													begin: s.f,
													rate: 1,
													r: projectile[p].r
												}));
												break;
											case 1:
												particle.push(new Particle({
													x: projectile[p].x,
													y: projectile[p].y,
													file: 'beam_flame.png',
													frames: 6,
													life: 6,
													begin: s.f,
													rate: 1
												}));
												break;
										}
										delete projectile[p];
										sfx.playSound({
											file: player.shield > 0 ? 'shield_hit' : 'bullet_hit',
											loc: [0,0],
											vol: player.shield > 0 ? 0.1 : 1,
											play: true
										});
									}
								}
							}
						}
					}
				}
			}
		}
	}
	console.timeEnd('logic_projectiles');
}

function logic_projectile_projectile() {
	for (var p in projectile) {
		for (var i in projectile) {
			
		}
	}
}

function logic_projectile_enemy() {
	for (var p in projectile) {
		for (var i in enemy) {
		
		}
	}
}

function logic_projectile_player() {
	for (var p in projectile) {
		
	}
}




function logic_particles() {
	// Move and collide particles
	for (var p in particle) {
		particle[p].x += particle[p].vx * s.d;
		particle[p].y += particle[p].vy * s.d;
	}
}




function logic_stars() {
	if (s.game.state != 'pause') {
		for (var i in stars) {
			stars[i].y += stars[i].v * s.d;
			if (stars[i].y > v.h + 32) {
				stars[i].y -= (v.h + 64);
			}
		}
	}
}




function locig_powerups() {
	for (var p in powerup) {
		powerup[p].y += s.d;
		if (powerup[p].x > player.x - 16 && powerup[p].y > player.y - 16 && powerup[p].x < player.x + 16 && powerup[p].y < player.y + 16) {
			console.log('Pickup');
			sfx.playSound({
				file: 'pickup',
				vol: 1,
				play: true
			});
			eval(powerup[p].action);
			delete powerup[p];
		} else if (powerup[p].y >= s.level.bottomEdge + 16) {
			delete powerup[p];
		}
	}
}





function logic_waves() {
	// Manage waves
	for (var w in wave) {
		if (wave[w].time <= s.t - s.bt - s.pt) {
			// Initiate wave
			for (var i in wave[w].enemies) {
				enemy.push(wave[w].enemies[i]);
			}
			delete wave[w];
		}
	}
}





function gameReset(waves) {
	//if (!waves) {
		waves = 20;
	//}
// Set up the game.
	player = new Player({
		x: v.w / 2,
		y: v.h / 2
	});
	
	s.bt = new Date().getTime();
	s.score = 0;
	
	projectile = [];
	enemy = [];
	particle = [];
	powerup = [];
	wave = [];
	/*wave = [
		new Wave({
			enemies:[
				new Enemy({
					x: v.w/2,
					y: 0,
					type: 2,
					hp: 1000,
					mhp: 1000,
					score: 99999999999999,
					drops: []
				})
			]
		})
	];*/
	console.log('New wave setup.');
	for (var i = 0; i < waves; i++) {
		console.log('Wave '+i+' set up.');
		var tWave = new Wave({enemies:[]});
		tWave.time = i * (6000 + i * 200);
		var waveDrops = 0;
		for (var j = 0; j < 2 * (i * 2); j++) {
			var tx = Math.random() * v.w;
			var ty = -Math.random() * v.h;
			var tt = (Math.random() > 0.7 ? Math.floor(i / (3 + 3 * Math.random())) : 0);
			if (tt > 5) tt = 5;
			var ts = tt === 0 ? 2 : 5 ^ tt + 15;
			var th = tt === 0 ? 2 : Math.pow(3, tt);
			var drop1 = [];
			var drop2 = [];
			if (Math.random() / ts < 0.02) {
				if (Math.random() < 0.1) {
					drop1.push(new Powerup({
						icon: 'power_shield.png',
						action: 'player.shield+=2;'
					}));
				} else {
					drop1.push(new Powerup({
						icon: 'power_weapon.png',
						action: 'player.weapon++;'
					}));
				}
				waveDrops++;
			}
			if (Math.random() / ts < 0.02) {
				if (Math.random() < 0.1) {
					drop2.push(new Powerup({
						icon: 'power_shield.png',
						action: 'player.shield+=2;'
					}));
				} else {
					drop2.push(new Powerup({
						icon: 'power_weapon.png',
						action: 'player.weapon++;'
					}));
				}
				waveDrops++;
			}
			//console.log('Pushing enemies onto arrays.');
			tWave.enemies.push(new Enemy({
				x: tx,
				y: ty,
				type: tt,
				hp: th,
				mhp: th,
				score: ts * 100,
				drops: drop1
			}));
			tWave.enemies.push(new Enemy({
				x: v.w-tx,
				y: ty,
				type: tt,
				hp: th,
				mhp: th,
				score: ts * 100,
				drops: drop2
			}));
		}
		if (waveDrops === 0 && tWave.enemies.length > 0) {
			console.log('Wave created without drop. Adding random drop.');
			tWave.enemies[Math.floor(Math.random() * (tWave.enemies.length - 1))].drops.push(new Powerup({
				icon: 'power_weapon.png',
				action: 'player.weapon++;'
			}));
		}
		wave.push(tWave);
	}
}





function recalcSize() {
	be.width = v.w;
	be.height = v.h;
	ce.width = v.w;
	ce.height = v.h;
	ce.style.width = v.w * v.s + 'px';
	ce.style.height = v.h * v.s + 'px';
	ce.style.margin = '-' + (v.h * v.s / 2) + 'px -' + (v.w * v.s / 2) + 'px';
}




function logic_menu() {
	switch (s.game.state) {
		case 'menu':
			
			break;
		case 'options':
			
			break;
	}
}




function logic_paused() {
	s.pt += s.e;
}


function logic_remap() {
	
}