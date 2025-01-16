import http from 'k6/http';
import {check} from 'k6';

export default function(){
    const res=http.get('https://test.k6.io');
    check(res,{
      'status is 200': (r)=> r.status === 200,  //check if status is 200
      'page has opening statement': (r)=> r.body.includes ('Collection of simple web-pages suitable for load testing.')===true  //check if body of webpage includes the statement
    });

}
