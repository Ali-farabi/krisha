<script setup lang="ts">
import apartmentsData from '../data/apartments.json'
import ApartmentsGrid from '../components/ApartmentsGrid.vue'
import FiltersPanel from '../components/FiltersPanel.vue'
import { useApartmentsFilter } from '../composables/useApartmentsFilter'
import type { Apartment } from '../types/apartment'

const apartments: Apartment[] = apartmentsData

const {
  filters,
  errors,
  areaBounds,
  roomsBounds,
  filteredApartments,
  foundCount,
  updateFilters,
  resetFilters,
} = useApartmentsFilter(apartments)
</script>

<template>
  <div class="page">
    <header class="page__header">
      <h1 class="page__title">Квартиры в Астане</h1>
      <div class="page__count">Найдено: {{ foundCount }}</div>
    </header>

    <div class="layout">
      <aside class="layout__sidebar">
        <FiltersPanel
          :model-value="filters"
          :errors="errors"
          :area-bounds="areaBounds"
          :rooms-bounds="roomsBounds"
          @update:modelValue="updateFilters"
          @reset="resetFilters"
        />
      </aside>

      <main class="layout__content">
        <ApartmentsGrid :apartments="filteredApartments" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 40px;
}

.page__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page__title {
  margin: 0;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 700;
  color: #111827;
}

.page__count {
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.layout {
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.layout__sidebar {
  position: sticky;
  top: 16px;
}

.layout__content {
  min-width: 0;
}

@media (max-width: 1024px) {
  .layout {
    grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
    gap: 20px;
  }
}

@media (max-width: 880px) {
  .page {
    padding: 24px 16px 32px;
  }

  .page__header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .layout__sidebar {
    position: static;
  }
}
</style>
