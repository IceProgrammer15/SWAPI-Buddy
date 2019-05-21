
export const randomInt = function (iMin, iMax, exclude) {
    var iRandom = Math.floor(Math.random() * (iMax - iMin + 1) + iMin);
    if (Array.isArray(exclude) && Math.abs(iMax - iMin) > 0) {
        while (exclude.indexOf(iRandom) >= 0) {
            iRandom = Math.floor(Math.random() * (iMax - iMin + 1) + iMin);
        }
    }
    return iRandom
}

export const capitalize = function(str){
    if(str && str.length){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    else{
        return str;
    }    
}

export const underScoreToWords = function(str){
    if(str && str.length){
        var words = str.split('_');
        for(var i=0; i<words.length; i++){
            words[i] = capitalize(words);
        }
        return words.join(' ');
    }
    else{
        return str;
    }    
}