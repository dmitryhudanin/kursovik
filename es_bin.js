let node = es.root;
for(let i = node.answers.length; i < 6; i++) {
  console.log($('.line' + i));
  $('.line' + i).hide();
};

const next_node = (inner) => {
  node = node.nextRules[inner[inner.length-1]];
  if(!node.answers) {
    print_end(node);
    return;
  };
  for(let i = node.answers.length; i < 6; i++) {
    console.log($('.line' + i));
    $('.line' + i).hide();
  };
  ask(node);
};

const ask = (node) => {
  if(!node.question) {
    print_end(node);
    return;
  };

  console.log($('#quest').html(node.question));
  for(let i in node.answers) {
    $('.line' + i).show();
    $('#answer' + i).html(node.answers[i]);
  };
};

const print_end = (node) => {
  $('#dialog').hide();
  $('#result').html(node.result);
  $('#description').html(node.description);
  $('#img').html(`<img src="img/${node.img}"/>`);
};

let colors = ['#464', '#777']; // массив цветов выкл/вкл
document // при клике по ячейке таблицы
  .querySelectorAll('#dialog .answer') // найти массив ячеек таблицы с ответами
  .forEach(td_answer => { // для каждой ячейки назначить обработчики событий
    td_answer.addEventListener("click", () => next_node(event.target.id));
    td_answer.addEventListener('mouseenter', () => td_answer.style.backgroundColor = colors[1]);
    td_answer.addEventListener('mouseleave', () => td_answer.style.backgroundColor = colors[0]);
  });

ask(node);
