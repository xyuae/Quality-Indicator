function main() {
    const hypotenuse = getLengthOfHypotenuse(3, 4)
    console.log(hypotenuse)
}

function getLengthOfHypotenuse(a, b) {
    const squareA = square(a)
    const squareB = square(b)
    const sumOfSqures = squareA + squareB
    return Math.sqrt(sumOfSqures)
}

function square(number) {
    return number * number
}

main()

// You saw that local variables are popped from the stack when the functions execution finishes. It happens only when you work with simple vairables
// such as numberd, strings and booleans. Values of objects, arrays and such are stored in the heap and your vairable is merely a pointer to them
//
