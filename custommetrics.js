import http from 'k6/http';
import{sleep} from 'k6';
import {Counter} from 'k6/metrics'; //specify type of metric you want to import

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
      mycounter: ['count===1']
    }
  }

let myCounter = new Counter('mycounter'); //Give a name to the counter

export default function(){
    http.get('https://test.k6.io');
    myCounter.add(1);
    sleep(1);
}