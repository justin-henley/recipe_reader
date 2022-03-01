export default class Voice extends Object {
  #speechQueue;
  #voiceProfile;
  busy;

  constructor(voiceProfile = "UK English Male") {
    super();
    this.#speechQueue = [];
    this.#voiceProfile = voiceProfile;
    this.busy = false;
  }

  speak(text) {
    // Push text to speech queue
    if (text) this.#speechQueue.push(text);

    // Read the text
    this.read();
  }

  read() {
    if (!this.busy && this.#speechQueue.length > 0) {
      // Lock speech
      this.busy = true;

      // Read the first entry in the queue
      responsiveVoice.speak(this.#speechQueue[0], this.#voiceProfile, {
        onend: () => {
          this.#speechQueue.shift();
          this.speak();
        },
      });

      this.busy = false;
    }
  }
}
