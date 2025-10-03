<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';

// Components
import newFooter from '@/layouts/components/NavFooter.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import NavbarSearch from '@/layouts/components/NavbarSearch.vue';
import ChainProfile from '@/layouts/components/ChainProfile.vue';
// Minimal: remove sponsors/ad imports

import { useDashboard } from '@/stores/useDashboard';
import { NetworkType } from '@/types/chaindata';
import { useBaseStore, useBlockchain } from '@/stores';

import NavBarI18n from './NavBarI18n.vue';
import NavBarWallet from './NavBarWallet.vue';
import type {
  NavGroup,
  NavLink,
  NavSectionTitle,
  VerticalNavItems,
} from '../types';
import dayjs from 'dayjs';

const dashboard = useDashboard();
dashboard.initial();
const blockchain = useBlockchain();
blockchain.randomSetupEndpoint();
const baseStore = useBaseStore();

const current = ref(''); // the current chain
const temp = ref('');
blockchain.$subscribe((m, s) => {
  if (current.value === s.chainName && temp.value != s.endpoint.address) {
    temp.value = s.endpoint.address;
    blockchain.initial();
  }
  if (current.value != s.chainName) {
    current.value = s.chainName;
    blockchain.randomSetupEndpoint();
  }
});

const sidebarShow = ref(false);
const sidebarOpen = ref(true);

const changeOpen = (index: Number) => {
  if (index === 0) {
    sidebarOpen.value = !sidebarOpen.value;
  }
};
const showDiscord = window.location.host.search('ping.pub') > -1;

function isNavGroup(nav: VerticalNavItems | any): nav is NavGroup {
  return (<NavGroup>nav).children !== undefined;
}
function isNavLink(nav: VerticalNavItems | any): nav is NavLink {
  return (<NavLink>nav).to !== undefined;
}
function isNavTitle(nav: VerticalNavItems | any): nav is NavSectionTitle {
  return (<NavSectionTitle>nav).heading !== undefined;
}
function selected(route: any, nav: NavLink) {
  const b =
    route.path === nav.to?.path || (route.path.startsWith(nav.to?.path) && nav.title.indexOf('dashboard') === -1);
  return b;
}
const blocktime = computed(() => {
  return dayjs(baseStore.latest?.block?.header?.time);
});

const behind = computed(() => {
  const current = dayjs().subtract(10, 'minute');
  return blocktime.value.isBefore(current);
});

dayjs();

// Minimal: no ads
</script>

<template>
  <div class="bg-[#1a1d23] dark:bg-[#1a1d23] min-h-screen">
    <!-- sidebar -->
    <div
      class="w-56 fixed z-50 left-0 top-0 bottom-0 overflow-auto bg-base-100 border-r border-[var(--border-color)]"
      :class="{ block: sidebarShow, 'hidden xl:!block': !sidebarShow }"
    >
      <div class="flex justify-between px-3 py-3 border-b border-[var(--border-color)]">
        <RouterLink to="/" class="flex items-center">
          <img class="w-7 h-7" src="https://cdn.kerenstake.com/logo-ks.png" />
          <div class="ml-2">
            <div class="text-sm font-semibold text-main">KERENSTAKE</div>
            <div class="text-xs text-secondary">EXPLORER</div>
          </div>
        </RouterLink>
        <div
          class="cursor-pointer xl:!hidden"
          @click="sidebarShow = false"
        >
          <Icon icon="mdi-close" class="text-xl" />
        </div>
      </div>
      <div v-for="(item, index) of blockchain.computedChainMenu" :key="index" class="px-2">
        <div
          v-if="isNavGroup(item)"
          :tabindex="index"
          class="collapse"
          :class="{
            'collapse-arrow': index > 0 && item?.children?.length > 0,
            'collapse-open': index === 0 && sidebarOpen,
            'collapse-close': index === 0 && !sidebarOpen,
          }"
        >
          <input v-if="index > 0" type="checkbox" class="cursor-pointer !h-10 block" @click="changeOpen(index)" />
          <div class="collapse-title !py-0 px-4 flex items-center cursor-pointer hover:bg-[var(--bg-hover)]">
            <Icon v-if="item?.icon?.icon" :icon="item?.icon?.icon" class="text-lg mr-2 text-secondary" />
            <img v-if="item?.icon?.image" :src="item?.icon?.image" class="w-6 h-6 rounded-full mr-3" />
            <div class="text-sm capitalize flex-1 text-main font-medium whitespace-nowrap">
              {{ item?.title }}
            </div>
            <div
              v-if="item?.badgeContent"
              class="mr-6 badge badge-sm text-white border-none"
              :class="item?.badgeClass"
            >
              {{ item?.badgeContent }}
            </div>
          </div>
          <div class="collapse-content">
            <div v-for="(el, key) of item?.children" class="menu bg-transparent w-full !p-0">
              <RouterLink
                v-if="isNavLink(el)"
                @click="sidebarShow = false"
                class="hover:bg-[var(--bg-hover)] cursor-pointer px-3 py-2 flex items-center text-sm"
                :class="{
                  '!bg-[var(--bg-active)]': selected($route, el),
                }"
                :to="el.to"
              >
                <Icon
                  v-if="!el?.icon?.image"
                  icon="mdi:circle-small"
                  class="mr-1 ml-2 text-secondary text-sm"
                />
                <img
                  v-if="el?.icon?.image"
                  :src="el?.icon?.image"
                  class="w-5 h-5 rounded mr-2 ml-3"
                />
                <div class="capitalize text-main">
                  {{ $t(el?.title) }}
                </div>
              </RouterLink>
            </div>
            <div
              v-if="index === 0 && dashboard.networkType === NetworkType.Testnet"
              class="menu bg-base-100 w-full !p-0"
            >
              <RouterLink
                class="hover:bg-active rounded-md cursor-pointer px-3 py-2 flex items-center"
                :to="`/${blockchain.chainName}/faucet`"
              >
                <Icon icon="mdi:circle-small" class="mr-2 ml-3 text-secondary"></Icon>
                <div class="text-sm capitalize text-gray-700 dark:text-[#eee]">Faucet</div>
              </RouterLink>
            </div>
          </div>
        </div>

        <RouterLink
          v-if="isNavLink(item)"
          :to="item?.to"
          @click="sidebarShow = false"
          class="cursor-pointer rounded-md px-4 flex items-center py-2 hover:bg-active"
        >
          <Icon v-if="item?.icon?.icon" :icon="item?.icon?.icon" class="text-lg mr-2 text-secondary" />
          <img
            v-if="item?.icon?.image"
            :src="item?.icon?.image"
            class="w-6 h-6 rounded-full mr-3 border border-[#1a1a1a]"
          />
          <div class="text-sm capitalize flex-1 text-gray-700 dark:text-[#eee] whitespace-nowrap">
            {{ item?.title }}
          </div>
          <!-- badges removed for minimalism -->
        </RouterLink>
        <div
          v-if="isNavTitle(item)"
          class="px-4 text-sm text-[#b0b7c2] pb-2 uppercase"
        >
          {{ item?.heading }}
        </div>
      </div>
      <!-- Minimal: remove tools/sponsors/links to declutter sidebar -->
    </div>
    <div class="xl:!ml-64 px-3 pt-3">
      <!-- header -->
      <div class="flex items-center py-2 mb-4 sticky top-0 z-10 border-b border-[var(--border-color)] bg-base-100">
        <div
          class="text-xl pr-3 cursor-pointer xl:!hidden"
          @click="sidebarShow = true"
        >
          <Icon icon="mdi-menu" />
        </div>

        <ChainProfile />

        <div class="flex-1 w-0"></div>

        <NavbarThemeSwitcher class="!inline-block" />
        <NavbarSearch class="!inline-block" />
        <NavBarWallet />
      </div>

      <!-- 👉 Pages -->
      <div style="min-height: calc(100vh - 180px)">
        <div v-if="behind" class="alert bg-error text-white mb-4 border-0">
          <div class="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span
              >{{ $t('pages.out_of_sync') }} {{ blocktime.format() }} ({{
                blocktime.fromNow()
              }})</span
            >
          </div>
        </div>
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in">
            <div>
              <Component :is="Component" />
            </div>
          </Transition>
        </RouterView>
      </div>

      <newFooter />
    </div>
  </div>
</template>
