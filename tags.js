import http from 'k6/http';

export const options={
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}' : ['p(95)<1000'], //Tag filter created to investigate if the API with status of 200 is the cause of delay
        'http_req_duration{status:201}' : ['p(95)<1000']  //Tag filter created to investigate if the API with status of 201 is the cause of delay
        //Status is a system tag
    }
}
export default function(){
    http.get('https://run.mocky.io/v3/6bb60147-3afb-4bf1-ae9f-d7da6f6e3de3');
    http.get('https://run.mocky.io/v3/86315dc9-c654-4b4c-9ca1-9cd29ccb0a95?mocky-delay=2000ms'); //A delay of 2000ms(2 seconds) added
}