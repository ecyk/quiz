var question_index = -1;
var g_quiz_name = null;

const map1 = new Map();

var startQuiz = (quiz_name) => {
  var loadJson = (callback) => {
    $.getJSON(quiz_name, function (data) {
      callback(data);
    });
  };

  loadJson((data) => {
    var questions = data['Questions'];

    var click_enabled = true;

    var correct_count = 0;
    var wrong_count = 0;


    var load_question_btn = document.getElementById('question-list');
    var load_question_list = () => {
      load_question_btn.addEventListener('click', () => {
        let new_body = "<ol class='container-list'>";
        for (let index = 0; index < questions.length; index++) {
          let t = 'color:red;';
          if (map1.get(index)) t = 'color:green;';
          new_body += `<li class='question-list' style="${t}">${index + 1}. Soru</li>`;
        }
        new_body += "</ol>";
        document.body.innerHTML = new_body;

        $('ol').click(function (e) {
          var n = $(e.target).index() + this.start - 2;

          startQuiz(g_quiz_name);

          question_index = n;
          document.body.innerHTML = `
          <div class="container">
          <button class="question-list" id="question-list">Soru Listesi</button>
          <p class="counter">Doğru: <a id="correct_count">0</a>&nbsp;&nbsp;&nbsp;Yanlış: <a id="wrong_count">0</a></p>
          <pre class="question" id="question"></pre><button class="choice" id="a"></button><button class="choice"
            id="b"></button><button class="choice" id="c"></button><button class="choice" id="d"></button><button class="choice"
              id="e"></button><button class="next" id="next">Sonraki Soru</button>
          </div>
        `;
        });
      });
    };

    load_question_list();

    var load_next_question = () => {
      question_index++;
      if (question_index == questions.length) {
        console.log("asd");
        load_question_btn.click();
        load_question_list();
        question_index = 0;
        correct_count = 0;
        wrong_count = 0;
      }

      click_enabled = true;
      clear_btns_color();
      document.getElementById('question').textContent = question_index + 1 + ') ' + questions[question_index]['Text'];
      document.getElementById('a').textContent = questions[question_index]['A'];
      document.getElementById('b').textContent = questions[question_index]['B'];
      document.getElementById('c').textContent = questions[question_index]['C'];
      document.getElementById('d').textContent = questions[question_index]['D'];
      document.getElementById('e').textContent = questions[question_index]['E'];

    };

    var set_next_btn_visible = () => {
      return document.getElementById('next').style.visibility = 'visible';
    };

    var set_next_btn_invisible = () => {
      return document.getElementById('next').style.visibility = 'hidden';
    };

    var get_correct_answer = () => {
      return questions[question_index]['CorrectAnswer'].toLowerCase();
    };

    var get_correct_answer_btn = () => {
      return document.getElementById(get_correct_answer());
    };

    var update_counter = (correct, wrong) => {
      document.getElementById('correct_count').textContent = `${correct}`;
      document.getElementById('wrong_count').textContent = `${wrong}`;
    };

    var check_answer = (answer) => {
      if (answer === get_correct_answer()) {
        correct_count++;
        return true;
      }
      wrong_count++;
      return false;
    };

    var handle_btn_click = (btn) => {
      if (!click_enabled) return;
      click_enabled = !click_enabled;

      if (check_answer(btn.id)) {
        map1.set(question_index, true);
        set_btn_color_green(btn);
      }
      else {
        map1.set(question_index, false);
        set_btn_color_red(btn);
        set_btn_color_green(get_correct_answer_btn());
      }

      update_counter(correct_count, wrong_count);
      set_next_btn_visible();
    };

    var clear_btn_color = (btn) => {
      btn.style.background = '#333333';
    };

    var set_btn_color_green = (btn) => {
      btn.style.background = '#0d930b';
    };

    var set_btn_color_red = (btn) => {
      btn.style.background = '#ba1904';
    };

    var choice_btns = Array.from(document.getElementsByClassName('choice'));

    choice_btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        handle_btn_click(btn);
      });
    });

    var next_btn = document.getElementById('next');
    next_btn.addEventListener('click', () => {
      set_next_btn_invisible();
      load_next_question();
    });

    var clear_btns_color = () => {
      choice_btns.forEach((btn) => {
        clear_btn_color(btn);
      });
    };

    load_next_question();
  });
};

var choice_btns = Array.from(document.getElementsByClassName('choice'));

choice_btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.body.innerHTML = `
      <div class="container">
      <button class="question-list" id="question-list">Soru Listesi</button>
      <p class="counter">Doğru: <a id="correct_count">0</a>&nbsp;&nbsp;&nbsp;Yanlış: <a id="wrong_count">0</a></p>
      <pre class="question" id="question"></pre><button class="choice" id="a"></button><button class="choice"
        id="b"></button><button class="choice" id="c"></button><button class="choice" id="d"></button><button class="choice"
          id="e"></button><button class="next" id="next">Sonraki Soru</button>
      </div>
    `;

    g_quiz_name = btn.id + '.json';
    startQuiz(g_quiz_name);
  });
});
