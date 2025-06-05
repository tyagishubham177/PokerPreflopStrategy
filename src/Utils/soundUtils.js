import { SOUND_SETTINGS_LS_KEY } from '../Constants/StorageKeys';
import { SOUND_FILES } from '../Constants/SoundFiles';

export const playSound = (soundName, volume = 1) => {
  try {
    const soundSettingsString = localStorage.getItem(SOUND_SETTINGS_LS_KEY); // Use constant
    let soundEnabled = true;
    let masterVolume = 0.5; // Default master volume

    if (soundSettingsString) {
      try {
        const soundSettings = JSON.parse(soundSettingsString);
        if (soundSettings) {
          if (typeof soundSettings.soundEnabled === 'boolean') {
            soundEnabled = soundSettings.soundEnabled;
          }
          if (typeof soundSettings.soundVolume === 'number') {
            masterVolume = soundSettings.soundVolume;
          }
        }
      } catch (parseError) {
        console.error("Error parsing soundSettings from localStorage:", parseError);
        // Keep default soundEnabled and masterVolume
      }
    }

    if (!soundEnabled) {
      return;
    }

    if (!soundName) {
      console.error("Sound name not provided.");
      return;
    }

    const actualSoundPath = SOUND_FILES[soundName];

    if (!actualSoundPath) {
      console.error(`Sound resource for '${soundName}' not found in SOUND_FILES map.`);
      return;
    }
    


    const audio = new Audio(actualSoundPath);
    // The 'volume' parameter now acts as a relative modifier to the masterVolume
    // e.g. playSound('click', 0.8) would play at 80% of masterVolume
    let effectiveVolume = masterVolume * volume;
    // Apply a non-linear curve (squaring the value for now)
    let adjustedVolume = Math.pow(effectiveVolume, 2);
    audio.volume = Math.max(0, Math.min(1, adjustedVolume));

    audio.play()
      .then(() => {
        // Sound played successfully
      })
      .catch(playError => {
        console.error(`Error playing sound ${soundName} at path ${actualSoundPath}:`, playError);
      });

    audio.onerror = (errorEvent) => {
      console.error(`Audio onerror event for ${soundName} with path ${actualSoundPath}:`, errorEvent);
    };

  } catch (e) {
    console.error(`Unexpected error in playSound for ${soundName}:`, e);
  }
};
