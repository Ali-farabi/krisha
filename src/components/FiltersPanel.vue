<script setup lang="ts">
import type { FilterErrors, FilterState } from '../composables/useApartmentsFilter'

const props = defineProps<{
  modelValue: FilterState
  errors: FilterErrors
  areaBounds: { min: number; max: number }
  roomsBounds: { min: number; max: number }
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: FilterState): void
  (event: 'reset'): void
}>()

const normalizeNumber = (value: number | null | undefined) => value ?? null

const updateField = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  })
}

const handleReset = () => emit('reset')

const onAreaFrom = (value: number | null) => updateField('areaFrom', normalizeNumber(value))
const onAreaTo = (value: number | null) => updateField('areaTo', normalizeNumber(value))
const onRoomsFrom = (value: number | null) => updateField('roomsFrom', normalizeNumber(value))
const onRoomsTo = (value: number | null) => updateField('roomsTo', normalizeNumber(value))
const onAddress = (value: string) => updateField('address', value)
</script>

<template>
  <el-card class="filter-card filter-card-desktop" shadow="never">
    <template #header>
      <div class="filter-card-title">Фильтры</div>
    </template>

    <el-form label-position="top" class="filter-form filter-form-desktop">
      <el-form-item label="Площадь, м²" :error="errors.areaRange" class="filter-item">
        <div class="filter-range">
          <el-input-number
            :model-value="modelValue.areaFrom"
            :min="0"
            :step="1"
            placeholder="От"
            @update:modelValue="onAreaFrom"
          />
          <el-input-number
            :model-value="modelValue.areaTo"
            :min="0"
            :step="1"
            placeholder="До"
            @update:modelValue="onAreaTo"
          />
        </div>
        <div class="filter-hint">Диапазон: {{ areaBounds.min }} — {{ areaBounds.max }} м²</div>
      </el-form-item>

      <el-form-item label="Количество комнат" :error="errors.roomsRange" class="filter-item">
        <div class="filter-range">
          <el-input-number
            :model-value="modelValue.roomsFrom"
            :min="0"
            :step="1"
            placeholder="От"
            @update:modelValue="onRoomsFrom"
          />
          <el-input-number
            :model-value="modelValue.roomsTo"
            :min="0"
            :step="1"
            placeholder="До"
            @update:modelValue="onRoomsTo"
          />
        </div>
        <div class="filter-hint">Диапазон: {{ roomsBounds.min }} — {{ roomsBounds.max }}</div>
      </el-form-item>

      
      <el-button type="default" class="filter-reset" @click="handleReset">
        Сбросить
      </el-button>
    </el-form>
  </el-card>

  <el-collapse class="filter-collapse filter-collapse-mobile" accordion>
    <el-collapse-item name="filters">
      <template #title>
        <span class="filter-collapse-title">Фильтры</span>
      </template>

      <el-card class="filter-card filter-card-mobile" shadow="never">
        <el-form label-position="top" class="filter-form">
          <el-form-item label="Площадь, м²" :error="errors.areaRange" class="filter-item">
            <div class="filter-range">
              <el-input-number
                :model-value="modelValue.areaFrom"
                :min="0"
                :step="1"
                placeholder="От"
                @update:modelValue="onAreaFrom"
              />
              <el-input-number
                :model-value="modelValue.areaTo"
                :min="0"
                :step="1"
                placeholder="До"
                @update:modelValue="onAreaTo"
              />
            </div>
            <div class="filter-hint">Диапазон: {{ areaBounds.min }} — {{ areaBounds.max }} м²</div>
          </el-form-item>

          <el-form-item label="Количество комнат" :error="errors.roomsRange" class="filter-item">
            <div class="filter-range">
              <el-input-number
                :model-value="modelValue.roomsFrom"
                :min="0"
                :step="1"
                placeholder="От"
                @update:modelValue="onRoomsFrom"
              />
              <el-input-number
                :model-value="modelValue.roomsTo"
                :min="0"
                :step="1"
                placeholder="До"
                @update:modelValue="onRoomsTo"
              />
            </div>
            <div class="filter-hint">Диапазон: {{ roomsBounds.min }} — {{ roomsBounds.max }}</div>
          </el-form-item>

         

          <el-button type="default" class="filter-reset" @click="handleReset">
            Сбросить
          </el-button>
        </el-form>
      </el-card>
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped>
.filter-card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.filter-card-title {
  font-weight: 700;
  font-size: 16px;
}

.filter-item {
  margin-bottom: 20px;
}

.filter-range {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.filter-range :deep(.el-input-number),
.filter-form :deep(.el-input),
.filter-form :deep(.el-input__wrapper) {
  width: 100%;
}

.filter-form-desktop {
  display: column;
  grid-template-columns: 1.1fr 1.1fr 1.4fr;
  column-gap: 2px;
  row-gap: 16px;
  align-items: start;
}

.filter-form-desktop .filter-item {
  margin-bottom: 0;
  min-width: 0;
}

.filter-form-desktop :deep(.el-form-item__label) {
  white-space: nowrap;
}

.filter-form-desktop .filter-reset {
  grid-column: 1 / -1;
  margin-top: 4px;
}

.filter-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
}

.filter-reset {
  width: 100%;
  height: 40px;
  font-weight: 600;
}

.filter-collapse-mobile {
  display: none;
}

.filter-collapse-title {
  font-weight: 700;
}

@media (max-width: 880px) {
  .filter-card-desktop {
    display: none;
  }

  .filter-collapse-mobile {
    display: block;
  }

  .filter-card-mobile {
    margin-top: 8px;
  }

  .filter-form-desktop {
    display: block;
  }
}
</style>
