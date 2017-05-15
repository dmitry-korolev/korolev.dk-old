export const postUrlTemplate = (id: string): string => `/post/${id}/`
export const pageUrlTemplate = (id: string): string => `/${id}/`
export const tagUrlTemplate = (id: string): string => `/archive/${id}/`
export const paginatedTemplate =
  (id: string | number): (a: string) => string =>
    (url: string): string => `${url}page/${id}/`

export const pageRegExp = /\/page\/\d*\/?/
