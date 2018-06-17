const express = require('express');
const bodyParser = require('body-parser');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const headers = {
  'X-Watson-Learning-Opt-Out': 'true'
};
const url = 'https://gateway.watsonplatform.net/assistant/api';
const username = '234595a4-8622-4ad5-8cbf-a35d1dd4465d';
const password = 'RcM5M8zqWYRp';
const version = '2018-02-16';
const workspace_id = 'afdb7361-90ec-42e3-aac2-1d64fa6ef571';

const service = new AssistantV1({
  headers,
  url,
  username,
  password,
  version,
});

const app = express();
app.listen(4201, () => {
  console.log('Server started on port 4201');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.route('/').post((req, res) => {
  service.message({
    input: {text: req.body.text},
    workspace_id,
  }, function (err, response) {
    if (err) {
      console.error(err);
    } else {
      res.send(response.output.text);
    }
  });
});
