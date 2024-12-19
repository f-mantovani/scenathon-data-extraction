import { fs, glob, pathToFileURL, type Base } from "./writeHelper";

class Colors {
  fertilizer = 'hsl(60, 70%, 50%)';
  manure_soil = 'hsl(293, 38.70%, 44.10%)';
  manure_pasture = 'hsl(120, 70%, 25%)';
  phosphorous = 'hsl(84, 70%, 65%)';
  historical = 'hsl(240, 70%, 50%)';
  target = '#E3180B';

}

const colors = new Colors();

(async function () {
  const allPaths = await glob('./src/data/store/*-nitro_and_phospho-*.json')

  for await (const path of allPaths) {
    const { pathname } = pathToFileURL(path)
    const file = (await import(pathname)).default

    const final = pathname.split("/").at(-1)
    file.forEach((el: Base, i: number) => {

      if (i === 0) {
        el.title = 'Nitrogen Application'
        el.description = 'Share of nitrogen application by fertilizer and application technique'
        el.axisY = '1000 tonnes'
        el.legend = [
          {
            label: 'Figure description',
            description: 'This figure shows the amount of nitrogen applied to soils and pastures from inorganic and organic sources. While FABLE does not  have direct reduction targets aimed at inorganic mineral fertilizer, we nevertheless see a relative growth of organic, manure-based fertilizer application between 2000 and 2020.'
          },
          {
            key: 'Nitrogen from synthetic fertilizer',
            color: colors.fertilizer,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Nitrogen from manure on soil',
            color: colors.manure_soil,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Nitrogen from manure on pasture',
            color: colors.manure_pasture,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'FABLE target',
            color: colors.target,
            inLegend: true,
            type: 'target'
          }
        ]
        el.keys = ['Nitrogen from synthetic fertilizer', 'Nitrogen from manure on soil', 'Nitrogen from manure on pasture']
        el.data = el.data.map(e => ({
          valueX: e.valueX,
          location: e.location,
          'Nitrogen from synthetic fertilizer': e['Synthetic nitrogen application'],
          'Nitrogen from manure on soil': e['Organic nitrogen application on agricultural soils'],
          'Nitrogen from manure on pasture': e['Nitrogen application through manure left on pasture'],
          targets: e.targets
        }))
      }

      if (i === 1) {
        el.title = 'Phosphorus Application'
        el.description = 'Share of phosphorous application by fertilizer and application technique'
        el.legend = [
          {
            label: 'Figure description',
            description: 'This figure shows the amount of phosphorous applied to soils. While FABLE does not have direct targets related to phosphorous reduction the amount is influenced by the overall mineral fertilizer application.'
          },
          {
            key: 'Total phosphorous',
            color: colors.phosphorous,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Historical value',
            color: colors.historical,
            inLegend: true,
            type: 'historical'
          },
          {
            key: 'FABLE target',
            color: colors.target,
            inLegend: true,
            type: 'target'
          }
        ]
        el.keys = ['Total phosphorous']
        el.axisY = '1000 tonnes'
        el.data.forEach(e => {
          e['Total phosphorous'] = e['Total phosphorus']
          delete e['Total phosphorus']
        })
      }
    })

    await fs.writeFile(`./src/data/tester/${final}`, JSON.stringify(file, null, 2))

  }

})()
