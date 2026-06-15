const fs = require('fs');
const content = fs.readFileSync('/Users/canalbayrak/.gemini/antigravity-ide/brain/a9db596e-14a8-41d0-883d-c33142340639/.system_generated/steps/3605/content.md', 'utf8');

const match = content.match(/data-page="([^"]+)"/);
if (match && match[1]) {
  try {
    const rawStr = match[1].replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    const dataPage = JSON.parse(rawStr);
    
    console.log('Props keys:', Object.keys(dataPage.props));
    
    // check if galleries exist somewhere
    if (dataPage.props.eventGalleries) {
       console.log('Found eventGalleries:', dataPage.props.eventGalleries.length);
       console.log(JSON.stringify(dataPage.props.eventGalleries, null, 2));
    }
    
    // check if it's inside some other object
    for (const key of Object.keys(dataPage.props)) {
      if (Array.isArray(dataPage.props[key]) && key.toLowerCase().includes('galler')) {
        console.log(`Found array ${key}:`, dataPage.props[key].length);
        console.log(JSON.stringify(dataPage.props[key], null, 2));
      }
    }
  } catch (e) {
    console.error(e);
  }
}
