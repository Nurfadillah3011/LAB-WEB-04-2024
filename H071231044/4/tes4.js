function countEvenNumbers(start, end) {
    let count = 0;
    let evenNumbers = [];
    let i = start;

    while (i <= end) {
        if (i % 2 === 0) {
            count++;
            evenNumbers.push(i);
        }
        i++;
    }

    alert(`Output: ${count} (${evenNumbers.join(', ')})`);
}

function tugas1() {
    let integerInput1 = 0;
    let integerInput2 = 0;

    while (integerInput1 === 0) {
        let input1 = prompt("Masukkan Start : ");
        if (!isNaN(input1) && Number.isInteger(parseFloat(input1))) {
            integerInput1 = input1;
            break
        } else {
            console.log("Inputan Bukan integer");
        }
    }

    while (integerInput2 === 0) {
        let input2 = prompt("Masukkan End : ");
        if (!isNaN(input2) && Number.isInteger(parseFloat(input2))) {
            integerInput2 = input2;
            break
        } else {
            console.log("Inputan Bukan integer");
        }
    }

    if (integerInput2 > integerInput1) {
        countEvenNumbers(integerInput1, integerInput2);
    } else {
        console.log("Inputan kedua lebih rendah dari inputan pertama, coba lagi.");
        tugas1();
    }
}


function HurufBesarAwal(str) {
    if (str.length === 0) 
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


function tugas2() {
    let integerInput = 0;
    let jenis = null

    while (integerInput === 0) {
        let input = prompt("Masukkan Harga barang : ");
        if (!isNaN(input) && Number.isInteger(parseFloat(input))) {
            integerInput = input;
            break
        } else {
            console.log("Inputan Bukan integer");
        }
    }

    while (jenis === null || jenis != null) {
        jenis = prompt("masukkan jenis barang (Elektronik, Pakaian, Makanan, Lainnya): ")
        let jenis1 = HurufBesarAwal(jenis)
        if (jenis1 === "Elektronik"|| jenis1 === "Pakaian" || jenis1 === "Makanan" || jenis1 === "Lainnya"){
            switch(jenis1) {
                case "Elektronik" :
                    Hasil = integerInput * (9/10)
                    alert(`Harga setelah diskon : ${Hasil}`)
                    break;
                case "Pakaian" :
                    Hasil = integerInput * (8/10)
                    alert(`Harga setelah diskon : ${Hasil}`)
                    break;
                case "Makanan" :
                    Hasil = integerInput * (19/20)
                    alert(`Harga setelah diskon : ${Hasil}`)
                    break;
                default :
                    Hasil = integerInput
                    alert(`Harga setelah diskon : ${Hasil}`)
                    break;
            }
            break;
        }
        else{
            alert("Inputan tidak sesuai, ulangi");
        }
    }


}

function tugas3() {
    let hariSekarang = prompt("Masukkan nama hari : ");
    j_Hari = 0;
    let tes = HurufBesarAwal(hariSekarang)
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const Hari = namaHari.indexOf(tes);
    if (Hari === -1) {
        return "Hari yang dimasukkan tidak valid!";
        tugas3();
    }
    else{
        while (j_Hari === 0) {
            let input = prompt("Masukkan jumlah hari kedepannya : ");
            if (!isNaN(input) && Number.isInteger(parseFloat(input))) {
                j_Hari = input;
                break
            } else {
                console.log("Inputan Bukan integer");
            }
        }
        const hitung = ((j_Hari % 7)) ;
        hasil = ((hitung + Hari) % 7);

        alert(`Hari setelah ${j_Hari} Hari sejak hari ${tes} adalah hari ${namaHari[hasil]}`)
    }
}

function tugas4() {
    const angkaRahasia = Math.floor(Math.random() * 100) + 1;
    console.log(angkaRahasia);
    
    let tebakan = null;
    let jumlahTebakan = 0;

    alert("Selamat datang di permainan tebak angka! Komputer telah memilih angka antara 1 dan 100. Coba tebak!");

    while (tebakan !== angkaRahasia) {
        tebakan = prompt("Masukkan tebakan Anda (antara 1 dan 100): ");
        tebakan = parseInt(tebakan);
        if (isNaN(tebakan) || tebakan < 1 || tebakan > 100) {
            alert("Input tidak valid. Masukkan angka antara 1 dan 100.");
            continue;
        }

        jumlahTebakan++;
        if (tebakan < angkaRahasia) {
            alert("Tebakan Anda terlalu rendah!");
        } else if (tebakan > angkaRahasia) {
            alert("Tebakan Anda terlalu tinggi!");
        } else {
            alert(`Selamat! Anda menebak angka yang benar: ${angkaRahasia}. Anda membutuhkan ${jumlahTebakan} tebakan.`);
            break;
        }
    }
}



