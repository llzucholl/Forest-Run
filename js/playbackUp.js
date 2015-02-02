//
var playState = {
	
	create: function(){
		//Background\\
		this.background = game.add.tileSprite(0, 0, 2560, 1600,'background');

		//--Sounds--\\
		this.jumpSound = game.add.audio('jump');
		this.jumpSound.volume = 0.2;

		this.winSound = game.add.audio('win');
		
		this.seedSound = game.add.audio('seed');

		this.deadSound = game.add.audio('dead');

		//Player\\
		this.player = game.add.sprite(33, game.world.height - 130, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;
		this.player.body.collideWorldBounds.y = false;
		//Animaciones del player\\
		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    	this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

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
		this.scoreLabel = game.add.text(20, 25, 'SEMILLAS: 0 /14', { font: '30px Impact', fill: '#ffffff' });
		this.scoreLabel.fixedToCamera = true;
		game.global.score = 0;

		//Cursors\\
		this.cursor = game.input.keyboard.createCursorKeys();

		this.createWorld();
		this.createSierra();
    	//--Semillas--\\
		// this.createStars();
    	//Enemigos\\
    	this.addEnemy(); 

	},

	update: function(){
		game.physics.arcade.collide(this.player, this.layer); 
		game.physics.arcade.collide(this.enemies, this.layer);

		game.physics.arcade.overlap(this.player, this.sierras, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player, this.seeds, this.collectStar, null, this);
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

		this.movePlayer();

		if(game.global.score == 14){
			this.playerWin();
		}

		//Muerte si sale del mundo\\
		if (!this.player.inWorld){ 
			this.playerDie(); 
		}
	},

	createWorld: function(){

		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('tileset');

		this.layer = this.map.createLayer('Capa de Patrones 1');
		this.layer.resizeWorld();
		this.map.setCollision(1);
			
		//--Camara--\\
		game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
  		style = 'STYLE_TOPDOWN';
	},

addEnemy: function(){
  	this.enemies = game.add.group();	
    this.enemies.enableBody = true;
    game.world.swap(this.enemies, this.layer);

	// var enemy = game.add.sprite(670, game.world.height - 40, 'enemigo', 0, this.enemies);
	// enemy.anchor.setTo(0.5, 1); 
	
	// enemy.body.gravity.y = 500; 
	// enemy.body.velocity.x = -120; 
	// enemy.body.bounce.x = 1; 
	// enemy.animations.add('right', [1, 2], 3, true);
	// // enemy.animations.add('left', [2, 3], 3, true);
	// enemy.animations.play('right');

	// enemy.outOfBoundsKill = true;

	var enemy = game.add.sprite(400, game.world.height - 40, 'enemigo', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 

	enemy.body.setSize(0,10,0,0);		
	enemy.body.gravity.y = 500; 
	enemy.body.velocity.x = -60; 
	enemy.body.bounce.x = 1; 
	enemy.animations.add('right', [1, 2], 3, true);
	// enemy.animations.add('left', [2, 3], 3, true);
	enemy.animations.play('right');

	// var enemy = game.add.sprite(1000, game.world.height - 40, 'enemigo', 0, this.enemies);
	// enemy.anchor.setTo(0.5, 1); 
	
	// enemy.body.gravity.y = 500; 
	// enemy.body.velocity.x = -100; 
	// enemy.body.bounce.x = 1; 
	// enemy.animations.add('right', [1, 2], 3, true);
	// // enemy.animations.add('left', [2, 3], 3, true);
	// enemy.animations.play('right');

	//   // enemy.checkWorldBounds = true; 
	//   enemy.outOfBoundsKill = true;
 },


	

	createStars: function() {
    this.seeds = game.add.group();
    this.seeds.enableBody = true;

    	game.add.sprite(23,  280, 'bellota', 0, this.seeds);
  //   	game.add.sprite(223,  280, 'bellota', 0, this.seeds);
  //   	game.add.sprite(735,  490, 'bellota', 0, this.seeds);
  //   	game.add.sprite(133,  523, 'bellota', 0, this.seeds);   	
  //   	game.add.sprite(613,  390, 'bellota', 0, this.seeds);
  //   	game.add.sprite(888,   500,  'bellota', 0, this.seeds);
  //   	game.add.sprite(1500,  190,  'bellota', 0, this.seeds);
  //   	game.add.sprite(1300,  190,  'bellota', 0, this.seeds);
  //   	game.add.sprite(1400,  190,  'bellota', 0, this.seeds);
  //   	game.add.sprite(1730,  140,  'bellota', 0, this.seeds);
  //   	game.add.sprite(1600,  190,  'bellota', 0, this.seeds);
		// game.add.sprite(1730, 30,  'bellota', 0, this.seeds);
		// game.add.sprite(1330, 30,  'bellota', 0, this.seeds);
		// game.add.sprite(1030, 30,  'bellota', 0, this.seeds);
    	
		this.seeds.setAll('body.immovable', true);
		game.add.tween(this.seeds).to({y: -0.2}, 320).to({y: 0.2}, 320).loop() .start();
},

	createSierra: function(){
		this.sierras = game.add.group();
		this.sierras.enableBody = true;

		//Crear sierras\\
		
		var sierra=game.add.sprite(225, 401, 'sierra', 0, this.sierras);
			// sierra.body.setSize(0,0,300,0);	

		// game.add.sprite(301, 291, 'sierra', 0, this.sierras);
			// sierra.body.setSize(-20,30,30,30);	
			// game.physics.arcade.enable(sierra);	

		// game.add.sprite(541, 366, 'sierra', 0, this.sierras);
			// sierra.body.setSize(0, 0, 0, 0);
			// game.physics.arcade.enable(sierra);	

		//Valle de la muerte x_x\\
		// game.add.sprite(1900, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1850, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1800, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1750, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1700, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1650, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1600, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1550, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1500, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1450, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1400, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1350, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1300, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1250, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1200, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1150, 496, 'sierra', 0, this.sierras);
		// game.add.sprite(1100, 496, 'sierra', 0, this.sierras);
		
		this.sierras.setAll('body.immovable', true);
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
		if (this.cursor.up.isDown && this.player.body.onFloor()) { 
			 this.player.body.velocity.y = -546; 
			 this.player.body.gravity.y = 1400; 
			 this.jumpSound.play();
		}
	},

	collectStar: function(player, seed){
		seed.kill();		
		game.global.score += 1;
		this.seedSound.play();
		this.scoreLabel.text = 'SEMILLAS: ' + game.global.score + ' /14';
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
	playerDie: function(){ 
		this.player.kill();
		this.emitter.x = this.player.x; 
		this.emitter.y = this.player.y;
		this.emitter.start(true, 600, null, 15);
		game.time.events.add(1000, this.startLose, this);
		this.deadSound.play();
	},

};