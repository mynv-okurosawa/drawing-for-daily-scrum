// くじ引き結果
const results = [
  "鈴木 晶帆",
  "多田 康造",
  "黒澤 治",
  "佐々木 知里",
  "久保 優斗",
];

function getResult() {
  var random = Math.floor(Math.random() * results.length);
  var result = results[random];
  if (Math.random() < 0.3) {
    // 30%の確率で虹色アニメーションを適用
    $("#result").addClass("rainbow-text");
  } else {
    $("#result").removeClass("rainbow-text");
  }
  $("#result").html(result).hide().fadeIn(1000);
}
