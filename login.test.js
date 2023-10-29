const assert = require('assert');
const readExcelFile = require('./readExcel.js');

describe('Login', () => {
    const testData = readExcelFile('testdata.xlsx');
    console.log(testData);  // Log the testData to see how it's being read

    it('Should Success Add A New Product', async () => {
        const data = testData[1];  // Assumes the data is at index 1 (2nd row)
        await browser.url('https://kasirdemo.belajarqa.com');
        await browser.pause(1000);
        const emailInput = await $('#email');  // Menambahkan await
        const passwordInput = await $('#password');  // Menambahkan await
        const loginButton = await $('button.chakra-button.css-1n8i4of');  // Merubah selector tombol login
        await emailInput.setValue(data.email);
        await passwordInput.setValue(data.password);
        await browser.pause(1000);  // Menambahkan jeda 2 detik
        
        // Memeriksa apakah tombol login terlihat dan dapat diklik
        const isLoginButtonDisplayed = await loginButton.isDisplayed();
        const isLoginButtonEnabled = await loginButton.isEnabled();
        
        if (isLoginButtonDisplayed && isLoginButtonEnabled) {
            console.log('Tombol login terlihat dan dapat diklik, melakukan klik...');
            await loginButton.click();  // Menambahkan await
            await browser.pause(2000);  // Menambahkan jeda 2 detik setelah mengklik tombol login
            
        // Langkah 1: Klik elemen "produk"
        const produkButton = await browser.$("//div[text()='produk']");
        await browser.waitUntil(
            async () => await produkButton.isDisplayed(),
            {
                timeout: 10000,
                timeoutMsg: 'Tombol produk tidak terlihat dalam waktu 10 detik'
            }
        );
        await produkButton.click();

        // Langkah 2: Klik elemen "tambah"
        const tambahButton = await browser.$('a.chakra-button.css-1piskbq');
        await tambahButton.click();

        // Langkah 3: Masukkan 'KECAP' ke dalam field nama
        const namaInput = await browser.$('#nama');
        await namaInput.setValue('KECAP');

        // Langkah 4: Masukkan 'Makanan' ke dalam field deskripsi
        const deskripsiInput = await browser.$('#deskripsi');
        await deskripsiInput.setValue('Makanan');
        await browser.pause(1000);
        // Langkah 5: Masukkan '2500' ke dalam field harga beli
        const hargaBeliInput = await browser.$('//input[@id="harga beli"]');
        await hargaBeliInput.setValue('3500');
        await browser.pause(1000);
        // Langkah 6: Masukkan '3500' ke dalam field harga jual
        const hargaJualInput = await browser.$('//input[@id="harga jual"]');
        await hargaJualInput.setValue('4500');
        await browser.pause(1000);
        // Langkah 7: Masukkan '10' ke dalam field stok
        const stokInput = await browser.$('#stok');
        await stokInput.setValue('10');
        await browser.pause(2000);
        // Langkah 8: Klik elemen kategori
        const kategoriInput = await browser.$('#kategori');
        await kategoriInput.click();
        await browser.pause(2000);
        // Langkah 9: Pilih kategori 'Umum'
        const umumOption = await browser.$('td.css-u3dlpe');
        await umumOption.click();
        await browser.pause(2000);
        // Langkah 10: Klik tombol simpan
        const simpanButton = await browser.$('button.chakra-button.css-l5lnz6');
        await simpanButton.click();
        await browser.pause(2000);
        // Langkah 11: Verifikasi pop-up keberhasilan
        const successAlert = await browser.$('.chakra-alert.css-3b6enb');  // Menggunakan class CSS untuk memilih elemen
        const isAlertDisplayed = await successAlert.isDisplayed();
        assert(isAlertDisplayed, 'Pop-up keberhasilan tidak muncul');  // Akan melempar error jika pop-up tidak muncul
        
        // Langkah 12: Verifikasi teks dalam pop-up
        const successText = await browser.$('.chakra-alert__title.css-tidvy5');
        const successMessage = await successText.getText();
        assert.strictEqual(successMessage, 'success', 'Pesan keberhasilan tidak sesuai');  // Akan melempar error jika pesan tidak sesuai
        
        }
    });
});