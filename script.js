var free_space = "Had a baby!";
var defaults = [
  'You are <strong>NOT</strong> the father.',
  'You <strong>ARE</strong> the father.'
];
var bingo_list = [
  // 'Speech about wanting a Dad',
  // '"I didn\'t care he wasn\'t there"',
  // '"My mom was my mother and my father"',
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
  'Baby actually resembles father',
  'Test more than one man',
  '"We never had sex"',
  // 'Actually is the father', // move later
  // 'Is not the father', // move later
  'Judge yells',
  'Dad supports kid or paid child support',
  'Too many details about sex',
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
  // 'Nobody is the Daddy',
  // 'Deceased "Dad"',
  // 'Adult children',
  '"Between jobs"',
  'Judge corrects: "Mr/Ms..."',
  'Pre-birth paternity test',
  'Baby has last name of a "friend"',
  'Somebody else on birth certificate',
  // 'Child is angry',
  'Someone missed court paternity test',
  'Dad never met child',
  'Mom tells Dad he\'s not the father',
  'After result, mom says its okay, or glad he\'s not'
];
var items = {}
var bingo = false;
var reroll_active = false;

function get_random(){
  var a = Math.floor(Math.random() * bingo_list.length);
  return(a);
}

function get_random_defaults(){
  // return array of length equal to defaults of indexes
  // with no repeats or does not cover free-space
  var list = [];
  var i;
  var rand;
  //rand = Math.ceil(Math.random() * 25); // 1 - 25
  for(i=0; i<defaults.length; i++){
    rand = Math.ceil(Math.random() * 25); // 1 - 25
    // console.log(rand);
    if(rand != 13 && list.indexOf(rand) == -1){
      list.push(rand);
    }else{
      i--; //a dirty trick, but it works
    }
  }
  return list;
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

function make_card(arr=get_exclusive_randoms(bingo_list) ){
  var i =1;
  var row, col, text, index;
  var rands = arr;
  rands[12] = null;
  items["bingo_index"] = rands;
  //items["bingo_index"][12] = null; // set free space to null
  var defs = get_random_defaults();
  //for(i = 1; i <= 25; i++) {
    //text += get_random() + " ";
  for(row=1; row <= 5; row++){
    for(col=1; col <= 5; col++){
      var target = 'item-' + i;
      if(row == 3 && col == 3){ // free space
        // free-space!
        text = free_space;
        index = -1;
      }else if (defs.indexOf(i) != -1) {//default text cell
        text = defaults[defs.indexOf(i)];
        // update bingo_index
        items["bingo_index"][i-1] = null;
        index = -1;
        document.getElementById(target).style.display = "inline-block";
      }else{ //random text cell
        //fill box with bingo_list text
        text = bingo_list[rands[i-1]];
        index = rands[i-1];
      }
      document.getElementById(target).innerHTML = text;
      //setup item object
      items[target] = {
        "selected":false,
        "index": index,
        "row": row,
        "col": col,
      };
      i++;
    }
  }
  //clear the board of all selected
  reset_card();
}

function reset_card(){
  var i;
  for(i=1; i<=25; i++){
    document.getElementById("item-" + i).className = "item";
    document.getElementById("item-" + i).setAttribute("data-bingo", "")
    items["item-"+i]["selected"] = false;
  }
  document.getElementById("item-13").className += " free-space";
  console.log("New game started.");
}

function shuffle_card(){
  var index = items["bingo_index"].slice(0); //cloned array
  index.sort(function(a, b){return 0.5 - Math.random()}); //random sort
  //find null elements
  var start = 0;
  var empty = [];
  while( index.indexOf(null, start) != -1){
    //console.log(index.indexOf(null, start) );
    empty.push(index.indexOf(null, start) );
    start = index.indexOf(null, start) + 1;
  }
  console.log("emptys", empty);
  //shuffle nulls
  empty.sort(function(a, b){return 0.5 - Math.random()}); //random sort
  for(var i=0; i<empty.length; i++ ) {
    if( empty.indexOf(12) != -1 ){ // if null is already in free space poistion
      del = empty.indexOf(12);
      console.log("free space taken!", del);
      empty.splice(del, 1);
    }else{
      //move first null to free space-12
    }
  }
  var tgt = index.indexOf(null);
  // switch tgt index with value of index 12, set 12 to null for free space;
  index[tgt] = index[12];
  index[12] = null;
  make_card(index);
  console.log(index.slice(0).sort().toString());
  return index;
}

function reroll(item){
  if(items[item]["index"] == -1){ // free space and defaults
    console.log("Can not reroll this item.");
    //raise error
    //document.getElementById(item).style.animation = "denied-anim 3s";
    return false;
  }
  var index_copy = items["bingo_index"].slice(0); //cloned array
  var text_index = items[item]["index"];
  //find unique
  var random = get_random();
  while (index_copy.indexOf(random) == -1){
    console.log(random + " is taken");
    random = get_random();
  }
  console.log(random + " is unique");
  //swap around
  var item_index = index_copy[strip_name(item)-1]
  console.log(item_index + " " + bingo_list[item_index]
      + " -> "+ random +" "+ bingo_list[random] )
  document.getElementById(item).innerHTML = bingo_list[random];
  index_copy[strip_name(item)-1] = random;
  //console.log(index_copy);
  items[item]["selected"] = false;
  items[item]["index"] = random;
  items["bingo_index"] = index_copy;
  console.log(items["bingo_index"]);
  console.log(items[item]);
  return true;
}

function select(item) {
  var sel = document.getElementById(item);
  if( sel.className === "item" || sel.className === "item free-space"){
    sel.className = "item_selected";
    items[item]["selected"] = true;
    detect_bingo(item, true);
    //console.log(item+" "+detect_bingo(item, true));
  }else if (item == "item-13") {
    detect_bingo(item, false);
    sel.className = "item free-space";
    sel.setAttribute("data-bingo", "")
    items[item]["selected"] = false;
  }else{
    sel.className = "item";
    detect_bingo(item, false);
    sel.setAttribute("data-bingo", "")
    items[item]["selected"] = false;
  }
}

// returns only the number part of the item name, 'item-3' -> 3
function strip_name(item){
  var start = item.indexOf("-") + 1;
  return Number( item.slice(start));
}
// adds 'item-' to given item number
function get_row(row_number){
  return "item-" + number;
}

//checks for bingo only from last updated location
function detect_bingo(item, activated){
  found_bingo_h = detect_horizontal_bingo(item, activated);
  found_bingo_v = detect_vertical_bingo(item, activated);
  found_bingo_d = detect_diagonal_bingo(item, activated);
  // found_bingo_f = detect_four_corners_bingo(item); // not included yet
  return(found_bingo_h || found_bingo_v || found_bingo_d);
}

function detect_horizontal_bingo(item, activated){
  //find horizontal
  var horz_looking = true;
  var row_start = (items[item]["row"] - 1) * 5 + 1;
  var selected_count = 0;
  var line_list = [];
  while(horz_looking && selected_count < 5){
    if( items["item-"+row_start]["selected"] == true ){
      //found one
      selected_count++;
    }else{ //didnt find one, no bingo on this line
      horz_looking = false;
    }
    line_list.push(row_start)
    row_start++; // increment to next in row
  }
  if(selected_count == 5){
    console.log("Bingo Detected! horizontal-row:" + items[item]["row"] );
    draw_line(line_list, "horz", activated);
    return true, line_list;
  }else{
    return false, null;
  }
}
function detect_vertical_bingo(item, activated){
  //find vertical
  var vert_looking = true;
  var col_start = items[item]["col"];
  var selected_count = 0;
  var line_list = [];
  while(vert_looking && selected_count < 5){
    if( items["item-"+col_start]["selected"] == true ){
      //found one
      selected_count++;
    }else{ // didn't find one, no bingo on this line
      vert_looking = false;
    }
    line_list.push(col_start);
    col_start += 5; // increment to next in column
  }
  if(selected_count == 5){
    console.log("Bingo Detected! vertical-column:" + items[item]["col"] );
    draw_line(line_list, "vert", activated);
    return true, line_list;
  }else{
    return false;
  }
}
function detect_diagonal_bingo(item, activated){
  //find diagonal (fwd = forward rev = reverse)
  var diag_looking_fwd = true;
  var diag_looking_rev = true;
  var diag_start_fwd = 1;
  var diag_start_rev = 5;
  var selected_count_fwd = 0;
  var selected_count_rev = 0;
  var line_list_fwd = [];
  var line_list_rev = [];
  // pre-check to see if selected is on diagonals
  var diagonals = [1, 5, 7, 9, 13, 17, 19, 21, 25];
  if ( diagonals.indexOf(strip_name(item)) == -1 ){
    diag_looking_fwd = false;
    diag_looking_rev = false;
  }
  // forward check loop
  while( diag_looking_fwd && selected_count_fwd < 5){
    if( items["item-"+diag_start_fwd]["selected"] == true ){
      //found one
      selected_count_fwd++;
    }else{ // didn't find one, no bingo on this diagonal
      diag_looking_fwd = false;
    }
    line_list_fwd.push(diag_start_fwd);
    diag_start_fwd += 6; //forward diagonal increment
  }
  while( diag_looking_rev && selected_count_rev < 5){
    if( items["item-"+diag_start_rev]["selected"] == true ){
      //found one
      selected_count_rev++;
    }else{ // didn't find one, no bingo on this diagonal
      diag_looking_rev = false;
    }
    line_list_rev.push(diag_start_rev);
    diag_start_rev += 4; //reverse  diagonal increment
  }
  if(selected_count_fwd == 5 && selected_count_rev == 5 && activated){
    console.log("Bingo Detected! both forward and reverse diagonals");
    combined = line_list_fwd.concat(line_list_rev)
    draw_line(line_list_rev, "diagR", activated);
    draw_line(line_list_fwd, "diagF", activated);
    return true, combined; //Both
  }else if(selected_count_fwd == 5 &&
        line_list_fwd.indexOf(strip_name(item)) != -1){
    console.log("Bingo Detected! forward diagonal");
    draw_line(line_list_fwd, "diagF", activated);
    return true, line_list_fwd;
  }else if(selected_count_rev == 5 &&
        line_list_rev.indexOf(strip_name(item)) != -1){
    console.log("Bingo Detected! reverse diagonal");
    draw_line(line_list_rev, "diagR", activated);
    return true, line_list_rev;
  }else{
    return false;
  }
}

function detect_four_corners_bingo(item, activated){
  //find four corners and free space
  var four_looking = true;
  var corners = [1, 5, 13, 21, 25];
  var index = 0;
  var selected_count = 0;
  var line_list = [];
  // pre-check to see if selected is on diagonals
  if ( corners.indexOf(strip_name(item)) == -1 ){
    four_looking = false;
  }
  while(four_looking && selected_count < 5){
    if( items["item-"+corners[index] ]["selected"] == true ){
      //found one
      selected_count++;
    }else{ //didnt find one, no bingo on this line
      four_looking = false;
    }
    line_list.push(corners[index]);
    index++; // increment to next in row
  }
  if(selected_count == 5){
    console.log("Bingo Detected! four corners and free space");
    draw_line(line_list, "mult", activated);
    return true, line_list;
  }else{
    return false;
  }
}

function draw_line(line_list, type, activated){
  for(var i=0; i<line_list.length; i++){
    if(activated){
      add_attr("item-"+line_list[i], type)
    }else{
      //console.log("deactivate:" +line_list[i])
      rem_attr("item-"+line_list[i], type)
    }
  }
}
function clear_attr(item){
  document.getElementById(item).setAttribute("data-bingo", "");
}

function add_attr(item, attr){
  var line = document.getElementById(item).getAttribute("data-bingo");
  //console.log( line.indexOf(attr) == -1);
  if(line.indexOf(attr) == -1){
    line += " " + attr;
    line = line.trim();
    document.getElementById(item).setAttribute("data-bingo", line);
  }
  return line;
}

function rem_attr(item, attr){
  var line = document.getElementById(item).getAttribute("data-bingo");
  var new_line = line.replace(attr, "");
  new_line = new_line.replace("  ", " ").trim(); // kill double space
  document.getElementById(item).setAttribute("data-bingo", new_line);
  return new_line;
}

//TODO add rerolls
//TODO add more bingo decoration on complete line
