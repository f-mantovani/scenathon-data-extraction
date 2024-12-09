// @ts-nocheck
import fs from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { glob } from 'glob'

(async function() {
    const filePaths = await glob('./src/data/store/2023-food_security-*.json')

    for await (const filePath of filePaths) {
        const path = pathToFileURL(filePath)
        const file = (await import(path)).default
        const final = path.pathname.split('/').at(-1)
        for await (const dataStores of file) {
            const grabber = dataStores.data
            const remover = grabber.filter(e => e.valueX !== 'WORLD' && e.location !== 'WORLD')
            dataStores.data = remover
        }
        await fs.writeFile(path, JSON.stringify(file, null, 2))
    }
})()