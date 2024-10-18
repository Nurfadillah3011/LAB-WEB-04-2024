function countEvenNumbers(nilaiStart, nilaiEnd) {
    let tampungAngka = []

    if (nilaiStart % 2 == 0) {
        tampungAngka.push(nilaiStart)
        nilaiStart += 2;
        while (nilaiStart <= nilaiEnd) {
            tampungAngka.push(nilaiStart)
            nilaiStart += 2;
        }
    } else {
        nilaiStart += 1;
        while (nilaiStart <= nilaiEnd) {
            tampungAngka.push(nilaiStart)
            nilaiStart += 2;
        }
    }

    let output = `(${tampungAngka.join(', ')})`;
    console.log("Output = " + tampungAngka.length + output)
}

countEvenNumbers(1, 10)