// DATA ARRAY OF OBJECTS
const dataMenu = [
    {
        id: 1,
        nama: "Klepon",
        kategori: "makanan",
        harga: 20000,
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

    listMenu.forEach(item => {
        container.innerHTML += `
      <div class="${item.classCss}">
        <img src="${item.gambar}" alt="${item.nama}">
        <h3>${item.nama}</h3>
        <p>Rp ${item.harga.toLocaleString("id-ID")}</p>
        <button type="button">Pesan</button>
      </div>
    `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    tampilkanMenu(dataMenu);
});
