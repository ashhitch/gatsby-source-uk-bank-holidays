const fetch = require("node-fetch");
var slugify = require("slugify");

function capitalise(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function replaceAll(str, subStr, newSubStr) {
  if (!subStr) {
    return str;
  }
  return str.split(subStr).join(newSubStr);
}
const slugConfig = {
  replacement: "-", // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: true, // strip special characters except replacement, defaults to `false`
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const response = await fetch(`https://www.gov.uk/bank-holidays.json`);

  const data = await response.json();

  Object.entries(data).forEach(([key, value]) => {
    const division = capitalise(replaceAll(key, "-", " "));
    value.events.forEach((item) => {
      createNode({
        ...item,
        division,
        id: `bh:${key}:${slugify(item.title, slugConfig)}:${slugify(
          item.date,
          slugConfig
        )}`,
        internal: {
          type: "bankHoliday",
          contentDigest: createContentDigest(item),
        },
      });
    });
  });
};
