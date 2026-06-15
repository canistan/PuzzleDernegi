const fs = require('fs');
const content = fs.readFileSync('/Users/canalbayrak/.gemini/antigravity-ide/brain/a9db596e-14a8-41d0-883d-c33142340639/.system_generated/steps/3605/content.md', 'utf8');

const match = content.match(/data-page="([^"]+)"/);
if (match && match[1]) {
  try {
    const rawStr = match[1].replace(/&quot;/g, '"');
    const dataPage = JSON.parse(rawStr);
    
    // Look for gallery or event details
    const event = dataPage.props.event;
    if (event) {
      console.log('Event Name:', event.name_tr || event.name);
      if (event.gallery) {
        console.log('Gallery:', JSON.stringify(event.gallery, null, 2));
      } else {
        console.log('No gallery array found in event');
        // Let's dump keys of event to see what it has
        console.log('Event Keys:', Object.keys(event));
      }
    } else {
      console.log('No event found in props');
      console.log('Props:', Object.keys(dataPage.props));
    }
  } catch (e) {
    console.error('Error parsing JSON:', e.message);
  }
} else {
  console.log('No data-page found');
}
