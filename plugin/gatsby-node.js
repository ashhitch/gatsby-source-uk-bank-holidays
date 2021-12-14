const fetch = require("node-fetch");

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const response = await fetch(`https://www.gov.uk/bank-holidays.json`);

  const data = await response.json();

  data.response.docs.forEach((item) => {
    createNode({
      ...item,
      id: item._id,
      internal: {
        type: "UkBankHolidays",
        contentDigest: createContentDigest(item),
      },
    });
  });
};
