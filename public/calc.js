export function calculate(m,weight){
 const w=Number(String(weight).replace(',','.'));
 if(!Number.isFinite(w)||w<=0||w>300)return {error:'Ingresá un peso válido entre 0 y 300 kg.'};
 if(m.adminSegun==='Dosis'||m.adminSegun==='Especial1')return {manual:true,text:m.adminSegun==='Especial1'?'Pauta especial: consultar el texto del registro.':'Pauta fija: consultar el texto del registro.',interval:m.cadaHoras};
 const daily=Number(m.dosisPonderal),hours=Number(m.cadaHoras),concentration=Number(m.concentracion),max=Number(m.dosisMaxima);
 if(!['Peso','PesoEv'].includes(m.adminSegun)||![daily,hours,concentration].every(n=>Number.isFinite(n)&&n>0)||hours>24)return {error:'Este registro no contiene una pauta calculable.'};
 const requested=w*daily,limited=max>0&&requested>max,total=limited?max:requested,mg=total/(24/hours),ml=mg/concentration;
 return {mg,ml,hours,total,limited,max,gotes:m.presentacion==='Gotas'?Math.round(ml*20):null,ev:m.adminSegun==='PesoEv'};
}
export const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
