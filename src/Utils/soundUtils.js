// At the top of src/Utils/soundUtils.js
const soundFiles = {
  'correct_decision': require('../Assets/sounds/correct_decision.mp3'),
  'wrong_decision': require('../Assets/sounds/wrong_decision.mp3'),
  'hint_used': require('../Assets/sounds/hint_used.mp3'),
  'timer_tick': require('../Assets/sounds/timer_tick.mp3'),
};

/**
 * Plays a sound effect.
 *
 * @param {string} soundName - The name of the sound file (without extension).
 * @param {number} [volume=1] - The volume to play the sound at (0.0 to 1.0).
 */
export const playSound = (soundName, volume = 1) => {
  try {
    // Check if sound is globally enabled in localStorage
    const soundSettingsString = localStorage.getItem('soundSettings');
    let soundEnabled = true; // Default to true if settings are not found or property is missing

    if (soundSettingsString) {
      try {
        const soundSettings = JSON.parse(soundSettingsString);
        if (soundSettings && typeof soundSettings.soundEnabled === 'boolean') {
          soundEnabled = soundSettings.soundEnabled;
        }
      } catch (parseError) {
        console.error("Error parsing soundSettings from localStorage:", parseError);
        // Default to sound enabled if parsing fails
        soundEnabled = true;
      }
    }

    if (!soundEnabled) {
      // console.log(`Sound ${soundName} not played because sound is disabled globally.`);
      return;
    }

    if (!soundName) {
      console.error("Sound name not provided.");
      return;
    }

    const actualSoundPath = soundFiles[soundName]; // Get path from map

    if (!actualSoundPath) {
      console.error(`Sound resource for '${soundName}' not found in soundFiles map.`);
      return;
    }
    
    // Enhanced logging from previous step, now using actualSoundPath
    console.log('Attempting to play sound:', soundName, 'at path:', actualSoundPath);

    const audio = new Audio(actualSoundPath);
    audio.volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1

    audio.play()
      .then(() => { // Added for successful play log
        console.log('Sound', soundName, 'played successfully.');
      })
      .catch(playError => {
        console.error(`Error playing sound ${soundName} at path ${actualSoundPath}:`, playError);
      });

    audio.onerror = (errorEvent) => {
      // Enhanced logging from previous step
      // Ensure the error event itself is logged for more details
      console.error(`Audio onerror event for ${soundName} with path ${actualSoundPath}:`, errorEvent); 
    };

  } catch (e) {
    console.error(`Unexpected error in playSound for ${soundName}:`, e);
  }
};
