let mondai = [
  [
    "再代入できない変数を定義するキーワードとして適切なのはどれ？",
    ["const", "let", "var", "def"],
    "const",
    `① const → 正解<br>
     ② let → 再代入可能な変数<br>
     ③ var → 昔の書き方、巻き上げが起きる<br>
     ④ def → Pythonの関数定義用`
  ],
  [
    "配列の末尾に要素を追加するJavaScriptのメソッドはどれ？",
    ["push", "pop", "shift", "concat"],
    "push",
    `① push → 正解<br>
     ② pop → 配列の末尾から削除<br>
     ③ shift → 先頭から削除<br>
     ④ concat → 配列を結合`
  ],
  [
    "JavaScriptで文字列の長さを取得するプロパティはどれ？",
    ["length", "size", "count", "chars"],
    "length",
    `① length → 正解。文字数を返す<br>
     ② size → Pythonのsetなどで使用<br>
     ③ count → Pythonでは使われるがJSにはない<br>
     ④ chars → 存在しない`
  ],
  [
    "== と === の違いとして正しいものはどれ？",
    [
      "=== は型も値も比較する",
      "== は厳密な比較を行う",
      "=== は常に false を返す",
      "== は配列にしか使えない"
    ],
    "=== は型も値も比較する",
    `① === → 正解。型も値も一致する必要あり<br>
     ② == → 型変換あり<br>
     ③ === は常に false → 間違い<br>
     ④ == は配列にしか使えない → 完全な誤り`
  ],
  [
    "次のうち、関数式を定義する正しい方法はどれ？",
    [
      "let f = function() {}",
      "define f() {}",
      "function = f() {}",
      "func f() => {}"
    ],
    "let f = function() {}",
    `① let f = function() {} → 正解。関数式の基本形<br>
     ② define → JSには存在しない<br>
     ③ function = f() → 無効な構文<br>
     ④ func f() => {} → SwiftやPython風`
  ]
];
let syurui = 0;
let correctAnswer = 0;
let restHP = 100;
let monsterNumber = 1;

function insert(a){
    let number = 0;
    mondai[a][1] = mondai[a][1].sort(() => Math.random() - 0.5);
    document.getElementById("mondaibun").textContent = mondai[a][0];
    document.querySelectorAll(".sentakushi").forEach(sentaku => {
        sentaku.textContent = mondai[a][1][number];
        number ++;
    });
    correctAnswer = mondai[a][2];
}

insert(syurui);

function answerCheck(answer){
    if(mondai[syurui][1][answer] === correctAnswer){
        document.querySelector(".moving").classList.remove("moving");
        restHP = restHP - 10;
        document.getElementById("hp").style.width = String(restHP) +  "%";
        document.querySelector("img").classList.add("shake");
        document.getElementById("all-sentakushi").style.display = "none";
        document.getElementById("commentary").style.display = "flex";
        document.getElementById("commentary").querySelector("p").innerHTML = mondai[syurui][3];
        setTimeout(() => {
            document.querySelector("img").classList.remove("shake");
            if(restHP <= 0){
                monsterVanish();
            }
        }, 400);
    }else{
        alert("不正解");
    }
}

function monsterVanish(){
    document.querySelector("img").classList.add("vanish");
    restHP = 100;
    setTimeout(() => {
        monsterNumber ++;
        document.querySelector("img").classList.remove("vanish");
        document.getElementById("hp").style.width = String(restHP) +  "%";
        document.querySelector("img").src = "monster" + String(monsterNumber) + ".png";
        document.querySelector("img").classList.add("moving");
        if(monsterNumber === 5){
            monsterNumber = 0;
        }
    }, 3000);
}

function nextQuestion(){
    document.getElementById("all-sentakushi").style.display = "flex";
    document.getElementById("commentary").style.display = "none";
    document.querySelector("img").classList.add("moving");
    syurui ++;
    if(syurui === 5){
        syurui = 0;
    }
    insert(syurui);
}