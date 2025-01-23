import http from 'k6/http';
import {sleep,group,check} from 'k6'; 


export const options={
    thresholds:{
        http_req_duration:['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<8000'],  //Max should ideally be less than 8 secs because of the 7 second total delay(5000+1000+1000)
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'], //Max should ideally be less than 3 seconds because of the 2 second delay(1000+1000)
        'group_duration{group:::New page}': ['p(95)<6000'] // Max should ideally be less than 6 seconds because of the 5 second delay(5000)
    }
}

export default function(){
    group('Main page', function() {
        let res=http.get('https://run.mocky.io/v3/25002e1c-472b-44ee-b4ed-310325446c19?mocky-delay=5000ms');
        check(res, {'status is 200':(r)=>r.status === 200});
        
        group('Assets', function(){
            http.get('https://run.mocky.io/v3/25002e1c-472b-44ee-b4ed-310325446c19?mocky-delay=1000ms'); 
            http.get('https://run.mocky.io/v3/25002e1c-472b-44ee-b4ed-310325446c19?mocky-delay=1000ms'); 
        });
    });

    group('New page',function(){
        http.get('https://run.mocky.io/v3/25002e1c-472b-44ee-b4ed-310325446c19?mocky-delay=5000ms');
    });
}//Requests have been organized in groups