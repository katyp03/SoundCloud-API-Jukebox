// @param id is SoundCloud assigned id, @param title is song's title:
// function Song( id, title ) {
// 	this.id = id;
// 	this.title = title;
// }

function Song( id, title, artist ) {
	this.id = id;
	this.title = title;
	this.artist = artist;
}

// creating Jukebox constructor:
function Jukebox(){
	//the following arrays are parallel; 
	this.songs = []; //our song object
	this.players = []; //the soundcloud player object
	this.currentSong = 0;
	this.SC = SC;
	this.SC.initialize({
		// client_id: 'fd4e76fc67798bfa742089ed619084a6'
		client_id: 'GPsZO10XpXbKSuVIh2ROLCUdZUgngDcp'
	});
}

// to add a song:
Jukebox.prototype.addSong = function(){
	// this.songs = []; //our song object
	// let player = this.players[this.currentSong],
		// song = this.songs[this.currentSong];
	for ( let i=0; i<arguments.length; i++){
    	this.songs.push( arguments[i] );
    	// innerText = this.songs[this.currentSong].title;
  	}
  }

 //  	if( song instanceof Song ) {
 //    	this.songs.push( song );
 //    	document.getElementById('list').innerHTML += "<li>" + song.title + " - " + song.artist + "</li>";
 //    	return true;
 //  	} else {
 //    	return false;
 //  	};
	// console.log(arguments);


//play the player for the current track
Jukebox.prototype.play = function(){
	// current = document.querySelector("current");
	console.log("in play", this);
	const self = this;
	let player = this.players[this.currentSong],
		song = this.songs[this.currentSong];
		current = document.querySelector("#current");
		// see if we already have a player for
  		// the current song...  if so, use that
		if(	player) {
			console.log("player detected");
			player.play();
		} else {
		// go and fetch a player, then play
			this.SC.stream('/tracks/' + song.id).then(function(p){
				console.log("got player", p);
				self.players[self.currentSong] = p;
				console.log(self.players);
				self.play();
				this.songs[this.currentSong].title,
      			this.songs[this.currentSong].artist
			})};
			// trying to change innerText for artist and title:
		// this.artist.innerText = currentSong.artist;
 	// 	this.title.innerText = currentSong.title;
 	current.innerText = song.title + " - " + song.artist;
};

//pause the player for the current track
Jukebox.prototype.pause = function(){
	let player = this.players[this.currentSong],
		song = this.songs[this.currentSong];
  	player.pause();
}

//stop the player for the current track
Jukebox.prototype.stop = function(){
	// this.players[this.currentSong].pause();
	// this.players[this.currentSong].seek(0);
	let player = this.players[this.currentSong],
    song = this.songs[this.currentSong];
  	current = document.querySelector("#current");
  	player.pause();
  	this.currentSong = 0;
  	player.seek(0);
  	current.innerText = " ";
}

//go back w/ the player for the current track
Jukebox.prototype.back = function(){ 
	let player = this.players[this.currentSong],
    song = this.songs[this.currentSong];
	console.log("back detected");
	if (this.currentSong > 0) {
    this.currentSong -= 1;
  } else {
    this.currentSong = this.songs.length - 1;
  };
	// let player = this.players[this.currentSong],
	// 	song = this.songs[this.currentSong];
  		console.log( this.currentSong, player, song )
  		player.seek(0);
		this.play();
}

// creating forward function to Jukebox constructor:
Jukebox.prototype.next = function(){
	let player = this.players[this.currentSong],
    song = this.songs[this.currentSong];
	if (this.songs.length - this.currentSong <=1){
		this.currentSong = 0;
	} else {
	this.currentSong += 1;
	}
	this.play();
}

// shuffle to a random track
Jukebox.prototype.random = function(){
	this.currentSong = parseInt(Math.random()*this.songs.length);
	this.play();
}

// define my jukebox and add my songs:
// var myJukebox = new Jukebox;
// myJukebox.addSong(new Song('45062705', 'Hotel Dennis'), 
// 	new Song('223228432',"It's strange"), 
// 	new Song('29366957',"Mac Miller Heat Wave"), 
// 	new Song('146558571',"The Joker"), 
// 	new Song('61716586',"Blackbird"), 
// 	new Song('187489665',"Can't Get No (Satisfaction)"), 
// 	new Song('211351128',"American Girl"), 
// 	new Song('39798604',"Mr. Jones"), 
// 	new Song('239540838',"Home"), 
// 	new Song('65905195',"Dog Days Are Over")
// );

var myJukebox = new Jukebox;
myJukebox.addSong(
	new Song('45062705', 'Hotel Dennis', 'The Eagles'), 
	new Song('223228432',"It's strange", 'Louis The Child'), 
	// new Song('29366957',"Mac Miller Heat Wave", ''), 
	new Song('146558571',"The Joker", 'Steve Miller Band'), 
	new Song('61716586',"Blackbird", 'The Beatles'), 
	new Song('187489665',"Can't Get No (Satisfaction)", 'The Rolling Stones'), 
	new Song('211351128',"American Girl", 'Tom Petty'), 
	new Song('39798604',"Mr. Jones", 'Counting Crows'), 
	new Song('239540838',"Home", 'Edward Sharpe & The Magnetic Zeros'), 
	new Song('65905195',"Dog Days Are Over", 'Florence And The Machine')
);

// add event listeners to make the icons execute their assigned function when clicked, once the DOM has loaded:
document.addEventListener("DOMContentLoaded", function(){
	document.querySelector('.play').addEventListener('click', function(event){
		myJukebox.play();
	});
	document.querySelector('.pause').addEventListener('click', function(event){
		myJukebox.pause();
	});
	document.querySelector('.stop').addEventListener('click', function(event){
		myJukebox.stop();
	});
	document.querySelector('.back').addEventListener('click', function(event){
		myJukebox.back();
	});
	document.querySelector('.next').addEventListener('click', function(event){
		myJukebox.next();
	});
	document.querySelector('.random').addEventListener('click', function(event){
		myJukebox.random();
	});
});



// create volume slider:
	// elVolume = document.getElementById('volume');
	// var slider = document.getElementById('slider');
	// noUiSlider.create(elVolume,{
	// 	start: 0.8,
	// 	connect: true,
	// 	range: {
	// 		'min': 0,
	// 		'max': 1
	// 	}
	// });
	// elVolume.noUiSlider.on('slide', function(){
	// 	elAudio.volume = parseFloat(elVolume.noUiSlider.get());
	// });