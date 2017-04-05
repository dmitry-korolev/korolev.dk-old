interface IPaginateOptions {
    default: number;
    max?: number;
}

export type IPaginate = IPaginateOptions | false;
