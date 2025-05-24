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

    const soundFilePath = `../Assets/sounds/${soundName}.mp3`;
    const audio = new Audio(soundFilePath);
    audio.volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1

    audio.play()
      .catch(playError => {
        console.error(`Error playing sound ${soundName} at path ${soundFilePath}:`, playError);
      });

    audio.onerror = (errorEvent) => {
      console.error(`Error loading sound ${soundName} at path ${soundFilePath}:`, errorEvent);
    };

  } catch (e) {
    console.error(`Unexpected error in playSound for ${soundName}:`, e);
  }
};
