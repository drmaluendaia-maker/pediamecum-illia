import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {calculate,normalize,isEligible} from '../public/calc.js';
const data=JSON.parse(fs.readFileSync(new URL('../public/medicamentos.json',import.meta.url))).medicines;
test('paracetamol: dosis por toma y conversión a gotas',()=>{const m=data.find(m=>m.monodroga==='Paracetamol Gotas');const r=calculate(m,'18,8');assert.equal(r.mg,188);assert.equal(r.ml,1.88);assert.equal(r.gotes,38);});
test('máximo se aplica antes de dividir en tomas',()=>{const r=calculate({adminSegun:'Peso',dosisPonderal:'80',cadaHoras:'8',concentracion:'100',dosisMaxima:'3000'},60);assert.equal(r.mg,1000);assert.equal(r.ml,10);assert.equal(r.total,3000);assert.equal(r.limited,true);});
test('peso inválido nunca genera dosis',()=>{for(const w of ['',0,-1,'abc',Infinity,301])assert.ok(calculate(data[2],w).error);});
test('pautas fijas y especiales requieren consulta',()=>{for(const mode of ['Dosis','Especial1'])assert.equal(calculate({adminSegun:mode},20).manual,true);});
test('todos los registros ponderales producen valores finitos',()=>{for(const m of data.filter(m=>['Peso','PesoEv'].includes(m.adminSegun))){const r=calculate(m,18.8);assert.ok(Number.isFinite(r.mg),m.monodroga);assert.ok(r.ml>0,m.monodroga);}});
test('búsqueda ignora acentos',()=>assert.equal(normalize('Ácido'), 'acido'));

test('paracetamol comprimidos habilitados a 60 kg y ocultos a 18,8 kg',()=>{for(const strength of ['500','1000']){const m=data.find(m=>m.monodroga==='Paracetamol Comprimido'&&m.concentracion===strength);assert.equal(isEligible(m,18.8),false);assert.equal(isEligible(m,29),false);assert.equal(isEligible(m,60),true);assert.ok(calculate(m,18.8).error);const r=calculate(m,60);assert.equal(r.text,'1 comprimido');assert.equal(r.interval,strength==='500'?'6':'8');}});
