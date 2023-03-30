const msg = new SpeechSynthesisUtterance();
    let voices = [];
    const voicesDropdown = document.querySelector('[name="voice"]');
    const options = document.querySelectorAll('[type="range"], [name="text"]');
    const speakButton = document.querySelector('#speak');
    const stopButton = document.querySelector('#stop');

    msg.text = document.querySelector('[name="text"]').value;

    function populateVoices() {
      voices = this.getVoices();
      const voiceOptions = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`)
        .join('');
      voicesDropdown.innerHTML = voiceOptions;
    }

    function setVoice() {
      msg.voice = voices.find(voice => voice.name === this.value);
      toggle();
    }

    function speak() {
      toggle(false);
      speechSynthesis.speak(msg);

    }

    function toggle(startOver = true) {
      speechSynthesis.cancel();
      if (startOver === true)
        speechSynthesis.speak(msg);
    }

    function setOption() {
      console.log(this.name, this.value);
      msg[this.name] = this.value;
    }

    speechSynthesis.addEventListener('voiceschanged', populateVoices);
    voicesDropdown.addEventListener('change', setVoice);
    speakButton.addEventListener('click', speak);

    options.forEach(option => option.addEventListener('change', setOption));
    stopButton.addEventListener('click', toggle.bind(null, false));
    //toggle.bind allows us to send an argument to function in event listener - first value is usually null, second one is the one we wanna send;
    //can also be done like:
    //stopButton.addEventListener('click', () => toggle(false));