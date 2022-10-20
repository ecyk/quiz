const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/bahce-tarimi.json', function (req, res) {
  res.sendFile(__dirname + "/view/" + "bahce-tarimi.json");
});

app.get('/bireyler-arasi-iletisim.json', function (req, res) {
  res.sendFile(__dirname + "/view/" + "bireyler-arasi-iletisim.json");
});

app.get('/ekoloji-ve-cevre-bilgisi.json', function (req, res) {
  res.sendFile(__dirname + "/view/" + "ekoloji-ve-cevre-bilgisi.json");
});

app.get('/genel-biyoloji.json', function (req, res) {
  res.sendFile(__dirname + "/view/" + "genel-biyoloji.json");
});

app.get('/tarla-bitkileri.json', function (req, res) {
  res.sendFile(__dirname + "/view/" + "tarla-bitkileri.json");
});

app.get('/index2.js', function (req, res) {
  res.sendFile(__dirname + "/view/" + "index2.js");
});

app.get('/index.css', function (req, res) {
  res.sendFile(__dirname + "/view/" + "index.css");
});

app.get('/', (req, res) => {
  res.sendFile('view/index.html', { root: __dirname })
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
