var menuState = {
	
	create: function() { 
		// Imagen de fondo 
		game.add.image(0, 0, 'stopBG');

		//--MUTE BUTTON--\\
		this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
		this.muteButton.input.useHandCursor = true;
		
		// Nombre del juego 

		var nameLabel = game.add.text(400, -50, 'Forest Run!', { font: '57px Impact', fill: '#53E97B' }); 
		nameLabel.anchor.setTo(0.5, 0.5);
		
		game.add.tween(nameLabel).to({y: 170}, 1000).easing(Phaser.Easing.Bounce.Out) .start();

		//--Best Score--\\
		if (!localStorage.getItem('bestScore')) { 
			localStorage.setItem('bestScore', 0);
		}
		if (game.global.score > localStorage.getItem('bestScore')){
			localStorage.setItem('bestScore', game.global.score);
		} 
		
		//--Muestra el numero de semillas recogido y el mayor puntaje--\\
		var text = 'Semillas \n' + game.global.score + '\nMejor puntaje \n' + localStorage.getItem('bestScore'); 
		
		var scoreLabel = game.add.text(400, game.world.height-310, text, { font: '30px Impact', fill: '#ffffff', align: 'center' }); scoreLabel.anchor.setTo(0.5, 0.5);
		
		// Explica como iniciar el juego
		var startLabel = game.add.text(400, game.world.height-200, '¡¡Presiona la flecha ABAJO para jugar!!', { font: '25px Impact', fill: '#FFF922' }); 
		startLabel.anchor.setTo(0.5, 0.5);

		game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 500).loop() .start();
		
		// Create a new Phaser keyboard variable: the up arrow key 
		var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		
		// When the 'upKey' is pressed, it will call the 'start' function once 
		downKey.onDown.addOnce(this.start, this);
	},

	toggleSound: function() {
		game.sound.mute = ! game.sound.mute;
		this.muteButton.frame = game.sound.mute ? 1 : 0;

		if (game.sound.mute) {
			this.muteButton.frame = 1;
		}
	},
	
	start: function() { 
		// Start the actual game 
		game.state.start('play'); 
	},

};