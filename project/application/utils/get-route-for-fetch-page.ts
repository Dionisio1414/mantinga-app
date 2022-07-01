import { LANGUAGES } from '~/constants/languages'

export default function getRouteForFetchPage(path: string): string {
    const pathArray = path.split('/').filter((p: string) => p.length);

    for (let i = 0; i < LANGUAGES.length; i++) {
        if (pathArray[0] === LANGUAGES[i].code) {
            pathArray.splice(0, 1);
            break
        }
    }

    return pathArray[0]
}