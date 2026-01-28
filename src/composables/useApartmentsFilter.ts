import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { Apartment } from '../types/apartment'

type NullableNumber = number | null

export interface FilterState {
  areaFrom: NullableNumber
  areaTo: NullableNumber
  roomsFrom: NullableNumber
  roomsTo: NullableNumber
  address: string
}

export interface FilterErrors {
  areaRange?: string
  roomsRange?: string
}

const FILTERS: FilterState = {
  areaFrom: null,
  areaTo: null,
  roomsFrom: null,
  roomsTo: null,
  address: '',
}

export function useApartmentsFilter(apartments: Apartment[]) {
  const filters = ref<FilterState>({ ...FILTERS })
  const debouncedAddress = ref('')

  let debounceTimer: ReturnType<typeof setTimeout> | undefined

  watch(
    () => filters.value.address,
    (value) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      debounceTimer = setTimeout(() => {
        debouncedAddress.value = value.trim().toLowerCase()
      }, 300)
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
  })

  const areaBounds = computed(() => {
    const areas = apartments.map((item) => item.area)
    return {
      min: Math.min(...areas),
      max: Math.max(...areas),
    }
  })

  const roomsBounds = computed(() => {
    const rooms = apartments.map((item) => item.rooms)
    return {
      min: Math.min(...rooms),
      max: Math.max(...rooms),
    }
  })

  const errors = computed<FilterErrors>(() => {
    const nextErrors: FilterErrors = {}

    const hasAreaFrom = filters.value.areaFrom != null
    const hasAreaTo = filters.value.areaTo != null
    const hasRoomsFrom = filters.value.roomsFrom != null
    const hasRoomsTo = filters.value.roomsTo != null

    const areachecking = hasAreaFrom && hasAreaTo && (filters.value.areaFrom as number) > (filters.value.areaTo as number)

   if (areachecking) nextErrors.areaRange = 'неправильно'


    const roomscheking =
      hasRoomsFrom && hasRoomsTo && (filters.value.roomsFrom as number) > (filters.value.roomsTo as number)

    if (roomscheking) nextErrors.roomsRange = 'неправильно'

    return nextErrors
  })

  const filteredApartments = computed(() => {
    const addressQuery = debouncedAddress.value

    const areaFrom = filters.value.areaFrom
    const areaTo = filters.value.areaTo
    const roomsFrom = filters.value.roomsFrom
    const roomsTo = filters.value.roomsTo

    const areaMin = areaFrom != null && areaTo != null ? Math.min(areaFrom, areaTo) : areaFrom ?? undefined
    const areaMax = areaFrom != null && areaTo != null ? Math.max(areaFrom, areaTo) : areaTo ?? undefined
    const roomsMin = roomsFrom != null && roomsTo != null ? Math.min(roomsFrom, roomsTo) : roomsFrom ?? undefined
    const roomsMax = roomsFrom != null && roomsTo != null ? Math.max(roomsFrom, roomsTo) : roomsTo ?? undefined

    return apartments.filter((apartment) => {
      const inArea =
        (areaMin == null || apartment.area >= areaMin) &&
        (areaMax == null || apartment.area <= areaMax)

      const inRooms =
        (roomsMin == null || apartment.rooms >= roomsMin) &&
        (roomsMax == null || apartment.rooms <= roomsMax)

      const inAddress =
        !addressQuery || apartment.address.toLowerCase().includes(addressQuery)

      return inArea && inRooms && inAddress
    })
  })

  const foundCount = computed(() => filteredApartments.value.length)

  function updateFilters(nextFilters: FilterState) {
    filters.value = nextFilters
  }

  function resetFilters() {
    filters.value = { ...FILTERS }
  }

  return {
    filters,
    errors,
    areaBounds,
    roomsBounds,
    filteredApartments,
    foundCount,
    updateFilters,
    resetFilters,
  }
}

export type UseApartmentsFilterReturn = ReturnType<typeof useApartmentsFilter>