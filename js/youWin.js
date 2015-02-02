var winState = {
	
	create: function() { 
		// Imagen de fondo 
		game.add.image(0, 0, 'stopBG');
		
		// Nombre del juego 
		var nameLabel = game.add.text(400, -40, 'Ganaste! =D', { font: '57px Impact', fill: '#FFF922' }); 
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
		var startLabel = game.add.text(400, game.world.height-200, '¡¡Presiona la flecha ABAJO para volver a jugar!!\n'+'(Aunque aún no hay mas niveles)', { font: '25px Impact', fill: '#FFF922' }); 
		startLabel.anchor.setTo(0.5, 0.5);

		game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 500).loop() .start();
		
		// Create a new Phaser keyboard variable: the up arrow key 
		var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		
		// When the 'upKey' is pressed, it will call the 'start' function once 
		downKey.onDown.addOnce(this.start, this);
	},
	
	start: function() { 
		// Start the actual game 
		game.state.start('play'); 
	},

};