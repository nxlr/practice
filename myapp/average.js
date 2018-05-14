function average(array) {
    sum = 0;
    for (let index = 0; index < array.length; index++) {
        sum += array[index];
    }
    return Math.round(sum/array.length);
}

var x = [1, 2, 3, 4, 5, 6];
console.log(average(x));