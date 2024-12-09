import { fs, glob, pathToFileURL, type Base } from './writeHelper.js'
import { queryResponse as gwfData } from './gwfDef.js'

class Colors {
  biodiversity = "hsl(240, 70%, 50%)";
  gain = "hsl(120, 70%, 50%)";
  loss = "hsl(15, 70%, 50%)";
  net = "hsl(240, 70%, 50%)";
  gwf = "hsl(340, 70%, 80%)";
  pasture = this.biodiversity;
  cropland = 'hsl(120, 70%, 50%)';
  mature = 'hsl(30, 70%, 50%)';
  new = 'hsl(180, 70%, 50%)';
  other_natural = 'hsl(0, 70%, 50%)';
  urban = 'hsl(240, 70%, 25%';
  forest = this.mature;
  natural_land = this.new;
  crop_pasture = this.pasture;
}

const colors = new Colors();

(async function () {
  const allFiles = await glob('./src/data/store/2023-land-CT-Yes.json')

  for await (const filePath of allFiles) {
    const { pathname } = pathToFileURL(filePath)
    const file = (await import(pathname)).default

    const final = pathname.split('/').at(-1)
    const year = Number(final?.split('-')[0])

    file.forEach((el: Base, i: number) => {
      if (year == 2019) {
        // Rows 78, 79, 80, 81 and 82
        if (i == 0) {
          // Row 78
          el.title = 'Biodiversity';
          el.description = 'Sum of forests share plus non-managed non-forest land in country land area'
          el.legend = [{
            key: 'Biodiversity land',
            color: colors.biodiversity,
            inLegend: true,
            inGraph: true,
          }]
          el.data.forEach((e) => {
            e['Biodiversity land'] = e.biodiversity
            delete e.biodiversity
          })
          el.keys = ['Biodiversity land']
        }

        if (i == 1) {
          // Rows 79, 80, 81 and 82
          el.title = 'Net Forest Cover Change'
          el.keys = ['Forest gain', 'Forest loss']
          el.legend = [
            {
              label: 'Figure description',
              description: 'Forest losses are driven by cropland, pasture and/or urban expansion and forest gains by due to afforestation or reforestation. Net forest change is the sum of gains and losses in total forest cover. Results are given per 5-year periods (2005 corresponds to years 2001 to 2005).'
            },
            {
              key: "Forest gain",
              color: colors.gain,
              inLegend: true,
              inGraph: true,
              description: 'Loss in mature forests'
            },
            {
              key: "Forest loss",
              color: colors.loss,
              inLegend: true,
              inGraph: true,
              description: 'Afforested or reforested areas'
            },
            {
              key: 'Net forest change',
              type: 'lower',
              color: colors.net,
              inLegend: true,
            },
            {
              key: "GWF deforestation",
              color: colors.gwf,
              inLegend: true,
              description: 'Global forest watch deforestation data',
              type: 'upper',
            }
          ]
          el.data.forEach((e) => {
            const gwf = gwfData.find(a => a.year === e.valueX)
            e['Net forest change'] = e.lowerBound
            delete e.lowerBound
            if (Number(gwf?.GFW_deforestation_global)) {
              e['GWF deforestation'] = Number(gwf?.GFW_deforestation_global)
            }
          })
          el.axisY = 'Million hectares'
        }
        // Closing for 2019
      }

      if (year == 2020 || year == 2021) {
        // Rows 32 to 47
        if (i == 0) {
          // Rows 42, 43, 44, 45, 46 and 47
          el.title = 'Land Cover'
          el.description = 'Evolution of the land cover from 2000 to 2050'
          el.legend = [
            {
              label: 'Figure description',
              description: 'The figure show the evolution of land cover over the period.'
            },
            {
              key: 'Pasture',
              color: colors.pasture,
              inGraph: true,
              inLegend: true
            },
            {
              key: 'Cropland',
              color: colors.cropland,
              inGraph: true,
              inLegend: true
            },
            {
              key: 'Mature forest',
              color: colors.mature,
              inGraph: true,
              inLegend: true,
              description: 'Forest cover present from 2000'
            },
            {
              key: 'New forest',
              color: colors.new,
              inGraph: true,
              inLegend: true,
              description: 'Afforested or reforested areas'
            },
            {
              key: 'Other natural land',
              color: colors.other_natural,
              inGraph: true,
              inLegend: true
            },
            {
              key: 'Urban area',
              color: colors.urban,
              inGraph: true,
              inLegend: true
            }
          ]
          el.keys = ['Pasture', 'Cropland', 'Mature forest', 'New forest', 'Other natural land', 'Urban area']
          el.data.forEach(e => {
            e['Mature forest'] = e.Forest
            delete e.Forest

            e['Other natural land'] = e['Other Land']
            delete e['Other Land']

            e['Urban area'] = e.Urban
            delete e.Urban

            e['New forest'] = e['New Forest']
            delete e['New Forest']
          })
        }

        if (i == 1) {
          el.title = 'Land inside protected areas'
          el.description = 'Evolution of land under protected areas (PA), from 2000 to 2050 differentiating per land cover type'
          el.axisY = 'Million hectares'
          el.notes = 'Historical values come from WDPA. Values from 2000 to 2010 are constant to the 2010 level.'
          el.legend = [
            {
              label: 'Figure description',
              description: 'The figure show the total land under protected areas as reported by WDPA.'
            },
            {
              key: 'Forest',
              color: colors.forest,
              inGraph: true,
              inLegend: true,
              description: 'PA in forest'
            },
            {
              key: 'Natural land',
              color: colors.natural_land,
              inGraph: true,
              inLegend: true,
              description: 'PA in other natural land'
            },
            {
              key: 'Cropland and pasture',
              color: colors.crop_pasture,
              inGraph: true,
              inLegend: true,
              description: 'PA in cropland and pasture'
            }
          ]
          el.keys = ['Forest', 'Natural land', 'Cropland and pasture']
          el.data = el.data.map(e => ({
            valueX: e.valueX,
            Forest: e['Protected Areas Forest'],
            'Natural land': e['Protected Areas Other Natural'],
            'Cropland and pasture': e['Protected Areas Other']
          }))
        }

        if (i == 2) {
          // Row 38
          // needs confirmation, the text seems to be incorrect
          el.title = 'Biodiversity by Country'
          // el.description = 'Evolution of the share of land where natural processes predominate (LNPP), i.e. area where there is low human interruption and biodiveristy can flourish, from 2000 to 2050'
          // el.notes = 'Historical values are computed by the FABLE Secretariat. Values from 2000 to 2010 are constant to the 2010 level. '
          // el.axisY = 'Percentage of LNPP over total land'
        }

        if (i == 3) {
          // Rows 32, 33, 34, 35 and 36
          el.title = 'Net Forest Cover Change'
          el.description = 'Evolution of cumulative forest losses and gains globally from 2000 to 2050.'
          el.legend = [
            {
              label: 'Figure description',
              description: 'Forest losses are driven by cropland, pasture and/or urban expansion and forest gains by due to afforestation or reforestation. Net forest change is the sum of gains and losses in total forest cover. Results are given per 5-year periods (2005 corresponds to years 2001 to 2005).'
            },
            {
              key: 'Forest gain',
              description: 'Afforested or reforested areas',
              color: colors.gain,
              inGraph: true,
              inLegend: true
            },
            {
              key: 'Forest loss',
              description: 'Loss in mature forests',
              color: colors.loss,
              inGraph: true,
              inLegend: true
            },
            {
              key: 'Net forest change',
              color: colors.net,
              inLegend: true,
              type: 'lower'
            }
          ]
          el.data.forEach((e) => {
            e['Net forest change'] = e.lowerBound
            delete e.lowerBound
          })
          el.axisY = 'Million hectares'
        }

        if (i == 4) {
          el.title = 'Net Forest Cover Change by Country'
          el.description = 'Contribution by country to net forest change.'
        }

        // Closing for the 2020 / 2021
      }

      if (year == 2023) {
        console.log(el.title)
        // Rows 9 to 24
        if (i == 0) {
          // Rows 15, 16, 17, 18, 19 and 20
          el.title = 'Land inside protected areas or OECMs'
          el.description = 'Evolution of land under protected areas (PA) or Other Effective Conservation Measures (OECM), from 2000 to 2050 differentiating per land cover type'
          el.notes = 'Historical values come from WDPA. Values from 2000 to 2010 are constant to the 2010 level.'
          el.legend = [
            {
              label: 'Figure description',
              description: 'The figure show the total land under protected areas or Other Effectice Conservation Measures (OECM) as reported by WDPA. We do not disagregate OECM per land cover type. According to the Kunming-Montreal Global Biodiversity Framework, we should aim at 30% of terristerial land under PA or OECM by 2030.'
            },
            {
              key: 'Forest',
              color: colors.forest,
              inGraph: true,
              inLegend: true,
              description: 'PA in forest'
            },
            {
              key: 'Natural land',
              color: colors.natural_land,
              inGraph: true,
              inLegend: true,
              description: 'PA in other natural land'
            },
            {
              key: 'Cropland and pasture',
              color: colors.crop_pasture,
              inGraph: true,
              inLegend: true,
              description: 'PA in cropland and pasture'
            },
            {
              key: 'All under OECM',
              color: colors.other_natural,
              inGraph: true,
              inLegend: true,
              description: 'Land under OECM whatever the land cover type'
            }
          ]
          el.data = el.data.map((e) => ({
            location: e.location,
            valueX: e.valueX,
            Forest: e['Forest protected areas'],
            'Natural land': e['Other natural protected areas'],
            'Cropland and pasture': e['Other protected areas'],
            'All under OECM': e['OECM areas'],
            targets: e.targets
          }))
          el.keys = ['Forest', 'Natural land', 'Cropland and pasture', 'All under OECM']

          el.axisY = 'Million hectares'
        }

        if (i == 1) {
          // Rows 9, 10, 11, 12, 13, 14
          el.title = 'Land where natural processes predominate'
          el.description = 'Evolution of land where natural processes predominate (LNPP), i.e. area where there is low human interruption and biodiveristy can flourish, from 2000 to 2050 differentiating per land cover type'
          el.notes = 'Historical values are computed by the FABLE Secretariat. Values from 2000 to 2010 are constant to the 2010 level. '
          el.axisY = 'Million hectares'
          el.legend = [
            {
              label: 'Figure description',
              description: 'The figure shows the total land where natural processes predominate (LNPP) outside productive land. LNPP is a metric created by FABLE to represent areas where biodivesity can naturally flourish. It includes low impact area (Jacobson et al, 2019), key biodiversity areas (BirdLife International 2019) and intact forest landscapes (Potapov et al, 2017). Mature forest and natural areas refer to forest and natural areas that were already present in 2000 while new forest and natural areas refers to afforested or reforested areas and abandonned agricultural land from 2000 onwards. According to the Kunming-Montreal Global Biodiversity Framework, we should aim at no loss in mature LNPP and a 15% increase in total LNPP by 2050.'
            },
            {
              key: 'Mature forest',
              color: colors.mature,
              inGraph: true,
              inLegend: true,
              description: 'LNPP in mature forest'
            },
            {
              key: 'Mature natural land',
              color: colors.other_natural,
              inGraph: true,
              inLegend: true,
              description: 'LNPP in mature other natural land'
            },
            {
              key: 'New forest',
              color: colors.new,
              inGraph: true,
              inLegend: true,
              description: 'LNPP in new forest'
            },
            {
              key: 'New natural land',
              color: colors.biodiversity,
              inGraph: true,
              inLegend: true,
              description: 'LNPP in new other natural land'
            }
          ]

          el.data = el.data.map((e) => ({
            valueX: e.valueX,
            location: e.location,
            'Mature forest': e['Mature forest'],
            'Mature natural land': e['Other mature land'],
            'New forest': e['New forest'],
            'New natural land': e['Other new land'],
            targets: e.targets
          }))
          el.keys = ['Mature forest', 'Mature natural land', 'New forest', 'New natural land']
          // closinng 1
        }

        if (i == 2) {
          // Row 21
          el.title = 'Land under forest cover'
          el.legend = [
            {
              label: 'Figure description',
              description: 'Mature forest refers to forest areas that were already present in 2000. The global objective is to have zero deforestation in mature forest areas from 2030 onwards. In the FABLE Calculator, forest loss is driven by cropland, pasture and/or urban expansion.'
            },
            {
              key: 'Mature forests',
              color: colors.mature,
              inGraph: true,
              inLegend: true,
            }
          ]
          el.keys = ['Mature forests']
          el.data = el.data.map(e => ({
            valueX: e.valueX,
            location: e.location,
            'Mature forests': e['Forest loss']
          }))
        }

        if (i == 3) {
          // Rows 22, 23, 24
        }
      }


      // This is the closing for the forEach
    })
    await fs.writeFile(`./src/data/tester/${final}`,
      JSON.stringify(file, null, 2))
  }
  console.log('Done with that one')
})()

//  Done: add the gwf deforestation data for 2019
// => Even if we have in 2020 and 2021 as legend items we don't have the data on the query
