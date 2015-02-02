var loadState = {
	preload: function () { 

		// Add a 'loading...' label on the screen 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'Cargando...', { font: '30px Impact', fill: '#ffffff' }); 
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Display the progress bar 
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar'); 
		progressBar.anchor.setTo(0.5, 0.5); 
		
		game.load.setPreloadSprite(progressBar);

		// Load all our assets 
		//Sounds\\
		game.load.audio('jump', 'assets/Sounds/jump.wav');
		game.load.audio('dead', 'assets/Sounds/dead.wav');
		game.load.audio('seed', 'assets/Sounds/seed.mp3');

		//Boton MUTE\\
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
		
		//Boton coop\\
		// game.load.image('coop', 'assets/coop.png');

		//CheckPoint\\
		game.load.image('checkPoint', 'assets/star.png');


		//Particulas\\
		game.load.image('pixel', 'assets/pixel.png');
		game.load.image('pixel2', 'assets/pixel2.png');

		//Backgrounds\\
		game.load.image('background', 'assets/background.png');
		game.load.image('stopBG', 'assets/stopBG2.png');	
		
		//Tile map\\
		game.load.image('tileset', 'assets/Map/tileset0.png'); 
		game.load.tilemap('map', 'assets/Map/map.json', null, Phaser.Tilemap.TILED_JSON);

		//Ascensor\\
		game.load.image('ascensor', 'assets/ascensor.png'); 		

		//Sierras\\
		game.load.image('sierra', 'assets/sierraLong.png');
		game.load.image('sierraShort', 'assets/sierraShort.png');
		
		//Obstaculos\\
		game.load.image('tronco', 'assets/Wood2.png');
		
		//Semillas\\
		game.load.image('bellota', 'assets/bellota.png');
		game.load.image('botiquin', 'assets/firstaid.png');
		
		//Enemigo\\
		game.load.spritesheet('enemigo', 'assets/malo.png', 32, 32);
		game.load.spritesheet('enemigo2', 'assets/malo2.png', 32, 32);

		
		//Player\\
		game.load.spritesheet('player', 'assets/player1.0.png', 32, 48); 
		game.load.spritesheet('player2', 'assets/player2.1.png', 32, 48); 
	},

	create: function() { 
		// Go to the menu state 
		game.state.start('menu'); 
	},
};