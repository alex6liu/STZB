import settings from 'electron-settings';
import fse from 'fs-extra';
import path from 'path';
// import os from 'os';

// export const docDir = path.join(os.homedir(), 'stzb');
export const docDir = path.join(__dirname, '../../../stzb');
const settingsPath = path.join(docDir, 'settings.json');
fse.ensureFileSync(settingsPath);

settings.setPath(settingsPath);

export default settings;
