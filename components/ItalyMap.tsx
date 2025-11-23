import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { StartupLocation, TooltipData } from '../types';

interface ItalyMapProps {
  startups: StartupLocation[];
}

export const ItalyMap: React.FC<ItalyMapProps> = ({ startups }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData>({ x: 0, y: 0, content: '', visible: false });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 600; // Taller for Italy

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto");

    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Centered Italy Projection
    const projection = d3.geoMercator()
      .center([12.5674, 42.4]) // Center of Italy
      .scale(width * 3.5) // Adjust scale 
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Fetch Italy GeoJSON (Regions)
    d3.json('https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson')
      .then((data: any) => {
        
        // Draw Regions
        g.selectAll("path")
          .data(data.features)
          .enter().append("path")
          // @ts-ignore
          .attr("d", path)
          .attr("fill", "#0F355C") // Geeks Blue
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.9);

        // Draw Startups (using canvas logic for performance if needed, but SVG for 1000 is okay-ish in React 18)
        // Group points to avoid DOM overload? 1000 nodes is fine for modern browsers.
        g.selectAll("circle")
          .data(startups)
          .enter().append("circle")
          .attr("cx", (d) => projection([d.location.lng, d.location.lat])?.[0] || 0)
          .attr("cy", (d) => projection([d.location.lng, d.location.lat])?.[1] || 0)
          .attr("r", 2.5)
          .attr("fill", "#FF3333") // Geeks Red
          .attr("opacity", 0.7)
          .on("mouseover", (event) => {
             const rect = containerRef.current?.getBoundingClientRect();
             const offsetX = rect ? rect.left : 0;
             const offsetY = rect ? rect.top : 0;

             setTooltip({
              x: event.clientX - offsetX,
              y: event.clientY - offsetY - 20,
              content: (
                 <div className="bg-geeks-red text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                   Startup Incubata
                 </div>
              ),
              visible: true
            });
            d3.select(event.currentTarget).attr("r", 6).attr("opacity", 1);
          })
          .on("mouseout", (event) => {
            setTooltip(prev => ({ ...prev, visible: false }));
            d3.select(event.currentTarget).attr("r", 2.5).attr("opacity", 0.7);
          });
      });

      // Simple Zoom
      /* 
         Zoom is disabled for the Italy map to keep the layout clean as it is already focused, 
         but can be enabled if requested.
      */

  }, [startups]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 shadow-xl p-4">
       <div className="absolute bottom-4 left-4 z-10 bg-white/90 p-4 rounded-lg shadow border border-gray-100 max-w-xs">
          <h3 className="font-bold text-geeks-blue text-lg mb-1">Ecosistema Italiano</h3>
          <p className="text-sm text-gray-600">
            Oltre <span className="font-bold text-geeks-red">1.000</span> startup supportate da Nord a Sud.
          </p>
       </div>
      <svg ref={svgRef} className="w-full h-full block" />
      {tooltip.visible && (
        <div 
          className="absolute z-50 pointer-events-none"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};