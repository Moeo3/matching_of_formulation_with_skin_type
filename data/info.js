const fs = require('fs');

const readJson = function(url) {
    const data = fs.readFileSync(url);
    return JSON.parse(data);
}

const getInfo = function(url) {
    // console.log('!!!3'+url);
    const jsonObeject = readJson(url);
    // const composition = jsonObeject.result.entityInfo.composition;
    // let compositionList = [];
    // composition.forEach( ele => {
    //     compositionList.push(ele.id);
    // })
    // console.log('!!!4');
    let compositionList = jsonObeject.result.entityInfo.goods.cps.split(',');
    let mainComposition = [];
    for (let i = 0; i < 32; ++ i) {
        if (compositionList[i] === undefined) mainComposition.push(0);
        else mainComposition.push(Number(compositionList[i]));
    }
    // compositionList = compositionList.map(ele => Number(ele));
    // maxCount = Math.max(maxCount, compositionList.length);
    // console.log('!!!5');
    return {
        // title: jsonObeject.result.entityInfo.goods.title,
        id: jsonObeject.result.entityInfo.goods.id,
        composition: mainComposition
    }
}

const getAllInfo = function(url) {
    // console.log('!!!');
    const files = fs.readdirSync(url);
    // console.log('!!!1');
    let infoList = Object.create(null);
    files.forEach(element => {
        // console.log('!!!2');
        const nextInfo = getInfo(url + '/' + element);
        infoList[nextInfo.id] = nextInfo.composition;
        // infoList.push(nextInfo);
    });
    return infoList;
}

let infoList = getAllInfo('info1');
// console.log(infoList);
fs.writeFileSync('info.json', JSON.stringify(infoList));
// console.log(maxCount);