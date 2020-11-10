# PSPDFKit for Web Example – Webpack

This example uses the Standalone version of [PSPDFKit for Web](https://pspdfkit.com/web/)
distributed as an npm package.

This is a simplified reproduction scenario of an error in `console.log`.
Reproduction steps:
 - Press the `Spawn a signature "dialog"` button at the top to display the "dialog".
 - Draw a signature
 - Press 'Done'
 - Look in the browser console

## Prerequisites

- [Node.js](http://nodejs.org/)
- A PSPDFKit for Web license. If you don't already have one
  you can [request a free trial here](https://pspdfkit.com/try/).

## Getting Started

Install the project dependencies with `npm`:

```bash
npm install
```

Now that everything is installed we need to configure the app to use our [PSPDFKit for Web license key](https://pspdfkit.com/guides/web/current/standalone/integration).

Edit `./config/license-key` and replace the string `YOUR_LICENSE_KEY_GOES_HERE` with the license key that you received via e-mail.

## Running the Example

We are ready to launch the app! 🎉

```bash
npm run start
```

You can now open http://localhost:8080 in your browser and enjoy!

Press the `Spawn a signature "dialog"` button at the top to display the "dialog".

### Development mode

To run the app in development mode run

```bash
npm run start:dev
```

## webpack configuration file

The `webpack` configuration file is located at [./config/webpack.js](config/webpack.js).
