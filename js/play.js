//
var playState = {
	
	create: function(){
		//Background\\
		this.background = game.add.tileSprite(0, 0, 8000, 1600,'background');

		//--Sounds--\\
		this.jumpSound = game.add.audio('jump');
		this.jumpSound.volume = 0.1;

		this.winSound = game.add.audio('win');
		
		this.seedSound = game.add.audio('seed');

		this.deadSound = game.add.audio('dead');

		//Player\\
		// this.player = game.add.sprite(200, , 'player');
		this.player = game.add.sprite(33, game.world.height -75 , 'player');
		// this.player = game.add.sprite(4500, 200 , 'player');


		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 1310;
		this.player.body.collideWorldBounds = false;
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
		this.bellotaScore = game.add.sprite(360, 15, 'bellota');
		this.scoreLabel = game.add.text(400, 17, '0 / 14', { font: '25px Impact', fill: '#ffffff' });
		
		this.bellotaScore.fixedToCamera = true;
		this.scoreLabel.fixedToCamera = true;
		game.global.score = 0;

		//--Vida--\\
		// this.vidas = game.add.sprite(400, 13, 'botiquin');
		// this.lifesLabel = game.add.text(440, 17, '4', { font: '25px Impact', fill: '#ffffff' });
		
		// this.vidas.fixedToCamera = true;
		// this.lifesLabel.fixedToCamera = true;
		// game.global.lifes = 4;

		//Cursors\\
		this.cursor = game.input.keyboard.createCursorKeys();

		this.createTroncos();
		this.createSierra();
		this.createWorld();
    	//--Semillas--\\
		this.createStars();
    	//Enemigos\\
    	this.addEnemy(); 

	},

	update: function(){
		game.physics.arcade.collide(this.player, this.layer); 
		game.physics.arcade.collide(this.enemies, this.layer);

		game.physics.arcade.collide(this.player, this.ascensors); 
		game.physics.arcade.collide(this.enemies, this.ascensors);
		
		game.physics.arcade.collide(this.player, this.troncoTile); 
		game.physics.arcade.collide(this.enemies, this.troncoTile);

		game.physics.arcade.collide(this.player, this.troncos); 
		game.physics.arcade.collide(this.enemies, this.troncos);

		game.physics.arcade.overlap(this.player, this.seeds, this.collectStar, null, this);
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player, this.sierras, this.playerDie, null, this);

		//CheckPoint\\


		this.movePlayer();

		if(game.global.score == 14){
			this.playerWin();
		}

		//Muerte si sale del mundo\\
		if (!this.player.inWorld){ 
			this.playerDie(); 
		}
	},

	createTroncos: function(){
		this.troncos = game.add.group();
		this.troncos.enableBody = true;
		game.world.swap(this.troncos, this.player);

		game.add.sprite(1310, 427, 'tronco', 0, this.troncos);

		this.troncos.setAll('body.immovable', true);
	},

	createWorld: function(){

		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('tileset');

		this.layer = this.map.createLayer('Capa de Patrones 1');

		this.layer.resizeWorld();

		this.map.setCollisionBetween(1, 16);

		//Ascensor\\
		this.ascensors = game.add.group();
		this.ascensors.enableBody = true;

		var ascensor = game.add.sprite(750, 50, 'ascensor', 0, this.ascensors);
		game.add.tween(ascensor.body).to({y: 300}, 3000).to({y: 50}, 3100).loop().start();

		var ascensor = game.add.sprite(1800, 560, 'ascensor', 0, this.ascensors);
		game.add.tween(ascensor.body).to({y: 145}, 4000).to({y: 560}, 4000).loop().start();

		var ascensor = game.add.sprite(3922, 515, 'ascensor', 0, this.ascensors);
		game.add.tween(ascensor.body).to({x: 4300}, 2000).to({y: 420}, 1500).to({y: 515}, 1500).to({x: 3922}, 1500).loop().start();	
		
		this.ascensors.setAll('body.immovable', true);		

		//checkPoint\\		
		this.checkPoint = game.add.group();
		this.checkPoint.enableBody = true;
    	game.world.swap(this.player, this.checkPoint);

		game.add.sprite(1975, 100, 'checkPoint', 0, this.checkPoint);

		this.checkPoint.setAll('body.immovable', true);
		//--Camara--\\
		game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
  		style = 'STYLE_TOPDOWN';
	},


addEnemy: function(){
  	this.enemies = game.add.group();	
    this.enemies.enableBody = true;

    //Enemigo 1\\
	var enemy = game.add.sprite(600, game.world.height - 40, 'enemigo', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 500; 
	enemy.animations.add('right', [2, 1], 2, true);
	game.add.tween(enemy.body).to({x: 33}, 4500).to({x: 600}, 4500).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

	//Enemigo 2\\
	var enemy = game.add.sprite(1100, 450, 'enemigo', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 500; 
	enemy.animations.add('right', [2, 1], 2, true);
	game.add.tween(enemy.body).to({x: 1300}, 3000).to({x: 1000}, 3000).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

	//Enemigo 3\\
	var enemy = game.add.sprite(1300, 450, 'enemigo', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 500; 
	enemy.animations.add('right', [1, 2], 2, true);
	game.add.tween(enemy.body).to({x: 1000}, 3000).to({x: 1300}, 3000).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

	//JUMP ZONE!!\\
	var enemy = game.add.sprite(2850, 530, 'enemigo2', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 200; 
	enemy.animations.add('right', [1, 2], 2, true);
	game.add.tween(enemy.body).to({x: 3500}, 2500).to({x: 2850}, 2500).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

	var enemy = game.add.sprite(3500, 530, 'enemigo2', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 200; 
	enemy.animations.add('right', [1, 2], 2, true);
	game.add.tween(enemy.body).to({x: 2850}, 2500).to({x: 3500}, 2500).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

	var enemy = game.add.sprite(3200, 530, 'enemigo2', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 200; 
	enemy.animations.add('right', [1, 2], 2, true);
	game.add.tween(enemy.body).to({x: 3500}, 1000).to({x: 3200}, 1000).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

	var enemy = game.add.sprite(3200, 530, 'enemigo2', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 200; 
	enemy.animations.add('right', [1, 2], 2, true);
	game.add.tween(enemy.body).to({x: 2850}, 1000).to({x: 3200}, 1000).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

	var enemy = game.add.sprite(3000, 530, 'enemigo2', 0, this.enemies);
	enemy.anchor.setTo(0.5, 1); 
	
	enemy.body.setSize(0,10,0,0);	
	enemy.body.gravity.y = 200; 
	enemy.animations.add('right', [1, 2], 2, true);
	game.add.tween(enemy.body).to({x: 3450}, 1000).to({x: 3000}, 1000).loop().start();
	
	enemy.animations.play('right');
	enemy.outOfBoundsKill = true;

 },

	createStars: function() {
    this.seeds = game.add.group();
    this.seeds.enableBody = true;
    game.world.swap(this.troncos, this.seeds);

    	game.add.sprite(470,  420, 'bellota', 0, this.seeds);
    	game.add.sprite(310,  420, 'bellota', 0, this.seeds);
    	game.add.sprite(1490,  290, 'bellota', 0, this.seeds);
    	game.add.sprite(1111,  193, 'bellota', 0, this.seeds);   	
    	game.add.sprite(835,  155, 'bellota', 0, this.seeds);
    	game.add.sprite(2035,   140,  'bellota', 0, this.seeds);
    	game.add.sprite(2090,  180,  'bellota', 0, this.seeds);
    	game.add.sprite(2150, 220 ,  'bellota', 0, this.seeds);
    	game.add.sprite(2215,  260,  'bellota', 0, this.seeds);
    	game.add.sprite(2273,  300,  'bellota', 0, this.seeds);
    	game.add.sprite(2340,  339,  'bellota', 0, this.seeds);
		game.add.sprite(2400, 377,  'bellota', 0, this.seeds);
		game.add.sprite(2455, 420,  'bellota', 0, this.seeds);
		game.add.sprite(2520, 457,  'bellota', 0, this.seeds);
		game.add.sprite(3000, 457,  'bellota', 0, this.seeds);
		game.add.sprite(3100, 457,  'bellota', 0, this.seeds);
		game.add.sprite(3200, 457,  'bellota', 0, this.seeds);
		game.add.sprite(3300, 457,  'bellota', 0, this.seeds);
		game.add.sprite(4440, 330,  'bellota', 0, this.seeds);

		this.seeds.setAll('body.immovable', true);
		game.add.tween(this.seeds).to({y: -0.2}, 320).to({y: 0.2}, 320).loop() .start();
},


	createSierra: function(){
		this.sierras = game.add.group();
		this.sierras.enableBody = true;
    	game.world.swap(this.player, this.sierras);

		//Crear sierras\\

		var sierra=game.add.sprite(400, 430, 'sierra', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 10;
		sierra.body.width = 48;
		
		var sierra=game.add.sprite(1200, 210, 'sierra', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 10;
		sierra.body.width = 48;20

		//Sierras Cortas\\
		var sierra=game.add.sprite(1700, game.world.height - 69, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 10;
		sierra.body.width = 30;

		//--El aserradero--\\

		//sierra tipo uno\\
		var sierra=game.add.sprite(2048, 210, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 140}, 100).to({y: 210}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);

		//sierra tipo dos\\
		var sierra=game.add.sprite(2109, 191, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 245}, 100).to({y: 191}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);

		var sierra=game.add.sprite(2170, 290, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 225}, 100).to({y: 290}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);

		var sierra=game.add.sprite(2229, 270, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 320}, 100).to({y: 270}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);

		var sierra=game.add.sprite(2290, 370, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 310}, 100).to({y: 370}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);

		var sierra=game.add.sprite(2350, 351, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 400}, 100).to({y: 351}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);

		var sierra=game.add.sprite(2409, 450, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 391}, 100).to({y: 450}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);	

		var sierra=game.add.sprite(2470, 431, 'sierraShort', 0, this.sierras);
		game.physics.arcade.enable(sierra);	
		sierra.anchor.setTo(0.5, 0.5);
		sierra.body.height = 20;
		sierra.body.width = 30;
		game.add.tween(sierra.body).to({y: 480}, 100).to({y: 431}, 3000).loop().start();

		
		this.sierras.setAll('body.immovable', true);	

	},

	movePlayer: function(){ 
		if (this.cursor.left.isDown) { 
			this.player.body.velocity.x = -300; 
			this.player.animations.play('left');
		}
		else if (this.cursor.right.isDown) { 
			this.player.body.velocity.x = 300; 
			this.player.animations.play('right');
		}
		else { 
			this.player.body.velocity.x = 0; 
			this.player.animations.stop();
	 		this.player.frame = 4;
		}
		if (this.cursor.up.isDown && this.player.body.onFloor() ||this.cursor.up.isDown && this.player.body.touching.down) { 
			 this.player.body.velocity.y = -515; 
			 // this.player.body.gravity.y = 1200; 
			 this.jumpSound.play();
		}
	},

	collectStar: function(player, seed){
		seed.kill();		
		game.global.score += 1;
		this.seedSound.play();
		this.scoreLabel.text = game.global.score + ' / 17';
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

		if (!this.player.alive){ 
			return; 
		}
			this.player.kill();
			this.emitter.x = this.player.x; 
			this.emitter.y = this.player.y;
			this.emitter.start(true, 600, null, 15);
			game.time.events.add(1000, this.startLose, this);
			this.deadSound.play();
	},
};