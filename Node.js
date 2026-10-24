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
      $pesan.stop(true, true).fadeIn(300);
      console.log("Berhasil mengubah data!");
    }
    //Validasi data yang tak terisi
    else {
      $pesan.hide();
      $pesanX.stop(true, true).fadeIn(300);
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

  // Ambil foto tersimpan dengan aman; localStorage bisa diblokir oleh browser tertentu.
  try {
    const fotoTersimpan = localStorage.getItem("fotoProfil");
    if (fotoTersimpan) {
      $profilePicture.css("background-image", 'url("' + fotoTersimpan + '")');
    }
  } catch (error) {
    console.warn("Foto tersimpan tidak bisa dibaca oleh browser.", error);
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
        alert(
          "Foto berhasil dipasang, tetapi tidak bisa disimpan permanen. Coba gambar yang lebih kecil.",
        );
        console.error(error);
      }

      // Kosongkan input agar file yang sama bisa dipilih lagi nanti.
      $inputFoto.val("");
    };

    reader.onerror = function () {
      alert("Gambar gagal dibaca. Coba pilih file gambar lain.");
      $inputFoto.val("");
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

  // 5. Animasi foto
  $("#AnimasiBut").on("click", function () {
    $profilePicture
      .stop(true, false)
      .animate(
        {
          left: "90px",
          width: "200px",
          height: "200px",
        },
        400,
        "swing",
      )
      .animate(
        {
          left: "0px",
          width: "100px",
          height: "100px",
        },
        400,
        "swing",
      );
  });

  // 6. Mengganti tema terang dan gelap
  $("#theme").on("click", function () {
    $("body").toggleClass("dark-mode");

    const darkAktif = $("body").hasClass("dark-mode");

    $(this).text(darkAktif ? "☀️" : "🌙");
  });
});
