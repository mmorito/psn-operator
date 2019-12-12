const firebase = require("firebase");
const exec = require('child_process').exec;

var config = {
  apiKey: "<your-api-key>",
  authDomain: "<your-firebase-app-id>.firebaseapp.com",
  databaseURL: "https://<your-firebase-app-id>.firebaseio.com",
  projectId: "<your-firebase-app-id>",
  storageBucket: "<your-firebase-app-id>.appspot.com",
  messagingSenderId: "xxxxxxxxxx"
};
firebase.initializeApp(config);

//database更新時
const path = "/googlehome";
const key = "word";
const db = firebase.database();
db.ref(path).on("value", function(changedSnapshot) {
  //値取得
  const value = changedSnapshot.child(key).val();
  if (!value) { return; }
  console.log(value);

  //コマンド生成
    const command = getJsonData(value.split(" ")[0], {
      //PS4
      "ps4": () => {
        const command = "";
        let word = value.split(" ")[1];
        if (word == "4") word = value.split(" ")[2];
        const option = getJsonData(word, {
          "起動": "npm run sp4-wake",
          "スタンバイ": "npm run sp4-standby",
          "モンハン": "npm run sp4-mhw",
          "default": false
        });
        return option ? command + option : option;
      },
      //default
      "default": () => false,
    })();
    console.log(command);

    //コマンド実行
    if (command) {
      exec(command);
      //firebase clear
      db.ref(path).set({[key]: ""});
    }
});


//jsonからvalueに一致する値取得
function getJsonData(value, json) {
  for (let word in json)  if (value == word) return json[word]
  return json["default"]
}
