window.sample = [
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

window.domQuestions = [
  [
    "HTMLのボタンをクリックしたときに関数を実行させる正しい方法は？",
    ["addEventListenerを使う", "onclick属性に関数を書く", "どちらでも可能", "できない"],
    "どちらでも可能",
    `① addEventListener → OK。イベントを後から追加可能<br>
     ② onclick属性 → OK。HTML側に直接書ける<br>
     ③ どちらでも可能 → 正解<br>
     ④ できない → 間違い`
  ],
  [
    "HTML要素のテキストを取得するにはどのプロパティを使う？",
    ["textContent", "innerHTML", "value", "text"],
    "textContent",
    `① textContent → 正解。テキストだけを扱える<br>
     ② innerHTML → HTMLタグも含む<br>
     ③ value → フォーム用。例：input要素<br>
     ④ text → 存在しないプロパティ`
  ],
  [
    "inputタグに入力された値を取得するには？",
    ["input.value", "input.textContent", "input.innerHTML", "getAttribute('value')"],
    "input.value",
    `① input.value → 正解。フォーム要素の値取得<br>
     ② textContent → inputには使えない<br>
     ③ innerHTML → フォーム要素には無効<br>
     ④ getAttribute → 初期値なら取れるが変更後は取れない`
  ],
  [
    "要素のCSSクラスを追加するには？",
    ["element.classList.add()", "element.addClass()", "element.className()", "element.style.class()"],
    "element.classList.add()",
    `① classList.add → 正解。クラスを安全に追加<br>
     ② addClass → jQueryの書き方<br>
     ③ className() → 関数ではない<br>
     ④ style.class → 存在しない`
  ],
  [
    "HTMLのdiv要素をJavaScriptで作成するには？",
    ["document.createElement('div')", "new Div()", "makeDiv()", "document.getElement('div')"],
    "document.createElement('div')",
    `① createElement → 正解。新しいDOM要素を作成<br>
     ② new Div() → 存在しないクラス<br>
     ③ makeDiv → ユーザー定義ならOKだが標準ではない<br>
     ④ getElement → 存在しないメソッド`
  ],
  [
    "要素を親要素に追加するには？",
    ["parent.appendChild(child)", "child.appendTo(parent)", "parent.add(child)", "parent.insert(child)"],
    "parent.appendChild(child)",
    `① appendChild → 正解。子として末尾に追加<br>
     ② appendTo → jQueryの書き方<br>
     ③ add/insert → DOM標準にはない`
  ],
  [
    "ある要素のIDを変更したいときに使うのは？",
    ["element.id = 'newId'", "element.setID('newId')", "element.changeId('newId')", "element.updateId = 'newId'"],
    "element.id = 'newId'",
    `① element.id = 'newId' → 正解。プロパティを書き換えるだけ<br>
     ② setID → 存在しない<br>
     ③ changeId → 存在しない<br>
     ④ updateId → 存在しない`
  ],
  [
    "classList.remove('active') の効果は？",
    ["指定のクラスを取り除く", "全クラスを削除", "CSSファイルを消す", "要素を削除する"],
    "指定のクラスを取り除く",
    `① 指定のクラスを取り除く → 正解。classListで管理できる<br>
     ② 全クラス削除 → className = "" などを使う<br>
     ③ CSS削除 → 無関係<br>
     ④ 要素削除 → remove()を使う`
  ],
  [
    "querySelectorAll('button') の戻り値の型は？",
    ["NodeList", "HTMLCollection", "Array", "Element"],
    "NodeList",
    `① NodeList → 正解。querySelectorAllの戻り値<br>
     ② HTMLCollection → getElementsBy〜系の戻り値<br>
     ③ Array → 配列ではない（forEach可）<br>
     ④ Element → 複数要素には該当しない`
  ],
  [
    "イベントを一度だけ実行させたいときのaddEventListenerのオプションは？",
    ["{ once: true }", "{ single: true }", "{ oneTime: true }", "オプションは指定できない"],
    "{ once: true }",
    `① { once: true } → 正解。一度だけで自動解除<br>
     ② single/oneTime → 存在しない<br>
     ③ 指定できない → 現代のブラウザでは可能`
  ]
];