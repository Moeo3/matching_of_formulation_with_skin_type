const fs = require('fs');

const readJson = function(url) {
    const data = fs.readFileSync(url);
    return JSON.parse(data);
}

const getInfo = function(url) {
    const jsonObeject = readJson(url);
    let compositionList = jsonObeject.result.entityInfo.goods.cps.split(',');
    let mainComposition = [];
    for (let i = 0; i < 32; ++ i) {
        if (compositionList[i] === undefined) mainComposition.push(0);
        else mainComposition.push(Number(compositionList[i]));
    }
    return {
        // title: jsonObeject.result.entityInfo.goods.title,
        id: jsonObeject.result.entityInfo.goods.id,
        composition: mainComposition
    }
}

const getAllInfo = function(url) {
    const files = fs.readdirSync(url);
    let infoList = Object.create(null);
    files.forEach(element => {
        const nextInfo = getInfo(url + '/' + element);
        infoList[nextInfo.id] = nextInfo.composition;
    });
    return infoList;
}

let infoList = getAllInfo('info1');
// console.log(infoList);
fs.writeFileSync('info.json', JSON.stringify(infoList));