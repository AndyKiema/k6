import http from 'k6/http';
import exec from 'k6/execution';

export const options = {
  vus: 10,
  duration: '60s',
};

export function setup() {
  let res = http.get('https://test.k6.io/sdqwadq');
  
  // Check if the status is not 200 (or other success codes)
  if (res.status !== 200) {
    exec.test.abort('Aborting test. Application is not responding correctly.');
  }
}

export default function () {
  http.get('https://test.k6.io/news.php');
}
