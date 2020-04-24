import { AudioListener, AudioLoader, Audio } from 'three';
import { SoundData } from '../data/sounds.data';

export class SoundManager {
  constructor() {
    this.loader = new AudioLoader();
    this.listener = new AudioListener();
  }

  addListenerToCamera(camera) {
    camera.add(this.listener);
  }

  async loadAllAudio(loadingScreen) {
    this.audios = {};
    const audioNames = Object.keys(SoundData);
    const path = 'assets/sounds/';

    loadingScreen.progress = 0;
    loadingScreen.text = `Loading Assets 0 / ${audioNames.length}`;

    let progress = 0;
    let index = 0;
    const loadingIncrement = Math.round(100 / audioNames.length);

    for (let audioName of audioNames) {
      const soundBuffer = await this.loadAudio(path + SoundData[audioName]);
      const audio = new Audio(this.listener);
      audio.setBuffer(soundBuffer);
      this.audios[audioName] = audio;

      progress += loadingIncrement;
      index++;
      loadingScreen.progress = progress;
      loadingScreen.text = `Loading Assets ${index} / ${audioNames.length}`;
    }
  }

  playAudio(audioName, volume = 0.5, isLoop = false) {
    const audio = this.audios[audioName];
    if (audio.isPlaying) {
      audio.stop();
    }
    audio.setVolume(volume);
    audio.setLoop(isLoop);
    audio.play();

    return audio;
  }

  stopAudio(audioName) {
    this.audios[audioName].stop();
  }

  stopAllAudio() {
    Object.keys(this.audios).forEach((audioName) => {
      const audio = this.audios[audioName];
      if (audio && audio.isPlaying) {
        audio.stop();
      }
    });
  }

  async loadAudio(path) {
    return new Promise((resolve, reject) => {
      this.loader.load(path, (sound) => {
        return resolve(sound);
      });
    });
  }
}
