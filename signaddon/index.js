
var signAddon = require('sign-addon').default;

var endv=process.argv[2]||'0.0.2-ra02';

var defined={
  xpiPath: 'C:/Users/Esteban.SOTILLO/Documents/GitHub/ZMov/extffox_rebuild/zmov-ext.xpi',
  version: endv,
  apiKey: 'user:12674328:459',
  apiSecret: '69b79b43138de2ed09e9ffb2b8530b0d530344b4c0fd84de90ae049621d606e2',
  id: 'zmov-ext-x'/*+endv*/+'@westixy',
  downloadDir: 'C:/Users/Esteban.SOTILLO/Documents/GitHub/ZMov/signaddon/release',
}

console.log('sign-version : '+defined.version);
console.log('sign-id : '+defined.id);

signAddon(defined)
  .then(function(result) {
    console.log();
    if (result.success) {
      console.log("The following signed files were downloaded:");
      console.log(result.downloadedFiles);
      console.log("Your extension ID is:");
      console.log(result.id);
    } else {
      console.error("Your add-on could not be signed!");
      console.error("Check the console for details.");
    }
    console.log(result.success ? "SUCCESS" : "FAIL");
  })
  .catch(function(error) {
    console.error("Signing error:", error);
  });


  /*
  {
    // Required arguments:

    xpiPath: 'C:/Users/Esteban.SOTILLO/Documents/MAW/ZMov/extffox_rebuild/zmov-ext.xpi',
    version: endv,
    apiKey: 'user:12674328:459',
    apiSecret: '69b79b43138de2ed09e9ffb2b8530b0d530344b4c0fd84de90ae049621d606e2',

    // Optional arguments:

    // The explicit extension ID.
    // WebExtensions do not require an ID.
    // See the notes below about dealing with IDs.
      id: 'zmov-ext-v'+endv+'@westixy',
    // Save downloaded files to this directory.
    // Default: current working directory.
      downloadDir: 'C:/Users/Esteban.SOTILLO/Documents/MAW/ZMov/signaddon/release',
    // Number of milleseconds to wait before aborting the request.
    // Default: 2 minutes.
      //timeout: undefined,
    // Optional proxy to use for all API requests,
    // such as "http://yourproxy:6000"
      //apiProxy: undefined,
    // Optional object to pass to request() for additional configuration.
    // Some properties such as 'url' cannot be defined here.
    // Available options:
    // https://github.com/request/request#requestoptions-callback
      //apiRequestConfig: undefined,
    // Optional override to the number of seconds until the JWT token for
    // the API request expires. This must match the expiration time that
    // the API server accepts.
      //apiJwtExpiresIn: undefined,
  } */
