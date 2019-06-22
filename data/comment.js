const fs = require('fs');
var name = {
    'DQ_SQ_P_W' : '0000',
    'DQ_SQ_P_T' : '0001',
    'DQ_SQ_N_W' : '0010',
    'DQ_SQ_N_T' : '0011',
    'DQ_SZ_P_W' : '0100',
    'DQ_SZ_P_T' : '0101',
    'DQ_SZ_N_W' : '0110',
    'DQ_SZ_N_T' : '0111',
    'DQ_RQ_P_W' : '0200',
    'DQ_RQ_P_T' : '0201',
    'DQ_RQ_N_W' : '0210',
    'DQ_RQ_N_T' : '0211',
    'DQ_RZ_P_W' : '0300',
    'DQ_RZ_P_T' : '0301',
    'DQ_RZ_N_W' : '0310',
    'DQ_RZ_N_T' : '0311',
    'DZ_SQ_P_W' : '1000',
    'DZ_SQ_P_T' : '1001',
    'DZ_SQ_N_W' : '1010',
    'DZ_SQ_N_T' : '1011',
    'DZ_SZ_P_W' : '1100',
    'DZ_SZ_P_T' : '1101',
    'DZ_SZ_N_W' : '1110',
    'DZ_SZ_N_T' : '1111',
    'DZ_RQ_P_W' : '1200',
    'DZ_RQ_P_T' : '1201',
    'DZ_RQ_N_W' : '1210',
    'DZ_RQ_N_T' : '1211',
    'DZ_RZ_P_W' : '1300',
    'DZ_RZ_P_T' : '1301',
    'DZ_RZ_N_W' : '1310',
    'DZ_RZ_N_T' : '1311',
    'OQ_SQ_P_W' : '2000',
    'OQ_SQ_P_T' : '2001',
    'OQ_SQ_N_W' : '2010',
    'OQ_SQ_N_T' : '2011',
    'OQ_SZ_P_W' : '2100',
    'OQ_SZ_P_T' : '2101',
    'OQ_SZ_N_W' : '2110',
    'OQ_SZ_N_T' : '2111',
    'OQ_RQ_P_W' : '2200',
    'OQ_RQ_P_T' : '2201',
    'OQ_RQ_N_W' : '2210',
    'OQ_RQ_N_T' : '2211',
    'OQ_RZ_P_W' : '2300',
    'OQ_RZ_P_T' : '2301',
    'OQ_RZ_N_W' : '2310',
    'OQ_RZ_N_T' : '2311',
    'OZ_SQ_P_W' : '3000',
    'OZ_SQ_P_T' : '3001',
    'OZ_SQ_N_W' : '3010',
    'OZ_SQ_N_T' : '3011',
    'OZ_SZ_P_W' : '3100',
    'OZ_SZ_P_T' : '3101',
    'OZ_SZ_N_W' : '3110',
    'OZ_SZ_N_T' : '3111',
    'OZ_RQ_P_W' : '3200',
    'OZ_RQ_P_T' : '3201',
    'OZ_RQ_N_W' : '3210',
    'OZ_RQ_N_T' : '3211',
    'OZ_RZ_P_W' : '3300',
    'OZ_RZ_P_T' : '3301',
    'OZ_RZ_N_W' : '3310',
    'OZ_RZ_N_T' : '3311' 
}

const readJson = function(url) {
    const data = fs.readFileSync(url);
    return JSON.parse(data);
}
const getComment = function(url) {
    // console.log(url);
    const jsonObeject = readJson(url);
    if (jsonObeject.result === undefined || jsonObeject.result.list === undefined) return undefined;
    const comment = jsonObeject.result.list;
    // if (comment === undefined) return undefined;
    let commentList = [];
    comment.forEach(element => {
        const skin = element.skinResults;
        const score = element.score;
        const id = element.entityId;
        // if (Number(score) === 0) {
        //     console.log('!!!!');
        //     console.log(element);
        // }
        if (name[skin] !== undefined && score !== undefined && Number(score) !== 0) {
            commentList.push({
                id: id,
                skin: name[skin],
                score: score
            })
        }
    });
    return commentList;
}
const getComments = function(url) {
    const files = fs.readdirSync(url);
    let commentList = [];
    files.forEach(element => {
        const nextComment = getComment(url + '/' + element);
        if (nextComment !== undefined) commentList = commentList.concat(nextComment);
    });
    return commentList;
}

// class CommentCount {
//     constructor(skin, count) {
//         this.skin = skin;
//         this.count = count;
//     } 
// }

// class Good {
//     constructor(id, commentCount) {
//         this.id = id;
//         this.commentCount = commentCount;
//     }
// }

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
}

const countComment = function(commentList) {
    let rootMap = new Map();
    commentList.forEach(element => {
        const id = element.id;
        let countMap = rootMap.has(id) ? rootMap.get(id) : new Map();
        const skin = element.skin, score = element.score;
        let scoreCount = countMap.has(skin) ? countMap.get(skin) : [0, 0, 0, 0, 0];
        // if (Number(score) === 0) console.log("!!!"+skin+"!!!");
        ++ scoreCount[Number(score) - 1];
        countMap.set(skin, scoreCount);
        rootMap.set(id, countMap);
    });
    rootMap.forEach((countMap, id, self) => {
        let temp = Array.from(countMap);
        temp.sort((a, b) => a[0] - b[0]);
        let countObject = Object.create(null);
        temp.forEach((ele) => {
            countObject[ele[0]] = ele[1];
        })
        self.set(id, countObject);
    })
    return rootMap;
}

let list = getComments('comment');
let count = countComment(list);
// console.log(strMapToObj(count));
fs.writeFileSync('count.json', JSON.stringify(strMapToObj(count)));