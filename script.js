const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');

const allSongs = [
    {
      id: 0,
      title: "Scratching The Surface",
      artist: "Quincy Larson",
      duration: "4:25",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
      id: 1,
      title: "Can't Stay Down",
      artist: "Quincy Larson",
      duration: "4:15",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
      id: 2,
      title: "Still Learning",
      artist: "Quincy Larson",
      duration: "3:51",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
      id: 3,
      title: "Cruising for a Musing",
      artist: "Quincy Larson",
      duration: "3:34",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
      id: 4,
      title: "Never Not Favored",
      artist: "Quincy Larson",
      duration: "3:35",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
      id: 5,
      title: "From the Ground Up",
      artist: "Quincy Larson",
      duration: "3:12",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
      id: 6,
      title: "Walking on Air",
      artist: "Quincy Larson",
      duration: "3:25",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
      id: 7,
      title: "Can't Stop Me. Can't Even Slow Me Down.",
      artist: "Quincy Larson",
      duration: "3:52",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
      id: 8,
      title: "The Surest Way Out is Through",
      artist: "Quincy Larson",
      duration: "3:10",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
      id: 9,
      title: "Chasing That Feeling",
      artist: "Quincy Larson",
      duration: "2:43",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
  ];

	// create audio in HTML
  const audio = new Audio();

	// keep track of the current song
	// need object to store data
	// create a copy of the allSongs array without mutating the original
	// using ...Spread (spread operator)
	let userData = {
		songs: [...allSongs],
		currentSong: null,
  	songCurrentTime: 0,
	};



	const renderSongs = (array) => {
		// using map to iterate through array and return new array
		// callback function -> function that is passed to another function as an argument
		const songsHTML = array.map((song) => {
			// display song details
			return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
      </button>
      </li>
      `;
			
			// join() method is used to concatenate all the elements of an array into a single string
			// takes an optional parameter called a separator
		}).join("");
		// will insert the li element you just created into the ul element in the already provided HTML file
		playlistSongs.innerHTML = songsHTML;
	};

	// make the application more accessible, the play button describes the current song or the first song in the playlist
	const setPlayButtonAccessibleText = () => {
		// access song currently being played or 1st song in playlist
		const song = userData?.currentSong || userData?.songs[0];
		// set the aria-label attribute to the current song, or to the first song in the playlist
		// if the playlist is empty, it sets the aria-label to "Play"
		// Using a ternary, set the attribute value to Play song title or "Play" if song title is not available
		playButton.setAttribute("aria-label", song?.title ? `Play${song.title}` : "Play")
	};

	// need to get the index of each song in the songs property of userData
	// get the index for the current song, you can use the indexOf() method
	// The indexOf() array method returns the first index at which a given element can be found in the array
	// or -1 if the element is not present
	const getCurrentSongIndex = () => {
		return userData?.songs.indexOf(userData?.currentSong)
	};

	// will play the current song when it is clicked on
	playButton.addEventListener("click", () => {
		// checks if current song is null
		if(userData?.currentSong === null) {
			// ensure the first song in the playlist is played first
			playSong(userData?.songs[0].id)
		} else {
			// This ensures that the currently playing song will continue to play when the play button is clicked.
			playSong(userData?.currentSong.id)
		}
	});
	pauseButton.addEventListener("click", pauseSong);
	nextButton.addEventListener("click", playNextSong);
	previousButton.addEventListener("click", playPreviousSong);
	shuffleButton.addEventListener("click", shuffle);
	// event listener which will detect when the currently playing song ends
	audio.addEventListener("ended", () => {
		// need to check if there is a next song to play
		// Retrieve the current song index 
		const currentSongIndex = getCurrentSongIndex();
		// true or false depending on if the next song exists
		// userData.songs.length - 1 > currentSongIndex, there is another song
		// const nextSongExists = userData.songs.length - 1 > currentSongIndex ? true : false;
		// FCC correction
		const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
		// This will automatically play the next song when the current song ends
		if(nextSongExists) {
			playNextSong();
		} else {
			// reset 
			userData.currentSong = null;
			userData.songCurrentTime = 0;
			// update player
			pauseSong();
			setPlayerDisplay();
			highlightCurrentSong();
			setPlayButtonAccessibleText();
		}
	});

	const sortSongs = () => {
		// sort() method converts elements of an array into strings 
		// and sorts them in place based on their values in the UTF-16 encoding
		// The sort() method accepts a compare callback function that defines the sort order
		// The reason why this example is returning numbers is because the sort() method is expecting a number to be returned
		// If you return a negative number, the first item is sorted before the second item
		userData?.songs.sort((a, b) => {
			// checks if the name of the first fruit is less than the name of the second fruit
			// If so, the first fruit is sorted before the second fruit.
			if (a.title < b.title) {
				return -1;
			}

			//  checks if a.title > b.title
			// If so, the function returns 1, which sorts the first fruit after the second fruit.
			if (a.title > b.title) {
				return 1;
			}

			// if a.title is equal to b.title, then the function returns 0
			// This means that nothing changes and the order of a and b remains the same
			return 0;
		});
		return userData?.songs;
	};

	// implementing the functionality for playing the displayed songs
	const playSong = (id) => {
		// The find() method retrieves the first element within an array that fulfills the conditions specified in the provided callback function, else undefined
		const song = userData?.songs.find((song) => song.id === id);
		// tells the audio element where to find the audio data for the selected song
		audio.src = song.src;
		// tells the audio element what to display as the title of the song
		audio.title = song.title;
		// make sure it starts from the beginning

		// This condition will check if no current song is playing or if the current song is different from the one that is about to be played
		if(userData?.currentSong === null || userData?.currentSong.id !== song.id) {
			audio.currentTime = 0;
		} else {
			// handle the song's current playback time
			// this allows you to resume the current song at the point where it was paused
			audio.currentTime = userData?.songCurrentTime;
		}
		// update current song being played
		userData.currentSong = song;
		// add class "playing" to playButton
		playButton.classList.add("playing");
		// call func to hightlight the current song
		highlightCurrentSong();
		// to ensure the player's display updates whenever a new song begins playing
		setPlayerDisplay();
		// describe current song
		setPlayButtonAccessibleText();
		// play the song
		playSong();
		// play() is a method from the web audio API for playing an mp3 file
		audio.play();
	};

	// Pausing currently played song
	const pauseSong = () => {
		// store the current time of the song when it is paused
		userData.songCurrentTime = audio.currentTime
		// remove class playing from playButton cause song is paused
		playButton.classList.remove("playing");
		// pause the song
		audio.pause()
	}

	const playNextSong = () => {
		// check if there's no current song playing in the userData object
		if(userData?.currentSong === null) {
			// call the playSong function with the id of the first song
			playSong(userData?.songs[0].id)
		} else {
			const currentSongIndex = getCurrentSongIndex();
			// retrieve the next song in the playlist
			const nextSong = userData?.songs[currentSongIndex + 1]
			playSong(nextSong.id)
		}
	};

	const playPreviousSong = () => {
		// check if there is currently no song playing, if there's none return
		if(userData?.currentSong === null) {
			return
		} else {
			const currentSongIndex = getCurrentSongIndex();
			const previousSong = userData?.songs[currentSongIndex - 1];

    	playSong(previousSong.id);
		}
	};

	// responsible for shuffling the songs in the playlist and performing necessary state management updates after the shuffling
	const shuffle = () => {
		// Another use case for the callback function[sort()] is to randomize an array
		// One way would be to subtract 0.5 from Math.random() which produces random values that are either positive or negative
		// This makes the comparison result a mix of positive and negative values, leading to a random ordering of elements
		userData?.songs.sort(() => Math.random() - 0.5);
		// When the shuffle button is pressed, you want to set the currentSong to nothing and the songCurrentTime to 0
		userData.currentSong = null;
  	userData.songCurrentTime = 0;
		// re-render the songs, pause the currently playing song, set the player display, and set the play button accessible text again
		renderSongs(userData?.songs);
		pauseSong();
		setPlayerDisplay();
		setPlayButtonAccessibleText();
	};

	// delete functionality for the playlist. This would manage the removal of a song from the playlist,
	// handle other related actions when a song is deleted, and create a Reset Playlist button
	const deleteSong = (id) => {
		// heck if the song is currently playing. If it is, you need to pause the song and play the next song 
		if(userData?.currentSong?.id === id) {
			// re-init
			userData.currentSong = null;
			userData.songCurrentTime = 0;
			// stop the playback
			pauseSong();
			// update the player display
			setPlayerDisplay();
		};
		// the filter method keeps only the elements of an array that satisfy the callback function passed to it
		userData.songs = userData?.songs.filter((song) => song.id !== id);
		// re-render the songs, highlight it and set the play button's accessible text since the song list will change
		renderSongs(userData?.songs);
		highlightCurrentSong();
		setPlayButtonAccessibleText();

		// check if the playlist is empty, if it is, reset the userData object to its original state
		if(userData?.songs.length === 0) {
			// createElement() is a DOM method you can use to dynamically create an element using JavaScript
			// to use createElement(), you call it, then pass in the tag name as a string
			const resetButton = document.createElement("button");
			// need to assign it a text. To do this, you need to use the createTextNode() method of DOM
			// createTextNode() method is used to create a text node. To use it, you call it and pass in the text as a string
			const resetText = document.createTextNode("Reset Playlist");
			// assign it an id and aria-label attributes. JavaScript provides the id and ariaLabel properties you need to use for this
			resetButton.id = "reset";
			resetButton.ariaLabel = "Reset playlist";
			// need to add the resetText to the resetButton element as a child
			// also the resetButton to the playlistSongs element as a child
			// there is an appendChild() method to use
			// appendChild() lets you add a node or an element as the child of another element
			resetButton.appendChild(resetText);
			playlistSongs.appendChild(resetButton);
			// add the reset functionality to the resetButton. This will bring back the songs in the playlist when clicked
			resetButton.addEventListener("click", () => {
				// reset the playlist to its original state, spread allSongs into an array and assign it
				userData.songs = [...allSongs];
				// render the songs again, update the play button's accessible text, and remove the reset button from the playlist
				// also need to remove the resetButton from the DOM
				// Call the renderSongs() function with sortSongs() as an argument to render the songs again in alphabetical order
				renderSongs(sortSongs());
				// Call the setPlayButtonAccessibleText() function to update the play button's accessible text
				setPlayButtonAccessibleText();
				// Remove the reset button from the playlist by calling the remove() method on the resetButton variable
				resetButton.remove();
			});
		};
	};

	// display current song title & artist in the player
	const setPlayerDisplay = () => {
		// get HTML elements that display song artist and title
		const playingSong = document.getElementById("player-song-title");
  	const songArtist = document.getElementById("player-song-artist");
		// get data Object
		const currentTitle = userData?.currentSong?.title;
		const currentArtist = userData?.currentSong?.artist;
		// ternary operator to conditionally set the text content value
		// textContent sets the text of a node and allows you to set or retrieve the text content of an HTML element
		playingSong.textContent = currentTitle ? currentTitle : "";
  	songArtist.textContent = currentArtist ? currentArtist : "";
	};

	// highlight selected song
	const highlightCurrentSong = () => {
		const playlistSongElements = document.querySelectorAll(".playlist-song");
		// get the id of the current song
		const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
		
		playlistSongElements.forEach((songEl) => {
		  songEl.removeAttribute("aria-current");
		});
		// add the attribute back to the currently playing song
		if(songToHighlight) {
			songToHighlight.setAttribute("aria-current", "true");
		};
	};


	// need to call the renderSongs function and pass in userData?.songs 
	// in order to finally display the songs in the UI
	// Optional chaining (?.) helps prevent errors when accessing nested properties that might be null or undefined
	renderSongs(sortSongs());



// 	// ################ FCC correction #################
// const playlistSongs = document.getElementById("playlist-songs");
// const playButton = document.getElementById("play");
// const pauseButton = document.getElementById("pause");
// const nextButton = document.getElementById("next");
// const previousButton = document.getElementById("previous");
// const shuffleButton = document.getElementById("shuffle");

// const allSongs = [
//   {
//     id: 0,
//     title: "Scratching The Surface",
//     artist: "Quincy Larson",
//     duration: "4:25",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
//   },
//   {
//     id: 1,
//     title: "Can't Stay Down",
//     artist: "Quincy Larson",
//     duration: "4:15",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
//   },
//   {
//     id: 2,
//     title: "Still Learning",
//     artist: "Quincy Larson",
//     duration: "3:51",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
//   },
//   {
//     id: 3,
//     title: "Cruising for a Musing",
//     artist: "Quincy Larson",
//     duration: "3:34",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
//   },
//   {
//     id: 4,
//     title: "Never Not Favored",
//     artist: "Quincy Larson",
//     duration: "3:35",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
//   },
//   {
//     id: 5,
//     title: "From the Ground Up",
//     artist: "Quincy Larson",
//     duration: "3:12",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
//   },
//   {
//     id: 6,
//     title: "Walking on Air",
//     artist: "Quincy Larson",
//     duration: "3:25",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
//   },
//   {
//     id: 7,
//     title: "Can't Stop Me. Can't Even Slow Me Down.",
//     artist: "Quincy Larson",
//     duration: "3:52",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
//   },
//   {
//     id: 8,
//     title: "The Surest Way Out is Through",
//     artist: "Quincy Larson",
//     duration: "3:10",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
//   },
//   {
//     id: 9,
//     title: "Chasing That Feeling",
//     artist: "Quincy Larson",
//     duration: "2:43",
//     src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
//   },
// ];

// const audio = new Audio();
// let userData = {
//   songs: [...allSongs],
//   currentSong: null,
//   songCurrentTime: 0,
// };

// const playSong = (id) => {
//   const song = userData?.songs.find((song) => song.id === id);
//   audio.src = song.src;
//   audio.title = song.title;

//   if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
//     audio.currentTime = 0;
//   } else {
//     audio.currentTime = userData?.songCurrentTime;
//   }
//   userData.currentSong = song;
//   playButton.classList.add("playing");

//   highlightCurrentSong();
//   setPlayerDisplay();
//   setPlayButtonAccessibleText();
//   audio.play();
// };

// const pauseSong = () => {
//   userData.songCurrentTime = audio.currentTime;
  
//   playButton.classList.remove("playing");
//   audio.pause();
// };

// const playNextSong = () => {
//   if (userData?.currentSong === null) {
//     playSong(userData?.songs[0].id);
//   } else {
//     const currentSongIndex = getCurrentSongIndex();
//     const nextSong = userData?.songs[currentSongIndex + 1];

//     playSong(nextSong.id);
//   }
// };

// const playPreviousSong = () => {
//    if (userData?.currentSong === null) return;
//    else {
//     const currentSongIndex = getCurrentSongIndex();
//     const previousSong = userData?.songs[currentSongIndex - 1];

//     playSong(previousSong.id);
//    }
// };

// const shuffle = () => {
//   userData?.songs.sort(() => Math.random() - 0.5);
//   userData.currentSong = null;
//   userData.songCurrentTime = 0;

//   renderSongs(userData?.songs);
//   pauseSong();
//   setPlayerDisplay();
//   setPlayButtonAccessibleText();
// };

// const deleteSong = (id) => {
//   if (userData?.currentSong?.id === id) {
//     userData.currentSong = null;
//     userData.songCurrentTime = 0;

//     pauseSong();
//     setPlayerDisplay();
//   }

//   userData.songs = userData?.songs.filter((song) => song.id !== id);
//   renderSongs(userData?.songs); 
//   highlightCurrentSong(); 
//   setPlayButtonAccessibleText(); 

//   if (userData?.songs.length === 0) {
//     const resetButton = document.createElement("button");
//     const resetText = document.createTextNode("Reset Playlist");

//     resetButton.id = "reset";
//     resetButton.ariaLabel = "Reset playlist";
//     resetButton.appendChild(resetText);
//     playlistSongs.appendChild(resetButton);

//     resetButton.addEventListener("click", () => {
//       userData.songs = [...allSongs];

//       renderSongs(sortSongs()); 
//       setPlayButtonAccessibleText();
//       resetButton.remove();
//     });

//   }

// };

// const setPlayerDisplay = () => {
//   const playingSong = document.getElementById("player-song-title");
//   const songArtist = document.getElementById("player-song-artist");
//   const currentTitle = userData?.currentSong?.title;
//   const currentArtist = userData?.currentSong?.artist;

//   playingSong.textContent = currentTitle ? currentTitle : "";
//   songArtist.textContent = currentArtist ? currentArtist : "";
// };

// const highlightCurrentSong = () => {
//   const playlistSongElements = document.querySelectorAll(".playlist-song");
//   const songToHighlight = document.getElementById(
//     `song-${userData?.currentSong?.id}`
//   );

//   playlistSongElements.forEach((songEl) => {
//     songEl.removeAttribute("aria-current");
//   });

//   if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
// };

// const renderSongs = (array) => {
//   const songsHTML = array
//     .map((song)=> {
//       return `
//       <li id="song-${song.id}" class="playlist-song">
//       <button class="playlist-song-info" onclick="playSong(${song.id})">
//           <span class="playlist-song-title">${song.title}</span>
//           <span class="playlist-song-artist">${song.artist}</span>
//           <span class="playlist-song-duration">${song.duration}</span>
//       </button>
//       <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
//           <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
//           <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
//         </button>
//       </li>
//       `;
//     })
//     .join("");

//   playlistSongs.innerHTML = songsHTML;
// };

// const setPlayButtonAccessibleText = () => {
//   const song = userData?.currentSong || userData?.songs[0];

//   playButton.setAttribute(
//     "aria-label",
//     song?.title ? `Play ${song.title}` : "Play"
//   );
// };

// const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

// playButton.addEventListener("click", () => {
//     if (userData?.currentSong === null) {
//     playSong(userData?.songs[0].id);
//   } else {
//     playSong(userData?.currentSong.id);
//   }
// });

// pauseButton.addEventListener("click",  pauseSong);

// nextButton.addEventListener("click", playNextSong);

// previousButton.addEventListener("click", playPreviousSong);

// shuffleButton.addEventListener("click", shuffle);

// audio.addEventListener("ended", () => {
//   const currentSongIndex = getCurrentSongIndex();
//   const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

//     if (nextSongExists) {
//       playNextSong();
//     } else {
//       userData.currentSong = null;
//       userData.songCurrentTime = 0;  
//     pauseSong();
//     setPlayerDisplay();
//     highlightCurrentSong();
//     setPlayButtonAccessibleText();
//     }
// });

// const sortSongs = () => {
//   userData?.songs.sort((a,b) => {
//     if (a.title < b.title) {
//       return -1;
//     }

//     if (a.title > b.title) {
//       return 1;
//     }

//     return 0;
//   });

//   return userData?.songs;
// };

// renderSongs(sortSongs());
// setPlayButtonAccessibleText();
