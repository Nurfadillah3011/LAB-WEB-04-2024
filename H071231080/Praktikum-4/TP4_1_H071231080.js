function countEvenNumbers(start, end) {
    
    if (start > end) {
        return "Error: Nilai start tidak boleh lebih besar dari nilai end!"
        
    }

    let jumlah = 0;
    let genap = [];

    for (let i = start; i <= end; i++) {
        if (i % 2 === 0){
            jumlah += 1;
            genap.push(i)
        }

    }
    return `Output: ${jumlah} (${genap.join(", ")})`;

} 

console.log(countEvenNumbers(1,10));
console.log(countEvenNumbers(20,10));
