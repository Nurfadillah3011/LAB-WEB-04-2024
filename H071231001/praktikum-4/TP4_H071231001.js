// Nomor 1
console.log("Nomor 1");

function countEvenNumbers(start, end) {
    if (start > end) {
        alert("Angka tidak valid! Angka start tidak boleh lebih besar dari angka end.");
        return; 
    }
    const genap = [];
    for (let i = start; i <= end; i++) {
        if (i % 2 === 0) {
            genap.push(i);
        }
    }
    console.log(genap.length, `(${genap.join(", ")})`);
}
countEvenNumbers(20, 10);


// Nomor 2
console.log("Nomor 2");

let harga = prompt("Masukkan harga barang: ");
harga = parseFloat(harga);
if (isNaN(harga) || harga <= 0) {
    alert("Harga barang harus berupa angka!");
} else {
    const jenis = prompt("Masukkan jenis barang (Elektronik, Pakaian, Makanan, Lainnya): ");
    let jenis1 = jenis.toLowerCase();
    let diskon;
    let harga_diskon;

    switch (jenis1) {
        case "elektronik":
            diskon = "10%";
            harga_diskon = 0.90 * harga;
            break;
        case "pakaian":
            diskon = "20%";
            harga_diskon = 0.80 * harga;
            break;
        case "makanan":
            diskon = "5%";
            harga_diskon = 0.95 * harga;
            break;
        default:
            diskon = "0%";
            harga_diskon = harga;
            break;
    }
    console.log("Harga awal: Rp.", harga);
    console.log("Diskon: ", diskon);
    console.log("Harga setelah diskon: Rp.", harga_diskon);
}


// Nomor 3
console.log("Nomor 3");
function cekHari(mulaiHari, hariKeberapa){
    mulaiHari = mulaiHari.toLowerCase();
    let arr = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
    let panjangHari = arr.length;
    let mulai = arr.indexOf(mulaiHari);
    if (mulai != -1){
        mulai += hariKeberapa;
        mulai %= panjangHari;
        console.log("Hari nya adalah : " + arr[mulai]);
    } else {
        console.log("Typo");
    }
}
cekHari("Jumat",1000);

// Nomor 4
console.log("Nomor 4");
let angkaRandom = 1 + Math.floor(Math.random() * 100);
let percobaan = 0;

let angkaTebakan = parseInt(prompt("Masukkan salah satu angka dari 1 sampai 100: "));
while (!temukan(angkaTebakan, angkaRandom)) {
    angkaTebakan = parseInt(prompt("Masukkan salah satu angka dari 1 sampai 100: "));
}
function temukan(tebakan, angka) {
    percobaan++;
    angkaTebakan;
    if (tebakan < angka) {
        console.log(`Masukkan salah satu angka dari 1 sampai 100: ${angkaTebakan}`);
        console.log("Terlalu rendah! Coba Lagi");
        return false;
    } else if (tebakan > angka) {
        console.log(`Masukkan salah satu angka dari 1 sampai 100: ${angkaTebakan}`);
        console.log("Terlalu tinggi! Coba Lagi");
        return false;
    }else {
            console.log(`Selamat! kamu berhasil menebak angka ${angkaTebakan} dengan benar.`);
            console.log(`Kamu telah mencoba sebanyak ${percobaan} kali.`);
            return true;
    }
}
