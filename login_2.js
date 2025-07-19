const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

let clickPermission = true;

async function checkLogin() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("セッション取得エラー:", error.message);
    }
    const session = data.session;
    if (session) {
        window.location.href = "index.html";
    }
}

checkLogin();

function signInCheck(){
    if(!clickPermission){
        return;
    }
    const email = document.getElementById("email").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        alert("メールアドレスの形式が正しくありません。");
        return;
    }
    const password = document.getElementById("password").value;
    signIn(email, password);
    clickPermission = false;
}

async function signIn(email, password) {
    document.getElementById("loading").style.display = "flex";
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        console.error("ログイン失敗:", error.message);
        document.getElementById("loading").style.display = "none";
        alert("ログインに失敗しました");
        clickPermission = true;
    } else {
        console.log("ログイン成功:", data);
        alert("ログインに成功しました");
        window.location.href = "index.html";
    }
}

function signUpCheck(){
    if(!clickPermission){
        return;
    }
    const email = document.getElementById("email2").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        alert("メールアドレスの形式が正しくありません。");
        return;
    }
    const password = document.getElementById("password2").value;
    const isValid = password.length >= 6 &&
                    /[a-zA-Z]/.test(password) &&
                    /[0-9]/.test(password);
    if (!isValid) {
        alert("パスワードは6文字以上で、英字と数字の両方を含めてください。");
        return;
    }
    signUp(email, password);
    clickPermission = false;
}

async function signUp(email, password) {
    document.getElementById("loading").style.display = "flex";
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });
    if (error) {
        console.error('サインアップ失敗:', error.message);
        if(error.message.includes("User already registered")){
            document.getElementById("loading").style.display = "none";
            alert("このメールアドレスは既に登録されています")
        }else{
            document.getElementById("loading").style.display = "none";
            alert("新規登録に失敗しました");
        }
        clickPermission = true;
    }else {
        const user = data.user;
        await tableInsert(user.id);
        alert("新規登録に成功しました");
        window.location.href = "index.html";
    }
}

async function tableInsert(userId) {
    const { error: insertError } = await supabase.from("js_learning_log").insert([
        {
            user_id: userId,
        }
    ]);

    if (insertError) {
        console.error("履歴テーブルへの登録に失敗:", insertError.message);
    } else {
        console.log("履歴登録成功");
    }
}