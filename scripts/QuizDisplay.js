/* global Renderer Question */
// eslint-disable-next-line indent
'use strict';

class QuizDisplay extends Renderer {   

  // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .next': 'handleNextQuestion',
      'click .proceed': 'handleProceed',
      'click .again': 'handleStart'
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
    if (this.model.questions[this.model.progress -1].answers.length < 3) {
      return `
      <div>
      ${this.model.questions[this.model.progress -1].text}
      </div>
      <div>
        <div>
          <form>
            <input type="radio" role="button" class="js-answer-input js-answer1" id="answer1" name="answer1"/>
            <label for="answer1" title="text">${this.model.questions[this.model.progress -1].answers[0]}</label>
            <input type="radio" role="button" class="js-answer-input js-answer2" id="answer2" name="answer2"/>
            <label for="answer2" title="text">${this.model.questions[this.model.progress -1].answers[1]}</label>
        </div>
        <button class="next">Submit answer</button>
      </div>

    </form>
      `;
    }

    return `
      <div>
        ${this.model.questions[this.model.progress -1].text}
      </div>
      <div>
      <div>
      <form>
        <input type="radio" role="button" class="js-answer-input js-answer1" id="answer1" name="answer1"/>
        <label for="answer1" title="text">${this.model.questions[this.model.progress -1].answers[0]}</label>
        <input type="radio" role="button" class="js-answer-input js-answer2" id="answer2" name="answer2"/>
        <label for="answer2" title="text">${this.model.questions[this.model.progress -1].answers[1]}</label>
        <input type="radio" role="button" class="js-answer-input js-answer3" id="answer3" name="answer3"/>
        <label for="answer3" title="text">${this.model.questions[this.model.progress -1].answers[2]}</label>
        <input type="radio" role="button" class="js-answer-input js-answer4" id="answer3" name="answer4"/>
        <label for="answer4" title="text">${this.model.questions[this.model.progress -1].answers[3]}</label>
        </div>
          <button class="next">Submit answer</button>
        </div>

      </form>

    `;
  }

  _generateCheck(){
    if(this.model.questions[this.model.progress -1].correctAnswer === this.model.answerSelection) {
      return `
      <div>
        ${this.model.questions[this.model.progress -1].text}
      </div>
      <div>
      The correct answer was:
        ${this.model.questions[this.model.progress -1].correctAnswer}
      </div>
      <div>
      You got it right!
      </div>
      <button class='proceed'>proceed</button>
      `;
    }
    
    return `
    <div>
        ${this.model.questions[this.model.progress -1].text}
    </div>
    <div>
      The correct answer was:
        ${this.model.questions[this.model.progress -1].correctAnswer}
    </div>
    <div>
      your answer was
        <div>${this.model.answerSelection}</div>
    </div>
    <button class='proceed'>proceed</button>
    `;
  }

  _generateEnd() {
    if (this.model.score > this.model.highScore) {
      return `
      <div>
        <div>Congratulations!</div>
        <div>Your final score was ${this.model.score} out of 5</div>
        <div>That's a new HIGHSCORE!</div>
        <button class="again">
          play again?
        </button>

      </div>
      `;
    }
    return `
    <div>
      <div>Congratulations!</div>
      <div>Your final score was ${this.model.score} out of 5</div>
      <button class="again">
        play again?
      </button>

    </div>
  `;
  }

  template() {
    switch(this.model.currentScreen){
    case 0:
      return this._generateIntro();
    case 1: 
      return this._generateQuestion();
    case 2: 
      return this._generateCheck();
    
    case 3: 
      return this._generateEnd();
    
    }
  }

  handleStart() {
    this.model.startNewGame();
  }

  handleNextQuestion(){
    const aText = $('input:checked + label').text();
    this.model.nextQuestion(aText);
    this.model.update();
  }

  handleProceed() {
    
    this.model.currentScreen = 1;
    if (this.model.progress === 5){
      this.model.handleFinish();
    }
    this.model.progress += 1;
    this.model.update();
  }

}

