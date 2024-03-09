let totalValueResources = 0;

const textarea = document.getElementById('purchases');
const regex = /(?<qtd>.+) x \[(?<name>[\D]+)\] \((?<value>[\d.]+) kamas\)\n?\r?/g;

function calculateResource() {
  let count = 0, profit = 0;
  
  const textareaValue = textarea.value;
  const matches = [...String(textareaValue).matchAll(regex)];

  const tableResultResource = document.querySelector('.result_resource');

  const itemValue = document.getElementById('itemValue');
  const itemValueNumber = +itemValue.value;
  const tableResultItem = document.querySelector('.result_item');

  const sellValue = document.getElementById('sellValue');
  const sellValueNumber = +sellValue.value;
  const tableResultSell = document.querySelector('.result_sell');

  const tableResultProfit = document.querySelector('.result_profit');
  const spanResult = document.querySelector('span.result');

  function calculateResourceFromRegMatches(match) {
    const onlyNumbers = parseInt(match.groups.value.replace(/[\D]/g, ''));
    count += onlyNumbers;
  }

  function renderValuesInTable(objElements = []) {
    objElements.forEach(({ td, value }) => 
      td.innerText = `${value.toLocaleString('pt-BR')} K`);
  }

  function renderProfitOrWasteInTable(profit, color) {
    spanResult.innerText = profit;
    spanResult.style.color = color;
    tableResultProfit.style.color = color;
  }

  totalValueResources = 0;

  matches.forEach(calculateResourceFromRegMatches);

  totalValueResources = count;
  profit = sellValueNumber - totalValueResources;

  const allElements = [
    { td: tableResultResource, value: totalValueResources },
    { td: tableResultItem, value: itemValueNumber },
    { td: tableResultSell, value: sellValueNumber },
    { td: tableResultProfit, value: profit }
  ];

  renderValuesInTable(allElements);

  profit < 0 ?
    renderProfitOrWasteInTable('PREJUÍZO', 'red') :
    profit === 0 ?
      renderProfitOrWasteInTable('', 'black') :
      renderProfitOrWasteInTable('LUCRO', 'green');

  if (totalValueResources === 0) {
    tableResultProfit.innerText = '0 K';
    tableResultProfit.style.color = '#000';
    spanResult.innerText = '';
  }
}

[textarea, itemValue, sellValue].forEach((element) =>
  element.addEventListener('input', calculateResource));
