const svg = d3.select("svg.dry-map");

// const projection = d3.geoNaturalEarth1();
const projection = d3.geoEckert4();
const pathGenerator = d3.geoPath().projection(projection)

const g = svg.append('g')

g.append('path')
    .attr('class', 'sphere')
    // .attr('d', pathGenerator({type: 'Sphere'}))

svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform)
}));

const colorScale = d3.scaleOrdinal();
const colorValue = d => d.properties.risk

Promise.all([
    d3.tsv('./src/fullwaterdata.tsv'),
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
]).then(([tsvData, topoJSONdata]) => {
        const rowById = {};
        tsvData.forEach( d => {
            rowById[d.iso_n3] = d;
        })

        console.log(topoJSONdata)

        const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries)

        countries.features.forEach( d => {
            Object.assign(d.properties, rowById[d.id])
        })

        colorScale.domain(countries.features.map(colorValue))
            .domain(colorScale.domain().sort().reverse())
            .range(d3.schemeYlOrRd[colorScale.domain().length])
            // .range(d3.schemeYlGn[colorScale.domain().length])
            
        console.log(colorScale.domain().sort())

        const myColorScale = d3.scaleOrdinal()
            .domain(["", "Low", "Low-Medium", "Medium-High", "High", "Extremely High"])
            .range(['white', '#ffff99', '#ffe600', '#ff9900', '#ff1900', '#9a0500'])

        g.selectAll('path')
            .data(countries.features)
            .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                // .attr('fill', d => colorScale(colorValue(d)))
                .attr('fill', d => myColorScale(colorValue(d)))
            .append('title')
                .text(d => d.properties.name + ': ' + colorValue(d) + ' Risk')
})

const svg2 = d3.select('svg.water-bars')

const width = +svg2.attr("width");
const height = +svg2.attr("height");

const render = (data, filter) => {
    const margin = { top: 20, right: 20, bottom: 20, left: 80 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const yValue = d => d.water;
    const xValue = d => d.action;

    const filteredData = data.filter( d => d.filter === filter)

    const xScale = d3.scaleBand()
        // .domain(data.filter( d => d.filter === filter).map(xValue))
        // .domain(data.map(xValue))
        .domain(filteredData.map(xValue))
        .range([0, innerWidth])
        .padding(0.1);

    console.log(xScale.domain())

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, yValue)])
        // .domain([0, d3.max(data, yValue)])
        // .domain([0, data.filter( d => d.filter === filter).d3.max(yValue)])
        .range([innerHeight, 0]);

    const g = svg2.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g').call(d3.axisLeft(yScale))
    // .tickSize(10)
    // .tickFormat('.3s')
    // .select('.domain')
    // .remove();

    g.append("g")
        .call(d3.axisBottom(xScale))
        .attr("transform", `translate(0, ${innerHeight})`);
    //   .append('text')
    //     .attr('y', 0)
    //     .attr('fill', 'black')
    //     .text('water spent in gallons')
    // .selectAll('.domain, .tick line')
    // .remove();

    g.selectAll('rect').data(filteredData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.action))
        .attr('y', d => yScale(d.water))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.water));
};

d3.csv('./src/data.csv').then(data => {
    data.forEach(d => {
        d.water = +d.water;
    });

    let selector = "flush";
    let myFilter = document.getElementsByName('filter');
    console.log(myFilter)

    render(data, selector);

    myFilter.forEach( node => node.addEventListener('change', () => {
        if(node.checked) selector = node.value;
        let target = document.querySelector('.water-bars')
        target.innerHTML = ""
        render(data, selector)
        d3.selectAll('rect')
            .transition()
            .duration(2000)
            .style('fill', '#9AB9D5')
            // .style('fill', 'url(#gradient)')
        // console.log(node)
    }));

    console.log(selector)

});