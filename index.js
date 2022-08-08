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

  console.log(movies);
  const valueScale = d3
    .scaleLinear()
    .domain([
      d3.min(movies.children, (d) => {
        return d.children.reduce((a, e) => {
          return e.value < a.value ? e : a;
        }).value;
      }),
      d3.max(movies.children, (d) => {
        return d.children.reduce((a, e) => {
          return e.value > a.value ? e : a;
        });
      }).value,
    ])
    .range([padding, 300]);

  console.log();

  const block = svg.append("g");
  block
    .selectAll("g")
    .data(movies.children)
    .enter()
    .append("g")
    .attr("genre", (d) => d.name)
    .selectAll("rect")
    .data((d) => d.children)
    .enter()
    .append("rect")
    .attr("width", (d) => valueScale(d.value) / 2)
    .attr("height", (d) => valueScale(d.value) / 2)
    .attr("x", 250)
    .attr("y", 250);

  /*.selectAll("rect")
    .data(fullData.children)
    .enter()
    .append("rect")
    .attr("width", 250)
    .attr("height", 250)
    .attr("x", 250)
    .attr("y", 250);*/
}
