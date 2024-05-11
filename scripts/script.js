let timer = document.querySelector(".timer");
let answer = document.querySelectorAll(".answer");
let answerContent = document.querySelectorAll(".answerContent");
let answerChoice = document.querySelectorAll(".answerChoice");
let questionNumber = document.querySelector(".questionNumber");
let nextQuestion = document.querySelector(".nextQuestion");
let questionElement = document.querySelector(".question");

// GERİ SAYIM
let remainingTime = 30;

// GERİ SAYIM YAPACAK INTERVAL
let timerInterval;

// VERİLEN CEVAPLARIN ARRAYİ
let answersArr = new Array(10);

// HANGİ SORUDA OLDUĞUMUZU ANLAMAK İÇİN KULLANILAN VAR
let questionOrder = 0;

// Dışarıda tanımladığınız değişken
let myArray = [];

// GERİ SAYIM YAPAN FONKSIYON
const timerIntervalFc = () => {

    timer.innerHTML = remainingTime;

    if (remainingTime == 20) {
        nextQuestion.classList.add("active")
        answer.forEach(i => i.classList.add("clickable"));
    } else if (remainingTime == 0) {
        resetTimerInterval();
        nextQuestion.click();
    }

    remainingTime -= 1;
}


// GERİ SAYIMI BAŞLATAN FC
const startTimerInterval = () => {
    remainingTime = 30;
    timerInterval = setInterval(timerIntervalFc, 1000);
    nextQuestion.classList.remove("active")
}

// GERİ SAYIMI BİTİREN FC
const resetTimerInterval = () => {
    clearInterval(timerInterval);
}

// BİR SONRAKİ SORUYA TIKLANDIĞI ZAMAN ÇALIŞAN FC
nextQuestion.addEventListener("click", () => {
    if (questionOrder <= 8) {
        answer.forEach(i => {
            i.classList.remove("active");
            i.classList.remove("clickable");
        })
        resetTimerInterval();
        startTimerInterval();
        questionOrder += 1;
        reLoadQuestion(questionOrder);
        console.log(answersArr);

        questionNumber.innerHTML = questionOrder + 1;
    } else {
        document.querySelector(".quizWrapper").classList.remove("active");
        document.querySelector(".timerWrapper").classList.remove("active");
        document.querySelector("footer").classList.remove("active");
        document.querySelector(".resultWrapper").classList.add("active");
        setAnswerKey();
    }
});

// SAYFA YÜKLENDİĞİ AN ÇALIŞAN FC
window.addEventListener("load", () => {
    startTimerInterval();
});

// VERILEN CEVABI KAYDEDECEK FC
answer.forEach((item, index) => {
    item.addEventListener("click", () => {
        answer.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        // İŞARETLENEN ŞIK
        let test1 = answer[index].children[0].innerHTML;
        let test2 = answer[index].children[1].innerHTML;
        let kayit = test1 + " : " + test2;
        answersArr[questionOrder] = kayit;
    });
});

// YENİ SORU İÇERİKLERİNİ DOLDURACAK FC
let reLoadQuestion = (index) => {
    questionElement.innerHTML = myArray[index].title;
    const answer1 = myArray[index].body.split(" ");

    // a şıkkı
    answer[0].children[1].innerHTML = answer1[0];
    // b şıkkı
    answer[1].children[1].innerHTML = answer1[1];
    // c şıkkı
    answer[2].children[1].innerHTML = answer1[2];
    // d şıkkı
    answer[3].children[1].innerHTML = answer1[3];
}


// JSON FETCH FC
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        return response.json();
    })
    .then(data => {
        for (let i = 0; i < 10; i++) {
            myArray[i] = data[i];
        }

        reLoadQuestion(questionOrder);
    })
    .catch(error => {
        console.error('Hata:', error);
    });


let setAnswerKey = () => {
    let answerKeyEl = document.querySelectorAll(".answerKey");
    let answerCount = document.querySelector(".answerCount");
    let emptyCount = document.querySelector(".emptyCount");

    let counter = 0;
    answerKeyEl.forEach((item, index) => {
        if (answersArr[index]) {
            counter += 1;
            item.innerHTML = answersArr[index];
        } else {
            item.innerHTML = "Cevap verilmedi"
        }
    });
    answerCount.innerHTML = counter;
    emptyCount.innerHTML = 10 - counter;

}