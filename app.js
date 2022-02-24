$("body").ready(function () {

    const shiftKeyboard = $('#keyboard-shift-container')
    const lowercaseKeyboard = $('#keyboard-lowercase-container')
    const sentenceId = $('#sentence')
    const targetLetter = $('#target-letter')
    let highlighter = $('#yellow-block')
    let feedback = $('#feedback')
    let playBtn = $('#btn-play')
    let sentenceCounter = 0
    let letterCounter = 0
    let end = 0
    let wordCounter = 54
    let mistakes = 0
    let sentenceArr = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    
    shiftKeyboard.hide();
    playBtn.hide();
            
    sentenceId.append(sentenceArr[sentenceCounter]);
    targetLetter.append(sentenceArr[sentenceCounter].charAt(letterCounter));
            
    let currentSentence = sentenceArr[sentenceCounter]
            
    $(document).keydown(function (e) {
        if ('Shift' === e.key) {
            shiftKeyboard.show();
            lowercaseKeyboard.hide();
        }
        if (letterCounter == sentenceArr[sentenceCounter].length && sentenceCounter !== 5) {
            sentenceId.empty();
                    
            sentenceCounter++
            letterCounter = 0;
            sentenceId.append(sentenceArr[sentenceCounter])
            targetLetter.append(currentSentence.charAt(0));
            highlighter.css({
                "left": "0"
            })
        }
            
        if (sentenceCounter == sentenceArr.length) {
            feedback.empty();
            end = e.timeStamp;
            let timeDifference = end - 1;
            let seconds = timeDifference / 1000;
            let minutes = seconds / 60;
            let wordsPerMinute = (
            wordCounter / minutes.toFixed(1) -
                2 * mistakes
            ).toFixed(3);
        }
            
        if (`${wordsPerMinute}` < 0) {
            feedback.append(
                '<h2 class="wpm">TRY AGAIN!</h2>'
            );
            playBtn.show();
            playBtn.click(function () {
                location.reload();
            });
        } 
        else {
            feedback.append(
                '<h2 class="wpm"> Words Per Minute: ' +
            `${wordsPerMinute}` +
                "</h2>"
            );
            playBtn.show();
            playBtn.click(function () {
                location.reload();
            });
        }
        if (e.key === sentenceArr[sentenceCounter][letterCounter]) {
        
            letterCounter++;
            targetLetter.empty();
            targetLetter.append(sentenceArr[sentenceCounter][letterCounter])
            highlighter.css("left", "+=17.8px");
            let correct = $(
                '<span class="glyphicon glyphicon-ok-sign text-success">'
            );

            feedback.empty();
            feedback.append(correct);
        } 
        else if (e.key === 'Enter' || e.key === 'Shift') {
            feedback.empty();        
        } 
        else {
            let incorrect = $(
                '<span class="glyphicon glyphicon-remove-sign text-danger">'
            );
            feedback.empty();
            feedback.append(incorrect);
        }
            
    });
            
    $(document).keyup(function (e) {
        if ('Shift' === e.key) {
            shiftKeyboard.hide();
            lowercaseKeyboard.show();
        }
        $(`#${e.key.charCodeAt(0)}`).css ({
            "backgroundColor": ""
            });
    });
            
    $(document).keypress(function (e) {
        $(`#${e.which}`).css ({
            "backgroundColor": "yellow"
        });
    });

});
    
    






