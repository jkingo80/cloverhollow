// App Store links with campaign tracking, so App Store Connect › App Analytics
// shows which channel each download came from.
//
// Paste your provider token below. Find it in App Store Connect › Apps ›
// Clover Hollow › App Analytics › Acquisition › Campaigns › "Generate Campaign
// Link": it is the number after pt= in the generated link. Until it is set,
// downloads through these links still show up under the Web Referrer source
// "jkingo80.github.io", just not split by campaign.
var CH_PROVIDER_TOKEN = "";
var CH_APP_URL = "https://apps.apple.com/app/apple-store/id6816351436";

function chStoreUrl(campaign) {
  var q = ["mt=8"];
  if (CH_PROVIDER_TOKEN) q.unshift("pt=" + encodeURIComponent(CH_PROVIDER_TOKEN));
  if (campaign) q.push("ct=" + encodeURIComponent(campaign));
  return CH_APP_URL + "?" + q.join("&");
}

// Any link marked data-ct="name" gets that campaign. On links.html the
// campaign can also come from the page URL, e.g. links.html?ct=tiktok.
document.addEventListener("DOMContentLoaded", function () {
  var fromUrl = new URLSearchParams(location.search).get("ct");
  document.querySelectorAll("a[data-ct]").forEach(function (a) {
    a.href = chStoreUrl(fromUrl || a.getAttribute("data-ct"));
  });
});
