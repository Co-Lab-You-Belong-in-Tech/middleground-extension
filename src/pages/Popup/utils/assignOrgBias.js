import { parseUrl } from "./parseUrl";
import Orgs from "../datasets/news_orgs.json";

function assignBias(articles, organizations = Orgs.list) {
  articles = articles.map(function (article) {
    var hostname = parseUrl(article.url);
    var foundOrg = organizations.find((org) => org.hostname === hostname);
    var biasImage;

    if (foundOrg === undefined) {
      return article;
    }

    if (foundOrg.bias === "center") {
      biasImage = "./resources/center_mini.png";
    } else if (foundOrg.bias === "left leaning") {
      biasImage = "./resources/left_mini.png";
    } else {
      biasImage = "./resources/right_mini.png";
    }

    return {
      ...article,
      bias: foundOrg.bias,
      biasImage,
    };
  });

  return articles;
}

export default assignBias;
