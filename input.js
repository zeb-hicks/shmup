function hookInput() {
	// Set up the input handlers
	window.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
			case s.keys.left:
				k.prev.left = k.left;
				k.left = true;
				e.preventDefault();
				e.stopPropagation();

				break;
			case s.keys.right:
				k.prev.right = k.right;
				k.right = true;
				e.preventDefault();
				e.stopPropagation();

				break;
			case s.keys.up:
				k.prev.up = k.up;
				k.up = true;
				e.preventDefault();
				e.stopPropagation();

				break;
			case s.keys.down:
				k.prev.down = k.down;
				k.down = true;
				e.preventDefault();
				e.stopPropagation();

				break;
			case s.keys.fire:
				k.prev.fire = k.fire;
				k.fire = true;
				e.preventDefault();
				e.stopPropagation();

				break;
			case s.keys.menu:
				k.prev.menu = k.menu;
				k.menu = true;
				e.preventDefault();
				e.stopPropagation();

				break;
			case s.keys.select:
				k.prev.select = k.select;
				k.select = true;
				e.preventDefault();
				e.stopPropagation();

				break;
		}
		switch (s.game.state) {
			case 'menu':
			case 'options':
			case 'pause':
			case 'gameover':
			case 'lobby':
				var len = s[s.game.state].length;
				if (k.down && !k.prev.down) {
					s.menuSelect++;
				}
				if (k.up && !k.prev.up) {
					s.menuSelect--;
				}
				if (s.menuSelect < 0) {
					s.menuSelect = len + (s.menuSelect % len);
				}
				if (s.menuSelect > len - 1) {
					s.menuSelect = s.menuSelect % len;
				}
				break;
			case 'remap':
				switch (s.remap) {
					case 0:
						s.keys.up = e.keyCode;
						break;
					case 1:
						s.keys.down = e.keyCode;
						break;
					case 2:
						s.keys.left = e.keyCode;
						break;
					case 3:
						s.keys.right = e.keyCode;
						break;
					case 4:
						s.keys.fire = e.keyCode;
						break;
				}
				s.remap++;
				if (s.remap > 4) {
					s.remap = 0;
					s.game.state = s.lastMenu.shift();
				}
				return false;
		}
		var prevState = s.game.state;
		switch (s.game.state) {
			case 'menu':
				if (k.select && !k.prev.select) {
					eval(s.menu[s.menuSelect].act);
				}
				break;
			case 'options':
				if (k.select && !k.prev.select) {
					if (s.options[s.menuSelect].act) {
						eval(s.options[s.menuSelect].act);
					}
				}
				if (k.left && s.options[s.menuSelect].vals && !k.prev.left) {
					var cSel = 0;
					for (var i in s.options[s.menuSelect].vals) {
						if (s.options[s.menuSelect].vals[i] == eval(s.options[s.menuSelect].setting)) {
							cSel = i;
						}
					}
					cSel--;
					if (cSel < 0) cSel = s.options[s.menuSelect].vals.length + (cSel % s.options[s.menuSelect].vals.length);
					eval(s.options[s.menuSelect].setting+'=\''+s.options[s.menuSelect].vals[cSel]+'\'');
					if (s.options[s.menuSelect].act) { eval(s.options[s.menuSelect].act); }
				}
				if (k.right && s.options[s.menuSelect].vals && !k.prev.right) {
					var cSel = 0;
					for (var i in s.options[s.menuSelect].vals) {
						if (s.options[s.menuSelect].vals[i] == eval(s.options[s.menuSelect].setting)) {
							cSel = i;
						}
					}
					cSel++;
					if (cSel >= s.options[s.menuSelect].vals.length) cSel = cSel % s.options[s.menuSelect].vals.length;
					eval(s.options[s.menuSelect].setting+'=\''+s.options[s.menuSelect].vals[cSel]+'\'');
					if (s.options[s.menuSelect].act) { eval(s.options[s.menuSelect].act); }
				}
				break;
			case 'pause':
				if (k.select && !k.prev.select) {
					eval(s.pause[s.menuSelect].act);
				}
				if (k.menu && !k.prev.menu) {
					s.game.state = 'game';
				}
				break;
			case 'gameover':
				if (k.select && !k.prev.select) {
					eval(s.gameover[s.menuSelect].act);
				}
				break;
			case 'game':
				if (k.menu && !k.prev.menu) {
					s.game.state = 'pause';
				}
				break;
			case 'lobby':
				if (k.select && !k.prev.select) {
					eval(s.lobby[s.menuSelect].act);
				}
				break;
		}
		if (s.game.state != prevState) { s.menuSelect = 0; s.lastMenu.unshift(prevState); }
		return false;
	}, false);
	window.addEventListener('keyup', function(e) {
		switch (e.keyCode) {
			case s.keys.left:
				k.prev.left = k.left;
				k.left = false;
				e.preventDefault();
				e.stopPropagation();
				return false;

				break;
			case s.keys.right:
				k.prev.left = k.right;
				k.right = false;
				e.preventDefault();
				e.stopPropagation();
				return false;

				break;
			case s.keys.up:
				k.prev.left = k.up;
				k.up = false;
				e.preventDefault();
				e.stopPropagation();
				return false;

				break;
			case s.keys.down:
				k.prev.left = k.down;
				k.down = false;
				e.preventDefault();
				e.stopPropagation();
				return false;

				break;
			case s.keys.fire:
				k.prev.left = k.fire;
				k.fire = false;
				e.preventDefault();
				e.stopPropagation();
				return false;

				break;
			case s.keys.menu:
				k.prev.left = k.menu;
				k.menu = false;
				e.preventDefault();
				e.stopPropagation();

				break;
			case s.keys.select:
				k.prev.left = k.select;
				k.select = false;
				e.preventDefault();
				e.stopPropagation();

				break;
		}
	}, false);
}