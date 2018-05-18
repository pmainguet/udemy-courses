#!/bin/bash
##Source https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c
#download shp / dbf data
curl -O https://www2.census.gov/geo/tiger/GENZ2016/shp/cb_2016_06_tract_500k.zip
mv cb_2016_06_tract_500k.zip public/images
cd public/images
unzip -o cb_2016_06_tract_500k.zip
#Convert shp/dbf to Geojson
shp2json cb_2016_06_tract_500k.shp -o ca.json
#Project shape and fit it to a box
geoproject 'd3.geoConicEqualArea().parallels([34, 40.5]).rotate([120, 0]).fitSize([960, 960], d)' < ca.json > ca-albers.json
#Convert JSON to NDJSON (newline-delimited JSON) - ndjson-split opposite of ndjson-reduce
ndjson-split 'd.features' < ca-albers.json > ca-albers.ndjson
#add ndjson id
ndjson-map 'd.id = d.properties.GEOID.slice(2), d' < ca-albers.ndjson > ca-albers-id.ndjson
#get data for map (JSON array) and convert it to NDJSON
curl 'https://api.census.gov/data/2014/acs5?get=B01003_001E&for=tract:*&in=state:06' -o cb_2015_06_tract_B01003.json
ndjson-cat cb_2015_06_tract_B01003.json | ndjson-split 'd.slice(1)' | ndjson-map '{id: d[2] + d[3], B01003: +d[0]}' > cb_2015_06_tract_B01003.ndjson
#join the population data with ndjson-join (each line is a two-elt array, first elt = GepKSP? featire, second elt = population estimate)
ndjson-join 'd.id' ca-albers-id.ndjson cb_2015_06_tract_B01003.ndjson > ca-albers-join.ndjson
#compute population density (en square meters)
ndjson-map 'd[0].properties = {density: Math.floor(d[1].B01003 / d[0].properties.ALAND* 2589975.2356)}, d[0]'   < ca-albers-join.ndjson   > ca-albers-density.ndjson
#convert back to GeoJSON
ndjson-reduce < ca-albers-density.ndjson | ndjson-map '{type: "FeatureCollection", features: d}'   > ca-albers-density.json
#generate basic choropleth
ndjson-map -r d3 '(d.properties.fill = d3.scaleSequential(d3.interpolateViridis).domain([0, 4000])(d.properties.density), d)' < ca-albers-density.ndjson > ca-albers-color.ndjson
#convert to TopoJSON via toposimplify and topoquantize to reduce size
geo2topo -n tracts=ca-albers-density.ndjson > ca-tracts-topo.json
toposimplify -p 1 -f < ca-tracts-topo.json > ca-simple-topo.json
topoquantize 1e5 < ca-simple-topo.json > ca-quantized-topo.json
#add internal county boundaries only, from data itself instead of another file
topomerge -k 'd.id.slice(0, 3)' counties=tracts < ca-quantized-topo.json > ca-merge-topo.json
topomerge --mesh -f 'a !== b' counties=counties < ca-merge-topo.json > ca-topo.json
#Use topo2geo to extract the simplified tracts from the topology, pipe to ndjson-map to assign the fill property for each tract, pipe to ndjson-split to break the collection into features, and lastly pipe to geo2svg:
#Simple
#topo2geo tracts=- < ca-topo.json | ndjson-map -r d3 'z = d3.scaleSequential(d3.interpolateViridis).domain([0, 4000]), d.features.forEach(f => f.properties.fill = z(f.properties.density)), d' | ndjson-split 'd.features' > ca-tracts-color.json
#with exponential transform
#topo2geo tracts=- < ca-topo.json | ndjson-map -r d3 'z = d3.scaleSequential(d3.interpolateViridis).domain([0, 100]), d.features.forEach(f => f.properties.fill = z(Math.sqrt(f.properties.density))), d'| ndjson-split 'd.features' > ca-tracts-color.json
#with log transform
#topo2geo tracts=- < ca-topo.json | ndjson-map -r d3 'z = d3.scaleLog().domain(d3.extent(d.features.filter(f => f.properties.density), f => f.properties.density)).interpolate(() => d3.interpolateViridis), d.features.forEach(f => f.properties.fill = z(f.properties.density)), d'| ndjson-split 'd.features' > ca-tracts-color.json
#with quantile
#topo2geo tracts=- < ca-topo.json | ndjson-map -r d3 'z = d3.scaleQuantile().domain(d.features.map(f => f.properties.density)).range(d3.quantize(d3.interpolateViridis, 256)), d.features.forEach(f => f.properties.fill = z(f.properties.density)), d'| ndjson-split 'd.features' > ca-tracts-color.json
#with threshold scale
#topo2geo tracts=- < ca-topo.json | ndjson-map -r d3 -r d3=d3-scale-chromatic 'z = d3.scaleThreshold().domain([1, 10, 50, 200, 500, 1000, 2000, 4000]).range(d3.schemeOrRd[9]), d.features.forEach(f => f.properties.fill = z(f.properties.density)), d'| ndjson-split 'd.features' > ca-tracts-color.json
#with threshold scale and county border
(topo2geo tracts=- < ca-topo.json | ndjson-map -r d3 -r d3=d3-scale-chromatic 'z = d3.scaleThreshold().domain([1, 10, 50, 200, 500, 1000, 2000, 4000]).range(d3.schemeOrRd[9]), d.features.forEach(f => f.properties.fill = z(f.properties.density)), d' | ndjson-split 'd.features'; topo2geo counties=- < ca-topo.json | ndjson-map 'd.properties = {"stroke": "#000", "stroke-opacity": 0.3}, d') > ca-tracts-color.json
#view data in svg
geo2svg -n --stroke none -p 1 -w 960 -h 960 < ca-tracts-color.json > topo.svg

# Insert the legend.
sed -i '$d' topo.svg
tail -n +4 < legend.svg >> topo.svg

xviewer topo.svg &