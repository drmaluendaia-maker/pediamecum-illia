import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
const source=fs.readFileSync(process.argv[2],'utf8'),rows=[];
for(const line of source.split('\n')) if(line.startsWith('addMedicamentoDos(')) vm.runInNewContext(line,{addMedicamentoDos:(...args)=>rows.push(args)},{timeout:100});
const keys=['monodroga','presentacion','concentracion','unidades','adminSegun','dosisPonderal','cadaHoras','dosisMaxima','nombresComerciales'];
const medicines=rows.map((row,i)=>({id:`med-${i+1}`,...Object.fromEntries(keys.map((k,j)=>[k,row[j]]))}));
fs.writeFileSync('public/medicamentos.json',JSON.stringify({source:'https://miregistroclinico.com.ar/vademecum',sourceScript:'https://miregistroclinico.com.ar/scripts/vademecumCalculos.js',importedAt:new Date().toISOString(),sha256:crypto.createHash('sha256').update(source).digest('hex'),medicines},null,2));
console.log(`${medicines.length} registros importados sin cambiar las dosis`);
