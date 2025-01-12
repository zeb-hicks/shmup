<!doctype html>
<html>
	<head>
		<title>Animation Tester</title>
		<style>
			body, html {
				width: 100%;
				height: 100%;
				overflow: hidden;
				background-color: #333;
				margin: 0px;
				padding: 0px;
				color: #999;
				font-size: 10px;
				font-weight: bold;
				font-family: sans-serif;
			}
			.container {
				width: 528px;
				height: 256px;
				position: absolute;
				left: 50%;
				top: 50%;
				margin: -152px -288px;
				padding: 16px;
				background-color: #222;
				border: 8px solid #000;
				box-shadow: 0px 2px 8px #000;
			}
			.controls {
				position: absolute;
				right: 16px;
				top: 16px;
				width: 256px;
				height: 256px;
			}
			.controls input {
				width: 248px;
				border: 0px;
				margin: 0px 0px 4px 0px;
				padding: 4px;
				font: 16px sans-serif;
				font-weight: bold;
				text-shadow: 0px 0px 4px #999;
			}
			#cvs {
				background-color: #000;
				image-rendering: -moz-crisp-edges;
				image-rendering: -webkit-optimize-contrast;
				-ms-interpolation-mode: nearest-neighbor;
				width: 256px;
				height: 256px;
			}
			#link {
				position:absolute;
				text-align: center;
				left: 50%;
				top: 50%;
				margin: 152px -256px;
				width: 512px;
				height: 16px;
				text-shadow: 0px 0px 4px #000;
				opacity: 0.3;
			}
		</style>
		<script>
			var imgCache = {0:new Image()};
			imgCache[0].src = 'placeholder.png';
			var undefined;
			var g = {};

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
					imgCache[f].src = f;
					return imgCache[0];
				}
			}
			var frame = 0;
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
					ctx.drawImage(img, 0, (Math.floor((frame - st) / rate) % Math.floor(img.height / h)) * h, w, h, Math.round(x - w / 2), Math.round(y - h / 2), w, h);
				} else {
					var state = ctx.save();
					ctx.translate(Math.round(x), Math.round(y));
					ctx.rotate(r);
					ctx.drawImage(img, 0, (Math.floor((frame - st) / rate) % Math.floor(img.height / h)) * h, w, h, Math.round(-w / 2), Math.round(-h / 2), w, h);
					ctx.restore(state);
				}
				if (alpha != 1) {
					ctx.globalAlpha = 1;
				}
			}
			window.addEventListener('load', function() {
				g = document.getElementById('cvs').getContext('2d');
				setInterval(draw, 16);
			}, false);
			
			function updateLink() {
				var thtml = 'http://osiris/hour/data/anim.php?f='+document.getElementById('file').value+'&r='+document.getElementById('rate').value+'&s='+document.getElementById('size').value;
				if (document.getElementById('link').innerHTML !== thtml) document.getElementById('link').innerHTML = thtml;
			}
			
			function draw() {
				frame++;
				var imgFile = document.getElementById('file').value,
				imgWidth = cimg(imgFile).width,
				imgHeight = (document.getElementById('size').value) * 1,
				imgRate = (document.getElementById('rate').value) * 1,
				imgLength = cimg(imgFile).height / imgHeight;
				g.clearRect(0, 0, 256, 256);
				fimg(g, cimg(imgFile), 32, 32, imgWidth, imgHeight, 0, 0, imgLength, imgRate, 1);
				updateLink();
			}
		</script>
	</head>
	<body>
		<div class="container"><canvas id="cvs" width="64" height="64"></canvas>
		<div class="controls">
			<div>Filename</div>
			<input type="text" id="file" value="<?php if (isset($_GET['f'])) { echo $_GET['f']; } else { echo 'filename'; } ?>" />
			<div>Frame Delay</div>
			<input type="text" id="rate" value="<?php if (isset($_GET['r'])) { echo $_GET['r']; } else { echo 'rate'; } ?>" />
			<div>Frame Height</div>
			<input type="text" id="size" value="<?php if (isset($_GET['s'])) { echo $_GET['s']; } else { echo 'frame height'; }?>" />
		</div></div>
		<div id="link"></div>
	</body>
</html>