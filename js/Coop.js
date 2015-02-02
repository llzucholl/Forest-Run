//
var playState = {
	
	create: function(){
		//Background\\
		this.background = game.add.tileSprite(0, 0, 2560, 1600,'background');

		//--Sounds--\\
		this.jumpSound = game.add.audio('jump');
		this.jumpSound.volume = 0.1;

		this.winSound = game.add.audio('win');
		
		this.seedSound = game.add.audio('seed');

		this.deadSound = game.add.audio('dead');

		//Player\\
		this.player = game.add.sprite(70, game.world.height - 130, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;
		this.player.body.collideWorldBounds = true;
		//Animaciones del player\\
		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    	this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

    	//Player2\\
		this.player2 = game.add.sprite(33, game.world.height - 130, 'player2');
		this.player2.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player2);
		this.player2.body.gravity.y = 500;
		this.player2.body.collideWorldBounds = true;
		//Animaciones del player\\
		this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
    	this.player2.animations.add('right', [5, 6, 7, 8], 10, true); 

    	//--Particulas DEAD--\\
    	this.emitter = game.add.emitter(0,0,15);
    	this.emitter.makeParticles('pixel');
    	this.emitter.setYSpeed(-150, 150);
    	this.emitter.setXSpeed(-150, 150);
    	this.emitter.gravity = 0;
    	//--Particulas WIN--\\
    	this.emitter2 = game.add.emitter(0,0,100);
    	this.emitter2.makeParticles('pixel2');
    	this.emitter2.setYSpeed(-150, 150);
    	this.emitter2.setXSpeed(-150, 150);
    	this.emitter2.gravity = 0;

		//--Puntaje--\\
		this.scoreLabel = game.add.text(300, 14, 'SEMILLAS: 0 /14', { font: '30px Impact', fill: '#ffffff' });
		this.scoreLabel.fixedToCamera = true;
		game.global.score = 0;

		//Cursors\\
		this.cursor = game.input.keyboard.createCursorKeys();
		
		this.wasd = { 
			up: game.input.keyboard.addKey(Phaser.Keyboard.W), 
			left: game.input.keyboard.addKey(Phaser.Keyboard.A), 
			right: game.input.keyboard.addKey(Phaser.Keyboard.D) 
		};
		//Evitar que el navegador use las flechas\\
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);


		this.createWorld();
		this.createSierra();
    	//--Semillas--\\
		this.createStars();
    	//Enemigos\\
    	this.addEnemy(); 

	},

	update: function(){
		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.player, this.Tplatforms);
		game.physics.arcade.collide(this.player, this.trolls);
		game.physics.arcade.overlap(this.player, this.sierras, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player, this.seeds, this.collectStar, null, this);

		game.physics.arcade.collide(this.player2, this.platforms);
		game.physics.arcade.collide(this.player2, this.Tplatforms);
		game.physics.arcade.collide(this.player2, this.trolls);
		game.physics.arcade.overlap(this.player2, this.sierras, this.player2Die, null, this);
		game.physics.arcade.overlap(this.player2, this.seeds, this.collectStar, null, this);

		game.physics.arcade.collide(this.trolls, this.sierras);
		game.physics.arcade.collide(this.enemies, this.sierras);
		game.physics.arcade.collide(this.enemies, this.platforms);
		game.physics.arcade.collide(this.enemies, this.Tplatforms);
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player2, this.enemies, this.player2Die, null, this);

		this.movePlayer2();
		this.movePlayer();

		if(game.global.score == 14){
			this.playerWin();
		}

		//Muerte si sale del mundo\\
		if (!this.player.inWorld){ 
			this.playerDie(); 
		}
	},

addEnemy: function(){
  	this.enemies = game.add.group();	
    this.enemies.enableBody = true;

	var enemy = game.add.sprite(670, game.world.height - 40, 'enemigo', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.gravity.y = 500; 
	enemy.body.velocity.x = -120; 
	enemy.body.bounce.x = 1; 
	enemy.animations.add('right', [1, 2], 3, true);
	// enemy.animations.add('left', [2, 3], 3, true);
	enemy.animations.play('right');

	enemy.outOfBoundsKill = true;

	var enemy = game.add.sprite(270, 349, 'enemigo', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.gravity.y = 500; 
	enemy.body.velocity.x = -60; 
	enemy.body.bounce.x = 1; 
	enemy.animations.add('right', [1, 2], 3, true);
	// enemy.animations.add('left', [2, 3], 3, true);
	enemy.animations.play('right');

	var enemy = game.add.sprite(1000, game.world.height - 40, 'enemigo', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.gravity.y = 500; 
	enemy.body.velocity.x = -100; 
	enemy.body.bounce.x = 1; 
	enemy.animations.add('right', [1, 2], 3, true);
	// enemy.animations.add('left', [2, 3], 3, true);
	enemy.animations.play('right');

	  // enemy.checkWorldBounds = true; 
	  enemy.outOfBoundsKill = true;
 },


	
	createWorld: function(){
		this.platforms = game.add.group();
		this.platforms.enableBody = true;

				
		//Crear Plataformas\\
		game.add.sprite(0, 350, 'platform', 0, this.platforms);
		game.add.sprite(756, 300, 'platform', 0, this.platforms);
		game.add.sprite(756, 70, 'platform', 0, this.platforms);
		game.add.sprite(956, 70, 'platform', 0, this.platforms); 
		game.add.sprite(1036, 70, 'platform', 0, this.platforms); 
		game.add.sprite(1136, 70, 'platform', 0, this.platforms); 
		game.add.sprite(1360, 70, 'platform', 0, this.platforms);
		game.add.sprite(412, 452, 'tinyPlatform2', 0, this.platforms);

		var shortPlat = game.add.sprite(440, 425, 'platform', 0, this.platforms); 
		shortPlat.scale.setTo(0.8, 1);

		//Crear el 'Ground'\\
		var ground = game.add.sprite(0, game.world.height - 44,'platform', 0, this.platforms); 
		ground.scale.setTo(10, 2);
		
		//Crear obstaculos\\
		game.add.sprite(320,525, 'tronco', 0, this.platforms);
		game.add.sprite(700,525, 'tronco', 0, this.platforms);
		game.add.sprite(650,390, 'tronco', 0, this.platforms);
		game.add.sprite(690,360, 'tronco', 0, this.platforms);
		game.add.sprite(715,330, 'tronco', 0, this.platforms);
		// game.add.sprite(753,37, 'tronco', 0, this.platforms);

		//Hace que todos las plataformas sean inmovibles\\
		this.platforms.setAll('body.immovable', true);
		//Establece los limites del mundo\\
		game.world.setBounds(0, 0, 1920, 0);

		this.Tplatforms = game.add.group();
		this.Tplatforms.enableBody = true;

		game.add.sprite(1300, 230, 'tinyPlatform2', 0, this.Tplatforms);
		game.add.sprite(1330, 230, 'tinyPlatform2', 0, this.Tplatforms);
		game.add.sprite(1350, 230, 'tinyPlatform2', 0, this.Tplatforms);
		game.add.sprite(1370, 230, 'tinyPlatform2', 0, this.Tplatforms);
		game.add.sprite(1390, 230, 'tinyPlatform2', 0, this.Tplatforms);
		game.add.sprite(1420, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1440, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1470, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1500, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1520, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1550, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1580, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1610, 230, 'tinyPlatform2', 0, this.Tplatforms);
	    game.add.sprite(1640, 230, 'tinyPlatform2', 0, this.Tplatforms); 

		this.Tplatforms.setAll('body.immovable', false);

		this.trolls = game.add.group();
		this.trolls.enableBody = true;

		var trollPlat = game.add.sprite(1820, 190, 'tinyPlatform2', 0, this.trolls);
		game.physics.arcade.enable(trollPlat);
		trollPlat.body.bounce.y = 1; 
		trollPlat.body.gravity.y = -10;
		trollPlat.body.collideWorldBounds = true;

		this.trolls.setAll('body.immovable', true);
			
		//--Camara--\\
		game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
    	style = 'STYLE_TOPDOWN';
	},

	createStars: function() {
    this.seeds = game.add.group();
    this.seeds.enableBody = true;

    	game.add.sprite(23,  280, 'bellota', 0, this.seeds);
    	game.add.sprite(223,  280, 'bellota', 0, this.seeds);
    	game.add.sprite(735,  490, 'bellota', 0, this.seeds);
    	game.add.sprite(133,  523, 'bellota', 0, this.seeds);   	
    	game.add.sprite(613,  390, 'bellota', 0, this.seeds);
    	game.add.sprite(888,   500,  'bellota', 0, this.seeds);
    	game.add.sprite(1500,  190,  'bellota', 0, this.seeds);
    	game.add.sprite(1300,  190,  'bellota', 0, this.seeds);
    	game.add.sprite(1400,  190,  'bellota', 0, this.seeds);
    	game.add.sprite(1730,  140,  'bellota', 0, this.seeds);
    	game.add.sprite(1600,  190,  'bellota', 0, this.seeds);
		game.add.sprite(1730, 30,  'bellota', 0, this.seeds);
		game.add.sprite(1330, 30,  'bellota', 0, this.seeds);
		game.add.sprite(1030, 30,  'bellota', 0, this.seeds);
    	
		this.seeds.setAll('body.immovable', true);
		game.add.tween(this.seeds).to({y: -0.2}, 320).to({y: 0.2}, 320).loop() .start();
},

	createSierra: function(){
		this.sierras = game.add.group();
		this.sierras.enableBody = true;

		//Crear sierras\\
		game.add.sprite(100, 291, 'sierra', 0, this.sierras);
		game.add.sprite(301, 291, 'sierra', 0, this.sierras);
		game.add.sprite(541, 366, 'sierra', 0, this.sierras);

		//Valle de la muerte x_x\\
		game.add.sprite(1900, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1850, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1800, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1750, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1700, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1650, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1600, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1550, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1500, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1450, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1400, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1350, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1300, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1250, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1200, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1150, 496, 'sierra', 0, this.sierras);
		game.add.sprite(1100, 496, 'sierra', 0, this.sierras);
		this.sierras.setAll('body.immovable', true);
	},


	collectStar: function(player, seed){
		seed.kill();		
		game.global.score += 1;
		this.seedSound.play();
		this.scoreLabel.text = 'SEMILLAS: ' + game.global.score + ' /14';
	},

	movePlayer: function(){ 
		if (this.cursor.left.isDown) { 
			this.player.body.velocity.x = -250; 
			this.player.animations.play('left');
		}
		else if (this.cursor.right.isDown) { 
			this.player.body.velocity.x = 250; 
			this.player.animations.play('right');
		}
		else { 
			this.player.body.velocity.x = 0; 
			this.player.animations.stop();
	 		this.player.frame = 4;
		}
		if (this.cursor.up.isDown && this.player.body.touching.down) { 
			 this.player.body.velocity.y = -400; 
			 this.player.body.gravity.y = 900; 
			 this.jumpSound.play();
		}
	},

	movePlayer2: function(){ 
		if (this.wasd.left.isDown) { 
			this.player2.body.velocity.x = -250; 
			this.player2.animations.play('left');
		}
		else if (this.wasd.right.isDown) { 
			this.player2.body.velocity.x = 250; 
			this.player2.animations.play('right');
		}
		else { 
			this.player2.body.velocity.x = 0; 
			this.player2.animations.stop();
	 		this.player2.frame = 4;
		}
		if (this.wasd.up.isDown && this.player2.body.touching.down) { 
			 this.player2.body.velocity.y = -400; 
			 this.player2.body.gravity.y = 900; 
			 this.jumpSound.play();
		}
	},

	startLose: function() { 
		game.state.start('lose'); 
	},

	startWin: function() { 
		game.state.start('win'); 
	},

	playerWin: function(){
		if (this.player.body.touching.down) { 
			 this.player.body.velocity.y = -300; 
			 this.player.body.gravity.y = 400; 
		}
		this.emitter2.x = this.player.x; 
		this.emitter2.y = this.player.y;
		this.emitter2.start(true, 1000, null, 2000);	
		game.time.events.add(3000, this.startWin, this);
	},
		player2Die: function(){ 
		this.player2.kill();
		this.emitter.x = this.player2.x; 
		this.emitter.y = this.player2.y;
		this.emitter.start(true, 600, null, 15);
		this.deadSound.play();
	},

	playerDie: function(){ 
		this.player.kill();
		this.emitter.x = this.player.x; 
		this.emitter.y = this.player.y;
		this.emitter.start(true, 600, null, 15);
		game.time.events.add(1000, this.startLose, this);
		this.deadSound.play();
	},

};