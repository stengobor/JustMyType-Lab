
const upperKeyboard = $('#keyboard-upper-container')
const lowerKeyboard = $('#keyboard-lower-container')
const upperKeys = $('#keyboard-upper')
const sentenceID = $('#sentence')
const targetLetter = $('#target-letter')
let highlighter = $('#yellow-block')
let feedback = $('#feedback')
let button = $('#btn-submit')
let sentenceArray = ['ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceCounter = 0
let letterCounter = 0
let end = 0
let wordCounter = 54
let mistakes = 0

upperKeyboard.hide();
button.hide();

sentenceID.append(sentenceArray[sentenceCounter]);
targetLetter.append(sentenceArray[sentenceCounter].charAt(letterCounter));

let currentSentence = sentenceArray[sentenceCounter]

$(document).keydown(function (e) {
    if ('Shift' === e.key) {
        upperKeyboard.show();
        lowerKeyboard.hide();
    }
    if (letterCounter == sentenceArray[sentenceCounter].length && sentenceCounter !== 5) {
        sentenceID.empty();
        
        sentenceCounter++
        letterCounter = 0;
        sentenceID.append(sentenceArray[sentenceCounter])
        targetLetter.append(currentSentence.charAt(0));
        highlighter.css("left", 0)
    }

    if (sentenceCounter == sentenceArray.length) {
        feedback.empty();
        end = e.timeStamp;
        let timeDifference = end - 1;
        let seconds = timeDifference / 1000;
        let minutes = seconds / 60;
        let wordsPerMinute = (
            wordCounter / minutes.toFixed(1) -
            2 * mistakes
        ).toFixed(3);

        if (`${wordsPerMinute}` < 0) {
            feedback.append(
                '<h2 class="wpm">Sorry, try again!</h2>'
            );
            button.show();
            button.click(function () {
                location.reload();
            });
        } else {
            feedback.append(
                '<h2 class="wpm"> Words Per Minute: ' +
                `${wordsPerMinute}` +
                "</h2>"
            );
            button.show();
            button.click(function () {
                location.reload();
            });
        }
    }

    if (e.key === sentenceArray[sentenceCounter][letterCounter]) {
        letterCounter++;
        targetLetter.empty();
        targetLetter.append(sentenceArray[sentenceCounter][letterCounter])
        highlighter.css("left", "+=17.8px");
        let correct = $(
            '<span class="glyphicon glyphicon-ok-sign text-success">'
        );
        feedback.empty();
        feedback.append(correct);
    } else if (e.key === 'Enter' || e.key === 'Shift') {
        feedback.empty();        
    } else {
        let incorrect = $(
            '<span class="glyphicon glyphicon-remove-sign text-danger">'
        );
        feedback.empty();
        feedback.append(incorrect);
    }

})

$(document).keyup(function (e) {
    if ('Shift' === e.key) {
        upperKeyboard.hide();
        lowerKeyboard.show();
    }
    $(`#${e.key.charCodeAt(0)}`).css("backgroundColor", "");
})

$(document).keypress(function (e) {
    $(`#${e.which}`).css("backgroundColor", "yellow");
})

