function handleQuiz() {

    let qNum = 0;
    let score = 0;

    const questions = [{
            sent: "They hate their teacher.",
            correct: "their",
            options: ["their", "there", "they're", "theyre"]
        },
        {
            sent: "It's fun.",
            correct: "It's",
            options: ["It's", "Its", "Itzz", "Itz"]
        },
        {
            sent: "Theirs a bear over there.",
            correct: "There's",
            options: ["Theirs", "They'res", "There's", "Theres"]
        },
        {
            sent: "It's fur is black.",
            correct: "Its",
            options: ["Itz", "Its", "Itzz", "It's"]
        },
        {
            sent: "It's fun.",
            correct: "It's",
            options: ["It's", "Its", "Itzz", "Itz"]
        },
    ];

    startQuiz();
    displayQuestionNum();
    handleSubmit();
    handleContinue();


    function handleSubmit() {
        $('button[name="test"]').on('click', function(event) {
            event.preventDefault();
            displayQuestionNum();
            let choice = $('input[name="test"]:checked').val();
            $('.result').text(`You chose: ${choice}`);
            $('.result').show();
            $('.answer').text(`The correct answer is: ${questions[qNum].correct}`);
            $('.answer').show();
            if (choice === questions[qNum].correct) {
                $('.feedback').show();
                $('.feedback').text("Correct!").addClass('correct');
                score += 1;
            } else {
                $('.feedback').show();
                $('.feedback').text("Incorrect!").addClass('incorrect');
            }
            $('.score').text(`Score: ${score}`);
        });
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

    function constructQuestion() {
        //build html question
        let str = `${questions[qNum].sent}<br>`;
        for (let i = 0; i < 4; i++) {
            str += `<input type="radio" name="test" value=${questions[qNum].options[i]} required>${questions[qNum].options[i]}</input><br>`;
        }
        return str;
    }

    function startQuiz() {
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
        });
    }

    function displayQuestionNum() {
        $('.disp-qNum').text(`Question ${qNum + 1} of ${questions.length}`);
    }

    function endQuiz() {
        $('.questions').hide();
        $('.result').hide();
        $('.answer').hide();
        $('.feedback').hide();
        $('.disp-qNum').hide();
        $('form').hide();
        $('.end-screen').text("End");
        reloadQuiz();
    }

    //does this need event delegation?
    function reloadQuiz() {
        $('button[name="continue"]').on('click', function(event) {
            location.reload(true);
        });
    }
}


$(handleQuiz);