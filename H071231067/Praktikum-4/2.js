let harga = prompt("Masukkan Harga barang: ");
let jenis = prompt("Masukkan Jenis barang (Eletronik, Pakaian, Makanan, Lainnya): ");
let hargaSetelahDiskon = 0;
let diskon = "";
let adaJenis = true;

if (jenis.toLowerCase() == "eletronik") {
    hargaSetelahDiskon = 0.9 * harga;
    diskon = "10%";
} else if (jenis.toLowerCase()  == "pakaian") {
    hargaSetelahDiskon = 0.8 * harga;
    diskon = "20%";
} else if (jenis.toLowerCase()  == "makanan") {
    hargaSetelahDiskon = 0.95 * harga;
    diskon = "5%";
} else if (jenis.toLowerCase() == "lainnya") {
    hargaSetelahDiskon = harga;
    diskon = "Tidak ada";
}else {
    adaJenis = false;
}

if (adaJenis == false) {
    console.log("Jenis barang tidak sesuai");
} else {
    console.log("Harga awal: Rp" + harga);
    console.log("Diskon: " + diskon);
    console.log("Harga setelah diskon: RP" + hargaSetelahDiskon);
}