// rollup.config.js
import {
    uglify
} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';


export default {
    input: 'src/routes/router.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        uglify(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};