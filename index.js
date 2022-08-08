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
  const fullData = await getData();
  const action = fullData.children[0];
  const drama = fullData.children[1];
  const adventure = fullData.children[2];
  const family = fullData.children[3];
  const animation = fullData.children[4];
  const comedy = fullData.children[5];
  const biography = fullData.children[6];

  const block = svg.append("g");
  console.log(action);
  block
    .selectAll("g")
    .data(fullData.children)
    .enter()
    .append("g")
    .attr("genre", (d) => d.name)
    .selectAll("rect")
    .data((d) => d.children)
    .enter()
    .append("rect")
    .attr("width", 250)
    .attr("height", 250)
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
  console.log(fullData);
}
