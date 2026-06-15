const fs = require('fs');

const content = fs.readFileSync('/Users/canalbayrak/.gemini/antigravity-ide/brain/a9db596e-14a8-41d0-883d-c33142340639/.system_generated/steps/3605/content.md', 'utf8');
const match = content.match(/data-page="([^"]+)"/);
if (match && match[1]) {
  const rawStr = match[1].replace(/&quot;/g, '"').replace(/&#039;/g, "'");
  const dataPage = JSON.parse(rawStr);
  const albums = dataPage.props.albumsWithPhotos || [];
  if (albums.length > 0 && albums[0].photos.length > 0) {
    console.log('Photo keys:', Object.keys(albums[0].photos[0]));
    console.log('Sample photo:', albums[0].photos[0]);
  }
}
