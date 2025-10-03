<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useDashboard, LoadingStatus } from '@/stores';
import type { ChainConfig } from '@/types/chaindata';
import ChainSummary from '@/components/ChainSummary.vue';
import AdBanner from '@/components/ad/AdBanner.vue';

import { computed, onMounted, ref } from 'vue';
import { useBlockchain } from '@/stores';

const dashboard = useDashboard();

const keywords = ref('');
const chains = computed(() => {
  if (keywords.value) {
    const lowercaseKeywords = keywords.value.toLowerCase();

    return Object.values(dashboard.chains).filter(
      (x: ChainConfig) =>
        x.chainName.toLowerCase().indexOf(lowercaseKeywords) > -1 ||
        x.prettyName.toLowerCase().indexOf(lowercaseKeywords) > -1
    );
  } else {
    return Object.values(dashboard.chains);
  }
});

const chainStore = useBlockchain();
</script>
<template>
  <div class="max-w-[1600px] mx-auto">
    <div class="mb-8 mt-8">
      <h1 class="text-main text-3xl font-semibold mb-1 tracking-tight">
        KERENSTAKE<span style="color: #3b82f6">.</span>
      </h1>
      <div class="text-secondary text-sm">EXPLORER</div>
    </div>

    <div class="flex items-center bg-base-100 border border-[var(--border-color)] mb-6 transition-all duration-200 focus-within:border-primary focus-within:shadow-sm" style="border-radius: 6px; height: 44px">
      <Icon icon="mdi:magnify" class="text-xl text-secondary ml-4" />
      <input
        :placeholder="$t('pages.search_placeholder')"
        class="px-4 bg-transparent flex-1 outline-none text-sm text-main placeholder:text-secondary"
        v-model="keywords"
      />
      <div class="px-4 text-xs text-secondary hidden md:!block font-medium">{{ chains.length }}/{{ dashboard.length }}</div>
    </div>

    <div class="grid grid-cols-1 gap-3 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5">
      <ChainSummary v-for="(chain, index) in chains" :key="index" :name="chain.chainName" />
    </div>
  </div>
</template>

<style scoped>
/* Minimal styles */
</style>
@/components/ad/ad
