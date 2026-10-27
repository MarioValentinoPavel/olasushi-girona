// Carta real de Olasushi (Glovo, octubre 2026). Ingredientes por clave para traducirlos a ES / CA / EN.
window.ING = {
  salmon: ['salmón', 'salmó', 'salmon'], tuna: ['atún', 'tonyina', 'tuna'], prawn: ['langostino', 'llagostí', 'prawn'], bprawn: ['langostino rebozado', 'llagostí arrebossat', 'breaded prawn'],
  avo: ['aguacate', 'alvocat', 'avocado'], cheese: ['queso crema', 'formatge cremós', 'cream cheese'], mango: ['mango', 'mango', 'mango'], straw: ['fresa', 'maduixa', 'strawberry'],
  cuc: ['pepino', 'cogombre', 'cucumber'], surimi: ['surimi', 'surimi', 'surimi'], eel: ['anguila', 'anguila', 'eel'], bchick: ['pollo rebozado', 'pollastre arrebossat', 'breaded chicken'],
  apple: ['manzana', 'poma', 'apple'], tobiko: ['tobiko', 'tobiko', 'tobiko'], sesame: ['sésamo', 'sèsam', 'sesame'], onion: ['cebolla frita', 'ceba fregida', 'fried onion'],
  fsalmon: ['salmón flambeado', 'salmó flamejat', 'seared salmon'], favo: ['aguacate flambeado', 'alvocat flamejat', 'seared avocado'], edamame: ['edamame', 'edamame', 'edamame'], wakame: ['wakame', 'wakame', 'wakame'],
  rice: ['arroz', 'arròs', 'rice'], yuzu: ['salsa yuzu', 'salsa yuzu', 'yuzu sauce'], eelsauce: ['salsa de anguila', 'salsa d’anguila', 'eel sauce'], hm: ['salsa miel y mostaza', 'salsa de mel i mostassa', 'honey mustard sauce'],
  tempura: ['rebozado tempura', 'arrebossat tempura', 'tempura coating'], veg: ['verduras', 'verdures', 'vegetables'], beef: ['ternera', 'vedella', 'beef'], chick: ['pollo', 'pollastre', 'chicken'],
  ponzu: ['ponzu', 'ponzu', 'ponzu'], yakiniku: ['salsa yakiniku', 'salsa yakiniku', 'yakiniku sauce'], octo: ['pulpo', 'pop', 'octopus'], greens: ['mezclum', 'enciam variat', 'mixed leaves'],
  cherry: ['tomate cherry', 'tomàquet cherry', 'cherry tomato'], tonkatsu: ['salsa tonkatsu', 'salsa tonkatsu', 'tonkatsu sauce'], yakis: ['salsa yakisoba', 'salsa yakisoba', 'yakisoba sauce'], nori: ['alga nori', 'alga nori', 'nori']
};
// pieza = color del relleno en el corte del maki
window.MENU = [
  { k: 'ent', sn: ['Entrantes', 'Entrants', 'Starters'], n: ['Entrantes y pokes', 'Entrants i pokes', 'Starters and pokes'], fill: ['#6fae4a', '#a7d36b'], items: [
    ['Poke Tuna', 'tuna avo edamame wakame sesame', 13.95, 'poke-tuna'], ['Poke Salmón', 'salmon avo edamame wakame sesame', 12.95, 'poke-salmon'],
    ['Poke Avocado Mango', 'mango avo cuc edamame sesame', 11.95, 'poke-mango'], ['Tarta Salmón', 'rice avo salmon sesame yuzu', 12.95, 'tarta-salmon'],
    ['Mango Fresh', 'greens mango cherry hm', 8.95], ['Gyoza de gambas (6)', 'prawn veg', 8.50, 'gyoza-gambas'], ['Gyoza de pollo (6)', 'chick veg', 7.50],
    ['Stick pollo', 'bchick tonkatsu', 8.50], ['Takoyakis (5)', 'octo', 7.95, 'takoyaki'], ['Wakame', 'wakame', 6.50], ['Edamame', 'edamame', 5.95, 'edamame'],
    ['Harumakis de verduras (8)', 'veg', 5.50], ['Pan chino frito (4)', '', 4.50]] },
  { k: 'nig', sn: ['Nigiris', 'Nigiris', 'Nigiri'], n: ['Nigiris', 'Nigiris', 'Nigiri'], fill: ['#f2804a', '#ffb07a'], items: [
    ['Nigiri de atún flambeado (6)', 'tuna rice', 13.50, 'nigiri-atun-flameado'], ['Nigiri de anguila (6)', 'eel rice', 13.50, 'nigiri-anguila'], ['Nigiri de atún (6)', 'tuna rice', 12.50],
    ['Nigiri ebi flambeado (6)', 'prawn rice', 12.50, 'nigiri-ebi-flameado'], ['Nigiri ebi (6)', 'prawn rice', 11.50], ['Nigiri de salmón flambeado (6)', 'salmon rice', 11.50, 'nigiri-salmon-flameado'],
    ['Nigiri variado (6)', 'salmon tuna prawn', 11.50, 'nigiri-variado'], ['Nigiri de salmón (6)', 'salmon rice', 10.50]] },
  { k: 'sas', sn: ['Sashimi', 'Sashimi', 'Sashimi'], n: ['Sashimi y tataki', 'Sashimi i tataki', 'Sashimi and tataki'], fill: ['#c8283a', '#e8505e'], items: [
    ['Sashimi variado (10)', 'salmon tuna', 14.95, 'sashimi-variado'], ['Sashimi de atún (8)', 'tuna', 13.50, 'sashimi-atun'], ['Sashimi de salmón (8)', 'salmon', 10.95],
    ['Tataki de atún (8)', 'tuna avo sesame yakiniku ponzu', 14.95, 'tataki-atun'], ['Tataki de salmón (8)', 'salmon avo sesame yakiniku ponzu', 12.95, 'tataki-salmon']] },
  { k: 'mak', sn: ['Makis', 'Makis', 'Maki'], n: ['Makis', 'Makis', 'Maki'], fill: ['#7bbf6a', '#d8f0b0'], items: [
    ['Salmón Croc (10)', 'salmon avo hm tempura', 13.50, 'salmon-croc'], ['Ebi Fu (10)', 'bprawn avo cheese eelsauce', 12.95, 'ebi-fu'], ['Avocadito (10)', 'salmon avo cheese eelsauce tempura', 12.50, 'avocadito'],
    ['Maki de anguila (8)', 'eel nori', 7.50], ['Maki de pollo rebozado (8)', 'bchick nori', 7.50], ['Maki de langostino rebozado (8)', 'bprawn nori', 7.50], ['Maki de atún (8)', 'tuna nori', 6.75],
    ['Maki de salmón (8)', 'salmon nori', 6.25], ['Maki de langostino (8)', 'prawn nori', 6.25], ['Maki de aguacate (8)', 'avo nori', 5.50], ['Maki de pepino (8)', 'cuc nori', 5.50],
    ['Maki de surimi (8)', 'surimi nori', 5.50], ['Maki de mango (8)', 'mango nori', 5.50], ['Maki de queso crema (8)', 'cheese nori', 5.50]] },
  { k: 'ura', sn: ['Uramakis', 'Uramakis', 'Uramaki'], n: ['Uramakis', 'Uramakis', 'Uramaki'], fill: ['#f6b73c', '#ffe08a'], items: [
    ['Uramaki 13', 'bchick cheese mango tuna', 14.50], ['Uramaki 20', 'tuna avo', 14.50], ['Uramaki 11', 'salmon prawn avo tobiko', 14.00, 'uramaki-11'],
    ['Uramaki 8', 'fsalmon avo', 13.95, 'uramaki-8'], ['Uramaki 9', 'favo cuc surimi prawn', 13.95], ['Uramaki 10', 'salmon bprawn avo', 13.95, 'uramaki-10'],
    ['Uramaki 14', 'bprawn avo mango eel', 13.95, 'uramaki-14'], ['Uramaki 15', 'bprawn avo eel', 13.95], ['Uramaki 16', 'surimi cuc avo eel', 13.95], ['Uramaki 17', 'bprawn apple avo', 13.95],
    ['Uramaki 18', 'bprawn apple salmon', 13.95], ['Uramaki 3', 'salmon mango cheese', 13.50], ['Uramaki 4', 'salmon straw cheese', 13.50, 'uramaki-4'], ['Uramaki 5', 'salmon avo', 13.50],
    ['Uramaki 6', 'salmon avo cuc', 13.50], ['Uramaki 7', 'salmon avo cheese', 13.50], ['Uramaki 2', 'salmon straw', 12.95], ['Uramaki 1', 'salmon mango', 12.50],
    ['Uramaki 19', 'avo cuc mango apple', 11.95], ['Uramaki 12', 'avo bchick onion', 10.95]] },
  { k: 'tem', sn: ['Temakis', 'Temakis', 'Temaki'], n: ['Temakis y california', 'Temakis i california', 'Temaki and California'], fill: ['#3f8f3a', '#f3efe2'], items: [
    ['Temaki de atún y aguacate', 'tuna avo rice', 6.95], ['Temaki de anguila y aguacate', 'eel avo rice', 6.95], ['Temaki de salmón y aguacate', 'salmon avo rice', 6.50, 'temaki-salmon'],
    ['Temaki de langostino y aguacate', 'prawn avo rice', 6.50], ['Temaki de pollo rebozado y aguacate', 'bchick avo rice', 6.50], ['Temaki de langostino rebozado y aguacate', 'bprawn avo rice', 6.50],
    ['California de atún', 'tuna avo sesame', 9.95], ['California de salmón y queso', 'salmon avo cheese sesame', 9.95], ['California de salmón', 'salmon avo sesame', 9.50, 'california-salmon'], ['California surimi', 'surimi avo cuc sesame', 8.50]] },
  { k: 'wok', sn: ['Wok', 'Wok', 'Wok'], n: ['Yakisoba y yakiudon', 'Yakisoba i yakiudon', 'Yakisoba and yaki udon'], fill: ['#c98a3a', '#ecc37a'], items: [
    ['Yakisoba de gamba', 'prawn veg yakis', 8.95, 'yakisoba-gamba'], ['Yakisoba de pollo', 'chick veg yakis', 8.50], ['Yakisoba de ternera', 'beef veg yakis', 8.50], ['Yakisoba de verduras', 'veg yakis', 8.00],
    ['Yakiudon de gamba', 'prawn veg yakis', 8.95], ['Yakiudon de pollo', 'chick veg yakis', 8.50], ['Yakiudon de ternera', 'beef veg yakis', 8.50, 'yakiudon-ternera'], ['Yakiudon de verduras', 'veg yakis', 8.00]] },
  { k: 'com', sn: ['Combinados', 'Combinats', 'Platters'], n: ['Combinados', 'Combinats', 'Platters'], fill: ['#f2804a', '#c8283a'], items: [
    ['Combinado 4', ['4 nigiris de salmón, 2 de atún y 2 de langostino, 12 makis, 10 california de salmón y 6 sashimis de salmón', '4 nigiris de salmó, 2 de tonyina i 2 de llagostí, 12 makis, 10 california de salmó i 6 sashimis de salmó', '4 salmon, 2 tuna and 2 prawn nigiri, 12 maki, 10 salmon California and 6 salmon sashimi'], 32.50, 'combinado-4'],
    ['Combinado 3', ['6 nigiris (salmón flambeado, atún y langostino) y 10 uramakis de salmón, langostino, aguacate y tobiko', '6 nigiris (salmó flamejat, tonyina i llagostí) i 10 uramakis de salmó, llagostí, alvocat i tobiko', '6 nigiri (seared salmon, tuna and prawn) and 10 salmon, prawn, avocado and tobiko uramaki'], 21.50, 'combinado-3'],
    ['Combinado 2', ['4 nigiris, 8 makis y 8 uramakis de aguacate, pollo rebozado y cebolla frita', '4 nigiris, 8 makis i 8 uramakis d’alvocat, pollastre arrebossat i ceba fregida', '4 nigiri, 8 maki and 8 avocado, breaded chicken and fried onion uramaki'], 21.50],
    ['Combinado 1', ['4 nigiris de salmón, 8 makis de salmón y 8 california de salmón', '4 nigiris de salmó, 8 makis de salmó i 8 california de salmó', '4 salmon nigiri, 8 salmon maki and 8 salmon California'], 20.50]] }
];
