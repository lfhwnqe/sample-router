// import { version } from '../package.json';  // rollup插件可以导出json

import hello from './routes/router';
export default function () {
    console.log(hello);
}