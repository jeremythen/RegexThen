(function(global) {
    "use strict"

    var RegexThen = function() {
        return new RegexThen.fn.init();
    }

    RegexThen.fn = RegexThen.prototype = {
        regStr: '',
        modifiers: '',
        begin() {
            this.regStr += '^';
            return this;
        },
        beginWith(str) {
            this.regStr += '^' + str;
            return this;
        },
        end() {
            this.regStr += '$';
            return this;
        },
        endsWith(str) {
            this.regStr += str + '$';
            return this;
        },
        beginsAndEndsWith(str) {
            this.regStr += '^' + str + '$';
            return this;  
        },
        execute() {
            var regStr = this.regStr + this.modifiers;
            this.regStr = '';
            return new RegExp(regStr, this.modifiers);
        },
        findAndGroup(str) {
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
        findAndOutGroup(str) {
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
        find(str) {
            this.regStr += str;
            return this;
        },
        groupMultipleValues() {
            this.regStr += '(.*)';
            return this;
        },
        outGroupMultipleValues() {
            this.regStr += '(?:.*)';
            return this;
        },
        allowSpace(start, end) {
            if(start && end) {
                this.regStr += '\\s{' + start + ',' + end + '}';
            }else{
                this.regStr += '\\s?';
            }
            return this;
        },
        findAnyOf(str) {
            this.regStr += '(';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ')';
            return this;
        },
        openFindAnyOf() {
            this.regStr += '(';
        },
        closeFindAnyOf() {
            this.regStr += ')';
        },
        findAnyNotOf(str) {
            this.regStr += '(^';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ')';
            return this;
        },
        findAnyCharacterIn(str) {
            this.regStr += '[';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ']';
            return this;
        },
        findAnyCharacterNotIn(str) {
            this.regStr += '[^';
            for(let i = 0; i < arguments.length; i++) {
                this.regStr += i === arguments.length - 1? arguments[i]: arguments[i] + '|';
            }
            this.regStr += ']';
            return this;
        },
        openFindAnyCharacterIn() {
            this.regStr += '[';
            return this;
        },
        closeFindAnyCharacterIn() {
            this.regStr += ']';
            return this;
        },
        openFindAnyCharacterNotIn() {
            this.regStr += '[^';
            return this;
        },
        closeFindAnyCharacterNotIn() {
            this.regStr += ']';
            return this;
        },
        findDigit() {
            this.regStr += '\\d';
            return this;
        },
        digit() {
            this.regStr += '\\d';
            return this;
        },
        findNoneDigit() {
            this.regStr += '\\D';
            return this;
        },
        noneDigit() {
            this.regStr += '\\D';
            return this;
        },
        findWord() {
            this.regStr += '\\w';
            return this;
        },
        findNoneWord() {
            this.regStr += '\\W';
            return this;
        },
        word() {
            this.regStr += '\\w';
            return this;
        },
        noneWord() {
            this.regStr += '\\W';
            return this;
        },
        findSpace() {
            this.regStr += '\\s';
            return this;
        },
        findNoneSpace() {
            this.regStr += '\\S';
            return this;
        },
        space() {
            this.regStr += '\\s';
            return this;
        },
        noneSpace() {
            this.regStr += '\\S';
            return this;
        },
        findAtBeginingOrEndOfWord() {
            this.regStr += '\\b';
            return this;
        },
        findNotAtBeginingOrEndOfWord() {
            this.regStr += '\\B';
            return this;
        },
        findFromFeed() {
            this.regStr += '\\f';
            return this;
        },
        findCarriageReturn() {
            this.regStr += '\\r';
            return this;
        },
        findTab() {
            this.regStr += '\\t';
            return this;
        },
        findVerticalTab() {
            this.regStr += '\\v';
            return this;
        },
        findAtNewLine() {
            this.regStr += '\\n';
            return this;
        },
        matchOneOrMore() {
            this.regStr += '+';
            return this;
        },
        matchZeroOrMore() {
            this.regStr += '*';
            return this;
        },
        matchZeroOrOne() {
            this.regStr += '?';
            return this;
        },
        matchRange(r1, r2) {
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
        matchWhenFollowedBy(str1, str2) {
            this.regStr += str1 + '(?=' + str2 + ')';
            return this;
        },
        matchWhenNotFollowedBy(str1, str2) {
            this.regStr += str1 + '(?!' + str2 + ')';
            return this;
        },
        global() {
            let modifier = 'g';
            this.modifiers +=  this.modifiers.indexOf(modifier) === -1 ? modifier: '';
            return this;
        },
        insensitive() {
            let modifier = 'i';
            this.modifiers +=  this.modifiers.indexOf(modifier) === -1 ? modifier: '';
            return this;
        },
        multiline() {
            let modifier = 'm';
            this.modifiers +=  this.modifiers.indexOf(modifier) === -1 ? modifier: '';
            return this;
        },
        resetRegex() {
            this.regStr = '';
        }
        

    }

    var init = RegexThen.fn.init = function() {}

    init.prototype = RegexThen.fn;
    
    window.RegexThen = RegexThen();

    return RegexThen;

})(window);