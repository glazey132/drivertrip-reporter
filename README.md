# drivertrip-reporter
This was a fun exercise that shows my knowledge of object modeling / software design, testing, and my knowledge of javascript / node.js.

My main design choices were based on my desire for a streamlined, but non-brittle development flow (Imagining this to be long term). I wanted to write something that was easy to get up to speed on and easy to work with.

I chose to model my domain objects as Javascript classes. While not entirely ideal for a number of reasons, it works for a program like this. 

I also wanted to separate my logic at least to a degree. That's why I chose to have helper functions in their own file, and the actual program in it's own index file. This design also lends well to create domain models; I was able to define each model in it's own file, and abstract them into a higher order Model object, which makes testing, among other things, just a bit easier.

One of the things I would devote a bit more time to if this project were serious, is tests. I would want to have a test for each helper function if I were actually pushing this to a production server. A few important test I regretably left out, were tests for things like helpers.writeResultFile -- That's a function you wouldn't want to ever fail if this were a production app, thus ample test coverage would be necessary.

# How to run
- cd into the project directory via command line terminal
- make sure you have the latest stable version on Node.js installed
- run `npm install`
- run `node index data.txt` to process the input file (data.txt)
- view the output file (myOutput.txt)
- to test make you sure you've run npm install and then run `npm run test`

# Some cool packages used: 
- Commander (would be great to have if this were a production app and I had multiple flags I wanted to use in the CLI)
- csv (allowed for easy file parsing)
- lodash (who doesn't love lodash?)
- mocha/chai (nice testing)
- chalk (fun log colors in the terminal)