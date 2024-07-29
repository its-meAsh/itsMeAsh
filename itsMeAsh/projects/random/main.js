const backHome = document.querySelector("#backHome")
backHome.addEventListener('click', () => { location.replace("../../index.html") });

class Random{
  random(l = 0 , u = 1){
    return Math.random()*(u-l)+l;
  }
  
  randint(l = 0, u = 1){
    return Math.floor(Random.random(l,u));
  }
  
  choice(array = [0,1]){
    return array[Random.randint(0,array.length)];
  }
  
  randBias(outocmes = {0:50,1:50}){
    let sum = 0; 
    for (let each in outcomes){
      sum+=outcomes[each]
    }
    if (sum!=100){
      console.error("Entered biasness percentage do not add to 100");
    }
    else{
      let array = []
      for (let key in outcomes){
        for (let i = 0 ; i<outcomesn;i++){
          array.push(key);
        }
      }
      return Random.choice(array);
    }
  }
}