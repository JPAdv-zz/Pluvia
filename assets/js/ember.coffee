###
	A canvas wallpaper that shows pixaleted flames.
	@Author: Jose Padilla
###


$ -> init()
$ -> $('#canvaSquare').click -> 
				stop()
				return

# Initial variables
shape = canvas = context = bufferCanvas = bufferContext = timer = anim = null
flareDropsArray = []
MAX_DROPS = 50
TIMER_SPEED = 10
ANIMATION_SPEED = 5

###
 Functions
###

# Initialize the animation.
init = () ->

	shape = document.getElementById('canvaSquare').dataset['shape']

	# Get the canvas and the context
	canvas = document.getElementById('canvaSquare')
	context = canvas.getContext('2d')
	context.canvas.width = window.innerWidth
	context.canvas.height = window.innerHeight
	
	# Create a new buffer.
	bufferCanvas = document.createElement('canvas')
	bufferContext = bufferCanvas.getContext('2d')
	bufferContext.canvas.width = context.canvas.width
	bufferContext.canvas.height = context.canvas.height

	timer = setInterval addDrop, TIMER_SPEED

	Draw(shape)

	anim = setInterval animation, ANIMATION_SPEED

	return

Rain = () ->
	RAIN_SPEED_AMOUNT = 1.05
	RAIN_OPACITY = 0.5
	RAIN_WIDTH = 90

	this.x = Math.round(Math.random() * canvas.width)
	this.y = Math.round(Math.random() * canvas.height)
	this.speed = Math.random() * RAIN_SPEED_AMOUNT
	this.opacity = Math.random() * RAIN_OPACITY
	this.width = (Math.random() * RAIN_WIDTH) + 1
	this.height = this.width
	return

addDrop = () ->
	flareDropsArray[flareDropsArray.length] = new Rain()
	if flareDropsArray.length == MAX_DROPS
		clearInterval(timer)
		clearInterval(anim)
	return

animation = () ->
	Update()
	Draw(shape)
	return

blank = () ->
	bufferContext.fillStyle = '#2A2B3D'
	bufferContext.fillRect 0, 0, bufferContext.canvas.width, bufferContext.canvas.height
	return

Update = () ->
	RAINDROPS_ARRAY_WIDTH = 1.001
	for e, i in flareDropsArray
		if flareDropsArray[i].y >= 0 - flareDropsArray[i].height
			flareDropsArray[i].y -= Math.random() * 0.20 + flareDropsArray[i].speed
			#flareDropsArray[i].width = RAINDROPS_ARRAY_WIDTH
			flareDropsArray[i].height -= flareDropsArray[i].width 
		else
			flareDropsArray[i].y = -1 * flareDropsArray[i].height
	return

Draw = (s) ->
	context.save()

	blank()

	if s == 'circle'
		LINE_WIDTH = 0.5
		for e, i in flareDropsArray
			bufferContext.beginPath()
			bufferContext.arc flareDropsArray[i].x, flareDropsArray[i].y, flareDropsArray[i].width / 2, 0, 2 * Math.PI, false
			bufferContext.fillStyle = "rgba(81,83,107," + flareDropsArray[i].opacity + ")"
			bufferContext.fill()
			bufferContext.lineWidth = LINE_WIDTH
			bufferContext.strokeStyle = 'rgba(60,50,103,0.5)'
			bufferContext.stroke()
		context.drawImage bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height
		context.restore()
	
	if s == 'square'
		for e, i in flareDropsArray
			bufferContext.fillStyle = "rgba(81,83,107," + flareDropsArray[i].opacity + ")"
			bufferContext.fillRect flareDropsArray[i].x, flareDropsArray[i].y, flareDropsArray[i].width, flareDropsArray[i].height
		context.drawImage bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height
		context.restore()
	return

stop = () ->
	clearInterval(timer)
	clearInterval(addDrop)
	clearInterval(anim)
	return
