$(document).ready(function () {
  console.log("Praktikum jQuery Rizqi Starto");

  // 1. Update data profil: Nama, NIM, dan Prodi
  const $pesan = $(".pesan").first();
  const $pesanX = $(".pesanX").first();

  $("#UpdateBut").on("click", function () {
    const $namaInput = $('[name="INnama"]').first();
    const $nimInput = $("#INnim");
    const $prodiInput = $("#PIU");

    const nama = $namaInput.val().trim();
    const nim = $nimInput.val().trim();
    const prodi = $prodiInput.val().trim();

    //Validasi data yang terisi
    if (nama !== "" || nim !== "" || prodi !== "") {
      if (nama !== "") {
        $('[name="NaU"]')
          .first()
          .text("Nama: " + nama);
        $namaInput.val("");
      }

      if (nim !== "") {
        $("#NiU").text("NIM: " + nim);
        $nimInput.val("");
      }

      if (prodi !== "") {
        $("#PU").text("Prodi: " + prodi);
        $prodiInput.val("");
      }

      $pesanX.hide();
      $pesan.show();
      console.log("Berhasil mengubah data!");
    }
    //Validasi data yang tak terisi
    else {
      $pesan.hide();
      $pesanX.show();
      console.log("Tidak ada perubahan");
    }
  });

  // 2. Mengubah tampilan semua elemen .data
  $("#AllBut").on("click", function () {
    $(".data").css({
      backgroundColor: "red",
      color: "white",
      filter: "brightness(2)",
    });

    $("#Judul").css("color", "black");
  });

  // 3. Mengganti foto profil dan menyimpannya
  const $profilePicture = $(".profile_picture");
  const $inputFoto = $("#input_foto");

  const fotoTersimpan = localStorage.getItem("fotoProfil");

  if (fotoTersimpan) {
    $profilePicture.css("background-image", 'url("' + fotoTersimpan + '")');
  }

  $("#edit_profile").on("click", function () {
    $inputFoto.trigger("click");
  });

  $inputFoto.on("change", function () {
    const file = this.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Pilih file gambar, ya!");
      $inputFoto.val("");
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const fotoBaru = reader.result;

      $profilePicture.css("background-image", 'url("' + fotoBaru + '")');

      try {
        localStorage.setItem("fotoProfil", fotoBaru);
        alert("Foto profil berhasil disimpan!");
      } catch (error) {
        alert("Foto gagal disimpan. Coba gunakan gambar yang lebih kecil.");
        console.error(error);
      }
    };

    reader.readAsDataURL(file);
  });

  // 4. Mengubah font dan ukuran semua paragraf
  $("#FontBut").on("click", function () {
    $("p").css({
      fontFamily: "Anton",
      fontSize: "26px",
    });
  });

  // 5. Mengganti tema terang dan gelap
  $("#theme").on("click", function () {
    $("body").toggleClass("dark-mode");

    const darkAktif = $("body").hasClass("dark-mode");

    $(this).text(darkAktif ? "☀️" : "🌙");
  });
});
