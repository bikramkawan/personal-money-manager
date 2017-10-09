/**
 * Created by bikramkawan on 9/7/17.
 */
import React, {Component} from 'react';
import * as d3 from 'd3'

class D3BarNegative extends Component {
    componentDidMount() {
        var chartDiv = document.querySelector(".myChart");
        let height = chartDiv.clientHeight;
        let width = chartDiv.clientWidth;

        var margin = {top: 20, right: 20, bottom: 40, left: 15};
        height = height - margin.top - margin.bottom;
        width = width - margin.left - margin.right;

// Add svg to
        d3.selectAll('svg').remove();
        var svg = d3.select('.myChart').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// X scale
        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleBand().rangeRound([height, 0]);

        var xAxis = d3.axisBottom(x).ticks(5, 's');
        var yAxis = d3.axisLeft(y).tickSize(1, 0);


        var data = this.props.data;

        x.domain(d3.extent(data, d=> d.value))
        y.domain(data.map(d=>d.name));

        svg.selectAll('.barChart')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', (d) => "barChart bar--" + (d.value < 0 ? "negative" : "positive"))
            .attr('x', (d)=> x(Math.min(0, d.value)))
            .attr('y', (d)=>y(d.name))
            .attr('width', (d) => Math.abs(x(d.value) - x(0)))
            .attr('height', 80)
            .append('title')
            .text((d) => d.value)

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        var tickNegative = svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + x(0) + ',0)')
            .call(yAxis).selectAll('.tick')
            .filter((d, i) => data[i].value < 0);

        tickNegative.select('line')
            .attr('x2', 6);

        tickNegative.select('text')
            .attr('x', 9).style('text-anchor', 'start');


    }

    renderChart() {


    }

    render() {

        return (<div></div>)


    }


}


export default D3BarNegative