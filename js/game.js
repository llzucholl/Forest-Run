var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

game.global = { 
	score: 0 
};
// Add all the states 
game.state.add('boot', bootState); 
game.state.add('load', loadState); 
game.state.add('menu', menuState); 
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);
// Start the 'boot' state 
game.state.start('boot');