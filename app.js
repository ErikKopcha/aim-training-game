class AimGameControl {
    constructor() {}

    init() {
        this.getControlElements();
    }

    getControlElements() {
        this.time = 0;
        this.startBtn = document.getElementById('start');
        this.screens = document.querySelectorAll('.screen');
        this.timeList = document.getElementById('time-list');
        this.timeInfo = document.getElementById('time');
        this.board = document.getElementById('board');
        this.colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', '#A8F9FF', '#9AE5E6', '#E55934', '#D9594C', '#C3BF6D', '#89608E', '#EDFFAB', '#7AE7C7', '#58355E'];
        this.score = 0;

        this.triggers();
    }

    triggers() {
        if (this.startBtn) {
            this.startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.screens[0].classList.add('up');
            });
        }

        if (this.timeList) {
            this.timeList.addEventListener('click', (e) => {
                 if (e.target.classList.contains('time-btn')) {
                    this.startGame(+e.target.dataset.time);
                 }
            });
        }

        if (this.board) {
            this.board.addEventListener('click' , (e) => {
                if (e.target.classList.contains('circle')) {
                    this.score++;
                    e.target.remove();
                    this.createRandomCircle();
                }
            });
        }
    }

    startGame(time) {
        this.createRandomCircle();
        this.setTime(time);
        this.screens[1].classList.add('up');
        this.decreaseTime(time);
    }

    decreaseTime(time) {
        let timeM = time;

        this.setTime(timeM--);

        let timer = setInterval(() => {
            this.setTime(timeM--);
            if (timeM < 0) {
                clearInterval(timer);
                this.finishGame();
            };
        }, 1000);
    }

    setTime(time) {
        this.timeInfo.innerHTML = `00:${time < 10 ? `0${time}` : time}`;
    }

    createRandomCircle() {
        const circle = document.createElement('div');
        const size = this.getRandomNumber(10, 60);

        const {width, height} = this.board.getBoundingClientRect();

        const x = this.getRandomNumber(0, width - size);
        const y  = this.getRandomNumber(0, height - size);

        circle.classList.add('circle');
        circle.style.cssText = `
            top: ${y}px;
            left: ${x}px;
            width: ${size}px;
            height: ${size}px;
            box-shadow: 0 0 10px ${this.colors[this.getRandomNumber(0, this.colors.length - 1)]}, 0 0 20px ${this.colors[this.getRandomNumber(0, this.colors.length - 1)]};
            background-color: ${this.colors[this.getRandomNumber(0, this.colors.length - 1)]};
        `;

        this.board.appendChild(circle);
    }

    getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    finishGame() {
        this.timeInfo.parentElement.remove();
        this.board.innerHTML = `
            <h1>Your score: <span class="primary">${this.score}</span></h1>
        `;
    }
}