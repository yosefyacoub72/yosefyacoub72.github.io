class Timer {
    constructor(duration, display, progress) {
        this.duration = duration;
        this.elapsed = 0;
        this.display = display;
        this.progress = progress;
        this.interval = null;
    }

    start() {
        if (this.interval !== null) return;
        this.elapsed = 0;
        this.interval = setInterval(() => this.update(), 10);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.elapsed = 0;
        this.update();
        clearInterval(this.interval);
        this.interval = null;
    }

    update() {
        let hours = parseInt((this.elapsed / (60 * 60 * 1000)), 10);
        let minutes = parseInt((this.elapsed % (60 * 60 * 1000)) / (60 * 1000), 10);
        let seconds = parseInt((this.elapsed % (60 * 1000)) / 1000, 10);
        let milliseconds = parseInt(this.elapsed % 1000, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        milliseconds = milliseconds < 100 ? "0" + (milliseconds < 10 ? "0" + milliseconds : milliseconds) : milliseconds;

        this.display.textContent = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;

        let percentage = (this.elapsed / this.duration) * 100;
        this.progress.style.width = percentage + "%";

        if (percentage <= 50) {
            this.progress.style.backgroundColor = "green";
        } else if (percentage > 50 && percentage <= 66.67) {
            this.progress.style.backgroundColor = "yellow";
        } else {
            this.progress.style.backgroundColor = "red";
        }

        if ((this.elapsed += 10) >= this.duration) {
            this.stop();
        }
    }
}

window.onload = function() {
    let display = document.querySelector('#time-display');
    let progress = document.querySelector('#progressbar .progress');
    let timer = new Timer(5400 * 1000, display, progress);

    document.querySelector('#start').addEventListener('click', () => {
        timer.start();
    });

    document.querySelector('#stop').addEventListener('click', () => {
        timer.stop();
    });

    document.querySelector('#reset').addEventListener('click', () => {
        timer.reset();
    });
    document.querySelector('#fast-forward').addEventListener('click', () => {
    timer.elapsed += 10 * 60 * 1000;  // Add 10 minutes
    timer.update();
});
};
