/* global Renderer Quiz, Question, TriviaApi */
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
      <div>
      <form>
        <input type="radio" role="button" class="js-answer-input" name="answer1"/>
        <label for="answer1" title="text">[answer goes here]</label>
        <input type="radio" role="button" class="js-answer-input" name="answer2"/>
        <label for="answer2" title="text">[answer goes here]</label>
        <input type="radio" role="button" class="js-answer-input" name="answer3"/>
        <label for="answer3" title="text">[answer goes here]</label>
        <input type="radio" role="button" class="js-answer-input" name="answer4"/>
        <label for="answer4" title="text">[answer goes here]</label>

        </div>
          <button class="next">Submit answer</button>
        </div>
      </form>

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
    // const quizData = new TriviaApi();
    // Quiz.QUIZ_DATA = [quizData.getQuestions()];
    this.model.startNewGame();
    this.model.update();
   //console.log(Quiz.QUIZ_DATA);
  }
}