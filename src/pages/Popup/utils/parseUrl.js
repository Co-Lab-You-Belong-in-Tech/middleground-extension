import Orgs from "../datasets/news_orgs.json";

function parseUrl(url) {
  return new URL(url).hostname;
}

function matchOrganization(pageUrl, organizations = Orgs.list) {
  var parsedUrl = new URL(pageUrl);
  var hostname = parsedUrl.hostname;

  var foundOrg = organizations.find((org) => org.hostname === hostname);
  if (foundOrg === undefined) return "not found";
  return foundOrg;
}

export { parseUrl, matchOrganization };
