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
  $("#result").html(result);
}
