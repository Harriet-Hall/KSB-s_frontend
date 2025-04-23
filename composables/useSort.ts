import { ref } from 'vue';
import _ from 'lodash';
import type { Ksb } from '~/types';

/**
 * Composable to handle sorting of a list of objects.
 * @param {Array} initialKsbsData - The initial unsorted ksb data from the api
 * @returns {Object} - A reactive list and a handleSort function to sort ksbs.
 */
export function useSort(initialKsbsData: Ksb[]) {
  const ksbList = ref(initialKsbsData);


  const handleSort = (property: string) => {
    if (property === "updated-at") {
      ksbList.value = initialKsbsData;  
    } else {
      ksbList.value = _.orderBy(ksbList.value, [property], ["asc"]);  
    }
  };

  return {
    ksbList,
    handleSort,
  };
}
