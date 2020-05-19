const injectScript = (file_path, type = "script", tag = "html") => {
  var node = document.getElementsByTagName(tag)[0];
  var tag_type = type == "link" ? "link" : "script";
  var script = document.createElement(tag_type);
  if (type == "script") {
    script.setAttribute("type", "text/javascript");
  } else if (type == "module") {
    script.setAttribute("type", "module");
  } else {
    script.setAttribute("rel", "stylesheet");
    script.setAttribute("media", "screen");
  }

  script.setAttribute(tag_type == "script" ? "src" : "href", file_path);

  node.appendChild(script);
};

(async () => {
  // Inject script into page
  injectScript(chrome.runtime.getURL("script.js"), "script", "html");
})();
