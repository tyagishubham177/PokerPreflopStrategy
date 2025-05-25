const soundFiles = {
  'correct_decision': require('../Assets/sounds/correct_decision.mp3'),
  'wrong_decision': require('../Assets/sounds/wrong_decision.mp3'),
  'hint_used': require('../Assets/sounds/hint_used.mp3'),
  'timer_tick': require('../Assets/sounds/timer_tick.mp3'),
};

export const playSound = (soundName, volume = 1) => {
  try {
    const soundSettingsString = localStorage.getItem('soundSettings');
    let soundEnabled = true;

    if (soundSettingsString) {
      try {
        const soundSettings = JSON.parse(soundSettingsString);
        if (soundSettings && typeof soundSettings.soundEnabled === 'boolean') {
          soundEnabled = soundSettings.soundEnabled;
        }
      } catch (parseError) {
        console.error("Error parsing soundSettings from localStorage:", parseError);
        soundEnabled = true;
      }
    }

    if (!soundEnabled) {
      return;
    }

    if (!soundName) {
      console.error("Sound name not provided.");
      return;
    }

    const actualSoundPath = soundFiles[soundName];

    if (!actualSoundPath) {
      console.error(`Sound resource for '${soundName}' not found in soundFiles map.`);
      return;
    }
    
    console.log('Attempting to play sound:', soundName, 'at path:', actualSoundPath);

    const audio = new Audio(actualSoundPath);
    audio.volume = Math.max(0, Math.min(1, volume));

    audio.play()
      .then(() => {
        console.log('Sound', soundName, 'played successfully.');
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
