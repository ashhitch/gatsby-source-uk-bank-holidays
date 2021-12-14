import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allBankHoliday {
        nodes {
          date
          title
          bunting
          division
          id
          notes
        }
      }
    }
  `);
  return (
    <main>
      <header>
        <h1>
          <span role="img" aria-label="Union Jack emoji">
            🇬🇧&nbsp;
          </span>
          UK Bank Holiday Demo
          <span role="img" aria-label="Union Jack emoji">
            &nbsp; 🇬🇧
          </span>
        </h1>
      </header>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </main>
  );
};

export default IndexPage;
