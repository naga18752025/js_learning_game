const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

const topic = "2ad1949c-5bbe-4cc3-937d-4248c7c8b384";
let questionNumber = 0;
let correctAnswer = "";
let restHP = 100;
let typeOfQuestion = JSON.parse(localStorage.getItem("course")).sort(() => Math.random() - 0.5);
let notCorrect = 0;
let mistakes = [];

function insertQuestion(a){
    document.getElementById("mondaibun").textContent = typeOfQuestion[a][0];
    document.querySelectorAll(".sentakushi").forEach((sentakushi, index) => {
        sentakushi.textContent = typeOfQuestion[a][1][index];
    });
    correctAnswer = typeOfQuestion[a][2];
}

insertQuestion(questionNumber);

function answerCheck(answer){
    if(typeOfQuestion[questionNumber][1][answer] === correctAnswer){
        hpDown();
        monsterShaking();
        commentaryOpen();
        if(restHP <= 0){
            monsterVanish();
        }
    }else{
        countMistake(typeOfQuestion[questionNumber][0], typeOfQuestion[questionNumber][2]);
    }
}

function countMistake(Q,A){
    notCorrect ++;
    document.getElementById("not-correct").textContent = notCorrect;
    const exists = mistakes.some(m => m.question === Q);
    if (!exists) {
        mistakes.push({ question: Q, answer: A});
    }
    alert("不正解");
}

function hpDown(){
    restHP = restHP - window.downPercent;
    document.getElementById("hp").style.width = String(restHP) +  "%";
}

function monsterShaking(){
    document.querySelector(".moving").classList.remove("moving");
    document.querySelector("img").classList.add("shake");
    setTimeout(() => {
        document.querySelector("img").classList.remove("shake");
    }, 400);
}

function commentaryOpen(){
    document.getElementById("all-sentakushi").style.display = "none";
    document.getElementById("commentary").querySelector("p").innerHTML = typeOfQuestion[questionNumber][3];
    document.getElementById("commentary").style.display = "flex";
}

function monsterVanish(){
    document.getElementById("next-button").style.display = "none";
    document.getElementById("finish-button").style.display = "block";
    setTimeout(() => {
        document.querySelector("img").classList.add("vanish");
    }, 400);
}

function nextQuestion(){
    questionNumber ++;
    insertQuestion(questionNumber);
    document.getElementById("commentary").style.display = "none";
    document.getElementById("all-sentakushi").style.display = "flex";
    document.querySelector("img").classList.add("moving");
}

async function finish(){
    document.getElementById("loading").style.display = "flex";
    try {
        await saveLearningLog(topic, mistakes);
        window.location.href = "index.html";
    } catch (error) {
        window.location.href = "index.html";
    }
}

async function saveLearningLog(topicId, mistakesArray) {
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
        console.error("セッション取得失敗:", sessionError.message);
        return;
    }

    const user = data?.session?.user;
    if (!user) {
        console.warn("ユーザーがログインしていません。学習ログは保存されません。");
        return;
    }

    const { data: learningLog, error: logError } = await supabase
        .from("learning_logs")
        .insert([
            {
                user_id: user.id,
                topic_id: topicId
            },
        ])
        .select()
        .single();

    if (logError) {
        console.error("learning_log insert failed:", logError);
        return;
    }

    const mistakeData = mistakesArray.map(m => ({
        learning_log_id: learningLog.id,
        question: m.question,
        answer: m.answer,
    }));

    if (mistakeData.length > 0) {
        const { error: mistakeError } = await supabase
            .from("mistakes")
            .insert(mistakeData);

        if (mistakeError) {
            console.error("mistakes insert failed:", mistakeError);
        }
    }
}
