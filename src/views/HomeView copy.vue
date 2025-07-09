<template>
  <div class="flex flex-col bg-primary p-4">
    <header>
      <div class="flex justify-between">
        <img src="/icons/logo_batbiz.webp" class="w-[120px]" />
        <div class="flex items-center gap-3">
          <img src="/icons/icon-bell.svg" class="w-[24px] h-[28px]" />
          <img src="/icons/avatar-9.webp" class="w-[40px]" />
        </div>
      </div>
    </header>
    <main class="mt-4">
      <div>
        <div class="bg-card w-full p-4 rounded-t-xl">
          <div class="flex justify-between">
            <div class="text-white">
              <div>Saldo</div>
              <div class="flex gap-2">
                <div class="font-bold">RP 0</div>
                <img src="/icons/icon-eye.svg" class="w-[24px] ml" />
              </div>
            </div>
            <div>
              <div class="p-2 rounded-xl border-white border-[1px] opacity-70">
                <img src="/icons/icon-qr.svg" class="w-[24px]" />
              </div>
            </div>
          </div>
          <div class="flex mt-4 gap-4">
            <div
              class="w-full grid place-items-center p-4 bg-white rounded-xl bg-opacity-50 font-medium"
            >
              <div class="flex gap-3 text-[14px] text-[#6C5840]">
                <div>Transfer</div>
                <img src="/icons/icon-send.svg" class="w-[24px]" />
              </div>
            </div>
            <div
              class="w-full grid place-items-center bg-white rounded-xl bg-opacity-50 font-medium"
            >
              <div class="flex gap-3 text-[14px] text-[#6C5840]">
                <div>Prepayment</div>
                <img src="/icons/icon-prepayment.svg" class="w-[24px]" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-card2 w-full p-4 rounded-b-xl grid place-items-center">
          <div class="flex gap-2 text-white">
            <img src="/icons/icon-prepayment-white.svg" class="w-[21px]" />
            <div>Pendapatan hari ini</div>
            <div class="font-bold">Rp 0</div>
          </div>
        </div>
      </div>

      <div class="bg-secondary text-white p-4 rounded-xl w-full max-w-xl mt-4">
        <h2 class="text-lg font-semibold mb-4">Layanan BATBiz</h2>
        <div class="flex overflow-x-auto scrollbar-custom space-x-2 pb-2">
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

      <div class="bg-secondary text-white p-4 rounded-xl w-full max-w-xl mt-4">
        <h2 class="text-lg font-semibold">Aktivitas Terakhir</h2>
        <p class="text-sm text-gray-300 mb-4">Yuk, mulai transaksi sekarang!</p>

        <div
          v-for="(item, index) in transactions"
          :key="index"
          class="flex items-start justify-between py-3 last:border-none"
        >
          <div class="flex gap-3">
            <div>
              <div class="bg-white text-[#c89450] rounded-full p-2 mt-1">
                <img :src="item.icon" class="w-[24px] h-[24px]" />
              </div>
            </div>

            <div>
              <p class="font-semibold text-xs text-white leading-tight">
                {{ item.title }}
              </p>
              <p class="text-[9px] text-gray-300">{{ item.datetime }}</p>
              <p class="text-[9px] text-white" v-if="item.detail">
                {{ item.detail }}
              </p>
              <p class="text-[9px] text-white" v-if="item.subDetail">
                {{ item.subDetail }}
              </p>
            </div>
          </div>

          <div class="flex flex-col items-end">
            <p class="font-semibold text-sm text-white">Rp {{ item.amount }}</p>
            <p
              :class="
                item.result === 'Berhasil' ? 'text-green-500' : 'text-red-500'
              "
              class="text-xs"
            >
              {{ item.result }}
            </p>
          </div>
        </div>
      </div>
    </main>
    <footer class="p-4 grid place-items-end"></footer>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import api from "@/services/api";

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

<style>
.scrollbar-custom {
  scrollbar-color: #c89450 transparent; /* Thumb color, track color */
  scrollbar-width: thin;
}
</style>
