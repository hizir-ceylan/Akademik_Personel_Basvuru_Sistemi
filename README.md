# 🎓 Akademik Personel Başvuru Sistemi

Bu proje, Kocaeli Üniversitesi Bilişim Sistemleri Mühendisliği öğrencileri tarafından, akademik kadro başvuru süreçlerini dijital ortama taşımak amacıyla geliştirilmiştir. Admin ilan ekleyip düzenleyebilir, adaylar başvuru yapabilir, jüri üyeleri değerlendirme yapabilir, yöneticiler kriter belirleyebilir ve yöneticiler sistem işleyişini denetleyebilir. Geliştirilen sistem; hızlı, şeffaf ve güvenli bir başvuru platformu sunmaktadır.

## 👨‍💻 Geliştirici Ekibi

- **Barkın Emre Sayar** - barkinemresayar@gmail.com  
- **Erol Malkoç** - erolmalkoc04@gmail.com  
- **Hızır Ceylan** - hizir5303@gmail.com

> 📚 Proje, 2024-2025 Bahar dönemi TBL331: Yazılım Geliştirme Laboratuvarı II dersi kapsamında gerçekleştirilmiştir.

---

## 🧠 Proje Amacı

Geleneksel olarak fiziksel belgelerle yürütülen akademik başvuru süreci, belge kayıpları, zaman kaybı ve değerlendirme hataları gibi birçok sorun yaratmaktadır. Bu projeyle birlikte;

- Süreçler dijitalleştirilmiş,
- Başvurular çevrim içi hale getirilmiş,
- Jüri değerlendirme süreçleri sadeleştirilmiş,
- Belgeler güvenli şekilde AWS S3 üzerinde saklanmıştır.

---

## 🛠️ Kullanılan Teknolojiler

| Katman            | Teknoloji                            |
|------------------|--------------------------------------|
| **Frontend**     | React.js, React Router v6, Axios     |
| **Backend**      | Node.js, Express.js, RESTful API     |
| **Veritabanı**   | PostgreSQL                           |
| **Kimlik Doğrulama** | JWT (JSON Web Token)             |
| **Dosya Depolama**| AWS S3                              |
| **Bildirim Sistemi** | Firebase Cloud Messaging         |
| **API Entegrasyonu** | e-Devlet / Nüfus Müdürlüğü API   |

---

## 👤 Kullanıcı Rolleri ve Yetkileri

### 1. Aday
- Sisteme kimlik doğrulamayla giriş yapar.
- Akademik ilanlara başvuru yapar.
- Belgeleri PDF formatında yükler.
- Başvuru durumunu takip eder.

### 2. Jüri Üyesi
- Atandığı adayların belgelerini görüntüler.
- Kişisel değerlendirme raporlarını sisteme yükler.
- Nihai kararı belirtir: **Kabul** veya **Red**.

### 3. Yönetici
- Kadro kriterlerini belirler.
- Jüri atamalarını yapar.
- Değerlendirme süreçlerini denetler.

### 4. Admin
- Yeni ilanlar oluşturur.
- İlan bilgilerini düzenler veya siler.
- Sistem kullanıcılarını yönetir.

---

## 📐 Sistem Mimarisi

- **React.js** ile kullanıcı dostu arayüzler tasarlandı.
- **Node.js + Express.js** ile API geliştirmeleri yapıldı.
- **PostgreSQL** ile ilişkisel veritabanı yönetimi sağlandı.
- **JWT** ile rol bazlı kimlik doğrulama yapıldı.
- **AWS S3** ile dosya yükleme ve saklama işlemleri gerçekleştirildi.
- **Firebase** ile anlık kullanıcı bildirimleri gönderildi.

---

## 🗃️ Veritabanı Tabloları (Örnekler)

- `roller`: Aday, jüri, yönetici, admin
- `kullanicilar`: Kullanıcı bilgileri (TC, ad, soyad, rol, e-posta)
- `ilanlar`: Açılan akademik kadro ilanları
- `basvurular`: Aday başvuruları
- `basvuru_belgeleri`: Yüklenen dosyalar ve sistem puanı
- `juri_atamalar`: İlan-jüri eşleştirmeleri
- `juri_raporlari`: Jüri raporları
- `bildirimler`: Sistem içi mesajlar

---

## 🎯 Uygulama Özellikleri

✅ Giriş sistemi (TC Kimlik No, Ad, Soyad, Doğum Yılı ile doğrulama)  
✅ Aday başvuru formu ve dosya yükleme  
✅ Jüri değerlendirme ve rapor yükleme alanı  
✅ Yönetici tarafından jüri atama ve kriter düzenleme  
✅ Admin tarafından ilan ekleme, silme, güncelleme  
✅ AWS S3 entegrasyonu ile güvenli dosya depolama  
✅ Firebase üzerinden bildirim gönderme  
✅ PostgreSQL ile güçlü veri yönetimi

---

## 🖥️ Arayüz Özeti

### 🔹 Aday Paneli
- Giriş ekranı
- İlan listeleme
- Başvuru formu
- Dosya yükleme alanı

### 🔹 Admin Paneli
- İlan oluşturma
- İlan düzenleme/silme
- Başvuru takip

### 🔹 Yönetici Paneli
- Kadro kriter belirleme
- Jüri atama
- Rapor görüntüleme

### 🔹 Jüri Paneli
- Başvuru belgelerini görüntüleme
- Değerlendirme formu
- Rapor yükleme ve karar

---

## ⚙️ Kurulum Talimatları

### Frontend (React.js)

```bash
cd frontend
npm install
npm start
```

### Backend (Node.js + Express)

```bash
cd backend
npm install
npm run dev
```

## 🔍 Kaynakça
- https://www.w3schools.com/postgresql/
- https://react.dev/learn
- https://www.btkakademi.gov.tr/portal/course/react-js-39531
- https://www.w3schools.com/html/html_css.asp
- https://expressjs.com/en/guide/routing.html
- https://docs.aws.amazon.com/s3/
- https://firebase.google.com/docs/cloud-messaging?hl=tr

## 📣 Lisans
Bu proje sadece akademik amaçla geliştirilmiştir. İzinsiz ticari kullanımı yasaktır.
