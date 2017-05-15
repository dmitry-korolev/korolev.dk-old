export const fetchTypes = ['FETCH_START', 'FETCH_SUCCESS', 'FETCH_ERROR']
export const updateTypes = ['UPDATE_START', 'UPDATE_SUCCESS', 'UPDATE_ERROR']
export const createTypes = ['CREATE_START', 'CREATE_SUCCESS', 'CREATE_ERROR']
export const deleteTypes = ['DELETE_START', 'DELETE_SUCCESS', 'DELETE_ERROR']
export const allTypes = [
  ...fetchTypes,
  ...updateTypes,
  ...createTypes,
  ...deleteTypes
]
