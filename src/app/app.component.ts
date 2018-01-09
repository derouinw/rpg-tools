import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Playlist } from './model/playlist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RPG Tools';
  sidebarActive = false;

  playlistVals = [
    { name: "Ambient: Cavern", uri: "spotify:user:bezoing:playlist:7cgECSzxFYwjHugNdbur1O" },
    { name: "Ambient: Forest", uri: "spotify:user:bezoing:playlist:5ayvxbK8CveLIj4llcibs2" },
    { name: "Ambient: Mountain Pass", uri: "spotify:user:bezoing:playlist:4y88W8yD8M32PJ4ZNJVzAp" },
    { name: "Ambient: Mystical", uri: "spotify:user:bezoing:playlist:47JbzbE2fpng1VU0VeufGU" },
    { name: "Ambient: Ocean", uri: "spotify:user:bezoing:playlist:0czhzWKJ1qoC9iHH5yN93a" },
    { name: "Ambient: Storm", uri: "spotify:user:bezoing:playlist:3lQ1VrIoMDHJmw52N3uAEc" },
    { name: "Atmosphere: The Cathedral", uri: "spotify:user:bezoing:playlist:0IyMP3izyM2jbYgJLydB00" },
    { name: "Atmosphere: The Desert", uri: "spotify:user:bezoing:playlist:4yguXksZpqOW10hpuDyB5A" },
    { name: "Atmosphere: The Dungeon", uri: "spotify:user:bezoing:playlist:64UCYVCIPtZiOP2zEodORk" },
    { name: "Atmosphere: The Fey", uri: "spotify:user:bezoing:playlist:4jPscCOA5zrheXibHnmlU1" },
    { name: "Atmosphere: The Manor", uri: "spotify:user:bezoing:playlist:6QzZjlzHxNUo9N6E19RKpJ" },
    { name: "Atmosphere: The Road", uri: "spotify:user:bezoing:playlist:0gZQWj0PjC6t2bgmroHaaW" },
    { name: "Atmosphere: The Saloon", uri: "spotify:user:bezoing:playlist:73YmiE2tLNG5VbNF7oGmSn" },
    { name: "Atmosphere: The Tavern", uri: "spotify:user:bezoing:playlist:2StSwZk9mV2DNO3aucMZYx" },
    { name: "Atmosphere: The Town", uri: "spotify:user:bezoing:playlist:5GgU8cLccECwAvjDCGhYjj" },
    { name: "Atmosphere: The Underdark", uri: "spotify:user:bezoing:playlist:5Qhtamj9NCxluijLnQ4edN" },
    { name: "Atmosphere: The Wild", uri: "spotify:user:bezoing:playlist:5r2AkNQOITXRqVWqYj40QG" },
    { name: "Campaign: Maelstrom", uri: "spotify:user:bezoing:playlist:3dxUEDvJdWtaQWRJgKCESl" },
    { name: "Combat: Boss", uri: "spotify:user:bezoing:playlist:0Q6hJZYIEu3LwbyBBHjjHo" },
    { name: "Combat: Duel", uri: "spotify:user:bezoing:playlist:5g9ZZ9Ogml8NsjOlv8N31t" },
    { name: "Combat: Epic", uri: "spotify:user:bezoing:playlist:4Anyq806DQpd7pRZbSADUr" },
    { name: "Combat: Horrifying", uri: "spotify:user:bezoing:playlist:1SbeUQZbRHyUEIr6wsoD4q" },
    { name: "Combat: Standard", uri: "spotify:user:bezoing:playlist:0bWUBjlr7O4troJKyyMVbD" },
    { name: "Combat: Tough", uri: "spotify:user:bezoing:playlist:6T0UOAmlbWb29y2fIETtL2" },
    { name: "Monsters: Aberrations", uri: "spotify:user:bezoing:playlist:1IIfebxUOYAeOD2Aqvw7Rj" },
    { name: "Monsters: Beasts", uri: "spotify:user:bezoing:playlist:6XslTVSeiQr80Gu79vnfXZ" },
    { name: "Monsters: Dragons", uri: "spotify:user:bezoing:playlist:1qvLig9ELPmb8bcVPutk9M" },
    { name: "Monsters: Giants", uri: "spotify:user:bezoing:playlist:6U68RdBoCkZFNWBXhQ4KXH" },
    { name: "Monsters: Goblins", uri: "spotify:user:bezoing:playlist:58lGIqHs8HSmcYoKW7gBE3" },
    { name: "Monsters: Hags", uri: "spotify:user:bezoing:playlist:4k1no9mrUph4rkFI1bEFJT" },
    { name: "Monsters: Orcs", uri: "spotify:user:bezoing:playlist:46NfO4PokCdGvm6Fkbtx9u" },
    { name: "Monsters: Tribesmen", uri: "spotify:user:bezoing:playlist:2crzs0lic8x58JyPZM8k3v" },
    { name: "Monsters: Undead", uri: "spotify:user:bezoing:playlist:49PvqjRs9c4lgyvdOI4Lvd" },
    { name: "Mood: Creepy", uri: "spotify:user:bezoing:playlist:6nSstCQcmzcEUSx8gBrcek" },
    { name: "Mood: Denouement", uri: "spotify:user:bezoing:playlist:71AETM4dyul7BDNYE9zVBv" },
    { name: "Mood: Joyful", uri: "spotify:user:bezoing:playlist:6KbY8nK4vdGO0zaSuoXEFr" },
    { name: "Mood: Mysterious", uri: "spotify:user:bezoing:playlist:28ICiQDK37yaahRZD7aX3J" },
    { name: "Mood: Ominous", uri: "spotify:user:bezoing:playlist:71yNeiFbb8bDhgLIzu9eae" },
    { name: "Mood: Pleasant", uri: "spotify:user:bezoing:playlist:3O4DGo9DS5kzUUJo6EQYdp" },
    { name: "Mood: Ridiculous", uri: "spotify:user:bezoing:playlist:3VepfFpcPxHIL7WyKYFdGI" },
    { name: "Mood: Serious", uri: "spotify:user:bezoing:playlist:3LNrO4Jvwtzk2QD1gR8ccZ" },
    { name: "Mood: Somber", uri: "spotify:user:bezoing:playlist:5N5w6WFXigWqZMLzVo6rdh" },
    { name: "Mood: Tense", uri: "spotify:user:bezoing:playlist:4DYALPIektzP4vVdZFlHNe" },
    { name: "Situation: Chase", uri: "spotify:user:bezoing:playlist:1TXWTHKaWNQij6K9Ldn6fU" },
    { name: "Situation: Stealth", uri: "spotify:user:bezoing:playlist:6GdFG0fgrJLSXSlEkF6iM0" }
  ]

  playlists: Playlist[]
  currentPlaylist: Playlist

  constructor(private sanitizer: DomSanitizer) {

    this.playlists = [];

    for (let playlist of this.playlistVals) {
      this.playlists.push(new Playlist(playlist.name, playlist.uri, this.sanitizer));
    }

    this.currentPlaylist = this.playlists[0];
  }

  playing = false;

  togglePlaying = () => {
    this.playing = !this.playing;
  }

  selectPlaylist = (index: number) => {
    this.currentPlaylist = this.playlists[index];
  }
}
