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
      this.error = '';
      }

  static apiFetch() {
    return fetch('https://opentdb.com/api.php?amount=5')
    .then( res => {
        if(!res.ok){
            this.error = {code: res.status}
            return res.json();
        }
        return res;
    })
    .then(data => {
        return data.json();
    })
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
    this.questions = [{ id: 1, text: `test` }];
    this.asked= [];
    this.score = 0;
    this.highScore = 0;
    this.scoreHistory = [];
    this.progress = 0;
    this.QUIZ_DATA = [];

  }

  startNewGame() {
    this.active = true;
    TriviaApi.apiFetch()
    .then(questions => {
      this.QUIZ_DATA.push(...(questions.results));
      console.log(this.QUIZ_DATA)
      this.update();
    })
    console.log(this.questions)
  }

}
