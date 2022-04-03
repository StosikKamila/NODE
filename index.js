const express = require('express')
const app = express()
const game = {
  plane : ['','','','','','','','',''],
  possibilities : ["/kolko","/krzyzyk"],
  turn : 0,
  over: false,
    makeSign(player, index){
      // console.log(player);
      if(this.possibilities[this.turn] == player && this.plane[index] == '' && !this.over){
        this.plane[index] = player;
        this.turn = this.turn == 0 ? 1 : 0 ;
        if(this.checkWin()){
          this.over = true;
        }
      }  
    },
    checkWin(){
      // check rows
      for(let i = 0; i <3; i++){
        console.log(i)
        if(this.plane[i*3] != '' && this.plane[i*3] == this.plane[i*3+1] && this.plane[i*3+1] == this.plane[i*3+2]){
        return true;
        }
      //check cols
        if(this.plane[i] != '' && this.plane[i] == this.plane[i+3] && this.plane[i] == this.plane[i+6]){
        return true;
        }
      }
    },

}
app.use(express.static('public'))
app.get(['/kolko', '/krzyzyk'], function (req, res) {
  console.log(__dirname)
  res.sendFile(__dirname + '/public/template.html')  
})
app.get('/data', (reg, res) => {
  game.makeSign(reg.query.player,reg.query.index)
  res.send("")
})
app.get('/sendData', (req,res) => {
  res.send(game)
})
app.listen(80)