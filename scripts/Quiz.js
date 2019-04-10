/* global Model */
class Question {
    constructor(question){
        this.text = question.question;
        this.answers = [question.correct_answer, ...(question.incorrect_answers)];
        this.correctAnswer = question.correct_answer;
        this.userAnswer = '';
        this.answers = this.shuffle(this.answers);

    }
  // sumbmitAnswer(answer){
  //     this.userAnswer = answer;
  // }
  // answerStatus(userAnswer){
  //     let answerstate = 0;
  //     if (this.correctAnswer === userAnswer){
  //         answerstate = 1;
  //     }else{
  //       answerstate = -1;
  //     }
  //     return answerstate;
  // }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    this.currentScreen = 0;
    this.answerSelection = '';
    this.questions = [];
    this.asked= [];
    this.score = 0;
    this.highScore = 0;
    this.scoreHistory = [0];
    this.progress = 0;
    this.QUIZ_DATA = [];
    this.error = 0;


  }

  startNewGame() {
    this.currentScreen = 1;
    this.progress = 0;
    this.questions = [];
    this.score = 0;

    this.progress += 1;
    this.highScore = Math.max(...(this.scoreHistory)); 
    

    console.log(this.questions);
    return TriviaApi.apiFetch()
    .then(questions => {
    //   this.questions.push(...(questions.results));
      questions.results.forEach(question => 
        this.questions.push(new Question(question)));
        // Question.answerShuffle(this.questions.answers);
      this.update();
    })

  }
  nextQuestion(aText) {
    if (aText === ''){
      this.error = 1;
    }
    else{
    this.asked.push(this.questions[this.progress -1]);
    this.answerSelection = aText;
      if(this.questions[this.progress -1].correctAnswer === aText){
        this.score += 1; 
      }
    this.currentScreen = 2;
    this.error = 0;
    }
  }

  handleFinish() {
    this.currentScreen = 3;
    this.scoreHistory.push(this.score);
    
  }
  
}
