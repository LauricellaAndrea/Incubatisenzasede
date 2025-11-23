import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { Person, TooltipData } from '../types';

interface WorldMapProps {
  people: Person[];
}

export const WorldMap: React.FC<WorldMapProps> = ({ people }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData>({ x: 0, y: 0, content: '', visible: false });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500; // Fixed height

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto");

    svg.selectAll("*").remove(); // Clear previous render

    const g = svg.append("g");

    // Projection
    const projection = d3.geoMercator()
      .scale(width / 6.5) // Adjust scale based on width
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Fetch World Data
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((data: any) => {
        const countries = topojson.feature(data, data.objects.countries);

        // Draw Countries
        g.selectAll("path")
          // @ts-ignore
          .data(countries.features)
          .enter().append("path")
          // @ts-ignore
          .attr("d", path)
          .attr("fill", "#E5E7EB") // Tailwind gray-200
          .attr("stroke", "#FFFFFF")
          .attr("stroke-width", 0.5)
          .style("transition", "fill 0.3s")
          .on("mouseover", function() {
            d3.select(this).attr("fill", "#D1D5DB"); // Tailwind gray-300
          })
          .on("mouseout", function() {
            d3.select(this).attr("fill", "#E5E7EB");
          });

        // Draw Team Points
        g.selectAll("circle")
          .data(people)
          .enter().append("circle")
          .attr("cx", (d) => projection([d.location.lng, d.location.lat])?.[0] || 0)
          .attr("cy", (d) => projection([d.location.lng, d.location.lat])?.[1] || 0)
          .attr("r", 4)
          .attr("fill", "#FF3333") // Geeks Red
          .attr("stroke", "#FFFFFF")
          .attr("stroke-width", 1)
          .style("cursor", "pointer")
          .on("mouseover", (event, d) => {
             // Improve tooltip positioning relative to viewport
             const rect = containerRef.current?.getBoundingClientRect();
             const offsetX = rect ? rect.left : 0;
             const offsetY = rect ? rect.top : 0;
             
             setTooltip({
              x: event.clientX - offsetX + 10,
              y: event.clientY - offsetY - 40,
              content: (
                <div className="bg-white p-3 rounded shadow-lg border border-gray-100 text-sm">
                  <p className="font-bold text-geeks-blue">{d.name}</p>
                  <p className="text-gray-500 text-xs">{d.city}</p>
                </div>
              ),
              visible: true
            });
            
            d3.select(event.currentTarget)
              .transition().duration(200)
              .attr("r", 8);
          })
          .on("mouseout", (event) => {
            setTooltip(prev => ({ ...prev, visible: false }));
            d3.select(event.currentTarget)
              .transition().duration(200)
              .attr("r", 4);
          });
      });

      // Zoom capability
      const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

      svg.call(zoom);

  }, [people]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-blue-50/30 rounded-xl border border-blue-100 shadow-inner">
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-sm z-10 text-xs text-gray-500">
        Usa lo scroll per zoomare
      </div>
      <svg ref={svgRef} className="w-full h-full block" />
      {tooltip.visible && (
        <div 
          className="absolute z-50 pointer-events-none transition-opacity duration-200"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};