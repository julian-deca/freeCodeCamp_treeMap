d3.select("div").append("h1").attr("id", "title").text("Movie Sales");
d3.select("div")
  .append("h2")
  .attr("id", "description")
  .text("Top 100 Most Sold Movies Games Grouped by Genre");
const w = 1500;
const h = 500;
const padding = 70;
const svg = d3.select("div").append("svg").attr("width", w).attr("height", h);
const div = d3
  .select("div")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);
proceede();

async function getData() {
  return fetch(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
  )
    .then((response) => response.json())
    .then((d) => {
      return d;
    });
}
async function proceede() {
  const movies = await getData();

  const treemap = d3.treemap().size([1000, 500]).paddingOuter(16);
  const root = d3.hierarchy(movies).sum((d) => d.value);
  treemap(root);

  const block = svg.append("g");
  block
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => {
      return "translate(" + [d.x0, d.y0] + ")";
    })
    .attr("class", "group")
    .append("rect")
    .attr("class", (d) => {
      return d.data.category ? "tile" : "genre " + d.data.name;
    })
    .attr("data-name", (d) => {
      return d.data.name;
    })
    .attr("data-category", (d) => {
      return d.data.category;
    })
    .attr("data-value", (d) => {
      return d.data.value;
    })
    .attr("width", (d) => {
      return d.x1 - d.x0;
    })
    .attr("height", (d) => {
      return d.y1 - d.y0;
    });
  console.log(movies);
}
