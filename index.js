d3.select("div").append("h1").attr("id", "title").text("Movie Sales");
d3.select("div")
  .append("h2")
  .attr("id", "description")
  .text("Top 100 Most Sold Movies Games Grouped by Genre");
const w = 1500;
const h = 700;
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

  const treemap = d3.treemap().size([1500, 700]).padding(1);
  const root = d3.hierarchy(movies).sum((d) => d.value);
  treemap(root);

  const block = svg
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => {
      return "translate(" + [d.x0, d.y0] + ")";
    })
    .attr("class", "group");

  block
    .append("rect")
    .attr("class", (d) => {
      return d.data.category ? "tile" : "genre";
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
    })
    .attr("fill", (d) => {
      if (d.data.category) {
        const cat = d.data.category.toLowerCase();

        switch (cat) {
          case "action":
            return "rgb(247, 153, 109)";
          case "drama":
            return "rgb(193, 245, 108)";
          case "adventure":
            return "rgb(190, 120, 255)";
          case "family":
            return "rgb(70, 120, 255)";
          case "animation":
            return "rgb(30, 190, 220)";
          case "comedy":
            return "rgb(250, 200, 100)";
          case "biography":
            return "rgb(200, 70, 150)";
        }
      }
      return "black";
    });

  block
    .append("foreignObject")
    .attr("width", (d) => {
      return d.x1 - d.x0;
    })
    .attr("height", (d) => {
      return d.y1 - d.y0;
    })
    .attr("display", "flex")
    .attr("flex-wrap", "wrap")
    .append("xhtml:div")
    .style("font", "13px 'Helvetica Neue'")
    .html((d) => {
      return d.data.name;
    });

  console.log(movies);
}
