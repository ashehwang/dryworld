const svg = d3.select("svg.dry-map");

const projection = d3.geoNaturalEarth1();
// const projection = d3.geoEckert4();
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

        const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries)

        countries.features.forEach( d => {
            Object.assign(d.properties, rowById[d.id])
        })

        colorScale.domain(countries.features.map(colorValue))
            .domain(colorScale.domain().sort().reverse())
            .range(d3.schemeYlOrRd[colorScale.domain().length])
            // .range(d3.schemeYlGn[colorScale.domain().length])


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

// const width = +svg2.attr("width");
const width = 550;
const height = 500;
// const height = +svg2.attr("height");

const render = (data, filter) => {
    const margin = { top: 20, right: 20, bottom: 20, left: 80 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const yValue = d => d.water;
    const xValue = d => d.action;

    const filteredData = data.filter( d => d.filter === filter);

    const xScale = d3.scaleBand()
        // .domain(data.filter( d => d.filter === filter).map(xValue))
        // .domain(data.map(xValue))
        .domain(filteredData.map(xValue))
        .range([0, innerWidth])
        .padding(0.1);

    // console.log(xScale.domain())

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, yValue)])
        // .domain([0, d3.max(data, yValue)])
        // .domain([0, data.filter( d => d.filter === filter).d3.max(yValue)])
        .range([innerHeight, 0]);

    const g = svg2.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g').call(d3.axisLeft(yScale));
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
        .attr('id', d => d.id)
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
    let highlight = "lflush"

    let myFilter = document.getElementsByName('filter');

    render(data, selector);

    myFilter.forEach( node => node.addEventListener('change', () => {
        if(node.checked) selector = node.value;
        if(node.checked) highlight = node.id;

        let target = document.querySelector('.water-bars')
        target.innerHTML = ""
        render(data, selector)
        d3.selectAll('rect')
            .transition()
            .duration(2000)
            .style('fill', '#9AB9D5')
            .style('opacity', 0.8)
            // .style('fill', 'url(#gradient)')
        
        let myID = document.getElementById(`${highlight}`);
        console.log(myID)
        // if(node.id === "egg")
        d3.select(`rect#${highlight}`)
            .transition()
            .duration(2000)
            .style('fill', 'red')
            .style('opacity', 0.8)
    }));

    const svg3 = d3.select('svg.pie')
                    // .style("background-color", "pink")
    
    const details = [{ water: "Earth covered with Land", number: 30 }, { water: "Earth covered with Water", number: 68 }, { water: "Water Locked in Glaciers", number: 1.6 }, { water: "Fresh Water for Us to User", number: 0.4 }]
    // const pieColors = d3.scaleOrdinal(d3.schemePastel1)
    const mypieColorScale = d3.scaleOrdinal()
        .domain([30, 68, 0.4, 1.6])
        .range(['#F6F4F5', '#cfddec', 'blue', '#a5c0db'])
        // .range(['#ebf1f7', '#cfddec', '#5185b9', '#a5c0db'])

    // const width3 = +svg3.attr("width");
    // const height3 = +svg3.attr("height");

    const data3 = d3.pie().sort(null).value(function(d){return d.number;})(details);
    // console.log(data3)
    var segments = d3.arc()
                    .innerRadius(0)
                    .outerRadius(200)
                    .padAngle(0.05)
                    .padRadius(50);
    var sections = svg3.append("g").attr("transform", "translate(250, 250)")
                    .selectAll("path").data(data3)
    sections.enter().append("path").attr("d", segments).attr("fill", function(d){return mypieColorScale(d.data.number)})
    var content = d3.select("g").selectAll("text").data(data3);
    content.enter().append('text').each(function(d){
        var center = segments.centroid(d);
        d3.select(this).attr("x", center[0]).attr("y", center[1])
                        // .text(d.data.water);
    })

    var legends = svg3.append('g').attr('transform', 'translate(500, 300)')
                    .selectAll(".legends").data(data3);
    var legend = legends.enter().append('g').classed("legends", true).attr("transform", function(d,i){return "translate(0," +(i+1)*30 + ")";});
    legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function (d) { return mypieColorScale(d.data.number);});
    // legend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d){return colors3(d.data.number);});
    legend.append("text").classed("label", true).text(function(d){
        return d.data.water
    }).attr("fill", function (d) { return mypieColorScale(d.data.number);})
        .attr("x", 30)
        .attr("y", 20);
});

const svg4 = d3.select('svg.waterwater');

// const width4 = +svg4.attr("width");
const width4 = 1160;
const height4 = 500;
// const height4 = +svg4.attr("height");

const render2 = (data) => {
    const margin4 = { top: 20, right: 20, bottom: 20, left: 80 };
    const innerHeight = height4 - margin4.top - margin4.bottom;
    const innerWidth = width4 - margin4.left - margin4.right;
    const yValue = d => d.water;
    const xValue = d => d.country;

    const xScale = d3.scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yValue)])
        .range([innerHeight, 0]);

    const g = svg4.append('g')
        .attr('transform', `translate(${margin4.left}, ${margin4.top})`);

    g.append('g').call(d3.axisLeft(yScale))

    g.append("g")
        .call(d3.axisBottom(xScale))
        .attr("transform", `translate(0, ${innerHeight})`);

    g.selectAll('rect').data(data)
        .enter().append('rect')
        .attr('class', 'bar2')
        .attr('x', d => xScale(d.country))
        .attr('y', d => yScale(d.water))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.water));
};

d3.csv('./src/data2.csv').then(data => {
    data.forEach(d => {
        d.water = +d.water;
    });
    // console.log(data)

    render2(data);

    d3.selectAll('.bar2')
        .style('fill', '#9AB9D5')
})