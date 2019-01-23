import util from './util.js'
const now =  util.getNowDate();
const isArray = Array.isArray || function (obj) {
    return obj instanceof Array;
};

export default { 
    now,
    isArray
}