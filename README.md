# BadwordSensor
## Deskripsi
Program untuk menyensor kata-kata tertentu, kata-kata buruk atau badword akan disensor dengan tanda "*" bintang. Badword dapat ditentukan sendiri oleh pembuat dan program akan menyensor kata tersebut secara otomatis.

## Tampilan
Program ini diterapkan pada sebuah tampilan chat atau perpesanan. Untuk tampilan yang digunakan terlihat seperti dibawah ini:
![Home](https://MAdeRyan.github.com/BadwordSensor/images/home.jpg)

## Cara Menggunakan
Code ini dibuat dengan node.js jadi pastikan perangkat sudah memiliki atau meng-install node.js. 
Setelah install node.js lakukan instalasi nodemon untuk menjalankan server. 
Jika keduanya sudah di install selanjutnya install mongoDB untuk database yang digunakan. 
Jika sudah selesai dengan instalasi sekarang import file badword.json kedalam mongoDB, ini adalah file berisi daftar badword.
Setelah selesai, masuk ke direktori dimana anda menyimpan file program dan jalankan server.js dengan nodemon(lihat gambar dibawah).
![Run](https://MAdeRyan.github.com/BadwordSensor/images/run.jpg)

## Apa saja yang dibutuhkan
Node.js
Npm
Nodemon
MongoDB
