/* global Renderer */
'use strict';

class QuizStatus extends Renderer {   
// eslint-disable-line no-unused-vars
  template() {
    if (this.model.currentScreen === 3) {
      return `
      <div>
        <span class="current_score score">Score: ${this.model.score}</span>
        <span class="high_score score">High Score: ${this.model.highScore}</span>
        <span class="progress score">Progress: invactive</span>
      </div>
      `;
    }

    return `
      <div>
        <span class="current_score score" >Score: ${this.model.score}</span>
        <span class="high_score score">High Score: ${this.model.highScore}</span>
        <span class="progress score">Progress: ${this.model.progress} of ${this.model.questions.length}</span>
      </div>
    `;
  }
}
