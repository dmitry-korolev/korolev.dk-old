interface IHeadMeta {
  charset?: string
  'http-equiv'?: 'x-ua-compatible'
  content?: string
  name?: string
}

interface IHeadLink {
  type?: string
  rel?: string
  href: string
}

export interface IApplication {
  title: string
  titleTemplate: string
  head: {
    meta: IHeadMeta[];
    link: IHeadLink[];
  }
  localApi: string
  wpApi: string
  location: {
    basepath: string;
    pathname: string;
    query: object;
    search: string;
  }
}
