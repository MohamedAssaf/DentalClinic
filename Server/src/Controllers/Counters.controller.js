const Counter = require('../Models').CountersModel;
const JSONStream = require('JSONStream');
const SocketService = require('../SocketIOControllers/SocketIO.counters.controller');

exports.test = (req, res) => {
    res.send('greetings from the counters controller')
}

exports.create = (req, res) => {
    const {name, type} = req.body.counter;
    if(!name){
        res.send("A name was not specified");
        return;
    }
    Counter.findOne({name}, function(err, counter) {
        if(err){
            res.send(err);
            return;
        }
        if(!counter){
            let newCounter = new Counter();
            newCounter.name = name;
            newCounter.type = type;
            newCounter.save().then((counter) => {
                let resObject = {
                    "counter" : {
                        "id" : counter._id
                    }
                }
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.end(JSON.stringify(resObject));
                SocketService.newCount(newCounter);
                return;
            })
        }
        if(counter){
            let resObject = {
                "counter" : {
                    "id" : counter._id
                }
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.end(JSON.stringify(resObject));
            return;
        }
      });
}

exports.update = (req, res) => {
    if(!req.body.counter){
        res.send("A counter was not specified");
        return; 
    }
    const { id } = req.body.counter;
    if(!id){
        res.send("An id was not specified");
        return;
    }
    Counter.findById( id, (err, counter) => {
        if(err){
            res.send(err);
            return;
        }
        if(counter.type === "uni"){
            //updatebyIncrementing one
            counter.count = counter.count +1;
            counter.save();
            SocketService.updateCounter(counter);
            res.send(`counter ${counter.name} incremented by one successfully`);
        }
        else if (counter.type === "bi"){
            //updatebyDirection and by Id 
            if(req.body.counter.direction === "in"){
                counter.in = counter.in +1;
                counter.save();
                SocketService.updateCounter(counter);
                res.send(`counter ${counter.name} with direction in incremented by one successfully`);
            }
            else if(req.body.counter.direction === "out"){
                counter.out = counter.out +1;
                counter.save();
                SocketService.updateCounter(counter);
                res.send(`counter ${counter.name} with direction out incremented by one successfully`);
            }
        }
    })
}

exports.reset= (req, res) => {
    if(!req.body.counter){
        Counter.find((err, counters) => {
            counters.map( counter => {
                counter.count =0;
                counter.in =0;
                counter.out =0;
                counter.save();
            })
            SocketService.resetCounter("All");
            res.sendStatus(200);
        })
        return; 
    }
    const { id } = req.body.counter;
    if(!id){
        Counter.find((err, counters) => {
            counters.map( counter => {
                counter.count =0;
                counter.in =0;
                counter.out =0;
                counter.save();
            })
            SocketService.resetCounter("All");
            res.sendStatus(200);
        })
        return; 
    }
    else {
        Counter.findById( id , (err, counter) => {
            if(err){
                res.send(err);
                return;
            }
            else {
                counter.in =0;
                counter.out = 0;
                counter.count =0;
                counter.save();
                SocketService.resetCounter(id);
                res.send("Counter resetted successfully");
            }
        })
    }
}

exports.delete = (req, res) => {
    if(!req.body.counter){
        Counter.deleteMany({} , (err) => {
            if(err){
                res.send(err);
                return;
            }
            else {
                res.send("Counters deleted successfully");
                SocketService.deleteCounter("All");
                return;
            }
        })
        return;
    }
    const { id } = req.body.counter;
    if(!id){
        Counter.deleteMany({} , (err) => {
            if(err){
                res.send(err);
                return;
            }
            else {
                res.send("Counters deleted successfully");
                SocketService.deleteCounter("All");
                return;
            }
        })
        return;
    }
    else {
        Counter.findByIdAndRemove( id, (err) => {
            if(err) {
                res.send(err);
                return;
            }
            else {
                res.send("Counter deleted successfully");
                SocketService.deleteCounter(id)
            }
        })
    }
}

exports.getAll = (req, res) => {
    Counter.find({})
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
}
