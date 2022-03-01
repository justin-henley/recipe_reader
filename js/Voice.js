/**
 * Class for accessing the Responsive Voice API
 * @extends Object
 */
export default class Voice extends Object {
  // Properties
  #speechQueue;
  #voiceProfile;
  #busy;
  #voices = [];

  /**
   * Create a voice object
   * @constructor
   * @param {string} voiceProfile - The voice to use when reading
   */
  constructor(voiceProfile = "UK English Male") {
    super();
    this.#speechQueue = [];
    this.#voiceProfile = voiceProfile;
    responsiveVoice.setDefaultVoice(this.#voiceProfile);
    this.#busy = false;

    // Unpack voice names from array of objects
    for (let obj of responsiveVoice.getVoices()) {
      this.#voices.push(obj.name);
    }
  }

  /**
   * Enqueues a piece of text to be read
   * @param {string} text - The text to be read aloud
   */
  speak(text) {
    // Push text to speech queue
    if (text) this.#speechQueue.push(text);

    // Read the text
    this.read();
  }

  /**
   * Reads the first item in the queue
   */
  read() {
    if (!this.#busy && this.#speechQueue.length > 0) {
      // Lock speech
      this.#busy = true;

      // Read the first entry in the queue
      responsiveVoice.speak(this.#speechQueue[0], this.#voiceProfile, {
        onend: () => {
          this.#speechQueue.shift();
          this.read();
        },
      });

      this.#busy = false;
    }
  }

  /**
   * @returns {Array} - The list of available voices from Responsive Voice API
   */
  get availableVoices() {
    return this.#voices;
  }

  /**
   * Gets the current voice profile
   * @returns {string} - The current voice profile
   */
  get voiceProfile() {
    return this.#voiceProfile;
  }

  /**
   * Sets the voice profile
   * @param {string} voice - The voice profile for the reader to use
   */
  set voiceProfile(voice) {
    if (this.#voices.includes(voice)) {
      this.#voiceProfile = voice;
    }
  }
}
