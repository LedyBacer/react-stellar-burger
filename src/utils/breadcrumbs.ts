type TBreadCrumb = { path: string; url: string; title: string };
type TBreadCrumbsState = Array<TBreadCrumb>;

export const isContainRoute = (state: TBreadCrumbsState, route: string) => state.some(({ url }) => url === route);

// export const removeRemainingCrumbs = (state: TBreadCrumbsState, url: string) => {
//     const index = state.findIndex(({ url: route }) => route === url);
//     return state.slice(0, index);
// };

// export const HOME_CRUMB = { path: '/', url: '/', title: 'Home' };