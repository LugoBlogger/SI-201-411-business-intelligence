import HTMLParser from "node-html-parser"


function getVersionAndDate(htmlBody, releaseVersionAndDate) {
  const root = HTMLParser.parse(htmlBody);
  // console.log(root);

  let linkPrimaryLinkClassAttr = "Link--primary Link";
  linkPrimaryLinkClassAttr = "." + (linkPrimaryLinkClassAttr.replaceAll(" ", "."));
  let releaseVersion = root.querySelectorAll(linkPrimaryLinkClassAttr);
  // console.log(releaseVersion.length);
  releaseVersion = releaseVersion.map(
    elem => elem.childNodes[0]["_rawText"])
  // console.log(releaseVersion[0].childNodes[0]["_rawText"])
  console.log(releaseVersion);

  let sectionTagName = "section"
  let sectionElem = root.getElementsByTagName(sectionTagName);
  let relativeTimeTagName = "relative-time";
  let releaseDate = sectionElem.map(
    elem => elem.getElementsByTagName(relativeTimeTagName));
  // console.log(releaseDate.length);
  // console.log(releaseDate[0][0])
  releaseDate = releaseDate.map(
    elem => elem[0]["_attrs"]["datetime"])
  releaseDate = releaseDate.map(
    elem => (new Date(elem).toUTCString()))
  console.log(releaseDate);

  releaseVersionAndDate["date"].push(releaseDate);
  releaseVersionAndDate["version"].push(releaseVersion);
}

function c1(response) {
  console.log(response.status);
  if (!response.ok) { return null; }

  // console.log(response.headers.get("content-type"));
  let p4 = response.text();
  // console.log(p4);
  return p4;
}

function c2(htmlBody) {
  if (htmlBody) { getVersionAndDate(htmlBody); }
  else {
    // If we got a 404 error above and returned null, we end up here
    console.log("The link is not correct.");
  }
}

function c3(err) {
  // console.log(err)
  if (err instanceof TypeError) { console.log("getVersionAndDate() failed to parse"); }
  else {
    // This must be some kind of unanticipated error
    console.log(err);
  }
}

const repoName = "grafana/grafana";

let githubReleasePage = `https://github.com/${repoName}/releases?`;
let releaseVersionAndDate = {
  "date": [],
  "version": []
}

let pageCounter = 1;
while (true) {
  githubReleasePage = githubReleasePage + `page=${pageCounter}`;
  let p1 = fetch(githubReleasePage)
    .then(c1)
    .then(htmlBody => c2(htmlBody, releaseVersionAndDate))
    .catch(c3)
  
  pageCounter += 1;

  if (pageCounter > 2) { break; }
}
