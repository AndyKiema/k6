import http from 'k6/http';
import {check} from 'k6';
import {sleep} from 'k6';

export const options={
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    http_reqs: ['count>20'], //total number of requests made
    http_reqs: ['rate>30'], //verifies that number of requests per second are more than 30
    vus: ['value>9']//verifies that number of virtual users are more than 9
  }
}


export default function(){
    const res=http.get('https://test.k6.io');
    check(res,{
      'status is 200': (r)=> r.status === 200,  //check if status is 200
      'page has opening statement': (r)=> r.body.includes ('Collection of simple web-pages suitable for load testing.')===true  //check if body of webpage includes the statement
    });

}
