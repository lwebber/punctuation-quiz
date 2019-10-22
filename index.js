function handleQuiz() {

    let qNum = 0;
    let score = 0;

    startQuiz();
    displayQuestionNum();
    handleSubmit();
    handleContinue();

    function startQuiz() {
        $('.restart').hide();
        $('.title').hide();
        $('.questions').hide();
        $('.result').hide();
        $('.answer').hide();
        $('.feedback').hide();
        $('.disp-qNum').hide();
        $('.end-screen').hide();
        $('form').hide();
        $('#go-btn').hide();
        $('.start-screen').show();
        handleStart();
    }

    function handleStart() {
        let txt = constructQuestion();
        $('.questions').html(txt);
        $('#start').on('click', function() {
            $('.start-screen').hide();
            $('.questions').show();
            $('.result').show();
            $('.answer').show();
            $('.feedback').show();
            $('.score').show();
            $('.disp-qNum').show();
            $('.end-screen').show();
            $('form').show();
            $('#go-btn').show();
            $('.title').show()
        });
    }

    function displayQuestionNum() {
        $('.disp-qNum').text(`Question ${qNum + 1} of ${questions.length}`);
    }

    function constructQuestion() {
        let str = `${questions[qNum].sent}<br>`;
        for (let i = 0; i < 4; i++) {
            str += `<input type="radio" name="test" id="q-${i}" value=${questions[qNum].options[i]} required><label for="q-${i}">${questions[qNum].options[i]}</label><br>`;
        }
        return str;
    }

    function handleSubmit() {
        $('button[name="test"]').on('click', function(event) {
            event.preventDefault();
            displayQuestionNum();
            let choice = $('input[name="test"]:checked').val();
            $('.result').text(`You chose: ${choice}`);
            $('.result').show();
            $('.answer').text(`The correct answer is: ${questions[qNum].correct}`);
            $('.answer').show();
            evaluateChoice(choice);
        });
    }

    function evaluateChoice(choice) {
        if (choice === questions[qNum].correct) {
            $('.feedback').show();
            $('.feedback').text("Correct!").removeClass('incorrect').addClass('correct');
            score += 1;
        } else {
            $('.feedback').show();
            $('.feedback').text("Incorrect!").removeClass('correct').addClass('incorrect');
        }
        $('.score').text(`Score: ${score}`);
    }

    function handleContinue() {
        $('button[name="continue"]').on('click', function(event) {
            event.preventDefault();
            if (qNum > questions.length - 2) {
                endQuiz();
            }
            qNum += 1;
            displayQuestionNum();

            let txt = constructQuestion();

            $('.questions').html(txt);
            $('.result').hide();
            $('.answer').hide();
            $('.feedback').hide();
        });
    }

    function endQuiz() {
        $('.questions').hide();
        $('.result').hide();
        $('.answer').hide();
        $('.feedback').hide();
        $('.disp-qNum').hide();
        $('form').hide();
        $('#go-btn').hide();
        $('.end-screen').text("End");
        $('.restart').show();
    }
}

$(handleQuiz);