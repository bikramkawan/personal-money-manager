/**
 * Created by bikramkawan on 9/7/17.
 */
import React, {Component} from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3'

class D3BarChart extends Component {


    componentDidMount() {

        var chartDiv = document.querySelector(".myChart");
        console.log(chartDiv.clientWidth, chartDiv.clientHeight)
        let height = chartDiv.clientHeight;
        let width = chartDiv.clientWidth;
        const selector = this.props.selector;
        // d3.select('.' + selector).append('div').text('hfasfasfaelloe')


        var svg = d3.select('.' + selector).append('svg').attr('width', width).attr('height', height)
        const margin = {top: 10, right: 20, bottom: 30, left: 50};
        width = +svg.attr("width") - margin.left - margin.right;
        height = +svg.attr("height") - margin.top - margin.bottom;

        var tooltip = d3.select(".app").append("div").attr("class", "toolTip");

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);


        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const data = this.props.data;

        x.domain(data.map(function (d) {
            return d.name;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(5).tickFormat(function (d) {
                return parseInt(d / 1000) + "K";
            }).tickSizeInner([-width]))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .attr("fill", "#5D6971")


        g.selectAll(".bar")
            .data(data)
            .enter().append("rect").classed('bar--positive', true)
            .attr("x", function (d) {
                return x(d.name);
            })
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return height - y(d.value);
            })

            .on("mousemove", function (d) {
                tooltip
                    .style("left", d3.event.pageX +10  + "px")
                    .style("top", d3.event.pageY + 10 + "px")
                    .style("display", "inline-block")
                    .html((d.label) + "<br>" + (d.value));
            })
            .on("mouseout", function (d) {
               tooltip.style("display", "none");
            });


    }

    renderChart() {


    }

    render() {

        return (<div></div>)


    }


}


export default D3BarChart