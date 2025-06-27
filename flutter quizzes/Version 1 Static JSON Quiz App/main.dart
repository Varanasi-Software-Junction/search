import 'package:flutter/material.dart';
import 'dart:convert';

void main() {
  runApp(MCQQuizApp());
}

class MCQQuizApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MCQ Quiz App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: QuizPage(),
    );
  }
}

class QuizPage extends StatefulWidget {
  @override
  _QuizPageState createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  // JSON data as a String
  final String jsonData = '''
[
  {
    "qno": 1,
    "question": "What is C?",
    "opa": "Programming Language",
    "opb": "A game",
    "opc": "A movie",
    "opd": "None of these",
    "correctanswer": "1"
  },
  {
    "qno": 2,
    "question": "Who developed Python?",
    "opa": "Dennis Ritchie",
    "opb": "Bjarne Stroustrup",
    "opc": "Guido van Rossum",
    "opd": "James Gosling",
    "correctanswer": "3"
  },
  {
    "qno": 3,
    "question": "Which tag is used to create a hyperlink in HTML?",
    "opa": "<link>",
    "opb": "<a>",
    "opc": "<href>",
    "opd": "<hyper>",
    "correctanswer": "2"
  }
]
  ''';

  List<dynamic> questions = [];
  int currentQuestionIndex = 0;
  int score = 0;
  bool quizCompleted = false;
  String feedback = '';

  @override
  void initState() {
    super.initState();
    questions = jsonDecode(jsonData);
  }

  void checkAnswer(int selectedOption) {
    String correct = questions[currentQuestionIndex]['correctanswer'];
    setState(() {
      if (selectedOption.toString() == correct) {
        score++;
        feedback = "✅ Correct!";
      } else {
        feedback = "❌ Wrong!";
      }

      Future.delayed(Duration(seconds: 1), () {
        setState(() {
          feedback = '';
          if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
          } else {
            quizCompleted = true;
          }
        });
      });
    });
  }

  void resetQuiz() {
    setState(() {
      currentQuestionIndex = 0;
      score = 0;
      quizCompleted = false;
      feedback = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    if (quizCompleted) {
      return Scaffold(
        appBar: AppBar(title: Text('Quiz Completed')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Your Score: $score / ${questions.length}',
                  style: TextStyle(fontSize: 24)),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: resetQuiz,
                child: Text('Restart Quiz'),
              ),
            ],
          ),
        ),
      );
    }

    var question = questions[currentQuestionIndex];

    return Scaffold(
      appBar: AppBar(title: Text('MCQ Quiz App')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Q${question['qno']}: ${question['question']}',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => checkAnswer(1),
              child: Text(question['opa']),
            ),
            ElevatedButton(
              onPressed: () => checkAnswer(2),
              child: Text(question['opb']),
            ),
            ElevatedButton(
              onPressed: () => checkAnswer(3),
              child: Text(question['opc']),
            ),
            ElevatedButton(
              onPressed: () => checkAnswer(4),
              child: Text(question['opd']),
            ),
            SizedBox(height: 20),
            if (feedback.isNotEmpty)
              Text(
                feedback,
                style: TextStyle(
                  fontSize: 18,
                  color: feedback.contains('Correct') ? Colors.green : Colors.red,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
