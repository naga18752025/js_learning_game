const supabase = window.supabase.createClient("https://nugptlthxhdsdknzqucc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z3B0bHRoeGhkc2RrbnpxdWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDc3MzQsImV4cCI6MjA2ODIyMzczNH0.sfSPF7oVLLYh4eWaUSOyR4rWf4oracLr7W-Wqo88XIc");

async function checkLogin() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("セッション取得エラー:", error.message);
        return false;
    }

    const session = data.session;

    if (session) {
        window.location.href = "index.html";
        return true;
    } else {
        console.log("ログインしていません");
        return false;
    }
}

checkLogin();

function signInCheck(){
    const email = document.getElementById("email").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        alert("メールアドレスの形式が正しくありません。");
        return;
    }
    const password = document.getElementById("password").value;
    const isValid = password.length >= 6 &&
                    /[a-zA-Z]/.test(password) &&
                    /[0-9]/.test(password);
    if (!isValid) {
        alert("パスワードは6文字以上で、英字と数字の両方を含めてください。");
        return;
    }
    signIn(email, password);
}

async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error("ログイン失敗:", error.message);
        alert("ログインに失敗しました")
    } else {
        console.log("ログイン成功:", data);
        alert("ログインに成功しました");
        window.location.href = "index.html";
    }
}

function signUpCheck(){
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
}

async function signUp(email, password) {
const { data, error } = await supabase.auth.signUp({
        email: 'example@example.com',
        password: 'password123'
    });

    if (error) {
        console.error('サインアップ失敗:', error.message);
        alert("サインアップに失敗しました")
    } else {
        console.log('確認メールを送信しました');
        alert("確認メールを送信しました");
    }
}