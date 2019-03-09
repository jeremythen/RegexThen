(function(global) {
    "use strict"

    var regStr = '';

    var RegexThen = function() {
        return new RegexThen.fn.init();
    }

    RegexThen.fn = RegexThen.prototype = {
        regStr: '',
        modifiers: '',
        begin: function() {
            this.regStr += '^';
            return this;
        },
        beginWith: function(str) {
            this.regStr += '^' + srt;
            return this;
        },
        end: function() {
            this.regStr += '$';
            return this;
        },
        endsWith: function(str) {
            this.regStr += srt + '$';
            return this;
        },
        beginsAndEndsWith: function(str) {
            this.regStr += '^' + srt + '$';
            return this;  
        },
        execute: function() {
            var regStr = this.regStr + this.modifiers;
            console.info('regStr', regStr)
            this.regStr = '';
            return new RegExp(regStr, this.modifiers);
        },
        findAndGroup: function(str) {
            if(arguments.length > 1) {
                this.regStr += '(';
                for(let i = 0; i < arguments.length; i++) {
                    this.regStr +=  i === arguments.length - 1? arguments[i]: arguments[i] + '|';
                }
                this.regStr += ')'
            }else if(str) {
                this.regStr += '(?:' + str +')';
            }else {
                this.regStr += '';
            }
            return this;
        },
        findAndOutGroup: function(str) {
            if(arguments.length > 1) {
                this.regStr += '(?:';
                for(let i = 0; i < arguments.length; i++) {
                    this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
                }
                this.regStr += ')'
            }else if(str) {
                this.regStr += '(?:' + str +')';
            }else {
                this.regStr += '';
            }
            return this;
        },
        find: function(str) {
            this.regStr += str;
            return this;
        },
        groupMultipleValues: function() {
            this.regStr += '(.*)';
            return this;
        },
        outGroupMultipleValues: function() {
            this.regStr += '(?:.*)';
            return this;
        },
        allowSpace: function(start, end) {
            if(start && end) {
                this.regStr += '\\s{' + start + ',' + end + '}';
            }else{
                this.regStr += '\\s?';
            }
            return this;
        },
        findAnyOf: function(str) {
            this.regStr += '(';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ')';
            return this;
        },
        openFindAnyOf: function() {
            this.regStr += '(';
        },
        closeFindAnyOf: function() {
            this.regStr += ')';
        },
        findAnyNotOf: function(str) {
            this.regStr += '(^';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ')';
            return this;
        },
        findAnyCharacterIn: function(str) {
            this.regStr += '[';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ']';
            return this;
        },
        findAnyCharacterNotIn: function(str) {
            this.regStr += '[^';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ']';
            return this;
        },
        openFindAnyCharacterIn: function() {
            this.regStr += '[';
            return this;
        },
        closeFindAnyCharacterIn: function() {
            this.regStr += ']';
            return this;
        },
        openFindAnyCharacterNotIn: function() {
            this.regStr += '[^';
            return this;
        },
        closeFindAnyCharacterNotIn: function() {
            this.regStr += ']';
            return this;
        },
        findDigit: function() {
            this.regStr += '\\d';
            return this;
        },
        digit: function() {
            this.regStr += '\\d';
            return this;
        },
        findNoneDigit: function() {
            this.regStr += '\\D';
            return this;
        },
        noneDigit: function() {
            this.regStr += '\\D';
            return this;
        },
        findWord: function() {
            this.regStr += '\\w';
            return this;
        },
        findNoneWord: function() {
            this.regStr += '\\W';
            return this;
        },
        word: function() {
            this.regStr += '\\w';
            return this;
        },
        noneWord: function() {
            this.regStr += '\\W';
            return this;
        },
        findSpace: function() {
            this.regStr += '\\s';
            return this;
        },
        findNoneSpace: function() {
            this.regStr += '\\S';
            return this;
        },
        space: function() {
            this.regStr += '\\s';
            return this;
        },
        noneSpace: function() {
            this.regStr += '\\S';
            return this;
        },
        findAtBeginingOrEndOfWord: function() {
            this.regStr += '\\b';
            return this;
        },
        findNotAtBeginingOrEndOfWord: function() {
            this.regStr += '\\B';
            return this;
        },
        findFromFeed: function() {
            this.regStr += '\\f';
            return this;
        },
        findCarriageReturn: function() {
            this.regStr += '\\r';
            return this;
        },
        findTab: function() {
            this.regStr += '\\t';
            return this;
        },
        findVerticalTab: function() {
            this.regStr += '\\v';
            return this;
        },
        findAtNewLine: function() {
            this.regStr += '\\n';
            return this;
        },
        matchOneOrMore: function() {
            this.regStr += '+';
            return this;
        },
        matchZeroOrMore: function() {
            this.regStr += '*';
            return this;
        },
        matchZeroOrOne: function() {
            this.regStr += '?';
            return this;
        },
        matchRange: function(r1, r2) {
            if(r1 > -1) {
                this.regStr += '{' + r1;
                if(typeof r2 === 'number' && r2 !== -1) {
                    this.regStr += ',' + r2;
                }else if(r2 === -1) {
                    this.regStr += ',';
                }
                this.regStr += '}';
            }
            return this;
        },
        matchWhenFollowedBy: function(str1, str2) {
            this.regStr += str1 + '(?=' + str2 + ')';
            return this;
        },
        matchWhenNotFollowedBy: function(str1, str2) {
            this.regStr += str1 + '(?!' + str2 + ')';
            return this;
        },
        global: function() {
            let modifier = 'g';
            this.modifiers +=  this.modifiers.indexOf(modifier) === -1 ? modifier: '';
            return this;
        },
        insensitive: function() {
            let modifier = 'i';
            this.modifiers +=  this.modifiers.indexOf(modifier) === -1 ? modifier: '';
            return this;
        },
        multiline: function() {
            let modifier = 'm';
            this.modifiers +=  this.modifiers.indexOf(modifier) === -1 ? modifier: '';
            return this;
        },
        resetRegex: function() {
            this.regStr = '';
        }
        

    }

    var init = RegexThen.fn.init = function() {

    }

    init.prototype = RegexThen.fn;

    
    window.RegexThen = RegexThen();

    return RegexThen;

})(window);