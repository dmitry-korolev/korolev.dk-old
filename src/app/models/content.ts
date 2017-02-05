export interface IPost {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    type: 'post';
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    author: number;
    featured_media: number;
    comment_status: 'open' | 'closed';
    ping_status: 'open' | 'closed';
    sticky: boolean;
    format: string;
    categories: number[];
    tags: number[];
}

export interface ICategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    _links: {
        self: [
            {
                href: string;
            }
        ];
        collection: [
            {
                href: string;
            }
        ];
        about: [
            {
                href: string
            }
        ];
        'wp:post_type': [
            {
                href: string;
            }
        ];
        curies: [
            {
                name: string;
                href: string;
                templated: true;
            }
        ];
    };
}

export interface IContent {
    posts: Map<number, IPost>;
    categories: Map<number, ICategory>;
}
