const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

let userId = "";
let learningLogs = [];

async function checkLogin() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("セッション取得エラー:", error.message);
    }
    const session = data?.session;
    const user = data?.session?.user;
    if (session) {
        userId = user.id;
        createLearningLogs();
        document.getElementById("log-in").style.display = "none";
        document.getElementById("log-out").style.display = "flex";
    } else {
        console.log("ログインしていないかエラーです");
    }
}

checkLogin();

async function createLearningLogs(){
    document.getElementById("learning-log").style.display = "flex";
    document.getElementById("no-learning-log").style.display = "none";
    renderLearningLogs();
}

async function renderLearningLogs() {
    learningLogs = await getLearningHistory();
    const container = document.getElementById("learning-log");
    learningLogs.forEach((log, index) => {
        const div = document.createElement("div");
        const topic = document.createElement("p");
        topic.textContent = log.topics.name;
        const btn = document.createElement("button");
        btn.textContent = "間違えた問題を確認";
        btn.setAttribute("data-log-index", index);
        btn.onclick = () => modalOpen(index);
        const date = document.createElement("p");
        date.textContent = new Date(log.learned_at).toLocaleString();
        const hr = document.createElement("hr");
        div.appendChild(topic);
        div.appendChild(btn);
        div.appendChild(date);
        div.appendChild(hr);
        container.appendChild(div);
    });
}

async function logOut() {
    document.getElementById("loading").style.display = "flex";
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("ログアウト失敗:", error.message);
        alert("ログアウトに失敗しました");
    } else {
        alert("ログアウトしました");
        window.location.reload();
    }
}

const modal = document.getElementById("mistake-check-modal");

function modalOpen(index) {
    const mistakes = learningLogs[index].mistakes;
    const content = document.getElementById("mistake-check-modal-content");
    content.innerHTML = "";
    if (mistakes.length === 0) {
        content.innerHTML = "<p>なし</p>";
    } else {
        mistakes.forEach(m => {
            const p = document.createElement("p");
            p.innerHTML = `<strong>Q:</strong> ${m.question}<br><strong>A:</strong> ${m.answer}`;
            content.appendChild(p);
        });
    }
    modal.classList.add('is-active');
}

function modalClose() {
    modal.classList.remove('is-active');
}

async function getLearningHistory() {
    const { data, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
        console.error("セッション取得失敗:", sessionError.message);
        return;
    }
    const user = data?.session?.user;
    if (!user) {
        return;
    }
    const { data: logs, error } = await supabase
        .from("learning_logs")
        .select(`
            id,
            learned_at,
            topics ( name ),
            mistakes ( question, answer )
        `)
        .eq("user_id", user.id)
        .order("learned_at", { ascending: false });
    if (error) {
        console.error("履歴取得エラー:", error);
        return [];
    }
    return logs;
}

async function deleteCheck(){
    try {
        if(userId === ""){
            alert("ログインしていません");
            return;
        }
        if (confirm("この履歴を本当に削除しますか？")) {
            document.getElementById("loading").style.display = "flex";
            await deleteLearningLog(userId);
            window.location.reload();
        }
    } catch (error) {
        alert("エラーが発生しました");
    }
}

async function deleteLearningLog(Id) {
    const { error } = await supabase.from("learning_logs").delete().eq("user_id", Id);
    if (error) {
        console.error("削除失敗:", error.message);
    }
}
