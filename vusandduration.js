import http from "k6/http";

export const options={
    vus:10, //Virtual users
    duration: '10s' //Duration of test
}

export default function(){
    http.get("https://test.k6.io");
}