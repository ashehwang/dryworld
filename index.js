const svg = d3.select("svg");

// const width = +svg.attr("width");
// const height = +svg.attr("height");

// const projection = d3.geoNaturalEarth1();
const projection = d3.geoEckert4();
const pathGenerator = d3.geoPath().projection(projection)

const g = svg.append('g')

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}))

svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform)
}));

const colorScale = d3.scaleOrdinal();
const colorValue = d => d.properties.risk

Promise.all([
    // d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
    d3.tsv('./src/waterdata.tsv'),
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
]).then(([tsvData, topoJSONdata]) => {
        const rowById = {};
        tsvData.forEach( d => {
            rowById[d.iso_n3] = d;
        })

        const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries)

        countries.features.forEach( d => {
            Object.assign(d.properties, rowById[d.id])
        })

        colorScale.domain(countries.features.map(colorValue))
            .domain(colorScale.domain().sort().reverse())
            // .range(d3.schemeSpectral[colorScale.domain().length])
            .range(d3.schemeYlOrRd[colorScale.domain().length])
            
        console.log(colorScale.domain().sort())

        g.selectAll('path')
            .data(countries.features)
            .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .attr('fill', d => colorScale(colorValue(d)))
            .append('title')
                .text(d => d.properties.name + ': ' + colorValue(d))
})