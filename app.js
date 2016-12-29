$(function(){  

    var currQuestion = 0;
    var userCorrect = 0;
    var userWrong = 0;
    var correctAnswers = ['q1-d', 'q2-d', 'q3-b', 'q4-b', 'q5-a', 'q6-d', 'q7-c', 'q8-d', 'q9-d', 'q10-d'];
    var longAnswers = [
    'Lando Calrissian - Lando Calrissian was the Baron Administrator of Cloud City and also a general in the Rebel Alliance.',
    'Bespin - Cloud City is a gas mining colony floating in the clouds of the planet Bespin.',
    '6 million - C-3PO was played by Anthony Daniels in all seven Star Wars films.',
    'Jabba the Hut - Han Solo was frozen in carbonite.',
    'Yoda - Yoda first appeared in the 1980 film The Empire Strikes Back.',
    'The Empire Strikes Back - The Empire Strikes Back was released in 1980.',
    'Kylo - Portrayed by Adam Driver, Kylo first appears in the 2015 film Star Wars - The Force Awakens.',
    'The Phantom Menace - According to George Lucas, he was inspired to develop Jar Jar based on the Disney character of Goofy.',
    'TIE Fighters - Propelled by twin ion engines, TIE fighters are fast but fragile star fighters.',
    '3 - Star Wars IV - A New Hope was the first Star Wars film to be released in 1977.'
    ];

    $('#txtStatusBar').text("QUESTION " + (currQuestion + 1) + " OF 10");

    function handleSubmitButton() {
    
        // Make sure a radio box has been checked
        if ($('input[type=radio]:checked:visible').length == 0) {
            $('.errMsg').show().fadeOut(1200);        
            return false;
        }
        

        var userAnswer = $('input[type=radio]:checked');
        
        console.log(userAnswer[currQuestion]);

        

        //if answer is right
        if (userAnswer[currQuestion].getAttribute('id') == correctAnswers[currQuestion]) {

            var corrResult = '<div class="correctResult">CORRECT!!</div>';
            $('#resultContainer').html(corrResult + longAnswers[currQuestion]).show();
            userCorrect++;
        
        }   
        //if answer is wrong
        else {
        
            var wrongResult = '<div class="wrongResult">WRONG!!</div>';
            var rightAnswer = '<div class="correctResult">The Answer should be:</div>';
            $('#resultContainer').html(wrongResult + rightAnswer + longAnswers[currQuestion]).show()
            userWrong++;

        }
        //change submit button to next question button    
        
        $('.btnSubmit').addClass('hide');
        $('.btnNext').removeClass('hide');

        if(currQuestion == 9) {
            
            $('.btnNext').addClass('hide');
            $('.btnFinish').removeClass('hide');
            updateProgressBar();
            
        }
    }

    function handleNextButton() {

        $(this).parents('.questionContainer').fadeOut(500, function(){
            $(this).next().fadeIn(500);
                
        });

        //$('input[type=radio]:checked').prop('checked', false);
        var windowReload = $(this).closest('.answers').find('input[type=radio]:checked');
        console.log(windowReload);
        $(this).prop('checked', false);
        var testAnswer = $('input[type=radio]:checked');

        console.log(testAnswer);

        //toggle buttons
        $('.btnNext').addClass('hide');
        $('.btnSubmit').removeClass('hide');

        $('#resultContainer').hide();
        
        updateProgressBar();

        currQuestion++;
        $('#txtStatusBar').text("QUESTION " + (currQuestion + 1) + " OF 10");
        $('#userScoreBar').text(userCorrect + " : QUESTIONS CORRECT / " + userWrong + " : QUESTIONS WRONG");
    }

    function handleFinishButton() {

        $(this).parents('.questionContainer').fadeOut(500);
        $('#txtStatusBar').hide();
        $('#userScoreBar').hide();
        $('.btnContainerStart').removeClass('hide');
        //$('.btnStart').removeClass('hide');
    

        if(userCorrect > userWrong) {
            var str = `<div>Your Final Score is: <span class='green'>${userCorrect} Questions Right </span> and <span class='red'>${userWrong} Questions Wrong</span></div>
                        <div class='jedi'>THE FORCE IS STRONG WITH YOU !!</div>`

            $('#resultContainer').html(str);

        }
        else if(userWrong > userCorrect){
            var str = `<div>Your Final Score is: <span class='green'>${userCorrect} Questions Right </span> and <span class='red'>${userWrong} Questions Wrong</span></div>
                        <div class='sith'>YOU HAVE TURNED TO THE DARK SIDE !!</div>`

            $('#resultContainer').html(str);
            
        }
        else {
            var str = `<div>Your Final Score is: <span class='green'>${userCorrect} Questions Right </span> and <span class='red'>${userWrong} Questions Wrong</span></div>
                        <div class='undecided'>YOU HAVE LIGHT AND DARKNESS WITHIN YOU !!</div>`

            $('#resultContainer').html(str);
        }

    }

    function handleStartButton() {

        $('.questionContainer').first().show();
        $('.btnSubmit').removeClass('hide');
        $('#resultContainer').hide();
        $('#progress').width(0 + 'px');
        $('#btnStart').hide();
        currQuestion = 0;
        userCorrect = 0;
        userWrong = 0;

    }

    function updateProgressBar() {

        var progBar = $('#progress');
        if(userCorrect >= userWrong) {
            progBar.removeClass('red');
            progBar.addClass('green');
            progBar.width(progBar.width() + 72 + 'px');
        }
        else{
            progBar.removeClass('green');
            progBar.addClass('red');
            progBar.width(progBar.width() + 72 + 'px');
        }

    }



    $('.btnSubmit').on('click', handleSubmitButton);

    $('.btnNext').on('click', handleNextButton);

    $('.btnFinish').on('click', handleFinishButton);

    $('#btnStart').on('click', handleStartButton);

    


});
