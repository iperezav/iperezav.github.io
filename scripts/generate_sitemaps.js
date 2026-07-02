const fs = require("fs");
const path = require("path");
const vm = require("vm");

const BASE_URL = "https://iperezav.github.io";

const photosJs = fs.readFileSync(path.join(__dirname, "..", "photos.js"), "utf8");
const sandbox = {};
vm.runInNewContext(
  photosJs.split("function renderPhotoAlbums")[0] +
    "\nthis.photoAlbums = photoAlbums;\nthis.getPhotoMetadata = getPhotoMetadata;",
  sandbox
);
const photoAlbums = sandbox.photoAlbums;
const getPhotoMetadata = sandbox.getPhotoMetadata;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const sitePages = [
  { loc: BASE_URL + "/", changefreq: "monthly", priority: "1.0" },
  { loc: BASE_URL + "/photos.html", changefreq: "monthly", priority: "0.8" },
  { loc: BASE_URL + "/blog/index.html", changefreq: "monthly", priority: "0.6" },
  { loc: BASE_URL + "/blog/P1/opt1.html", changefreq: "yearly", priority: "0.5" },
  { loc: BASE_URL + "/blog/P2/CSCP1.html", changefreq: "yearly", priority: "0.5" },
  { loc: BASE_URL + "/blog/P3/COVModelling.html", changefreq: "yearly", priority: "0.5" }
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
];

sitePages.forEach(function (page) {
  sitemap.push("  <url>");
  sitemap.push("    <loc>" + escapeXml(page.loc) + "</loc>");
  sitemap.push("    <changefreq>" + page.changefreq + "</changefreq>");
  sitemap.push("    <priority>" + page.priority + "</priority>");
  sitemap.push("  </url>");
});

sitemap.push("</urlset>");

const imageSitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  "  <url>",
  "    <loc>" + escapeXml(BASE_URL + "/photos.html") + "</loc>"
];

photoAlbums.forEach(function (album) {
  album.images.forEach(function (photo) {
    const metadata = getPhotoMetadata(photo, album);
    const imageLoc = BASE_URL + "/img/" + album.folder + "/" + photo.file;
    imageSitemap.push("    <image:image>");
    imageSitemap.push("      <image:loc>" + escapeXml(imageLoc) + "</image:loc>");
    imageSitemap.push("      <image:title>" + escapeXml(metadata.title) + "</image:title>");
    imageSitemap.push("      <image:caption>" + escapeXml(metadata.description) + "</image:caption>");
    imageSitemap.push("    </image:image>");
  });
});

imageSitemap.push("  </url>");
imageSitemap.push("</urlset>");

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "Sitemap: " + BASE_URL + "/sitemap.xml",
  "Sitemap: " + BASE_URL + "/image-sitemap.xml"
].join("\n");

const root = path.join(__dirname, "..");
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap.join("\n") + "\n", "utf8");
fs.writeFileSync(path.join(root, "image-sitemap.xml"), imageSitemap.join("\n") + "\n", "utf8");
fs.writeFileSync(path.join(root, "robots.txt"), robots + "\n", "utf8");

console.log("Generated sitemap.xml, image-sitemap.xml, and robots.txt");
