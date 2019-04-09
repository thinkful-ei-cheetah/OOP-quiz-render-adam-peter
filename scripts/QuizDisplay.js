/* global Renderer */
// eslint-disable-next-line indent
'use strict';

class QuizDisplay extends Renderer {   

// eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
      </div>
      <div>
        <button class="start">Start</button>
      </div>
    `;
  }

  _generateQuestion() {
    return `
      <div>
        ${this.model.questions[0].text}
      </div>
      <div>
      <button class="next">Submit answer</button>
    </div>
    `;
  }

  template() {
    if (this.model.active) {
      return this._generateQuestion();
    } else {
      return this._generateIntro();
    }
  }

  handleStart() {
    this.model.startNewGame();
    this.model.update();
  }
}