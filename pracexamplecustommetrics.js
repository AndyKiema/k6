import http from 'k6/http';
import{sleep} from 'k6';
import {Counter, Trend} from 'k6/metrics'; //Trend means capturing avg, min,med etc

export const options={
    vus: 10,
    duration: '10s',
    thresholds: {
      http_req_duration: ['p(95)<500'],
      http_req_failed: ['rate<0.01'],
      http_reqs: ['count>20'], 
      http_reqs: ['rate>30'], 
      vus: ['value>9'],
      checks: ['rate>=0.98'],
      mycounter: ['count===1'],
      response_time_news_page: ['p(95)<5000'] //Added Threshold
    }
  }

let myCounter = new Counter('mycounter'); 
let newsPageResponseTrend=new Trend('response_time_news_page'); //New metric

export default function(){
    let res=http.get('https://test.k6.io');
    myCounter.add(1);
    sleep(1);
    res=http.get('https://test.k6.io/news.php');
    newsPageResponseTrend.add(res.timings.duration); //Setting the duration for the request above only
    sleep(1);
   
}