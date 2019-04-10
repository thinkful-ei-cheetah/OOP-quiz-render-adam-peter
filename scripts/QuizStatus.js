/* global Renderer */
'use strict';

class QuizStatus extends Renderer {   
// eslint-disable-line no-unused-vars
  template() {
    return `
      <div>
        <span>Score: ${this.model.score}</span>
        <span>High Score: ${this.model.highScore}</span>
        <span>Progress: ${this.model.progress} of ${this.model.questions.length}</span>
      </div>
    `;
  }
}
