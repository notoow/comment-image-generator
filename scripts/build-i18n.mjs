import fs from 'node:fs';
const codes=['en','ko','ja','zh_CN','zh_TW','es','fr','de','it','pt_BR','ru','uk','pl','tr','vi','th','id','hi','ta','ar','he','fa'];
const source=JSON.parse(fs.readFileSync('localization/ko.json','utf8'));const keys=Object.keys(source);const catalogs={};
for(const code of codes){const catalog=JSON.parse(fs.readFileSync(`localization/${code}.json`,'utf8'));if(JSON.stringify(Object.keys(catalog).sort())!==JSON.stringify([...keys].sort()))throw Error(`Missing keys: ${code}`);for(const key of keys){if(!catalog[key]?.trim())throw Error(`Empty: ${code} ${key}`);if(JSON.stringify((key.match(/\{\d+\}/g)||[]).sort())!==JSON.stringify((catalog[key].match(/\{\d+\}/g)||[]).sort()))throw Error(`Placeholders: ${code} ${key}`);if(code!=='ko'&&/[가-힣]/.test(catalog[key]))throw Error(`Untranslated Korean: ${code} ${key}`);}catalogs[code]=catalog;}
fs.writeFileSync('localization/catalogs.js','globalThis.CommentMessages='+JSON.stringify(catalogs)+';\n');
console.log(`Validated ${codes.length} locales × ${keys.length} strings, placeholders and untranslated Korean.`);
