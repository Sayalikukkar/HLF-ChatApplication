function reverse(array) {
    arr = [];
    for(let i = array.length - 1; i >=0 ; i--) {
        let values = array[i];
        arr.push(values);
    }
    return arr;
}
console.log(reverse([2,5,6,8]));