import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const pluginDir = "com.nefrit.youtube.sdPlugin";
const nodeModulesDir = `${pluginDir}/node_modules`;

async function main() {
    await rm(nodeModulesDir, { recursive: true, force: true });
    await mkdir(nodeModulesDir, { recursive: true });

    await cp("node_modules/@elgato", `${nodeModulesDir}/@elgato`, { recursive: true });
    await cp("node_modules/ws", `${nodeModulesDir}/ws`, { recursive: true });

    const pluginPackage = {
        name: "com.nefrit.youtube.runtime",
        private: true,
        type: "module",
    };

    await writeFile(
        `${pluginDir}/package.json`,
        `${JSON.stringify(pluginPackage, null, 2)}\n`,
        "utf8",
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
