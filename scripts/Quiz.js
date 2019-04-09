/* global Model */
class Question {
  static attrs = {
      text: '',
      answers: [],
      correctAnswer: '',
      userAnswer: ''
  };

  static sumbmitAnswer(answer){
      this.attrs.userAnswer = answer;
  }
  static answerStatus(userAnswer){
      let answerstate = 0;
      if (correctAnswer === userAnswer){
          answerstate = 1;
      }
      if (correctAnswer !== userAnswer){
          answerstate = -1;
      }
      return answerstate;
  }
}

class TriviaApi {
    constructor()  {
        this.BASE_URL = 'https://opentdb.com/api.php?amount=5';
        this.error = '';
    }


    static apiFetch() {
      fetch(this.BASE_URL)
      .then( res => {
          if(!res.ok){
              this.error = {code: res.status}
              return res.json();
          }
      })
      .then(data => {
          if(this.error){
              this.error.message = data.message
              return Promise.reject(`ERROR: ${this.error}`);
          }
          return data
      })
    }

    static getQuestions() {
      return this.apiFetch(`${this.BASE_URL}`);
    }
}




/**
 * You can replace this Quiz with the version you worked on yesterday. It's just
 * provided as an example.
 */

class Quiz extends Model {          // eslint-disable-line no-unused-vars

  // This class property could be used to determine the no. of quiz questions
  // In later implementations, the user could provide a quiz length and override
  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();

    // Your Quiz model's constructor logic should go here. There is just examples below.
    this.active = false;
    this.questions = [{ id: 1, text: `this is a test`}];
    this.asked= [];
    this.score = 0;
    this.highScore = 0;
    this.scoreHistory = [];
    this.progress = 0;

  }

  startNewGame() {
    this.active = true;
    console.log(this.questions)
  }

}
