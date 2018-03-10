const express = require('express');
const path = require('path');
const app = express();

app.set('port', 4000);

app.use(express.static(path.join(__dirname, 'static')));

const server = app.listen(app.get('port'), function() {
  const port = server.address().port;
  console.log('Server started on port ' + port);
});
