var free_space = "Had a baby!";
var bingo_list = [
  'Speech about wanting a Dad',
  '"I didn\'t care he wasn\'t there"',
  '"My mom was my mother and my father"',
  'Dad looks young',
  'Suspected infedelity',
  'One night stand',
  'Dispute about relationship status',
  '"Went away for a while"',
  'Didn\'t use a condom',
  'Test more than one kid',
  'Dad brings new wife/gf',
  '"Baby don\'t look like me"',
  '"Baby looks like me"',
  'Baby actually favors father',
  'Test more than one man',
  '"We never had sex"',
  'Actually is the father',
  'Is not the father',
  'Judge yells',
  'Dad paid child support',
  'Too much details about sex',
  '"Dad" raised the kid',
  'Dad demands custody',
  'Dad on birth certificate',
  'Angry grandparent/s',
  'Happy grandparent/s',
  'Mother cries',
  'Dad cries',
  'Ugly baby',
  'Pretty baby',
  'Mention Facebook',
  'Used Fertile Window Graphic',
  'Multiple Sex Partners in a week',
  'Nobody is the Daddy',
  'Deceased "Dad"',
  'Adult children',
  '"Between jobs"',
  'Judge corrects: "Mr/Ms..."',
  'Pre-birth paternity test',
  'Baby has last name of a "friend"',
  'Somebody else on birth certificate',
  'Child is angry',
  'Someone missed court paternity test',
  'Dad never met child',
  'Mom tells Dad he\'s not the father',
  'After result, mom says its okay, or glad he\'s not'
];
var selected_items = []

function get_random(){
  var a = Math.floor(Math.random() * bingo_list.length);
  return(a);
}

function get_exclusive_randoms(array){
  //gets list 25 long of unique random indexs
  var i=0, rand, picked = [];
  while(i<25) {
    rand = get_random();
    if( picked.indexOf(rand) == -1 ){
      //item not found add to list
      picked.push(rand);
      i++;
    }
  }
  // document.getElementById("result").innerHTML = "total: " + picked.length
  //     + ".  " + picked;
  // document.getElementById("result2").innerHTML = "sorted: " + picked.sort();
  return picked;
}

function fill_cells(){
  var i, text="";
  for(i = 1; i <= 25; i++) {
    //text += get_random() + " ";
    var target = 'item-' + i;
    document.getElementById(target).innerHTML = get_random();
  }
  //document(text);
}

function make_card(){
  var i;
  var rands = get_exclusive_randoms(bingo_list);
  for(i = 1; i <= 25; i++) {
    //text += get_random() + " ";
    var target = 'item-' + i;
    document.getElementById(target).innerHTML = bingo_list[rands[i-1]];
  }
  //free Space
  document.getElementById("item-13").innerHTML = free_space;
  //clear selected
  reset_selected();
}

function reset_selected(){
  var i;
  for(i=1; i<=25; i++){
    document.getElementById("item-" + i).className = "item";
  }
  document.getElementById("item-13").className += " free-space";
}

//deprecated
function select_old(item) {
  col = document.getElementById(item).style.backgroundColor;
  if(col != "orange"){
    document.getElementById(item).style.backgroundColor = "orange";
  }else if (item == "item-13") {
    document.getElementById(item).style.backgroundColor = "#CCCCCC";
  }else{
    document.getElementById(item).style.backgroundColor = "white";
  }
}

function select(item) {
  var sel = document.getElementById(item);
  if( sel.className === "item" || sel.className === "item free-space"){
    sel.className = "item_selected";
  }else if (item == "item-13") {
    sel.className = "item free-space";
  }else{
    sel.className = "item";
  }
}
//print_test();
