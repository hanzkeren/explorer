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
  <div class="">
    <div class="flex flex-col items-center justify-center mb-10 mt-16">
      <h1 class="text-main text-4xl md:!text-6xl font-bold tracking-tight">
        KERENSTAKE<span class="dot-run">.</span>
      </h1>
      <div class="text-secondary text-sm md:text-base font-medium tracking-[0.3em] mt-3 ml-3">
        EXPLORER
      </div>
    </div>
    <div v-if="dashboard.status !== LoadingStatus.Loaded" class="flex justify-center mt-6">
      <progress class="progress progress-info w-80 h-1"></progress>
    </div>

    <div class="flex items-center bg-base-100 border border-[var(--border-color)] hover:border-primary transition-colors" style="border-radius: var(--radius); height: 56px">
      <Icon icon="mdi:magnify" class="text-2xl text-secondary ml-4" />
      <input
        :placeholder="$t('pages.search_placeholder')"
        class="px-4 bg-transparent flex-1 outline-none text-base"
        v-model="keywords"
      />
      <div class="px-5 text-sm text-secondary hidden md:!block font-medium">{{ chains.length }}/{{ dashboard.length }}</div>
    </div>

    <div class="grid grid-cols-1 gap-4 mt-8 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5">
      <ChainSummary v-for="(chain, index) in chains" :key="index" :name="chain.chainName" />
    </div>
  </div>
</template>

<style scoped>
.logo path {
  fill: #171d30;
}

/* Dot running animation - horizontal */
.dot-run {
  display: inline-block;
  color: #00ff88;
  animation: dotRun 1.2s ease-in-out infinite;
}

@keyframes dotRun {
  0%, 100% {
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    opacity: 0.4;
    transform: translateX(10px);
  }
}
</style>
@/components/ad/ad
