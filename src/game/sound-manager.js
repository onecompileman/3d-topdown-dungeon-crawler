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

  async loadAllAudio() {
    this.audios = {};
    const audioNames = Object.keys(SoundData);
    const path = 'assets/sounds/';

    for (let audioName of audioNames) {
      const soundBuffer = await this.loadAudio(path + SoundData[audioName]);
      const audio = new Audio(this.listener);
      audio.setBuffer(soundBuffer);
      this.audios[audioName] = audio;
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
