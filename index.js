
game.width = 800
game.height = 800

const BACKGROUND = '#000000'
const FOREGROUND = '#50ff50'
 

const ctx = game.getContext("2d")

function clear() {
  ctx.fillStyle = BACKGROUND
  ctx.fillRect(0, 0, game.width, game.height)
}

function point({x, y}, w, h, boxColor) {
  ctx.fillStyle = boxColor ? boxColor : FOREGROUND
  ctx.fillRect(x - w/2, y - h/2, w, h)
}

function screen(p) {
  
  const screen = {
    x: (p.x + 1)/2*game.width,
    y: (1 - (p.y + 1)/2) * game.height
  }

  return screen
}

function line() {
  ctx.lineWidth = 2
  ctx.strokeStyle = ''
}

function project({x, y, z}) {
  return {
    x: x / z,
    y: y / z
  }
}

const totalDuration = 5000
let duration = totalDuration
let prevTime = null

const startZ = 1
const endZ = 2.5
const path =  endZ - startZ

function frame(time) {
  if (prevTime === null) {
    prevTime = time
    requestAnimationFrame(frame)
    return
  }
  
  const dt = time - prevTime
  duration -= dt
  
  if (duration <= 0) return


  
  clear()

  const remainProgress = duration / totalDuration
  const z = endZ - (path * remainProgress)
  
  console.log('z: ', z)
  point(screen(project({x: -0.5, y: 0.5, z } )), 10, 10)
  point(screen(project({x: 0.5, y: 0.5, z } )), 10, 10)
  point(screen(project({x: -0.5, y: -0.5, z } )), 10, 10)
  point(screen(project({x: 0.5, y: -0.5, z } )), 10, 10)


  prevTime = time
  requestAnimationFrame(frame)
}


requestAnimationFrame(frame)


range.addEventListener("input", (event) => {
  rangeValue.textContent = event.target.value;

  const value = parseInt(event.target.value)

    clear()
    point(screen(project({x: 1, y: 1, z: value} )), 10, 10, 'red')
});
