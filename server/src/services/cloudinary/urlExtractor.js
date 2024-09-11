export function urlExtractor(url) {
  const urlArray = url.split("/");
  const fileNameWithExtension = urlArray.pop();
  const filename = fileNameWithExtension.split(".")[0];
  const folder = urlArray.pop();
  return `${folder}/${filename}`;
}
