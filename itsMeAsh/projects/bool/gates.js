function checkIn(array,value,freq){
  let count = 0;
  for (let each of array){
    if (each == value){
      count++;
    }
  }
  if (count >= freq){
    return true
  }
  else{
    return false
  }
}

function OR(array){
  return checkIn(array,true,1);
}

function AND(array){
  return checkIn(array,true,array.length);
}

function NOT(array){
  return !array[0]
}

function NAND(array){
  return NOT([AND(array)])
}

function NOR(array){
  return NOT([OR(array)])
}

function XOR(array){
  let count = 0;
  for (let each of array){
    if (each == true){
      count++;
    }
  }
  if (count%2 == 0){
    return false;
  }
  else{
    return true;
  }
}

function XNOR(array){
  return NOT([XOR(array)])
}