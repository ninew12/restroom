var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'RoomApiServerV6z',
  description: 'The nodejs.org example web server.',
  script: 'C:\\Users\\PC\\Application\\V2.0\\restroom\\appserver\\index.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

