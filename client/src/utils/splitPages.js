import { File } from "@pdftron/webviewer-react-toolkit";
/**
 * Takes a file at `source` and splits it into an array of `File`, one for each
 * page of the original file.
 * @param source The source of the file to split.
 */
export async function splitPages(source) {
  const newFiles = [];
  const document = await window.CoreControls.createDocument(source);
  // Here, we split up the loaded PDF into multiple files, one for each page.
  for (let i = 1; i <= document.getPageCount(); i++) {
    newFiles.push();
  }
  return newFiles;
}
