import http from 'k6/http';
import {check} from 'k6';
import {sleep} from 'k6';
import exec from 'k6/execution';

export const options={
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    http_reqs: ['count>20'], 
    http_reqs: ['rate>30'], 
    vus: ['value>9'],
    checks: ['rate>=0.98']
  }
}


export default function(){
    const res=http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo': ''));
    console.log(exec.scenario.iterationInTest);
    check(res,{
      'status is 200': (r)=> r.status === 200,  //check if status is 200
      'page has opening statement': (r)=> r.body.includes ('Collection of simple web-pages suitable for load testing.')===true  //check if body of webpage includes the statement
    });

}
