// info modal

// open the instructions modal
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
  
  // close the modal when button clicked
  document.getElementById('closeModal').addEventListener('click', function () {
    var modalInstance = M.Modal.getInstance(document.getElementById('instructionsModal'));
    modalInstance.close();
  });

// game variables

let dry = 0;
let timer = 30;

// task notifications 

// winning and losing conditions

// timer
// Select the timer container element
const timerContainer = document.querySelector(".timer");

// Create a CountdownTimer instance
const countdownTimer = new CountdownTimer();

// Append the timer's HTML content to the container
timerContainer.innerHTML = CountdownTimer.getHTML();

class CountdownTimer {
  constructor() {
    this.el = {
      seconds: document.querySelector(".seconds"),
    }

    this.interval = null;
    this.remainingSeconds = 30;

    this.el.closeModal.addEventListener("click", () {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    updateInterfaceTime() {
      this.el.seconds.textContent = remainingSeconds.toString().padStart(2,"0");
    }

    start() {
      if (this.remainingSeconds === 0) return;

      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();

        if (this.remainingSeconds === 0) {
          this.stop();
        }
      }, 1000);
    }

    stop() {
      clearInterval(this.interval);
      this.interval = null;
    }

    static getHTML() {
      return `
        <span class="seconds">00</span>
      `;
    }
    
  }
}
