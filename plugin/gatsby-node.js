const fetch = require("node-fetch");
var slugify = require("slugify");

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

  data["england-and-wales"].events.forEach((item) => {
    createNode({
      ...item,
      division: "England and Wales",
      id: `bh:england-and-wales:${slugify(item.title, slugConfig)}:${slugify(
        item.date,
        slugConfig
      )}`,
      internal: {
        type: "bankHoliday",
        contentDigest: createContentDigest(item),
      },
    });
  });
  data["scotland"].events.forEach((item) => {
    createNode({
      ...item,
      division: "Scotland",
      id: `bh:scotland:${slugify(item.title, slugConfig)}:${slugify(
        item.date,
        slugConfig
      )}`,
      internal: {
        type: "bankHoliday",
        contentDigest: createContentDigest(item),
      },
    });
  });
  data["northern-ireland"].events.forEach((item) => {
    createNode({
      ...item,
      division: "Northern Ireland",
      id: `bh:northern-ireland:${slugify(item.title, slugConfig)}:${slugify(
        item.date,
        slugConfig
      )}`,
      internal: {
        type: "bankHoliday",
        contentDigest: createContentDigest(item),
      },
    });
  });
};
