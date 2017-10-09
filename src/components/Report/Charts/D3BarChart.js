/**
 * Created by bikramkawan on 9/7/17.
 */
import React, {Component} from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3'

class D3BarChart extends Component {


    componentDidMount() {
        var chartDiv = document.querySelector(".myChart");
        let height = chartDiv.clientHeight;
        let width = chartDiv.clientWidth;
        const selector = this.props.selector;
        // d3.select('.' + selector).append('div').text('hfasfasfaelloe')

        d3.selectAll('svg').remove();
        var svg = d3.select('.' + selector).append('svg').attr('width', width).attr('height', height)
        const margin = {top: 10, right: 20, bottom: 30, left: 50};
        width = +svg.attr("width") - margin.left - margin.right;
        height = +svg.attr("height") - margin.top - margin.bottom;


        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);


        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const data = this.props.data;

        x.domain(data.map((d) =>d.name));
        y.domain([0, d3.max(data, (d) => d.value)]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y)
                .ticks(5, 's')
                .tickSizeInner([-width]))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .attr("fill", "red")


        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr('class', (d)=> `bar--positive  ${d.class}`)
            .attr("x", (d) => x(d.name))
            .attr("y", (d)=>y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.value))
            .append('title')
            .text((d) => d.value.toFixed(2))


    }

    renderChart() {


    }

    render() {

        return (<div></div>)


    }


}


export default D3BarChart