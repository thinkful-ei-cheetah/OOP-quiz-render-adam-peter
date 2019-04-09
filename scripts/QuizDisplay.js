/* global Renderer Question */
// eslint-disable-next-line indent
'use strict';

class QuizDisplay extends Renderer {   

// eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .next': 'handleNextQuestion',
      'click .js-answer-input': 'handleAnswer',
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
        ${this.model.questions[this.model.progress -1].text}
      </div>
      <div>
      <div>
      <form>
        <input type="radio" role="button" class="js-answer-input js-answer1" name="answer1"/>
        <label for="answer1" title="text">${this.model.questions[this.model.progress -1].answers[0]}</label>
        <input type="radio" role="button" class="js-answer-input js-answer2" name="answer2"/>
        <label for="answer2" title="text">${this.model.questions[this.model.progress -1].answers[1]}</label>
        <input type="radio" role="button" class="js-answer-input js-answer3" name="answer3"/>
        <label for="answer3" title="text">${this.model.questions[this.model.progress -1].answers[2]}</label>
        <input type="radio" role="button" class="js-answer-input js-answer4" name="answer4"/>
        <label for="answer4" title="text">${this.model.questions[this.model.progress -1].answers[3]}</label>
     
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
    this.model.startNewGame();

  }
  handleNextQuestion(){
    
    this.model.nextQuestion();
    
    console.log('next was clicked');
  }

   handleAnswer(){
    console.log($('.js-answer1'));
   }

}

