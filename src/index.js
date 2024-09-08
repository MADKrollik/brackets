module.exports = function check(str, bracketsConfig) {
    const stack = [];
    const openBrackets = [];
    const closeBrackets = {};
    const sameBrackets = [];

    bracketsConfig.forEach(([open, close]) => {
        openBrackets.push(open);
        closeBrackets[close] = open;
        if (open === close) {
            sameBrackets.push(open);
        }
    });

    for (let char of str) {
        if (sameBrackets.includes(char)) {
            if (stack.length > 0 && stack[stack.length - 1] === char) {
                stack.pop();
            } else {
                stack.push(char);
            }
        } else if (openBrackets.includes(char)) {
            stack.push(char);
        } else if (char in closeBrackets) {
            if (stack.length === 0 || stack[stack.length - 1] !== closeBrackets[char]) {
                return false;
            }
            stack.pop();
        }
    }
    
    return stack.length === 0;
}