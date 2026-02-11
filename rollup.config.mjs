import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/plugin.ts",
    output: {
        file: "com.nefrit.youtube.sdPlugin/bin/plugin.js",
        format: "es",
        sourcemap: true,
        inlineDynamicImports: true,
    },
    plugins: [
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",
        }),
    ],
};
