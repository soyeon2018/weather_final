const express = require("express");
const request = require("request");
const config = require("./api_key.js"); // API 키 불러오기

const app = express();

// 날씨 API 라우터
app.get("/weather", function (req: any, res: any) {
  const { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny } =
    req.query;

  const api_url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?";
  const options = {
    url: api_url,
    qs: { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny },
  };

  request.get(options, function (error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("Error:", response ? response.statusCode : error);
    }
  });
});

// 서버 실행
app.listen(3000, function () {
  console.log(`API Key is ready: ${config.WEATHER_API_KEY}`);
  console.log(
    "http://127.0.0.1:3000/weather?serviceKey=API_KEY&numOfRows=10&pageNo=1&base_date=20241028&base_time=0600&nx=61&ny=125 app listening on port 3000!"
  );
});
