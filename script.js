class audioPlayer {
    constructor() {
        this.pads = document.querySelectorAll('.pad')
        this.buttton = document.querySelector('.play')
        this.index = 0;
        this.isPlaying = null;
        this.bpm = 200;
        this.kickAudio = document.querySelector('.kick-audio')
        this.snareAudio = document.querySelector('.snare-audio')
        this.hihatAudio = document.querySelector('.hihat-audio')
        this.rangeInput = document.querySelector('.range-input')
        this.rangeNr = document.querySelector('.range-value')
        this.muteBtns = document.querySelectorAll('.mute')
        this.selects = document.querySelectorAll('.select')
    }
    activePad() {
        this.classList.toggle('active')
    }
    repeater() {
        let step = this.index % 8;
        const activePads = document.querySelectorAll(`.b${step}`)
        activePads.forEach(pad => {
            pad.style.animation = `padAnim .3s ease-in-out alternate 2`;
            if (pad.classList.contains('active')) {
                if (pad.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play()
                }
                if (pad.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play()
                }
                if (pad.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play()
                }
            }
        })
        this.index++;
    }
    startInterval() {
        let intervalSpeed = (60 / this.bpm) * 1000;
        if (this.isPlaying) {
            clearInterval(this.isPlaying)
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                this.repeater()
            }, intervalSpeed)
        }
    }
    updateBtnText() {
        if (this.isPlaying) {
            this.buttton.innerText = 'Stop'
        } else {
            this.buttton.innerText = 'Play'
        }
    }
    mute(idx) {
        if (this.muteBtns[idx].classList.contains('active')) {
            console.log(this.muteBtns[idx])
            switch (idx) {
                case '0':
                    this.kickAudio.volume = 0
                    break
                case '1':
                    this.snareAudio.volume = 0
                    break
                case '2':
                    this.hihatAudio.volume = 0
                    break
            }
        } else {
            switch (idx) {
                case '0':
                    this.kickAudio.volume = 1
                    break
                case '1':
                    this.snareAudio.volume = 1
                    break
                case '2':
                    this.hihatAudio.volume = 1
                    break
            }
        }
    }
    changeSrc(e) {
        const optionName = e.target.name
        const optionValue = e.target.value
        switch (optionName) {
            case 'kick-select':
                this.kickAudio.src = optionValue
                break
            case 'snare-select':
                this.snareAudio.src = optionValue
                break
            case 'hihat-select':
                this.hihatAudio.src = optionValue
                break
        }
    }
}

const player = new audioPlayer

//EVENT LISTENERS

player.pads.forEach(pad => {
    pad.addEventListener('click', player.activePad)
})

player.buttton.addEventListener('click', () => {
    player.startInterval()
    player.updateBtnText()
})

player.pads.forEach(pad => {
    pad.addEventListener('animationend', () => {
        pad.style.animation = ''
    })
})

player.rangeInput.addEventListener('input', (e) => {
    player.rangeNr.innerText = e.target.value
})

player.rangeInput.addEventListener('change', (e) => {
    player.bpm = e.target.value;
    clearInterval(player.isPlaying)
    player.isPlaying = null;
    player.buttton.innerText = 'Play'
})

player.muteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active')
        player.mute(btn.getAttribute('data-btnIdx'))
        console.log(player.hihatAudio)
    })
})


player.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        player.changeSrc(e)
    })
})