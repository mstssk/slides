const fs = require("fs");

const path = process.argv[2];
if (!path) {
    throw new Error("path is missing.");
}

(async function () {
    // デカいファイルだとたぶんだめ
    // fs.readFileSyncだと読んだ後に書き込めないので無理くりやってる
    let file = await readFile(path);
    file = file.replace(/\x08/g, "");
    fs.writeFileSync(path, file);
    // console.log(file);
})();

/**
 * @param {string} path
 * @returns {Promise<string>}
 */
function readFile(path) {
    return new Promise((resolve) => {
        let content = "";
        const rr = fs.createReadStream(path, "utf-8");
        rr.on('readable', () => {
            let data = rr.read();
            if (data) { content += data; }
        });
        rr.on('end', () => resolve(content));
    });
}
