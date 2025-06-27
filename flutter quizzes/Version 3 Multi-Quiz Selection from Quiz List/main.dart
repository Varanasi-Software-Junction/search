import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

void main() {
  runApp(MultiQuizApp());
}

class MultiQuizApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Multi Quiz App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: QuizListPage(),
    );
  }
}

class QuizListPage extends StatefulWidget {
  @override
  _QuizListPageState createState() => _QuizListPageState();
}

class _QuizListPageState extends State<QuizListPage> {
  final String quizListUrl =
      'https://varanasi-software-junction.github.io/vsjpictures/quizlist.json';

  List<dynamic> quizList = [];
  bool isLoading = true;
  bool errorLoading = false;

  @override
  void initState() {
    super.initState();
    fetchQuizList();
  }

  Future<void> fetchQuizList() async {
    try {
      final response = await http.get(Uri.parse(quizListUrl));
      if (response.statusCode == 200) {
        setState(() {
          quizList = jsonDecode(response.body);
          isLoading = false;
        });
      } else {
        setState(() {
          errorLoading = true;
        });
      }
    } catch (e) {
      setState(() {
        errorLoading = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text('Loading Quizzes...')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (errorLoading) {
      return Scaffold(
        appBar: AppBar(title: Text('Error')),
        body: Center(
          child: Text(
            'Failed to load quiz list.\nCheck internet connection.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 18, color: Colors.red),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Select a Quiz')),
      body: ListView.builder(
        itemCount: quizList.length,
        itemBuilder: (context, index) {
          var quiz = quizList[index];
          return ListTile(
            title: Text('Quiz ${quiz['quizno']}: ${quiz['quizname']}'),
            trailing: Icon(Icons.arrow_forward),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      QuizPage(quizUrl: quiz['url'], quizName: quiz['quizname']),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class QuizPage extends StatefulWidget {
  final String quizUrl;
  final String quizName;

  QuizPage({required this.quizUrl, required this.quizName});

  @override
  _QuizPageState createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  List<dynamic> questions = [];
  int currentQuestionIndex = 0;
  int score = 0;
  bool quizCompleted = false;
  String feedback = '';
  bool isLoading = true;
  bool errorLoading = false;

  @override
  void initState() {
    super.initState();
    fetchQuiz();
  }

  Future<void> fetchQuiz() async {
    try {
      final response = await http.get(Uri.parse(widget.quizUrl));
      if (response.statusCode == 200) {
        setState(() {
          questions = jsonDecode(response.body);
          isLoading = false;
        });
      } else {
        setState(() {
          errorLoading = true;
        });
      }
    } catch (e) {
      setState(() {
        errorLoading = true;
      });
    }
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
    if (isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text('Loading ${widget.quizName}...')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (errorLoading) {
      return Scaffold(
        appBar: AppBar(title: Text('Error')),
        body: Center(
          child: Text(
            'Failed to load quiz.\nCheck internet connection.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 18, color: Colors.red),
          ),
        ),
      );
    }

    if (quizCompleted) {
      return Scaffold(
        appBar: AppBar(title: Text('${widget.quizName} Completed')),
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
              SizedBox(height: 10),
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                child: Text('Back to Quiz List'),
              ),
            ],
          ),
        ),
      );
    }

    var question = questions[currentQuestionIndex];

    return Scaffold(
      appBar: AppBar(title: Text(widget.quizName)),
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
