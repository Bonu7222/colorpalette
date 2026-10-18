# color palette pro

built this lil color generator because i was tired of working on massive projects that taker forever to finish. as an example finance tracker. this one is small, clean, and does exactly what it needs to do without any weird libraries.

## what it does

-- **generate colors:** hit spacebar or click the button to get a fresh 5-color palette.
-- **lock colors:** if u like a specific color, click the  🔒 icon to lock it. then generate again, and that color stays while the others change.
-- **copy to clipboard:** click on any color and it copies the hex (or rgb) code to your clipboard.
-- **switch formats:** you can toggle between hex and rgb codes.
-- **smart text color:** the text automatically turns black or white depending on how bright or dark the background color is.

## how to run
super simple. no build tools, no npm. just open index.tml in ur browser.

## what i learned

tbh, this was a nice break from bigger projects. i finally really understood how to handle state in vanilla js.

some specific stuff i figured out:
-- state management: keeping track of which colors are locked vs unlocked using an array of objects.
-- localstorage: saving the palette so it doesnt disappear on refresh. had to use json.stringify and json.parse for that.
-- event propagation: ilearned that clicking the lock button was also triggering the "copy color" click on the parent div. using e.stoppropagation() fixed it. that was a cool ahaaa moment.
also i had a tiny bug where i typed isColorLight(colorObj,hex) instead of isColosLight(colorObj.hex) and the whole scriot just died. spent few minuted debugging that in console. classiiic.

go make some pretty palettes. 