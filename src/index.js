/**
 * Application entry file.
 *
 * We create a drag and drop area and a file picker that are used to load PDFs.
 * Once a PDF is dropped or selected we read it from disk as an ArrayBuffer
 * which we can then pass to PSPDFKit.load() to initialize the viewer with the given PDF.
 *
 * We also add an `Export PDF` button to the main toolbar and monitor changes to
 * inform the users when they are about to leave the page or open a new document
 * and there is unsaved(exported) work.
 */

import PSPDFKit from "pspdfkit";

let currentInstance = null;
let isAlreadyLoaded = false;

const EMPTY_PDF = new TextEncoder().encode(`%PDF-1.0
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 750 1000]>>endobj
xref
0 4
0000000000 65535 f
0000000010 00000 n
0000000053 00000 n
0000000102 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
149
%EOF`);

function destroy() {
  console.info("Destroyed previous instance");
  isAlreadyLoaded = false;
  PSPDFKit.unload(".App");
}

/**
 * Main load function invoked when a dropped or selected file (PDF)
 * has been successfully read as ArrayBuffer.
 *
 * If there is an existing running instance of PSPDFKit it is destroyed
 * before a creating a new one.
 */
function load() {
  if (isAlreadyLoaded) {
    destroy();
  }

  isAlreadyLoaded = true;

  const configuration = {
    container: ".App",
    document: EMPTY_PDF.buffer,
    licenseKey: process.env.PSPDFKIT_LICENSE_KEY,
    initialViewState: new PSPDFKit.ViewState({
      interactionMode: PSPDFKit.InteractionMode.INK_SIGNATURE,
      showToolbar: false,
    })
  };

  PSPDFKit.load(configuration)
    .then((instance) => {
      currentInstance = instance;
      let value;
      const resultPromise = new Promise((resolve) => {
        instance.addEventListener("annotations.create", (annotations) => {
          console.log("annotations.create");
          if (isAlreadyLoaded) {
            const annotation = annotations.first();
            if (
              annotation instanceof PSPDFKit.Annotations.InkAnnotation &&
              annotation.isSignature
            ) {
              value = PSPDFKit.Annotations.toSerializableObject(annotation);
            }
          }
        });
        instance.addEventListener("viewState.change", () => {
          if (isAlreadyLoaded) {
            console.log("viewState.change");
            resolve(value);
          }
        });
      });
      return resultPromise;
    })
    .then((value) => {
      destroy();
      return value;
    })
    .then(console.log)
    .catch(console.error);
}

document.querySelector("#spawn-btn").addEventListener("click", load);
