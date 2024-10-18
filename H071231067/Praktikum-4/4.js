const angka = Math.floor(Math.random() * 100) + 1;
let angkaTebakan = prompt("Masukkan salah satu dari angka 1 sampai 100: (angka acak = " + angka + ")" );
let percobaan = 1;

while (angkaTebakan != angka) {
    if (angkaTebakan > angka) {
        percobaan += 1;
        console.log("Terlalu tinggi! Coba lagi.");
        angkaTebakan = prompt("Terlalu tinggi! Coba lagi.\nMasukkan salah satu dari angka 1 sampai 100: (angka acak = " + angka + ")");
    } else if (angkaTebakan < angka) {
        percobaan += 1;
        console.log("Terlalu rendah! Coba lagi.");
        angkaTebakan = prompt("Terlalu rendah! Coba lagi.\nMasukkan salah satu dari angka 1 sampai 100: (angka acak = " + angka + ")");
    }
}
console.log("Selamat! Kamu berhasil menebak angka " + angka + " dengan benar.");
console.log("Sebanyak " + percobaan + "x percobaan.");