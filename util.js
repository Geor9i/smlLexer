class Util {
    
    charType = (char) => {
        if (!char) return null;
        const charCode = char.charCodeAt(0);
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            return 'letter';
        }else if (charCode >= 48 && charCode <= 57) {
            return 'number';
        } 
        return null;
    }

    combineString(charArr, startIndex, endIndex) {
        return charArr.slice(startIndex, endIndex).join('');
    }
}

export const util = new Util();