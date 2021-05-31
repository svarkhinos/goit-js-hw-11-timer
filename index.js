const refs = {
    daysLeft: document.querySelector('[data-value=days]'),
    hoursLeft: document.querySelector('[data-value=hours]'),
    minsLeft: document.querySelector('[data-value=mins]'),
    secsLeft: document.querySelector('[data-value=secs]'),
};

class Timer {
    constructor({ onTick, endTime }) {
        this.endTime = endTime;
        this.onTick = onTick;
    }

    start() {
        setInterval(() => {
            const currentTime = Date.now();

            const time = this.endTime.getTime() - currentTime;

            const timeComponents = getTimeComponents(time);

            this.onTick(timeComponents);
        }, 1000);
    }
}

const timer = new Timer({
    onTick: updateTime,

    endTime: new Date('Jun 17, 2021'),
});

timer.start();

function pad(value) {
    return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
}

function updateTime({ days, hours, mins, secs }) {
    refs.daysLeft.textContent = `${days}`;
    refs.hoursLeft.textContent = `${hours}`;
    refs.minsLeft.textContent = `${mins}`;
    refs.secsLeft.textContent = `${secs}`;
}
