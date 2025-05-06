import http from 'k6/http';
import{sleep} from 'k6';

export const options={
    stages: [
        {
            duration: '10s',    //duration- how long the stage lasts
            target: 10          //tagret- number of VUs active in this stage
        },
        {
            duration: '30s',
            target: 10
        },
        {
            duration: '10s',
            target: 0
        }
    ]

}

export default function(){
    http.get('https://test.k6.io');
    sleep(1);
}