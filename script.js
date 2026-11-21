// DATA ARRAY OF OBJECTS
const dataMenu = [
    {
        id: 1,
        nama: "Klepon",
        kategori: "makanan",
        harga: 1000,
        gambar: "asset/klepon.jpeg",
        classCss: "klepon"
    },
    {
        id: 2,
        nama: "Sumping Pisang",
        kategori: "makanan",
        harga: 3000,
        gambar: "asset/jajeputih.jpeg",
        classCss: "jajeputih"
    },
    {
        id: 3,
        nama: "Jaje Bendu",
        kategori: "makanan",
        harga: 3000,
        gambar: "asset/jajeungu.jpeg",
        classCss: "jajeungu"
    },
    {
        id: 4,
        nama: "Es Rujak",
        kategori: "minuman",
        harga: 10000,
        gambar: "asset/esrujak.png",
        classCss: "rujak"
    },
    {
        id: 5,
        nama: "Es Cincau",
        kategori: "minuman",
        harga: 10000,
        gambar: "asset/cincau.jpeg",
        classCss: "cincau"
    }
];

// menampilkan ke html
function tampilkanMenu(listMenu) {
    const container = document.getElementById("daftar-menu");
    if (!container) return;
    container.innerHTML = "";

    if (listMenu.length === 0) {
        container.innerHTML = `<p style="margin: 30px 0;">Menu tidak ditemukan.</p>`;
        return;
    }

    listMenu.forEach(item => {
    container.innerHTML += `
      <div class="${item.classCss}">
        <img src="${item.gambar}" alt="${item.nama}">
        <h3>${item.nama}</h3>
        <p>Rp ${item.harga.toLocaleString("id-ID")}/pcs</p>
        <button type="button" onclick="bukaModal(${item.id})">Pesan</button>
      </div>
    `;
});
}

document.addEventListener("DOMContentLoaded", () => {
    tampilkanMenu(dataMenu);
});

// fitur search
function cariMenu() {
    const kataKunci = document.getElementById("searchInput").value.toLowerCase();
    const hasil = dataMenu.filter(item => item.nama.toLowerCase().includes(kataKunci));
    tampilkanMenu(hasil);
}

// fitur filter kategori
function filterKategori(kategori, tombol) {
    document.querySelectorAll(".pisah button").forEach(btn => btn.classList.remove("active"));
    if (tombol) tombol.classList.add("active");

    if (kategori === "semua") {
        tampilkanMenu(dataMenu);
    } else {
        const hasil = dataMenu.filter(item => item.kategori === kategori);
        tampilkanMenu(hasil);
    }
}

let produkDipilih = null;

function bukaModal(data) {
    if (typeof data === "number") {
        produkDipilih = dataMenu.find(item => item.id === data);
    } else {
        produkDipilih = data;
    }

    if (!produkDipilih) return;

    document.getElementById("fotoProduk").src = produkDipilih.gambar;
    document.getElementById("namaProduk").innerText = produkDipilih.nama;
    document.getElementById("hargaProduk").innerText = "Rp " + produkDipilih.harga.toLocaleString("id-ID");
    document.getElementById("jumlahPesan").value = 1;
    document.getElementById("namaPemesan").value = "";
    document.getElementById("catatanPesan").value = "";
    
    hitungTotal();
    document.getElementById("modalPesan").style.display = "flex";
}


function tutupModal() {
    document.getElementById("modalPesan").style.display = "none";
}

function hitungTotal() {
    if (!produkDipilih) return;
    let jumlah = parseInt(document.getElementById("jumlahPesan").value) || 1;
    if (jumlah < 1) jumlah = 1;
    
    let total = produkDipilih.harga * jumlah;
    document.getElementById("totalHarga").innerText = "Rp " + total.toLocaleString("id-ID");
}

function kirimWhatsApp() {
    let nama = document.getElementById("namaPemesan").value.trim();
    let jumlah = parseInt(document.getElementById("jumlahPesan").value) || 1;
    let catatan = document.getElementById("catatanPesan").value.trim() || "-";
    
    if (nama === "") {
        alert("Silakan isi nama pemesan terlebih dahulu.");
        return;
    }

    let total = (produkDipilih.harga * jumlah).toLocaleString("id-ID");
    let nomorWA = "6289697318365"; // pentingg
    let pesan = `Halo Klepon Legend, saya mau pesan:\n` +
                `Menu: ${produkDipilih.nama}\n` +
                `Jumlah: ${jumlah} pcs\n` +
                `Total: Rp ${total}\n` +
                `Nama: ${nama}\n` +
                `Catatan: ${catatan}`;

    let url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan);
    window.open(url, "_blank");
}