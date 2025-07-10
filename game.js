let mondai = [["再代入できない変数を定義するキーワードとして適切なのはどれ？", ["const", "let", "var", "def"]]]
let syurui = 0;
let correctAnswer = 0;
let restHP = 100;
let monster = 1;

function insert(a){
    let number = 0;
    document.getElementById("mondaibun").textContent = mondai[a][0];
    document.querySelectorAll(".sentakushi").forEach(sentaku => {
        sentaku.textContent = mondai[a][1][number];
        number ++;
    });
    correctAnswer = 0;
}

insert(syurui);

function answerCheck(answer){
    if(answer === correctAnswer){
        document.querySelector(".moving").classList.remove("moving");
        restHP = restHP - 10;
        document.getElementById("hp").style.width = String(restHP) +  "%";
        document.querySelector("img").classList.add("shake");
        setTimeout(() => {
            document.querySelector("img").classList.remove("shake");
            if(restHP <= 0){
                document.querySelector("img").classList.add("vanish");
                restHP = 100;
                setTimeout(() => {
                    monster ++;
                    document.querySelector("img").classList.remove("vanish");
                    document.getElementById("hp").style.width = String(restHP) +  "%";
                    document.querySelector("img").src = "monster" + String(monster) + ".png";
                    document.querySelector("img").classList.add("moving");
                    if(monster === 5){
                        monster = 0;
                    }
                }, 2000);
            }else{
                document.querySelector("img").classList.add("moving");
            }
        }, 400);
    }else{
        alert("不正解");
    }
}