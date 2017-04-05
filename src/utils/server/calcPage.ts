const calcPage = (itemsPerPage: number, page: number): any => ({
    $skip: (itemsPerPage * page) - itemsPerPage,
    $limit: itemsPerPage
});

export {
    calcPage
}
