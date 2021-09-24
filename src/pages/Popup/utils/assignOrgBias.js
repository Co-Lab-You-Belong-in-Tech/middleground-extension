import { parseUrl } from "./parseUrl";
import Orgs from "../datasets/news_orgs.json";

function assignBias(articles, organizations = Orgs.list) {
  articles = articles.map(function (article) {
    const hostname = parseUrl(article.url);
    // TODO: some organizations are yet to be entered in the news_orgs.json file eg: www.bbc.co.uk
    var foundOrg = organizations.find((org) => org.hostname === hostname);
    console.log(foundOrg, "is the found org", hostname, "is the hostname");
    var biasImage;
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
