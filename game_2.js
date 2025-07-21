const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

const topicIdData = {"kiso":"4e97b4e4-ae6f-49ee-9739-9c127e69bc9c","control":"f3032099-fe59-41ef-8441-8d1dff6505aa","function":"9ea1a80c-4af3-478a-a762-67039f8f5510","list":"28bf063c-fc29-476c-b89d-306e77f5c7cb","dom":"2ad1949c-5bbe-4cc3-937d-4248c7c8b384","async":"1f752413-5bc2-40d7-bd8c-8c24d683e435","error":"f95ceefd-6d26-4d45-b0dc-41f3bc0878c1","ES6":"ac19fc5b-7b35-4a97-a17b-c5ff16ef2257","class":"1fb6c18e-953b-4851-911b-4e6229f7cf14","API":"2928132d-fff5-4a23-a6d3-ca71db11cda0","type":"d98a084f-81bd-44fe-9554-09d9ee9dcb10","regex":"df736a1d-b520-4a97-8569-eb546c748e29","jQuery":"8fb387ac-a1be-479b-9c02-398523369914","module":"e2c0e441-c451-4fc8-908d-67e51736d0c4","debug":"948cc3bc-0a75-449d-8748-5146c7e6e036"}
const topic = topicIdData[localStorage.getItem("courseName")];
let questionNumber = 0;
let correctAnswer = "";
let restHP = 100;
let typeOfQuestion = JSON.parse(localStorage.getItem("course")).sort(() => Math.random() - 0.5);
let notCorrect = 0;
let mistakes = [];

function insertQuestion(a){
    document.getElementById("mondaibun").textContent = typeOfQuestion[a][0];
    typeOfQuestion[a][1] = typeOfQuestion[a][1].sort(() => Math.random() - 0.5);
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
