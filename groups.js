import http from 'k6/http';
import {sleep,group,check} from 'k6'; //group added


export const options={
    thresholds:{
        http_req_duration:['p(95)<250']
    }
}

export default function(){
    group('Main page', function() {
        let res=http.get('https://test.k6.io');
        check(res, {'status is 200':(r)=>r.status === 200});
        
        group('Assets', function(){
            http.get('https://test.k6.io/static/css/site.css'); //Opening CSS page as well(In a subgroup)
            http.get('https://test.k6.io/static/js/prisms.js'); //Opening JS page as well(In a subgroup)
        });
    });

    group('New page',function(){
        http.get('https://test.k6.io/news.php');
    });
}//Requests have been organized in groups