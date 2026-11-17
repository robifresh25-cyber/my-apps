import { HardwareComponentId, LevelNumber, PuzzleSlotId } from '../types/game';

export const ASSET_PATHS = {
  labBackdrop: '/src/assets/images/lab_hero_backdrop_1794922965361.jpg',
  mrHardware: '/src/assets/images/mentor_mr_hardware_1794922951085.jpg',
  cpuChip: '/src/assets/images/hw_cpu_chip_1794922950740.jpg',
  motherboardTop: '/src/assets/images/hw_motherboard_top_1794922950621.jpg',
  vgaGpu: '/src/assets/images/hw_vga_gpu_1794922952976.jpg',
} as const;

export interface LevelMeta {
  level: LevelNumber;
  title: string;
  shortTitle: string;
  goalLabel: string;
  mrHardwareIntro: string;
}

export const LEVEL_METADATA: Record<LevelNumber, LevelMeta> = {
  1: {
    level: 1,
    title: 'Misi Mengenal Hardware',
    shortTitle: 'Kenal Hardware',
    goalLabel: 'Kumpulkan 100 poin pengenalan',
    mrHardwareIntro:
      'Selamat datang di laboratorium! Cocokkan gambar komponen berikut dengan nama perangkat keras yang tepat.',
  },
  2: {
    level: 2,
    title: 'Tebak Fungsi Komponen',
    shortTitle: 'Fungsi Komponen',
    goalLabel: 'Jawab benar minimal 8 dari 10 soal',
    mrHardwareIntro:
      'Bagus! Sekarang buktikan kalian paham tugas setiap komponen di dalam sistem komputer.',
  },
  3: {
    level: 3,
    title: 'Puzzle Pasang Komponen',
    shortTitle: 'Puzzle Motherboard',
    goalLabel: 'Pasang 4 komponen ke slot tepat',
    mrHardwareIntro:
      'Pilih komponen dari baki lalu klik slot yang tepat pada motherboard. Perhatikan urutan CPU sebelum kipas!',
  },
  4: {
    level: 4,
    title: 'Rakit Komputer',
    shortTitle: 'Rakit PC',
    goalLabel: 'Selesaikan 6 tahap perakitan PC',
    mrHardwareIntro:
      'Di meja ada casing PC kosong. Rakit dari motherboard sampai pengkabelan dengan komponen yang saling kompatibel!',
  },
  5: {
    level: 5,
    title: 'Detektif Kerusakan Komputer',
    shortTitle: 'Troubleshooting',
    goalLabel: 'Selesaikan 4 kasus diagnosa PC',
    mrHardwareIntro:
      'PC sudah dirakit, tapi muncul masalah! Analisis penyebab utama dan pilih langkah pemeriksaan yang akurat.',
  },
  6: {
    level: 6,
    title: 'Final Boss: Master Teknisi',
    shortTitle: 'Ujian Master',
    goalLabel: 'Lulus 15 soal ujian (min. 12 benar)',
    mrHardwareIntro:
      'Ujian akhir Laboratorium TKJ! Jawab 15 soal campuran untuk meraih gelar MASTER TEKNISI TKJ.',
  },
};

export interface Level1ComponentInfo {
  id: HardwareComponentId;
  name: string;
  fullName: string;
  clue: string;
  specTag: string;
}

export const LEVEL1_COMPONENTS: Level1ComponentInfo[] = [
  {
    id: 'cpu',
    name: 'CPU',
    fullName: 'Central Processing Unit (Prosesor)',
    clue: 'Keping persegi dengan pelat pendingin logam dan pin kontak emas di bagian bawah sebagai otak komputer.',
    specTag: 'Otak Komputasi · Socket LGA / AM',
  },
  {
    id: 'ram',
    name: 'RAM',
    fullName: 'Random Access Memory',
    clue: 'Modul papan sirkuit memanjang dengan chip memori dan takik pengunci di deretan pin emasnya.',
    specTag: 'Memori Sementara · Slot DIMM',
  },
  {
    id: 'motherboard',
    name: 'Motherboard',
    fullName: 'Mainboard / Papan Induk',
    clue: 'Papan sirkuit utama terbesar yang memiliki socket prosesor, slot DIMM, PCIe, serta konektor daya.',
    specTag: 'Papan Sirkuit Utama · Form Factor ATX',
  },
  {
    id: 'hdd',
    name: 'HDD',
    fullName: 'Hard Disk Drive',
    clue: 'Media penyimpanan berukuran 3,5 inci yang menggunakan piringan cakram magnetik dan lengan baca mekanis.',
    specTag: 'Penyimpanan Magnetik · Antarmuka SATA',
  },
  {
    id: 'ssd',
    name: 'SSD',
    fullName: 'Solid State Drive',
    clue: 'Media penyimpanan berbasis chip memori flash NAND tanpa komponen bergerak, tersedia tipe SATA maupun M.2 NVMe.',
    specTag: 'Penyimpanan Flash Cepat · M.2 / SATA',
  },
  {
    id: 'psu',
    name: 'PSU',
    fullName: 'Power Supply Unit',
    clue: 'Kotak logam dengan kipas pembuang panas dan bundel kabel 24-pin serta 8-pin untuk mengalirkan arus listrik DC.',
    specTag: 'Penyuplai Daya DC · 24-Pin ATX',
  },
  {
    id: 'vga',
    name: 'VGA',
    fullName: 'Video Graphics Array / GPU Card',
    clue: 'Kartu ekspansi dengan dua kipas pendingin, heatsink tembaga, dan port HDMI/DisplayPort untuk mengolah grafis.',
    specTag: 'Pengolah Grafis · Slot PCIe x16',
  },
];

export interface QuizQuestion {
  id: string;
  topic: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export const LEVEL2_QUESTIONS: QuizQuestion[] = [
  {
    id: 'l2_ram_1',
    topic: 'Fungsi RAM',
    prompt: 'Apa fungsi utama RAM (Random Access Memory) pada komputer?',
    options: [
      'Menyimpan data dan program sementara yang sedang aktif diproses CPU',
      'Menyimpan sistem operasi secara permanen meski listrik dimatikan',
      'Mengubah arus listrik AC menjadi arus DC bertegangan rendah',
      'Menampilkan gambar beresolusi tinggi langsung ke monitor',
    ],
    correctIndex: 0,
    explanation:
      'RAM bersifat volatile: menyimpan instruksi dan data aplikasi yang sedang berjalan agar dapat diakses sangat cepat oleh CPU.',
  },
  {
    id: 'l2_mobo_1',
    topic: 'Fungsi Motherboard',
    prompt: 'Apa peran utama motherboard di dalam sebuah unit sistem komputer?',
    options: [
      'Menjadi papan sirkuit utama yang menghubungkan CPU, RAM, storage, dan kartu ekspansi',
      'Mendinginkan suhu ruang casing saat komputer bekerja berat',
      'Menyediakan cadangan baterai listrik saat PLN padam',
      'Mengompresi ukuran file video di dalam hard disk',
    ],
    correctIndex: 0,
    explanation:
      'Motherboard menjadi tulang punggung komunikasi data dan distribusi daya antar seluruh komponen internal komputer.',
  },
  {
    id: 'l2_psu_1',
    topic: 'Fungsi Power Supply',
    prompt: 'Apa fungsi Power Supply Unit (PSU) dalam merakit PC?',
    options: [
      'Mengubah listrik AC dari stopkontak menjadi tegangan DC stabil (+12V, +5V, +3.3V) bagi komponen PC',
      'Mempercepat transfer data antara SSD NVMe dan slot RAM',
      'Menyimpan konfigurasi BIOS dan jam sistem komputer',
      'Menghubungkan komputer ke jaringan kabel LAN lokal',
    ],
    correctIndex: 0,
    explanation:
      'PSU mengonversi arus bolak-balik (AC) menjadi arus searah (DC) dengan regulasi tegangan yang aman untuk setiap komponen.',
  },
  {
    id: 'l2_hdd_ssd_1',
    topic: 'Perbedaan HDD & SSD',
    prompt: 'Manakah perbedaan paling mendasar antara HDD dan SSD?',
    options: [
      'HDD memakai piringan magnetik berputar, sedangkan SSD memakai chip flash NAND tanpa bagian bergerak',
      'HDD hanya bisa menyimpan dokumen teks, sedangkan SSD khusus menyimpan file audio',
      'HDD dipasang pada slot DIMM RAM, sedangkan SSD dipasang pada socket CPU',
      'HDD bekerja lebih cepat daripada SSD dalam proses booting sistem operasi',
    ],
    correctIndex: 0,
    explanation:
      'Karena tanpa komponen mekanis berputar, SSD membaca dan menulis data jauh lebih cepat serta lebih tahan guncangan dibanding HDD.',
  },
  {
    id: 'l2_hdd_ssd_2',
    topic: 'Perbedaan HDD & SSD',
    prompt: 'Jika laboratorium ingin mempercepat waktu booting Windows dan membuka aplikasi secara instan, komponen mana yang paling tepat di-upgrade?',
    options: [
      'Mengganti drive sistem dari HDD ke SSD NVMe atau SATA',
      'Menambah kabel power SATA tambahan tanpa mengganti drive',
      'Mengganti casing komputer menjadi ukuran lebih besar',
      'Menurunkan kecepatan putaran kipas casing',
    ],
    correctIndex: 0,
    explanation:
      'SSD memiliki kecepatan baca/tulis acak jauh melampaui HDD mekanis sehingga booting dan loading program melonjak drastis.',
  },
  {
    id: 'l2_cpu_1',
    topic: 'Fungsi CPU',
    prompt: 'Komponen mana yang bertugas mengeksekusi instruksi logika, aritmatika, dan mengendalikan alur kerja program?',
    options: [
      'CPU (Central Processing Unit)',
      'PSU (Power Supply Unit)',
      'Optical Drive',
      'CMOS Battery',
    ],
    correctIndex: 0,
    explanation:
      'CPU adalah unit pemroses utama (otak komputer) yang menjalankan siklus fetch-decode-execute untuk setiap instruksi.',
  },
  {
    id: 'l2_vga_1',
    topic: 'Fungsi VGA',
    prompt: 'Apa tugas spesifik kartu grafis (VGA / GPU) dalam sistem komputer?',
    options: [
      'Merender grafis 2D/3D, video, dan mengirim sinyal gambar ke monitor',
      'Menyimpan seluruh berkas sistem operasi secara permanen',
      'Mengatur kecepatan putaran cakram magnetik pada hard disk',
      'Menstabilkan frekuensi listrik rumah sebelum masuk ke PSU',
    ],
    correctIndex: 0,
    explanation:
      'GPU memproses perhitungan grafis paralel agar tampilan visual, desain CAD, maupun animasi berjalan mulus.',
  },
  {
    id: 'l2_cooler_1',
    topic: 'Fungsi Pendingin',
    prompt: 'Mengapa prosesor wajib dipasangi heatsink dan kipas pendingin (CPU Cooler) dengan pasta termal?',
    options: [
      'Menyerap dan membuang panas berlebih agar CPU tidak mengalami overheat atau thermal throttling',
      'Menambah kapasitas penyimpanan sementara seperti RAM',
      'Menghubungkan jalur data dari CPU menuju port USB belakang',
      'Mengubah sinyal digital monitor menjadi sinyal analog',
    ],
    correctIndex: 0,
    explanation:
      'Thermal paste mengisi celah mikroskopis antara IHS CPU dan heatsink sehingga perpindahan panas ke kipas pendingin optimal.',
  },
  {
    id: 'l2_cmos_1',
    topic: 'Fungsi Motherboard',
    prompt: 'Baterai koin (CMOS Battery CR2032) pada motherboard berfungsi untuk...',
    options: [
      'Menjaga pengaturan BIOS/UEFI dan jam sistem tetap tersimpan saat PC mati',
      'Menyalakan monitor ketika listrik PLN padam',
      'Memberikan daya utama untuk kartu grafis saat bermain game',
      'Mendinginkan chipset southbridge motherboard',
    ],
    correctIndex: 0,
    explanation:
      'CMOS menyimpan konfigurasi tanggal, waktu, dan urutan booting dengan daya kecil dari baterai koin pada motherboard.',
  },
  {
    id: 'l2_ram_2',
    topic: 'Fungsi RAM',
    prompt: 'Apa yang terjadi pada data yang belum disimpan di RAM ketika aliran listrik komputer tiba-tiba terputus?',
    options: [
      'Data di dalam RAM akan hilang karena sifat memori RAM adalah volatile',
      'Data otomatis dipindahkan ke kipas pendingin CPU',
      'Data tersimpan selamanya di dalam kabel 24-pin ATX',
      'RAM mengunci diri dan tidak dapat dipakai lagi',
    ],
    correctIndex: 0,
    explanation:
      'RAM membutuhkan aliran daya terus-menerus untuk mempertahankan data; berbeda dengan SSD/HDD yang bersifat non-volatile.',
  },
  {
    id: 'l2_psu_2',
    topic: 'Fungsi Power Supply',
    prompt: 'Konektor kabel PSU mana yang bertugas menyuplai daya utama ke seluruh papan motherboard?',
    options: [
      'Konektor 24-pin ATX Main Power',
      'Kabel HDMI 2.1',
      'Kabel UTP RJ-45',
      'Konektor Audio Jack 3.5mm',
    ],
    correctIndex: 0,
    explanation:
      'Konektor 24-pin ATX adalah jalur utama penyalur tegangan +3.3V, +5V, dan +12V ke motherboard.',
  },
  {
    id: 'l2_hdd_ssd_3',
    topic: 'Perbedaan HDD & SSD',
    prompt: 'Untuk arsip data besar (video dokumentasi & backup) dengan biaya per gigabyte lebih ekonomis, media mana yang paling efisien?',
    options: [
      'HDD berkapasitas besar (misalnya 2 TB ke atas)',
      'RAM DDR5 16 GB',
      'Cache L1 di dalam prosesor',
      'Thermal Paste',
    ],
    correctIndex: 0,
    explanation:
      'Kombinasi populer di lab TKJ adalah SSD untuk sistem operasi dan HDD berkapasitas besar untuk arsip jangka panjang.',
  },
  {
    id: 'l2_ram_3',
    topic: 'Fungsi RAM',
    prompt: 'Mengapa komputer dengan kapasitas RAM terlalu kecil sering terasa tersendat saat membuka banyak tab browser dan aplikasi sekaligus?',
    options: [
      'Kapasitas RAM penuh sehingga sistem terpaksa memindahkan data sementara ke storage (pagefile) yang jauh lebih lambat',
      'Power Supply otomatis menurunkan tegangan ke monitor',
      'Motherboard mematikan port USB secara otomatis',
      'Kipas pendingin berhenti berputar ketika tab bertambah',
    ],
    correctIndex: 0,
    explanation:
      'Saat RAM penuh, sistem melakukan swapping ke disk yang kecepatannya jauh di bawah kecepatan akses RAM.',
  },
  {
    id: 'l2_mobo_2',
    topic: 'Fungsi Motherboard',
    prompt: 'Jalur konduktor tembaga pada papan motherboard yang menghubungkan komunikasi antara CPU, RAM, dan komponen lain disebut...',
    options: [
      'Bus sistem / jalur trace PCB',
      'Kabel daya AC PLN',
      'Piringan cakram magnetik',
      'Heatsink aluminium',
    ],
    correctIndex: 0,
    explanation:
      'Jalur bus pada PCB motherboard menyalurkan sinyal data, alamat memori, dan kendali antar perangkat keras.',
  },
  {
    id: 'l2_psu_3',
    topic: 'Fungsi Power Supply',
    prompt: 'Apa arti label efisiensi "80 PLUS" pada sebuah Power Supply Unit (PSU)?',
    options: [
      'Menunjukkan PSU memiliki efisiensi konversi daya minimal 80% sehingga lebih hemat listrik dan tidak mudah panas',
      'Menunjukkan PSU mampu bekerja hingga suhu 80 derajat tanpa kipas',
      'Menandakan PSU memiliki 80 buah kabel SATA',
      'Menandakan PSU hanya cocok untuk monitor 80 inci',
    ],
    correctIndex: 0,
    explanation:
      'Sertifikasi 80 PLUS menjamin efisiensi konversi daya AC ke DC tinggi serta meminimalkan energi yang terbuang sebagai panas.',
  },
  {
    id: 'l2_hdd_ssd_4',
    topic: 'Perbedaan HDD & SSD',
    prompt: 'Mengapa laptop yang terjatuh ringan saat menyala lebih berisiko merusak HDD dibandingkan SSD?',
    options: [
      'Karena HDD memiliki lengan baca dan piringan mekanis yang berputar sangat rapat sehingga rentan tergores benturan',
      'Karena SSD terbuat dari cairan pendingin',
      'Karena HDD tidak memakai sekrup pengunci',
      'Karena SSD selalu terpasang di luar casing',
    ],
    correctIndex: 0,
    explanation:
      'Head baca/tulis HDD melayang hanya beberapa nanometer di atas cakram berputar, sedangkan SSD sepenuhnya solid-state tanpa bagian bergerak.',
  },
  {
    id: 'l2_cpu_2',
    topic: 'Fungsi CPU',
    prompt: 'Dalam spesifikasi CPU, istilah "Core" dan "Clock Speed (GHz)" menggambarkan...',
    options: [
      'Jumlah unit pemroses independen di dalam CPU dan kecepatan siklus instruksi per detik',
      'Kapasitas penyimpanan foto di dalam hard disk',
      'Jumlah port HDMI pada kartu grafis',
      'Ukuran fisik kipas pada Power Supply',
    ],
    correctIndex: 0,
    explanation:
      'Semakin banyak core memungkinkan pemrosesan paralel lebih baik, sementara clock speed menentukan seberapa cepat tiap siklus dijalankan.',
  },
  {
    id: 'l2_vga_2',
    topic: 'Fungsi VGA',
    prompt: 'Mengapa kartu grafis (VGA) kelas menengah ke atas memiliki memori tersendiri bernama VRAM (Video RAM)?',
    options: [
      'Untuk menyimpan tekstur, frame buffer, dan data visual agar GPU dapat merender gambar dengan sangat cepat',
      'Untuk menyimpan sistem operasi Windows secara permanen',
      'Untuk menggantikan baterai CMOS pada motherboard',
      'Untuk mengalirkan arus listrik dari stopkontak dinding',
    ],
    correctIndex: 0,
    explanation:
      'VRAM berkecepatan tinggi berada tepat di sekitar chip GPU sehingga akses data grafis tidak perlu antre melalui RAM utama.',
  },
  {
    id: 'l2_mobo_3',
    topic: 'Fungsi Motherboard',
    prompt: 'Komponen kecil pada motherboard yang menyimpan firmware awal untuk menguji perangkat keras dan memulai booting sistem operasi adalah...',
    options: [
      'Chip BIOS / UEFI',
      'Kipas Casing 120mm',
      'Kabel Front Panel LED',
      'Slot SATA Power',
    ],
    correctIndex: 0,
    explanation:
      'Chip BIOS/UEFI menjalankan proses inisialisasi hardware (POST) dan menyerahkan kendali ke bootloader sistem operasi.',
  },
  {
    id: 'l2_psu_4',
    topic: 'Fungsi Power Supply',
    prompt: 'Mengapa teknisi komputer sangat melarang penggunaan PSU murahan dengan daya tidak stabil pada rakitan PC laboratorium?',
    options: [
      'Lonjakan atau drop tegangan DC dari PSU buruk dapat merusak motherboard, CPU, dan media penyimpanan',
      'PSU murahan membuat warna layar monitor berubah hitam putih',
      'PSU murahan menghapus nama pengguna di sistem operasi',
      'PSU murahan memperlambat kecepatan ketik keyboard',
    ],
    correctIndex: 0,
    explanation:
      'Power supply adalah penjaga kualitas arus seluruh sistem; regulasi voltase yang buruk berisiko merusak komponen mahal.',
  },
];

export interface Level3SlotTarget {
  id: PuzzleSlotId;
  componentName: string;
  slotTitle: string;
  instruction: string;
  // Percentage coordinates on the 4:3 motherboard visual
  xPercent: number;
  yPercent: number;
  wPercent: number;
  hPercent: number;
  requiresCpuFirst?: boolean;
}

export const LEVEL3_SLOTS: Level3SlotTarget[] = [
  {
    id: 'cpu',
    componentName: 'Prosesor (CPU)',
    slotTitle: 'Socket CPU LGA',
    instruction: 'Pasang prosesor ke socket logam utama di tengah atas motherboard.',
    xPercent: 48,
    yPercent: 21,
    wPercent: 17,
    hPercent: 22,
  },
  {
    id: 'ram',
    componentName: 'Modul RAM',
    slotTitle: 'Slot DIMM Memori',
    instruction: 'Pasang keping RAM pada deretan slot DIMM vertikal di sisi kanan socket CPU.',
    xPercent: 69,
    yPercent: 18,
    wPercent: 14,
    hPercent: 39,
  },
  {
    id: 'ssd',
    componentName: 'SSD M.2 NVMe',
    slotTitle: 'Slot M.2 Storage',
    instruction: 'Pasang SSD M.2 di slot horizontal tepat di bawah area socket prosesor.',
    xPercent: 39,
    yPercent: 48,
    wPercent: 23,
    hPercent: 9,
  },
  {
    id: 'cooler',
    componentName: 'Kipas Pendingin (Cooler)',
    slotTitle: 'Dudukan Heatsink CPU',
    instruction: 'Pasang kipas pendingin tepat di atas prosesor setelah CPU terpasang.',
    xPercent: 46,
    yPercent: 19,
    wPercent: 21,
    hPercent: 26,
    requiresCpuFirst: true,
  },
];

export interface Level4StepOption {
  id: string;
  label: string;
  detail: string;
  isValidFor: (moboPlatform: 'LGA1700_DDR5' | 'AM4_DDR4' | null) => boolean;
  reasonIfWrong: string;
  setsPlatform?: 'LGA1700_DDR5' | 'AM4_DDR4';
}

export interface Level4StepSpec {
  stepIndex: number;
  title: string;
  prompt: string;
  options: Level4StepOption[];
}

export const LEVEL4_STEPS: Level4StepSpec[] = [
  {
    stepIndex: 0,
    title: 'Langkah 1 · Pilih Motherboard',
    prompt: 'Casing lab mendukung form factor ATX & Micro-ATX. Pilih motherboard yang siap digunakan untuk rakitan standar lab:',
    options: [
      {
        id: 'mobo_b760',
        label: 'Motherboard ATX B760 (Socket LGA 1700 · DDR5)',
        detail: 'Mendukung prosesor Intel Gen 12–14 dan memori DDR5 berkecepatan tinggi.',
        isValidFor: () => true,
        reasonIfWrong: '',
        setsPlatform: 'LGA1700_DDR5',
      },
      {
        id: 'mobo_a520',
        label: 'Motherboard Micro-ATX A520 (Socket AM4 · DDR4)',
        detail: 'Mendukung prosesor AMD Ryzen AM4 dan memori DDR4 hemat biaya.',
        isValidFor: () => true,
        reasonIfWrong: '',
        setsPlatform: 'AM4_DDR4',
      },
      {
        id: 'mobo_laptop',
        label: 'Mainboard Smartphone / Tablet Mini PCB',
        detail: 'Papan sirkuit terintegrasi non-ATX untuk perangkat genggam.',
        isValidFor: () => false,
        reasonIfWrong: 'Mainboard ponsel tidak memiliki dudukan standar ATX/Micro-ATX untuk casing desktop!',
      },
    ],
  },
  {
    stepIndex: 1,
    title: 'Langkah 2 · Pilih Prosesor Kompatibel',
    prompt: 'Pilih CPU yang socket-nya cocok dengan motherboard yang baru saja dipasang:',
    options: [
      {
        id: 'cpu_intel',
        label: 'Intel Core i5-13400 (Socket LGA 1700)',
        detail: '10 Core · Socket LGA 1700 untuk papan B760.',
        isValidFor: (p) => p === 'LGA1700_DDR5',
        reasonIfWrong: 'Tidak cocok! Motherboard yang terpasang memakai socket AM4, bukan LGA 1700.',
      },
      {
        id: 'cpu_amd',
        label: 'AMD Ryzen 5 5600 (Socket AM4)',
        detail: '6 Core · Socket AM4 untuk papan A520.',
        isValidFor: (p) => p === 'AM4_DDR4',
        reasonIfWrong: 'Tidak cocok! Motherboard yang terpasang memakai socket LGA 1700, bukan AM4.',
      },
      {
        id: 'cpu_old',
        label: 'Prosesor Lawas Socket LGA 775',
        detail: 'Prosesor generasi lama dengan jumlah pin 775.',
        isValidFor: () => false,
        reasonIfWrong: 'Socket LGA 775 sudah usang dan pin fisiknya tidak cocok dengan motherboard modern di casing!',
      },
    ],
  },
  {
    stepIndex: 2,
    title: 'Langkah 3 · Pasang RAM Sesuai',
    prompt: 'Periksa dukungan slot memori motherboard kalian lalu pasang keping RAM yang tepat:',
    options: [
      {
        id: 'ram_ddr5',
        label: '16 GB DDR5-5600 UDIMM Desktop',
        detail: 'Modul memori DDR5 288-pin untuk motherboard B760.',
        isValidFor: (p) => p === 'LGA1700_DDR5',
        reasonIfWrong: 'Takik pin DDR5 berbeda dengan slot DDR4 pada motherboard AM4 kalian!',
      },
      {
        id: 'ram_ddr4',
        label: '16 GB DDR4-3200 UDIMM Desktop',
        detail: 'Modul memori DDR4 288-pin untuk motherboard A520.',
        isValidFor: (p) => p === 'AM4_DDR4',
        reasonIfWrong: 'Takik pin DDR4 tidak dapat masuk ke slot DDR5 pada motherboard B760 kalian!',
      },
      {
        id: 'ram_sodimm',
        label: '8 GB DDR4 SO-DIMM Laptop',
        detail: 'Keping memori pendek khusus komputer jinjing (laptop).',
        isValidFor: () => false,
        reasonIfWrong: 'SO-DIMM berukuran pendek untuk laptop, tidak muat di slot UDIMM desktop!',
      },
    ],
  },
  {
    stepIndex: 3,
    title: 'Langkah 4 · Pilih Media Penyimpanan',
    prompt: 'Pilih media penyimpanan yang tepat untuk memasang sistem operasi laboratorium dengan cepat:',
    options: [
      {
        id: 'storage_nvme',
        label: 'SSD M.2 NVMe 512 GB PCIe',
        detail: 'Kecepatan baca tinggi hingga 3.500 MB/s, langsung dipasang di slot M.2 motherboard.',
        isValidFor: () => true,
        reasonIfWrong: '',
      },
      {
        id: 'storage_sata',
        label: 'SSD SATA 2.5 inci 512 GB',
        detail: 'Penyimpanan solid-state andal melalui kabel data SATA & power SATA.',
        isValidFor: () => true,
        reasonIfWrong: '',
      },
      {
        id: 'storage_sd',
        label: 'Kartu MicroSD Kamera 32 GB',
        detail: 'Kartu memori eksternal lambat untuk kamera atau ponsel.',
        isValidFor: () => false,
        reasonIfWrong: 'Kartu MicroSD terlalu lambat dan tidak memiliki antarmuka internal motherboard untuk OS utama PC.',
      },
    ],
  },
  {
    stepIndex: 4,
    title: 'Langkah 5 · Pasang Power Supply (PSU)',
    prompt: 'Pilih unit PSU dengan daya dan sertifikasi efisiensi yang aman untuk seluruh komponen rakitan:',
    options: [
      {
        id: 'psu_550',
        label: 'PSU 550W 80+ Bronze (ATX)',
        detail: 'Daya stabil, proteksi OVP/SCP lengkap, dan kabel 24-pin + 8-pin EPS tersedia.',
        isValidFor: () => true,
        reasonIfWrong: '',
      },
      {
        id: 'psu_200',
        label: 'Adaptor Tanpa Label 150W Bekas',
        detail: 'Tegangan tidak terkalibrasi dan tidak memiliki konektor 8-pin CPU.',
        isValidFor: () => false,
        reasonIfWrong: 'Daya 150W tanpa konektor 8-pin CPU berisiko merusak motherboard dan membuat PC gagal menyala!',
      },
      {
        id: 'psu_usb',
        label: 'Charger Ponsel 20W USB-C',
        detail: 'Hanya mengeluarkan 5V/9V untuk mengisi daya perangkat portabel.',
        isValidFor: () => false,
        reasonIfWrong: 'Charger ponsel tidak dapat menyuplai rail +12V, +5V, dan +3.3V untuk komputer desktop!',
      },
    ],
  },
];

export interface CableWiringPair {
  id: string;
  cableLabel: string;
  targetPort: string;
  description: string;
}

export const LEVEL4_CABLES: CableWiringPair[] = [
  {
    id: 'cable_24pin',
    cableLabel: 'Kabel 24-Pin ATX',
    targetPort: 'Header Daya Utama Motherboard',
    description: 'Menyuplai daya utama ke seluruh sirkuit motherboard.',
  },
  {
    id: 'cable_8pin',
    cableLabel: 'Kabel 8-Pin EPS (4+4)',
    targetPort: 'Header Daya CPU (Pojok Atas)',
    description: 'Menyalurkan daya +12V khusus untuk VRM prosesor.',
  },
  {
    id: 'cable_sata_pcie',
    cableLabel: 'Kabel Power SATA / PCIe',
    targetPort: 'Drive Storage & Kartu Grafis',
    description: 'Memberi arus listrik ke perangkat penyimpanan & ekspansi.',
  },
];

export interface Level5FaultCase {
  id: string;
  title: string;
  symptom: string;
  indicatorText: string;
  hasBeepAudio?: boolean;
  causePrompt: string;
  causeOptions: [string, string, string];
  correctCauseIndex: number;
  actionPrompt: string;
  actionOptions: [string, string, string];
  correctActionIndex: number;
  summary: string;
}

export const LEVEL5_CASES: Level5FaultCase[] = [
  {
    id: 'fault_dead',
    title: 'Kasus 1 · Komputer Mati Total',
    symptom:
      'Tombol power sudah ditekan, namun lampu indikator casing tidak menyala dan kipas PSU maupun CPU diam sama sekali.',
    indicatorText: 'LED Daya: MATI · Kipas: 0 RPM · Layar: Gelap',
    causePrompt: 'Analisis Detektif: Apa kemungkinan penyebab utama kondisi mati total ini?',
    causeOptions: [
      'Aliran listrik ke motherboard terputus (saklar PSU OFF, kabel power longgar, atau 24-pin ATX belum terpasang sempurna)',
      'Resolusi layar monitor diatur terlalu tinggi di Windows',
      'Kapasitas HDD atau SSD hampir penuh',
    ],
    correctCauseIndex: 0,
    actionPrompt: 'Langkah Pemeriksaan: Tindakan teknisi apa yang harus dilakukan pertama kali?',
    actionOptions: [
      'Pastikan kabel AC tercolok kuat, ubah saklar PSU ke posisi ON (I), lalu cek sambungan 24-pin ATX & kabel Front Panel PWR_SW',
      'Menginstal ulang driver kartu suara',
      'Mengganti mouse dengan mouse nirkabel',
    ],
    correctActionIndex: 0,
    summary:
      'Saklar PSU berada di posisi OFF dan konektor 24-pin ATX agak renggang. Setelah dikencangkan, daya langsung mengalir!',
  },
  {
    id: 'fault_nodisplay',
    title: 'Kasus 2 · Menyala Tetapi Tidak Tampil Gambar',
    symptom:
      'Kipas CPU dan lampu power berputar normal, tetapi monitor menampilkan pesan "No Signal" dan layar tetap hitam.',
    indicatorText: 'LED Daya: MENYALA · Kipas: Berputar · Monitor: No Signal',
    causePrompt: 'Analisis Detektif: Apa kemungkinan penyebab komputer menyala namun tidak tampil gambar?',
    causeOptions: [
      'Modul RAM belum terpasang rapat/pin kotor, atau kabel video monitor tertancap di port yang salah/longgar',
      'File dokumen di desktop terlalu banyak',
      'Keyboard belum dicolokkan ke port USB',
    ],
    correctCauseIndex: 0,
    actionPrompt: 'Langkah Pemeriksaan: Bagaimana langkah pemeriksaan paling efektif untuk kasus No Display?',
    actionOptions: [
      'Matikan PC, lepas dan bersihkan pin kuning RAM lalu pasang ulang hingga berbunyi klik, serta pastikan kabel HDMI/DisplayPort terhubung ke port GPU yang aktif',
      'Menghapus seluruh partisi hard disk',
      'Menambah kipas casing tambahan di bagian atas',
    ],
    correctActionIndex: 0,
    summary:
      'Salah satu modul RAM kurang menekan ke pengunci DIMM dan kabel HDMI longgar. Setelah reseating RAM, gambar langsung tampil!',
  },
  {
    id: 'fault_beep',
    title: 'Kasus 3 · Komputer Berbunyi Beep Berulang',
    symptom:
      'Saat dinyalakan, speaker internal motherboard mengeluarkan bunyi beep berulang ("Beep-Beep-Beep") dan proses booting berhenti.',
    indicatorText: 'Speaker BIOS: 3x Beep Berulang · POST Gagal',
    hasBeepAudio: true,
    causePrompt: 'Analisis Detektif: Apa arti kode bunyi beep saat proses POST (Power-On Self-Test)?',
    causeOptions: [
      'BIOS mendeteksi kegagalan perangkat keras krusial saat POST, paling sering RAM atau VGA tidak terbaca',
      'Sistem operasi meminta pembaruan wallpaper desktop',
      'Kabel LAN internet belum tersambung ke router',
    ],
    correctCauseIndex: 0,
    actionPrompt: 'Langkah Pemeriksaan: Apa prosedur penanganan yang tepat?',
    actionOptions: [
      'Identifikasi pola bunyi beep sesuai manual BIOS motherboard, lalu periksa & pasang ulang (reseat) modul RAM atau kartu VGA pada slotnya',
      'Memutus speaker buzzer dengan gunting agar tidak berisik',
      'Mengganti kabel power monitor dengan ukuran lebih panjang',
    ],
    correctActionIndex: 0,
    summary:
      'Bunyi beep menandakan memori gagal dideteksi saat POST. Setelah slot DIMM dibersihkan dan RAM dipasang ulang, POST sukses!',
  },
  {
    id: 'fault_slow',
    title: 'Kasus 4 · Komputer Terasa Sangat Lambat',
    symptom:
      'Komputer berhasil masuk ke sistem operasi, tetapi proses booting memakan waktu 4 menit, aplikasi tersendat, dan kipas CPU meraung kencang.',
    indicatorText: 'Boot: 240 detik · Suhu CPU: 94°C · Disk Usage: 100%',
    causePrompt: 'Analisis Detektif: Faktor mana yang paling logis menyebabkan PC sangat lambat dan panas?',
    causeOptions: [
      'CPU mengalami thermal throttling akibat heatsink kotor/pasta termal kering, atau sistem masih memakai HDD penuh dengan RAM terlalu kecil',
      'Warna casing komputer terlalu gelap sehingga menyerap cahaya',
      'Monitor menggunakan refresh rate 60 Hz',
    ],
    correctCauseIndex: 0,
    actionPrompt: 'Langkah Pemeriksaan: Tindakan perbaikan menyeluruh mana yang menyelesaikan bottleneck ini?',
    actionOptions: [
      'Bersihkan debu heatsink & ganti pasta termal CPU, cek kesehatan/kapasitas disk (upgrade OS ke SSD), serta cek penggunaan RAM di Task Manager',
      'Mengganti tombol power di bagian depan casing',
      'Mengubah zona waktu sistem operasi',
    ],
    correctActionIndex: 0,
    summary:
      'Pasta termal yang kering sudah diganti dan sistem dipindahkan dari HDD bermasalah ke SSD. Suhu turun ke 48°C dan booting hanya 12 detik!',
  },
];

export const LEVEL6_FINAL_QUESTIONS: QuizQuestion[] = [
  {
    id: 'boss_1',
    topic: 'Identifikasi Komponen',
    prompt: 'Slot panjang di motherboard yang memiliki pengunci di kedua ujung untuk memasang kartu grafis (VGA) adalah...',
    options: ['Slot PCIe x16', 'Slot DIMM', 'Socket LGA', 'Port RJ-45'],
    correctIndex: 0,
    explanation: 'Kartu grafis diskrit modern selalu terpasang pada slot PCI Express x16.',
  },
  {
    id: 'boss_2',
    topic: 'Fungsi Komponen',
    prompt: 'Mengapa cache L1/L2/L3 berada langsung di dalam keping prosesor (CPU)?',
    options: [
      'Menyediakan memori ultra-cepat bagi core CPU untuk data yang paling sering diakses',
      'Menggantikan fungsi Power Supply Unit saat PC dimatikan',
      'Menyimpan file installer sistem operasi sebesar 50 GB',
      'Mengubah sinyal HDMI menjadi VGA analog',
    ],
    correctIndex: 0,
    explanation: 'Cache CPU memiliki latensi jauh lebih rendah daripada RAM utama sehingga mempercepat eksekusi instruksi.',
  },
  {
    id: 'boss_3',
    topic: 'Kompatibilitas Hardware',
    prompt: 'Seorang siswa membeli CPU Intel Core i5 Socket LGA 1700. Motherboard mana yang wajib dipilih agar bisa dipasang?',
    options: [
      'Motherboard dengan Socket LGA 1700 (misalnya chipset B760/H610)',
      'Motherboard dengan Socket AM4',
      'Motherboard dengan Socket AM5',
      'Motherboard dengan Socket LGA 1151',
    ],
    correctIndex: 0,
    explanation: 'Socket prosesor dan socket motherboard harus sama persis baik secara fisik maupun dukungan chipset.',
  },
  {
    id: 'boss_4',
    topic: 'Kompatibilitas Hardware',
    prompt: 'Apakah keping RAM DDR4 dapat dipasangkan ke slot motherboard yang dirancang khusus untuk DDR5?',
    options: [
      'Tidak bisa, karena posisi takik (notch) dan spesifikasi kelistrikannya berbeda',
      'Bisa, asalkan ditekan lebih keras hingga pengunci berbunyi',
      'Bisa, jika kapasitasnya sama-sama 16 GB',
      'Bisa, jika menggunakan kabel SATA tambahan',
    ],
    correctIndex: 0,
    explanation: 'Setiap generasi DDR memiliki posisi takik fisik (key notch) dan voltase berbeda untuk mencegah kesalahan pemasangan.',
  },
  {
    id: 'boss_5',
    topic: 'Perakitan Komputer',
    prompt: 'Fungsi utama mengoleskan thermal paste (pasta termal) secukupnya di permukaan atas CPU sebelum memasang heatsink adalah...',
    options: [
      'Mengisi celah udara mikroskopis agar perpindahan panas dari CPU ke heatsink berlangsung optimal',
      'Merekatkan CPU agar tidak bisa dilepas selamanya',
      'Menghantarkan arus listrik dari PSU ke kaki RAM',
      'Mencegah debu masuk ke dalam slot M.2',
    ],
    correctIndex: 0,
    explanation: 'Udara adalah penghantar panas yang buruk; pasta termal menggantikan kantong udara di antara IHS CPU dan alas cooler.',
  },
  {
    id: 'boss_6',
    topic: 'Perakitan Komputer',
    prompt: 'Sebelum menyentuh komponen sensitif seperti motherboard dan RAM saat merakit PC, tindakan keselamatan ESD yang benar adalah...',
    options: [
      'Memakai gelang anti-statis (ESD wrist strap) atau menyentuh bagian logam casing terlebih dahulu',
      'Menyalakan PSU dalam kondisi casing terbuka sambil memasang RAM',
      'Merakit PC di atas karpet wol sambil mengenakan kaus kaki',
      'Membasahi pin emas RAM dengan air keran',
    ],
    correctIndex: 0,
    explanation: 'Listrik statis (Electrostatic Discharge) dari tubuh dapat merusak microchip sensitif bila tidak dinetralkan.',
  },
  {
    id: 'boss_7',
    topic: 'Perakitan Komputer',
    prompt: 'Konektor kabel PSU yang terpasang pada header di pojok kiri atas motherboard dekat area CPU disebut...',
    options: [
      'Konektor 8-Pin (4+4) EPS CPU Power',
      'Konektor Molex 4-pin kipas casing',
      'Kabel Front Panel Audio (HD Audio)',
      'Kabel data SATA 7-pin',
    ],
    correctIndex: 0,
    explanation: 'Jika kabel 8-pin EPS lupa dipasang, kipas bisa berputar sebentar namun prosesor tidak mendapat daya dan PC gagal POST.',
  },
  {
    id: 'boss_8',
    topic: 'Troubleshooting Dasar',
    prompt: 'Saat PC dinyalakan, seluruh kipas berputar tetapi layar monitor gelap bertuliskan "No Signal". Langkah pengecekan pertama yang paling tepat adalah...',
    options: [
      'Memeriksa kabel display monitor dan melakukan reseating (lepas-pasang) modul RAM',
      'Mengganti hard disk dengan kapasitas lebih besar',
      'Mengganti casing komputer',
      'Menghapus akun pengguna di BIOS',
    ],
    correctIndex: 0,
    explanation: 'RAM yang kurang rapat atau kabel monitor yang tidak masuk ke port GPU yang aktif adalah penyebab tersering gejala No Display.',
  },
  {
    id: 'boss_9',
    topic: 'Troubleshooting Dasar',
    prompt: 'Apa kepanjangan dan fungsi dari POST yang dijalankan komputer sesaat setelah tombol power ditekan?',
    options: [
      'Power-On Self-Test: pengujian mandiri awal oleh BIOS untuk memastikan CPU, RAM, dan VGA siap bekerja',
      'Power Output System Transfer: menyalin file pengguna ke cloud',
      'Peripheral Operating Speed Tool: menaikkan kecepatan mouse',
      'Processor Overclocking Safety Test: mematikan kipas pendingin',
    ],
    correctIndex: 0,
    explanation: 'Jika ada komponen inti gagal saat POST, motherboard akan memberi tanda berupa kode bunyi beep atau lampu LED debug.',
  },
  {
    id: 'boss_10',
    topic: 'Fungsi Komponen',
    prompt: 'Perbedaan kecepatan paling menonjol antara SSD NVMe M.2 dibandingkan HDD SATA 7200 RPM adalah...',
    options: [
      'SSD NVMe menggunakan jalur PCIe dengan kecepatan ribuan MB/s, jauh melampaui HDD sekitar 100–160 MB/s',
      'HDD lebih cepat 10 kali lipat karena memiliki motor listrik',
      'SSD NVMe tidak memerlukan motherboard untuk bekerja',
      'Kecepatan keduanya sama persis pada semua kondisi',
    ],
    correctIndex: 0,
    explanation: 'Jalur PCIe langsung ke CPU/chipset membebaskan SSD NVMe dari batas kecepatan antarmuka SATA III (~600 MB/s).',
  },
  {
    id: 'boss_11',
    topic: 'Identifikasi Komponen',
    prompt: 'Jika memasang 2 keping RAM pada motherboard yang memiliki 4 slot DIMM (A1, A2, B1, B2), konfigurasi apa yang umumnya direkomendasikan agar Dual-Channel aktif?',
    options: [
      'Memasang pada slot yang berpasangan sesuai panduan manual (umumnya A2 dan B2)',
      'Memasang satu di slot DIMM dan satu lagi di slot PCIe',
      'Menumpuk dua keping RAM di dalam satu slot yang sama',
      'Memasang keduanya tanpa menekan tuas pengunci',
    ],
    correctIndex: 0,
    explanation: 'Mode Dual-Channel menggandakan lebar jalur akses memori antar CPU dan RAM bila dipasang pada kanal A dan B yang tepat.',
  },
  {
    id: 'boss_12',
    topic: 'Troubleshooting Dasar',
    prompt: 'Setiap kali PC dimatikan dan kabel listrik dicabut, tanggal dan jam sistem kembali ke tahun 2020 serta BIOS mereset ke default. Komponen apa yang perlu diganti?',
    options: [
      'Baterai CMOS (CR2032) pada motherboard',
      'Kartu grafis VGA',
      'Kipas pendingin belakang casing',
      'Kabel HDMI monitor',
    ],
    correctIndex: 0,
    explanation: 'Baterai CMOS yang habis dayanya membuat chip memori pengaturan BIOS kehilangan daya saat listrik utama diputus.',
  },
  {
    id: 'boss_13',
    topic: 'Kompatibilitas Hardware',
    prompt: 'Sebuah rakitan PC menggunakan kartu grafis bertenaga besar dengan total kebutuhan daya sistem 480 Watt. PSU mana yang paling aman dipilih?',
    options: [
      'PSU 650W bersertifikasi 80+ Bronze/Gold dari merek tepercaya',
      'PSU 350W generik tanpa sertifikasi efisiensi',
      'PSU 400W dengan kondisi kipas rusak',
      'Menjalankan sistem tanpa PSU',
    ],
    correctIndex: 0,
    explanation: 'Idealnya PSU memiliki headroom daya 20–30% di atas beban puncak sistem agar bekerja stabil, dingin, dan awet.',
  },
  {
    id: 'boss_14',
    topic: 'Perakitan Komputer',
    prompt: 'Apa fungsi baut penahan kuningan bernama "standoff" yang dipasang di pelat casing sebelum meletakkan motherboard?',
    options: [
      'Menjaga jarak aman agar bagian belakang solderan motherboard tidak menyentuh logam casing dan mengalami korsleting',
      'Mengalirkan sinyal Wi-Fi ke prosesor',
      'Menambah kapasitas RAM komputer',
      'Mengunci pintu samping kaca casing',
    ],
    correctIndex: 0,
    explanation: 'Tanpa standoff pada lubang yang sesuai, jalur PCB di belakang motherboard dapat terhubung singkat (short circuit) ke rangka casing.',
  },
  {
    id: 'boss_15',
    topic: 'Troubleshooting Dasar',
    prompt: 'Sebuah komputer tiba-tiba mati mendadak setelah 10 menit menjalankan rendering berat, dan suhu CPU tercatat 100°C. Apa pemeriksaan prioritas teknisi?',
    options: [
      'Memastikan kipas CPU berputar normal, dudukan heatsink rapat, dan pasta termal tidak mengering',
      'Mengganti kabel mouse dengan kabel baru',
      'Memformat ulang seluruh data pengguna',
      'Memasang baterai CMOS kedua',
    ],
    correctIndex: 0,
    explanation: 'Overheating memicu fitur pengaman thermal shutdown pada CPU untuk mencegah kerusakan permanen pada silikon prosesor.',
  },
  {
    id: 'boss_16',
    topic: 'Identifikasi Komponen',
    prompt: 'Konektor daya kecil berbentuk L pada media penyimpanan 2,5 inci dan 3,5 inci modern yang menyalurkan arus dari PSU adalah...',
    options: ['Konektor SATA Power 15-pin', 'Port RJ-45 Ethernet', 'Socket AM5', 'Jack Audio 3.5mm'],
    correctIndex: 0,
    explanation: 'Drive SATA menggunakan kabel power berbentuk huruf L 15-pin dari PSU dan kabel data 7-pin ke motherboard.',
  },
  {
    id: 'boss_17',
    topic: 'Fungsi Komponen',
    prompt: 'Mengapa komputer modern tetap memerlukan motherboard berukuran besar meskipun ukuran CPU hanya beberapa sentimeter persegi?',
    options: [
      'Untuk menyediakan jalur bus kecepatan tinggi, VRM pengatur daya CPU, slot ekspansi, serta port I/O belakang yang lengkap',
      'Karena CPU hanya bisa bekerja jika diletakkan jauh dari RAM',
      'Agar casing terlihat lebih berat dan kokoh',
      'Untuk menyimpan cadangan energi listrik selama 1 minggu',
    ],
    correctIndex: 0,
    explanation: 'Motherboard mengintegrasikan sirkuit pengatur daya (VRM), chipset pengendali I/O, dan konektivitas antar komponen.',
  },
  {
    id: 'boss_18',
    topic: 'Kompatibilitas Hardware',
    prompt: 'Seorang teknisi membeli casing tipe Mini-ITX yang sangat ringkas. Motherboard ukuran apa yang dapat masuk ke dalam casing tersebut?',
    options: [
      'Hanya motherboard Mini-ITX',
      'Motherboard ukuran ATX standar',
      'Motherboard Extended-ATX (E-ATX)',
      'Semua ukuran motherboard pasti muat',
    ],
    correctIndex: 0,
    explanation: 'Casing kecil Mini-ITX hanya memiliki ruang dan lubang standoff untuk papan Mini-ITX, sedangkan ATX jauh lebih panjang.',
  },
  {
    id: 'boss_19',
    topic: 'Perakitan Komputer',
    prompt: 'Saat memasang prosesor Intel LGA ke socket motherboard, bagaimana tanda orientasi yang benar agar tidak bengkok?',
    options: [
      'Menyamakan tanda segitiga emas di pojok CPU dengan tanda segitiga pada sudut socket motherboard lalu meletakkannya tanpa tekanan paksa',
      'Menekan bagian tengah CPU sekuat tenaga memakai obeng',
      'Memasang CPU dalam posisi terbalik 180 derajat',
      'Memotong salah satu sudut PCB prosesor',
    ],
    correctIndex: 0,
    explanation: 'Zero Insertion Force (ZIF) memastikan CPU masuk rata secara alami ketika penanda segitiga sudutnya sejajar.',
  },
  {
    id: 'boss_20',
    topic: 'Troubleshooting Dasar',
    prompt: 'Kabel monitor HDMI sudah tertancap kuat, namun tidak ada gambar saat menyalakan PC yang memiliki kartu VGA tambahan. Apa kesalahan paling sering terjadi?',
    options: [
      'Kabel HDMI dicolokkan ke port motherboard (onboard) padahal CPU tidak memiliki grafis terintegrasi, seharusnya ke port kartu VGA',
      'Kabel LAN internet belum dipasang',
      'Mouse dicolokkan di port USB depan',
      'SSD terlalu cepat melakukan booting',
    ],
    correctIndex: 0,
    explanation: 'Ketika kartu VGA diskrit terpasang, sinyal tampilan keluar melalui port HDMI/DisplayPort milik kartu VGA tersebut.',
  },
  {
    id: 'boss_21',
    topic: 'Identifikasi Komponen',
    prompt: 'Pelat logam tipis dengan lubang-lubang port USB, LAN, dan audio yang dipasang di sisi belakang casing sebelum motherboard masuk disebut...',
    options: ['I/O Shield', 'Heatsink VRM', 'Bracket GPU', 'CMOS Jumper'],
    correctIndex: 0,
    explanation: 'I/O Shield melindungi port belakang motherboard dari debu serta menyalurkan grounding EMI ke rangka casing.',
  },
  {
    id: 'boss_22',
    topic: 'Fungsi Komponen',
    prompt: 'Bagian motherboard bernama VRM (Voltage Regulator Module) di sekitar socket CPU bertugas untuk...',
    options: [
      'Menurunkan dan menstabilkan tegangan +12V dari PSU menjadi sekitar 1,1V–1,35V yang presisi untuk inti prosesor',
      'Menyimpan file gambar dan video pengguna',
      'Mengatur kecerahan layar monitor secara nirkabel',
      'Meningkatkan kecepatan internet Wi-Fi',
    ],
    correctIndex: 0,
    explanation: 'VRM sangat krusial menjaga kestabilan voltase rendah berarus tinggi bagi prosesor saat beban penuh.',
  },
  {
    id: 'boss_23',
    topic: 'Kompatibilitas Hardware',
    prompt: 'Jika memasang SSD M.2 NVMe PCIe 4.0 ke slot M.2 motherboard yang hanya mendukung PCIe 3.0, apa yang terjadi?',
    options: [
      'SSD tetap terdeteksi dan berfungsi normal, namun kecepatan maksimalnya menyesuaikan batas jalur PCIe 3.0',
      'SSD langsung terbakar saat dinyalakan',
      'Motherboard berubah menjadi tipe DDR5',
      'RAM tidak bisa terbaca sama sekali',
    ],
    correctIndex: 0,
    explanation: 'Standar PCIe bersifat kompatibel mundur (backward compatible), berjalan pada kecepatan generasi yang lebih rendah.',
  },
  {
    id: 'boss_24',
    topic: 'Perakitan Komputer',
    prompt: 'Mengapa manajemen kabel (cable management) di balik tray motherboard sangat dianjurkan saat merakit komputer?',
    options: [
      'Melancarkan sirkulasi udara (airflow) di dalam casing sehingga suhu komponen tetap dingin dan tidak tersangkut baling-baling kipas',
      'Menambah kapasitas gigabyte hard disk',
      'Mengubah prosesor dual-core menjadi octa-core',
      'Menghilangkan kebutuhan terhadap Power Supply',
    ],
    correctIndex: 0,
    explanation: 'Kabel yang rapi mencegah hambatan aliran udara dingin dari kipas depan menuju CPU dan GPU.',
  },
  {
    id: 'boss_25',
    topic: 'Troubleshooting Dasar',
    prompt: 'Saat komputer baru dinyalakan muncul pesan "Reboot and Select proper Boot device" di layar hitam. Apa dugaan penyebab utamanya?',
    options: [
      'Drive berisi sistem operasi (SSD/HDD) tidak terdeteksi karena kabel SATA longgar, rusak, atau urutan boot BIOS salah',
      'Kartu grafis VGA bekerja terlalu cepat',
      'Speaker eksternal belum dinyalakan',
      'Kipas casing berputar terbalik',
    ],
    correctIndex: 0,
    explanation: 'BIOS berhasil menyelesaikan POST, tetapi tidak menemukan partisi bootloader yang valid pada media penyimpanan.',
  },
  {
    id: 'boss_26',
    topic: 'Identifikasi Komponen',
    prompt: 'Pin-pin kecil pada pojok kanan bawah motherboard bertuliskan PWR_SW, RESET_SW, dan HDD_LED berfungsi sebagai koneksi untuk...',
    options: [
      'Header Front Panel (tombol power, reset, dan lampu indikator casing depan)',
      'Port daya kartu grafis PCIe',
      'Slot pemasangan prosesor AMD',
      'Port kabel monitor DisplayPort',
    ],
    correctIndex: 0,
    explanation: 'Kabel tipis dari tombol power dan LED di bagian depan casing disambungkan ke pin header Front Panel (F_PANEL).',
  },
  {
    id: 'boss_27',
    topic: 'Fungsi Komponen',
    prompt: 'Apa keuntungan konfigurasi penyimpanan hibrida (SSD untuk OS + HDD untuk data besar) pada komputer lab sekolah?',
    options: [
      'Sistem operasi dan aplikasi berjalan super cepat di SSD, sementara file besar tersimpan hemat biaya di HDD',
      'Kedua drive digabungkan menjadi RAM tambahan',
      'Komputer tidak memerlukan kabel power sama sekali',
      'Suhu ruangan kelas turun drastis',
    ],
    correctIndex: 0,
    explanation: 'Konfigurasi dual-drive memaksimalkan kecepatan respons sistem sekaligus efisiensi kapasitas arsip.',
  },
  {
    id: 'boss_28',
    topic: 'Kompatibilitas Hardware',
    prompt: 'Motherboard A520 memiliki socket AM4. Komponen mana yang kompatibel untuk dipasang di papan tersebut?',
    options: [
      'Prosesor AMD Ryzen 5 5600 (AM4) dan RAM DDR4 Desktop',
      'Prosesor Intel Core i5-13400 (LGA 1700) dan RAM DDR5',
      'Prosesor Intel Core i7-14700K dan RAM SO-DIMM laptop',
      'Prosesor AMD Ryzen 7 7700 (AM5) dan RAM DDR3',
    ],
    correctIndex: 0,
    explanation: 'Platform AM4 secara spesifik mendukung prosesor Ryzen AM4 dan modul memori DDR4.',
  },
  {
    id: 'boss_29',
    topic: 'Perakitan Komputer',
    prompt: 'Saat menekan kedua ujung pengunci slot DIMM hingga berbunyi "klik", apa tujuan teknisi memastikan tuas pengunci menutup rapat?',
    options: [
      'Memastikan seluruh pin emas RAM terhubung sempurna dan tidak goyang saat komputer bergetar atau berpindah',
      'Memutus aliran listrik ke motherboard',
      'Mengunci kapasitas SSD agar tidak berubah',
      'Menyalakan lampu RGB monitor',
    ],
    correctIndex: 0,
    explanation: 'Keping RAM yang miring atau setengah masuk adalah penyebab utama komputer gagal booting atau berbunyi beep.',
  },
  {
    id: 'boss_30',
    topic: 'Troubleshooting Dasar',
    prompt: 'Setelah melakukan upgrade GPU baru yang lebih bertenaga, PC selalu mati mendadak tepat saat menjalankan aplikasi 3D berat. Komponen apa yang paling dicurigai?',
    options: [
      'Kapasitas daya PSU kurang memadai atau tidak mampu menahan lonjakan beban puncak GPU',
      'Baterai CMOS terlalu penuh',
      'Kabel HDMI memiliki warna yang salah',
      'Kapasitas keyboard terlalu kecil',
    ],
    correctIndex: 0,
    explanation: 'Saat beban 3D meningkat, GPU menarik arus besar pada rail +12V sehingga PSU berdaya kecil memicu proteksi mati mendadak (OPP/OCP).',
  },
];

export function shuffleIds(ids: string[]): string[] {
  const arr = [...ids];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createDisjointQuestionPairs(): {
  redL2: string[];
  blueL2: string[];
  redL6: string[];
  blueL6: string[];
  redL1: HardwareComponentId[];
  blueL1: HardwareComponentId[];
} {
  const shuffledL2 = shuffleIds(LEVEL2_QUESTIONS.map((q) => q.id));
  const shuffledL6 = shuffleIds(LEVEL6_FINAL_QUESTIONS.map((q) => q.id));

  const baseL1 = shuffleIds(LEVEL1_COMPONENTS.map((c) => c.id)) as HardwareComponentId[];
  // Shift Blue's Level 1 order by 3 positions so Red and Blue NEVER see the same component simultaneously
  const shiftedL1 = [...baseL1.slice(3), ...baseL1.slice(0, 3)];

  return {
    redL2: shuffledL2.slice(0, 10),
    blueL2: shuffledL2.slice(10, 20),
    redL6: shuffledL6.slice(0, 15),
    blueL6: shuffledL6.slice(15, 30),
    redL1: baseL1,
    blueL1: shiftedL1,
  };
}

