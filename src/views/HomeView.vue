<template>
  <div class="flex min-h-screen text-white">
  
    <aside
      class="hidden lg:flex lg:flex-col bg-[#1e1e1e] w-[220px] p-6 space-y-6"
    >
      <img src="/icons/logo_batbiz.webp" class="w-[120px]" />

      <nav class="space-y-4 text-sm">
        <div class="flex items-center gap-3">
          <img src="/icons/icon-daftar-usaha.svg" class="w-5" />
          <span>Dashboard</span>
        </div>
        <div class="flex items-center gap-3">
          <img src="/icons/icon-settlement.svg" class="w-5" />
          <span>Saldo</span>
        </div>
        <div class="flex items-center gap-3">
          <img src="/icons/icon-laporan.svg" class="w-5" />
          <span>Transfer</span>
        </div>

      </nav>
    </aside>


    <div class="flex-1 p-4">

      <header class="flex justify-between items-center mb-4 lg:hidden">
        <img src="/icons/logo_batbiz.webp" class="w-[120px]" />
        <div class="flex items-center gap-3">
          <img src="/icons/icon-bell.svg" class="w-[24px]" />
          <img src="/icons/avatar-9.webp" class="w-[40px] rounded-full" />
        </div>
      </header>


      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div class="space-y-4">

          <div class="bg-card w-full p-4 rounded-xl space-y-4">
            <div class="flex justify-between">
              <div>
                <p class="text-white">Saldo</p>
                <div class="flex items-center gap-2 font-bold text-xl">
                  Rp 0
                  <img src="/icons/icon-eye.svg" class="w-[20px]" />
                </div>
              </div>
              <div>
                <div class="p-2 rounded-xl border border-white opacity-70">
                  <img src="/icons/icon-qr.svg" class="w-[24px]" />
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <button
                class="w-full flex items-center justify-center gap-2 bg-white bg-opacity-50 text-[#6C5840] rounded-xl py-2"
              >
                Transfer <img src="/icons/icon-send.svg" class="w-5" />
              </button>
              <button
                class="w-full flex items-center justify-center gap-2 bg-white bg-opacity-50 text-[#6C5840] rounded-xl py-2"
              >
                Prepayment <img src="/icons/icon-prepayment.svg" class="w-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="bg-card2 p-4 grid place-items-center rounded-xl items-center"
        >
          <span class="md:flex hidden font-bold text-[44px] -mb-[20px]"
            >Rp 0</span
          >
          <div class="flex gap-2">
            <img src="/icons/icon-prepayment-white.svg" class="w-[20px]" />
            <span>Pendapatan hari ini</span>
            <span class="font-bold md:hidden flex">Rp 0</span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="md:grid hidden text-lg font-semibold mb-4">
          Layanan BATBiz
        </h2>
        <div class="bg-secondary p-4 rounded-xl">
          <h2 class="md:hidden grid text-lg font-semibold mb-4">
            Layanan BATBiz
          </h2>
          <div class="flex overflow-x-auto scrollbar-custom gap-3 pb-2">
            <div
              v-for="(item, index) in layanan"
              :key="index"
              class="flex flex-col items-center flex-shrink-0 w-20"
            >
              <div class="bg-white text-[#c89450] rounded-full p-3">
                <img :src="item.icon" class="w-[24px] h-[24px]" />
              </div>
              <p class="text-center text-xs mt-2">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <div class="md:flex justify-between hidden">
          <div class="grid">
            <h2 class="text-lg font-semibold">Aktivitas Terakhir</h2>
            <p class="text-sm text-gray-300 mb-4">
              Yuk, mulai transaksi sekarang!
            </p>
          </div>
          <div class="relative w-[300px] max-w-md">
            <span
              class="absolute top-[14px] left-0 pl-3 flex items-center pointer-events-none"
            >
              <img src="/icons/icon-search.svg" class="w-4 h-4 opacity-60" />
            </span>
            <input
              type="text"
              placeholder="Cari transaksi atau layanan..."
              class="w-full placeholder:text-sm pl-10 pr-4 py-2 rounded-full bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c89450]"
            />
          </div>
        </div>
        <div class="bg-secondary p-4 rounded-xl">
          <div class="md:hidden grid">
            <h2 class="text-lg font-semibold">Aktivitas Terakhir</h2>
            <p class="text-sm text-gray-300 mb-4">
              Yuk, mulai transaksi sekarang!
            </p>
          </div>

          <div class="md:flex hidden w-full font-bold">
            <div class="w-[20%]">Nama</div>
            <div class="w-[20%]">Tanggal</div>
            <div class="w-[20%]">Informasi</div>
            <div class="w-[20%]">Catatan</div>
            <div class="w-[20%]">Harga</div>
            <div class="w-[10%]">Status</div>
          </div>

          <div v-for="(item, index) in transactions" :key="index" class="py-3">
            <div class="md:hidden flex items-start justify-between">
              <div class="flex gap-3">
                <div>
                  <div class="bg-white text-[#c89450] rounded-full p-2 mt-1">
                    <img :src="item.icon" class="w-[24px] h-[24px]" />
                  </div>
                </div>
                <div>
                  <p class="font-semibold text-xs leading-tight">
                    {{ item.title }}
                  </p>
                  <p class="text-[10px] text-gray-300">{{ item.datetime }}</p>
                  <p class="text-[10px]" v-if="item.detail">
                    {{ item.detail }}
                  </p>
                  <p class="text-[10px]" v-if="item.subDetail">
                    {{ item.subDetail }}
                  </p>
                </div>
              </div>

              <div class="flex flex-col items-end text-xs">
                <p class="font-semibold">Rp {{ item.amount }}</p>
                <p
                  :class="
                    item.result === 'Berhasil'
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                >
                  {{ item.result }}
                </p>
              </div>
            </div>

            <div class="md:flex hidden w-full text-xs">
              <div class="w-[20%]">{{ item.title }}</div>
              <div class="w-[20%]">{{ item.datetime }}</div>
              <div class="w-[20%]">{{ item.detail }}</div>
              <div class="w-[20%]">{{ item.subDetail }}</div>
              <div class="w-[20%]">Rp {{ item.amount }}</div>
              <div class="w-[10%]">
                <p
                  :class="
                    item.result === 'Berhasil'
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                >
                  {{ item.result }}
                </p>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-between text-xs mt-8 px-4">
            <div></div>
            <div>Halaman 1</div>
            <div>Selanjutnya</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const layanan = [
  { name: "Daftar Usaha", icon: "/icons/icon-daftar-usaha.svg" },
  { name: "Laporan", icon: "/icons/icon-laporan.svg" },
  { name: "BATBiz Care", icon: "/icons/icon-batbiz-core.svg" },
  { name: "Open API", icon: "/icons/icon-settlement.svg" },
  { name: "Settlement Sameday", icon: "/icons/icon-settlement.svg" },
];

const transactions = [
  {
    title: "Pencairan Dana",
    datetime: "07 Juli 2025 14:31",
    result: "Berhasil",
    detail: "SETTLE QR_OFF US_06072025",
    amount: "501",
    icon: "/icons/icon-settlement.svg",
  },
  {
    title: "QRIS- 54fa03dc",
    datetime: "06 Juli 2025 04:01",
    result: "Berhasil",
    detail: "Infinite",
    subDetail: "Open API",
    amount: "500",
    icon: "/icons/icon-settlement.svg",
  },
  {
    title: "QRIS- c8147bdb",
    datetime: "06 Juli 2025 03:51",
    result: "Berhasil",
    detail: "Infinite",
    subDetail: "Open API",
    amount: "1400",
    icon: "/icons/icon-settlement.svg",
  },
  {
    title: "QRIS- d088f10c",
    datetime: "06 Juli 2025 03:49",
    result: "Gagal",
    detail: "Infinite",
    subDetail: "Open API",
    amount: "1400",
    icon: "/icons/icon-settlement.svg",
  },
  {
    title: "Transfer",
    datetime: "04 Juli 2025 17:37",
    result: "Berhasil",
    detail: "Infinite",
    subDetail: "Open API",
    amount: "1400",
    icon: "/icons/icon-settlement.svg",
  },
];
</script>

<style scoped>
.scrollbar-custom {
  scrollbar-color: #c89450 transparent;
  scrollbar-width: thin;
}
.scrollbar-custom::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #c89450;
  border-radius: 4px;
}
</style>
