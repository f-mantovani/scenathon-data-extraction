// @ts-nocheck

import {glob} from 'glob'
import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

(async function(){
    const filePaths = await glob('./src/data/store/20[0-9][0-9]-trade-*.json')
    

    for await (const file of filePaths) {
        const fileToImport = pathToFileURL(file)
        const imported = (await import(fileToImport)).default

        imported.forEach((e) => {
            if (e.title.toLowerCase().includes('import')) {
                e.importation = true
            } else {
                e.importation = false
            }
        })

        await fs.writeFile(fileToImport, JSON.stringify(imported, null, 2))
    }
    console.log('done')
})()