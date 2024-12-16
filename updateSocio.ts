import { fs, glob, pathToFileURL, type Base } from "./writeHelper";

class Colors {
  rice = 'hsl(240, 70%, 50%)';
  sugar = 'hsl(120, 70%, 50%)';
  roots = 'hsl(0, 70%, 50%)';
  wheat = 'hsl(60, 70%, 50%)';
  legumes = 'hsl(300, 70%, 50%)';
  vegetables_oils = 'hsl(180, 70%, 50%)';
  other_grains = 'hsl(0, 70%, 25%)';
  soybeans = 'hsl(120, 70%, 25%)';
  nuts_seeds = 'hsl(240, 70%, 25%)';
  maize = 'hsl(35, 70%, 40%)';
  hello = 'hsl(30, 70%, 65%)';
  hey = 'hsl(0, 70 %, 30 %)';
}

const colors = new Colors();

(async function () {
  const allPaths = await glob('./src/data/store/2023-socioeconomics-CT-Yes.json')


  for await (const path of allPaths) {
    const { pathname } = pathToFileURL(path)
    const file = (await import(pathname)).default

    file.forEach((el: Base, i: number) => {
      if (i === 0) {
        el.title = 'Employment in Agriculture'
        el.description = 'Employment by EAT Food groups'
        el.axisY = 'Million FTE'
        el.legend = [
          {
            label: 'Figure description',
            description: 'This figure shows the employment in the agriculture sector by EAT food commodities. Full time employment in the agriculture sector are calculated in FABLE for each scenario in an ex-post fashion. Data on full time employment equivalents stem mainly from the international labor organisation (ILO); labor requirement captures differences in regional crop and livestock management systems.  The data is also used in the total wage calculation  of the FABLE costing module'
          },
          {
            key: 'Rice',
            color: colors.rice,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Sugar',
            color: colors.sugar,
            inGraph: true,
            inLegend: true,
          },
          {
            key: 'Roots',
            color: colors.roots,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Wheat',
            color: colors.wheat,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Legumes',
            color: colors.legumes,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Vegetable&Oils',
            color: colors.vegetables_oils,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Other grains',
            color: colors.other_grains,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Soybeans',
            color: colors.soybeans,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Nuts and Seeds',
            color: colors.nuts_seeds,
            inGraph: true,
            inLegend: true
          },
          {
            key: 'Maize',
            color: colors.maize,
            inGraph: true,
            inLegend: true
          },
        ]

        el.axisY = 'Million FTE'
        el.keys = ['Rice',
          'Sugar',
          'Roots',
          'Wheat',
          'Legumes',
          'Vegetable&Oils',
          'Other grains',
          'Soybeans',
          'Nuts and Seeds',
          'Maize'
        ]

        el.data = el.data.map(e => {
          const newObj = {
            valueX: e.valueX,
            location: e.location,
            Rice: e.Rice,
            Sugar: e.Sugar,
            Wheat: e.Wheat,
            Legumes: e.Legumes,
            'Vegetable&Oils': e['Vegetable oil'],
            'Other grains': e['Other grains'],
            Soybeans: e.Soybeans,
            'Nuts and Seeds': e['Nuts and seeds'],
            Maize: e.Maize
          }
          return newObj
        })
      }

      if (i === 2) {
        el.data.forEach(e => {
          e.Crops = e['Crop: Number of Full Time Equivalent workers']
          e.Livestock = e['Livestock: Number of Full Time Equivalent workers']

          delete e['Livestock: Number of Full Time Equivalent workers']
          delete e['Crop: Number of Full Time Equivalent workers']
        })
        el.keys = ['Livestock', 'Crops']
      }
    })


      ;[file[1], file[2]] = [file[2], file[1]]

    const final = pathname.split('/').at(-1)
    await fs.writeFile(`./src/data/tester/${final}`, JSON.stringify(file, null, 2))
  }
})()
