const { URL, parse, UrlWithStringQuery } = require('url');

type BaseURLPath = string | undefined

export class Utils {

    public static getBaseURLPath(urlInput: BaseURLPath): string {
        if(urlInput) {
            //const { href, host, pathname, protocol } = new URL(`http://localhost:3000${urlInput}`)
            //console.log(`href = ${href}\nhost=${host}\npathname=${pathname}\nprotocol=${protocol}`)
            const basePath = urlInput.split('/')[1]
            console.log('The basePath is ' + basePath)
            return basePath
        }
        return ''
    }

    public static getURLParameters(url: string): typeof UrlWithStringQuery | undefined  {
        if(url) {
            return parse(url, true)
        } else {
            return undefined
        }
    }

}

