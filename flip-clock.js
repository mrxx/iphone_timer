class FlipClock {
    constructor() {
        this.hoursElem = document.querySelector('.hours');
        this.minutesElem = document.querySelector('.minutes');
        this.secondsElem = document.querySelector('.seconds');
        this.colonElements = document.querySelectorAll('.colon');
        this.lastTime = {
            hours: -1,
            minutes: -1,
            seconds: -1
        };
        this.styleButtons = document.querySelectorAll('.style-button');
        this.clockContainer = document.querySelector('.clock');
        this.setupStyleButtons();
        this.init();
    }

    setupStyleButtons() {
        this.styleButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.styleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const style = button.dataset.style;
                this.clockContainer.classList.remove('default', 'neon', 'led');
                if (style !== 'default') {
                    this.clockContainer.classList.add(style);
                }
            });
        });
    }

    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        if (this.lastTime.hours !== hours) this.flip(this.hoursElem, hours);
        if (this.lastTime.minutes !== minutes) this.flip(this.minutesElem, minutes);
        if (this.lastTime.seconds !== seconds) this.flip(this.secondsElem, seconds);

        // 根据秒数的奇偶性控制冒号的显示
        const isEvenSecond = parseInt(seconds) % 2 === 0;
        this.colonElements.forEach(colon => {
            colon.classList.toggle('hidden', !isEvenSecond);
        });

        this.lastTime = { hours, minutes, seconds };
    }

    flip(element, value) {
        const topFlip = element.querySelector('.top-flip');
        const top = element.querySelector('.top');

        top.textContent = value;
        topFlip.textContent = value;
        topFlip.classList.remove('flip');
        
        requestAnimationFrame(() => {
            topFlip.classList.add('flip');
        });
    }
}

new FlipClock();