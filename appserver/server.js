
const users = require('./users.json')
// const users = require('./new_user.json')
// const rooms = require('./new_room.json')
const rooms = require('./rooms.json')
const queue = require('./queue.json')
const building = require('./building.json')
const Expenses = require('./Expenses.json')
const history = require('./history.json')
const reports = require('./report.json')
const userlogin = require('./login.json')
const fixdata = require('./fixtest.json')
// const masterData = require('./masterData.json')
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3897;
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
// - เวอร์ชั่น Express 4.16.0+ ขึ้นไป
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors())

app.get("/", (req, res) => {
    res.send("Hello! Node.js");
});

app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let filterdata = userlogin.filter(user => user.userName === (req.body.userName))
    
    if (filterdata.length > 0) {
        if (filterdata[0].userName === req.body.userName && filterdata[0].password === req.body.password) {
            res.send(`เข้าสู่ระบบสำเร็จ`)
        } else {
            res.send(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`)
        }

    } else {
        res.send(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`)
    }
    // res.json(userlogin)
})

app.get('/users', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users.find(user => user.id === (req.params.id)))
})

app.get('/usersRoom/:roomId', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users.find(user => user.roomId == (req.params.roomId)))
})

app.post('/users', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = uuidv4();
    let body = req.body
    let data = { id: id, ...body }
    users.push(data)
    fs.writeFileSync('./users.json', JSON.stringify(users), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', users)
        }
    })
    res.json(users)
})

app.put('/users/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = users.findIndex(user => user.id === (req.params.id))
    let dataOld = users[updateIndex]
    let filterdata = users.filter(user => user.id !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.queue) parsedData.queue = req.body.queue
    if (req.body.no) parsedData.no = req.body.no
    if (req.body.bookNumber) parsedData.bookNumber = req.body.bookNumber
    if (req.body.pickedBook) parsedData.pickedBook = req.body.pickedBook
    if (req.body.typeRoom) parsedData.typeRoom = req.body.typeRoom
    if (req.body.roomconditions) parsedData.roomconditions = req.body.roomconditions
    if (req.body.checkintime) parsedData.checkintime = req.body.checkintime
    if (req.body.roomnumber) parsedData.roomnumber = req.body.roomnumber
    if (req.body.insurancecost) parsedData.insurancecost = req.body.insurancecost
    if (req.body.installmentsRooom) parsedData.installmentsRooom = req.body.installmentsRooom
    if (req.body.waterbill) parsedData.waterbill = req.body.waterbill
    if (req.body.electricitybill) parsedData.electricitybill = req.body.electricitybill
    if (req.body.central) parsedData.central = req.body.central
    if (req.body.costs) parsedData.costs = req.body.costs
    if (req.body.maintenancefee) parsedData.maintenancefee = req.body.maintenancefee
    if (req.body.sumCost) parsedData.sumCost = req.body.sumCost
    if (req.body.sumbill) parsedData.sumbill = req.body.sumbill
    if (req.body.typeContract) parsedData.typeContract = req.body.typeContract
    if (req.body.contractExpenses) parsedData.contractExpenses = req.body.contractExpenses
    if (req.body.buildingName) parsedData.buildingName = req.body.buildingName
    if (req.body.amountPaid) parsedData.amountPaid = req.body.amountPaid
    if (req.body.monthly) parsedData.monthly = req.body.monthly
    if (req.body.numberfirst) parsedData.numberfirst = req.body.numberfirst
    if (req.body.lastnumber) parsedData.lastnumber = req.body.lastnumber
    if (req.body.houseRegistration) parsedData.houseRegistration = req.body.houseRegistration
    if (req.body.payMonth) parsedData.payMonth = req.body.payMonth
    if (req.body.roomKey) parsedData.roomKey = req.body.roomKey
    if (req.body.houseRegistrationcause) parsedData.houseRegistrationcause = req.body.houseRegistrationcause
    if (req.body.payMonthcause) parsedData.payMonthcause = req.body.payMonthcause
    if (req.body.payMonthcausetwo) parsedData.payMonthcausetwo = req.body.payMonthcausetwo
    if (req.body.roomKeycause) parsedData.roomKeycause = req.body.roomKeycause
    if (req.body.dateApproved) parsedData.dateApproved = req.body.dateApproved
    if (req.body.insurance) parsedData.insurance = req.body.insurance
    if (req.body.installments) parsedData.installments = req.body.installments
    if (req.body.maintenance) parsedData.maintenance = req.body.maintenance
    if (req.body.deposit) parsedData.deposit = req.body.deposit
    if (req.body.roomId) parsedData.roomId = req.body.roomId
    if (req.body.dateReturn) parsedData.dateReturn = req.body.dateReturn
    if (req.body.customerOld) parsedData.customerOld = req.body.customerOld
    if (req.body.userId) parsedData.userId = req.body.userId
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    if (req.body.buildingType2) parsedData.buildingType2 = req.body.buildingType2
    if (req.body.bankbookName) parsedData.bankbookName = req.body.bankbookName
    if (req.body.bankbookNumber) parsedData.bankbookNumber = req.body.bankbookNumber
    if (req.body.years) parsedData.years = req.body.years
    if (req.body.leniency) parsedData.leniency = req.body.leniency
    if (req.body.typeUser) parsedData.typeUser = req.body.typeUser
    
    filterdata.push(parsedData)
    fs.writeFileSync('./users.json', JSON.stringify(filterdata), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });

    res.send(`Update user id: '${req.params.id}' completed.`)
})

app.delete('/users/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const deletedIndex = users.filter(user => user.id !== (req.params.id))
    const parsedData = deletedIndex;
    fs.writeFileSync('./users.json', JSON.stringify(parsedData, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.json(users)
})

app.get('/buildings', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(building)
})

app.get('/buildings/:buildingId', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(building.find(building => building.buildingId === (req.params.buildingId)))
})

app.put('/buildings/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = building.findIndex(building => building.buildingId === (req.params.id))
    let dataOld = building[updateIndex]
    let filterdata = building.filter(building => building.buildingId !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.committee) parsedData.committee = req.body.committee
    filterdata.push(parsedData)
    fs.writeFileSync('./building.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})

app.post('/buildings', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let body = req.body
    building.push(body)
    fs.writeFileSync('./building.json', JSON.stringify(building), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', building)
        }
    })
    res.json(building)
})

app.delete('/buildings/:builId', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const deletedIndex = building.filter(buil => buil.buildingId !== (req.params.builId))
    fs.writeFileSync('./building.json', JSON.stringify(deletedIndex, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Delete user completed.`)
})

app.get('/expenses', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users)
})

app.post('/expenses', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = uuidv4();
    let body = req.body
    let data = { id: id, ...body }
    Expenses.push(data)
    fs.writeFileSync('./Expenses.json', JSON.stringify(Expenses), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', Expenses)
        }
    })
    res.json(Expenses)
})

app.get('/expensesMock', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(fixdata)
})

app.put('/expenses/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = fixdata.findIndex(user => user.id === (req.params.id))
    let dataOld = fixdata[updateIndex]
    let filterdata = fixdata.filter(user => user.id !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.queue) parsedData.queue = req.body.queue
    if (req.body.no) parsedData.no = req.body.no
    if (req.body.bookNumber) parsedData.bookNumber = req.body.bookNumber
    if (req.body.pickedBook) parsedData.pickedBook = req.body.pickedBook
    if (req.body.typeRoom) parsedData.typeRoom = req.body.typeRoom
    if (req.body.roomconditions) parsedData.roomconditions = req.body.roomconditions
    if (req.body.checkintime) parsedData.checkintime = req.body.checkintime
    if (req.body.roomnumber) parsedData.roomnumber = req.body.roomnumber
    if (req.body.insurancecost) parsedData.insurancecost = req.body.insurancecost
    if (req.body.installmentsRooom) parsedData.installmentsRooom = req.body.installmentsRooom
    if (req.body.waterbill) parsedData.waterbill = req.body.waterbill
    if (req.body.electricitybill) parsedData.electricitybill = req.body.electricitybill
    if (req.body.central) parsedData.central = req.body.central
    if (req.body.costs) parsedData.costs = req.body.costs
    if (req.body.maintenancefee) parsedData.maintenancefee = req.body.maintenancefee
    if (req.body.sumCost) parsedData.sumCost = req.body.sumCost
    if (req.body.sumbill) parsedData.sumbill = req.body.sumbill
    if (req.body.typeContract) parsedData.typeContract = req.body.typeContract
    if (req.body.contractExpenses) parsedData.contractExpenses = req.body.contractExpenses
    if (req.body.buildingName) parsedData.buildingName = req.body.buildingName
    if (req.body.amountPaid) parsedData.amountPaid = req.body.amountPaid
    if (req.body.monthly) parsedData.monthly = req.body.monthly
    if (req.body.numberfirst) parsedData.numberfirst = req.body.numberfirst
    if (req.body.lastnumber) parsedData.lastnumber = req.body.lastnumber
    if (req.body.houseRegistration) parsedData.houseRegistration = req.body.houseRegistration
    if (req.body.payMonth) parsedData.payMonth = req.body.payMonth
    if (req.body.roomKey) parsedData.roomKey = req.body.roomKey
    if (req.body.houseRegistrationcause) parsedData.houseRegistrationcause = req.body.houseRegistrationcause
    if (req.body.payMonthcause) parsedData.payMonthcause = req.body.payMonthcause
    if (req.body.payMonthcausetwo) parsedData.payMonthcausetwo = req.body.payMonthcausetwo
    if (req.body.roomKeycause) parsedData.roomKeycause = req.body.roomKeycause
    if (req.body.dateApproved) parsedData.dateApproved = req.body.dateApproved
    if (req.body.insurance) parsedData.insurance = req.body.insurance
    if (req.body.installments) parsedData.installments = req.body.installments
    if (req.body.maintenance) parsedData.maintenance = req.body.maintenance
    if (req.body.deposit) parsedData.deposit = req.body.deposit
    if (req.body.roomId) parsedData.roomId = req.body.roomId
    if (req.body.dateReturn) parsedData.dateReturn = req.body.dateReturn
    if (req.body.customerOld) parsedData.customerOld = req.body.customerOld
    if (req.body.userId) parsedData.userId = req.body.userId
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    if (req.body.buildingType2) parsedData.buildingType2 = req.body.buildingType2
    if (req.body.bankbookName) parsedData.bankbookName = req.body.bankbookName
    if (req.body.bankbookNumber) parsedData.bankbookNumber = req.body.bankbookNumber
    if (req.body.years) parsedData.years = req.body.years
    if (req.body.leniency) parsedData.leniency = req.body.leniency
    
    filterdata.push(parsedData)
    fs.writeFileSync('./fixtest.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})

app.get('/rooms', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(rooms)
})
app.get('/rooms/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(rooms.find(room => room.id == (req.params.id)))
})

app.post('/rooms', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let body = req.body
    let data =   [...rooms,...body]
    fs.writeFileSync('./rooms.json', JSON.stringify(data), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', rooms)
        }
    })
    res.json(rooms)
})

app.put('/rooms/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = rooms.findIndex(user => user.id === (req.params.id))
    let dataOld = rooms[updateIndex]
    let filterdata = rooms.filter(user => user.id !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.floor) parsedData.floor = req.body.floor
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.numberRoom) parsedData.numberRoom = req.body.numberRoom
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.ranks) parsedData.ranks = req.body.ranks
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.roomStatus) parsedData.roomStatus = req.body.roomStatus
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.typeRoom) parsedData.typeRoom = req.body.typeRoom
    if (req.body.pickedBook) parsedData.pickedBook = req.body.pickedBook
    if (req.body.roomconditions) parsedData.roomconditions = req.body.roomconditions
    if (req.body.checkintime) parsedData.checkintime = req.body.checkintime
    if (req.body.buildingName) parsedData.buildingName = req.body.buildingName
    if (req.body.amountPaid) parsedData.amountPaid = req.body.amountPaid
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    if (req.body.monthly) parsedData.monthly = req.body.monthly
    if (req.body.houseRegistration) parsedData.houseRegistration = req.body.houseRegistration
    if (req.body.payMonth) parsedData.payMonth = req.body.payMonth
    if (req.body.roomKey) parsedData.roomKey = req.body.roomKey
    if (req.body.houseRegistrationcause) parsedData.houseRegistrationcause = req.body.houseRegistrationcause
    if (req.body.payMonthcause) parsedData.payMonthcause = req.body.payMonthcause
    if (req.body.payMonthcausetwo) parsedData.payMonthcausetwo = req.body.payMonthcausetwo
    if (req.body.roomKeycause) parsedData.roomKeycause = req.body.roomKeycause
    if (req.body.dateApproved) parsedData.dateApproved = req.body.dateApproved
    if (req.body.insurance) parsedData.insurance = req.body.insurance
    if (req.body.installments) parsedData.installments = req.body.installments
    if (req.body.maintenance) parsedData.maintenance = req.body.maintenance
    if (req.body.deposit) parsedData.deposit = req.body.deposit
    if (req.body.roomId) parsedData.roomId = req.body.roomId
    if (req.body.dateReturn) parsedData.dateReturn = req.body.dateReturn
    if (req.body.customerOld) parsedData.customerOld = req.body.customerOld
    if (req.body.queue) parsedData.queue = req.body.queue
    if (req.body.userId) parsedData.userId = req.body.userId
    if (req.body.buildingType2) parsedData.buildingType2 = req.body.buildingType2
    if (req.body.bankbookName) parsedData.bankbookName = req.body.bankbookName
    if (req.body.bankbookNumber) parsedData.bankbookNumber = req.body.bankbookNumber
    if (req.body.years) parsedData.years = req.body.years
    if (req.body.leniency) parsedData.leniency = req.body.leniency
    if (req.body.maintenancefee) parsedData.maintenancefee = req.body.maintenancefee
    if (req.body.roomnumber) parsedData.roomnumber = req.body.roomnumber
    if (req.body.typeUser) parsedData.typeUser = req.body.typeUser
    filterdata.push(parsedData)
    fs.writeFileSync('./rooms.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})

app.get('/queue/:name', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let list = users.filter(user => user.queue === req.params.name)
    res.json(list)
})
app.get('/queue/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(queue.find(queue => queue.id === (req.params.id)))
})
app.put('/queue', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = uuidv4();
    let body = req.body
    let data = { id: id, ...body }
    queue.push(data)
    fs.writeFileSync('./queue.json', JSON.stringify(queue), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', queue)
        }
    })
    res.json(queue)
})
app.put('/queue/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = users.findIndex(user => user.id === (req.params.id))
    let dataOld = users[updateIndex]
    let filterdata = users.filter(user => user.id !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.queue) parsedData.queue = req.body.queue
    if (req.body.no) parsedData.no = req.body.no
    if (req.body.bookNumber) parsedData.bookNumber = req.body.bookNumber
    if (req.body.pickedBook) parsedData.pickedBook = req.body.pickedBook
    if (req.body.typeRoom) parsedData.typeRoom = req.body.typeRoom
    if (req.body.buildingName) parsedData.buildingName = req.body.buildingName
    if (req.body.amountPaid) parsedData.amountPaid = req.body.amountPaid
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    if (req.body.dateReturn) parsedData.dateReturn = req.body.dateReturn
    if (req.body.userId) parsedData.userId = req.body.userId
    if (req.body.buildingType2) parsedData.buildingType2 = req.body.buildingType2
    if (req.body.bankbookName) parsedData.bankbookName = req.body.bankbookName
    if (req.body.bankbookNumber) parsedData.bankbookNumber = req.body.bankbookNumber
    if (req.body.years) parsedData.years = req.body.years
    if (req.body.leniency) parsedData.leniency = req.body.leniency
    if (req.body.maintenancefee) parsedData.maintenancefee = req.body.maintenancefee
    if (req.body.roomnumber) parsedData.roomnumber = req.body.roomnumber
    if (req.body.typeUser) parsedData.typeUser = req.body.typeUser
    filterdata.push(parsedData)
    fs.writeFileSync('./users.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})

app.get('/history', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(history)
})
app.get('/history/:roomId', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(history.find(history => history.roomId == (req.params.roomId)))
})
app.post('/history', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = uuidv4();
    let body = req.body
    let data = { id: id, ...body }
    history.push(data)
    fs.writeFileSync('./history.json', JSON.stringify(history), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', history)
        }
    })
    res.json(history)
})
app.put('/history/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = history.findIndex(user => user.roomId === (req.params.id))
    let dataOld = history[updateIndex]
    let filterdata = history.filter(user => user.roomId !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.queue) parsedData.queue = req.body.queue
    if (req.body.no) parsedData.no = req.body.no
    if (req.body.bookNumber) parsedData.bookNumber = req.body.bookNumber
    if (req.body.amountPaid) parsedData.amountPaid = req.body.amountPaid
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    if (req.body.monthly) parsedData.monthly = req.body.monthly
    if (req.body.numberfirst) parsedData.numberfirst = req.body.numberfirst
    if (req.body.lastnumber) parsedData.lastnumber = req.body.lastnumber
    if (req.body.dateApproved) parsedData.dateApproved = req.body.dateApproved
    if (req.body.insurance) parsedData.insurance = req.body.insurance
    if (req.body.installments) parsedData.installments = req.body.installments
    if (req.body.maintenance) parsedData.maintenance = req.body.maintenance
    if (req.body.deposit) parsedData.deposit = req.body.deposit
    if (req.body.roomId) parsedData.roomId = req.body.roomId
    if (req.body.dateReturn) parsedData.dateReturn = req.body.dateReturn
    if (req.body.customerOld) parsedData.customerOld = req.body.customerOld
    if (req.body.userId) parsedData.userId = req.body.userId
    if (req.body.buildingType2) parsedData.buildingType2 = req.body.buildingType2
    if (req.body.bankbookName) parsedData.bankbookName = req.body.bankbookName
    if (req.body.bankbookNumber) parsedData.bankbookNumber = req.body.bankbookNumber
    if (req.body.years) parsedData.years = req.body.years
    if (req.body.leniency) parsedData.leniency = req.body.leniency
    if (req.body.maintenancefee) parsedData.maintenancefee = req.body.maintenancefee
    if (req.body.roomnumber) parsedData.roomnumber = req.body.roomnumber
    if (req.body.typeUser) parsedData.typeUser = req.body.typeUser
    filterdata.push(parsedData)
    fs.writeFileSync('./history.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})
app.delete('/history/:id', (req, res) => {
    const deletedIndex = history.findIndex(history => history.id === Number(req.params.id))
    res.send(`Delete user  completed.`)
})


app.get('/layout', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users)
})
app.get('/layout/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users.find(user => user.id === (req.params.id)))
})
app.post('/layout', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = uuidv4();
    let body = req.body
    let data = { id: id, ...body }
    users.push(data)
    fs.writeFileSync('./users.json', JSON.stringify(users), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', users)
        }
    })
    res.json(users)
})
app.put('/layout/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = users.findIndex(user => user.id === (req.params.id))
    let dataOld = users[updateIndex]
    let filterdata = users.filter(user => user.id !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.amountPaid) parsedData.amountPaid = req.body.amountPaid
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    filterdata.push(parsedData)
    fs.writeFileSync('./users.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})
app.delete('/layout/:id', (req, res) => {
    const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Delete user '${users[deletedIndex].username}' completed.`)
})

app.get('/report', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(reports)
})
app.get('/report/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(reports.find(user => user.id === (req.params.id)))
})
app.get('/reportId/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(reports.find(user => user.userId === (req.params.id)))
})
app.post('/report', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = uuidv4();
    let body = req.body
    let data = { id: id, ...body }
    reports.push(data)
    fs.writeFileSync('./report.json', JSON.stringify(reports), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', reports)
        }
    })
    res.json(reports)
})
app.put('/report/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = reports.findIndex(user => user.id === (req.params.id))
    let dataOld = reports[updateIndex]
    let filterdata = reports.filter(user => user.id !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    if (req.body.monthly) parsedData.monthly = req.body.monthly
    if (req.body.numberfirst) parsedData.numberfirst = req.body.numberfirst
    if (req.body.lastnumber) parsedData.lastnumber = req.body.lastnumber
    if (req.body.houseRegistration) parsedData.houseRegistration = req.body.houseRegistration
    if (req.body.payMonth) parsedData.payMonth = req.body.payMonth
    if (req.body.roomKey) parsedData.roomKey = req.body.roomKey
    if (req.body.houseRegistrationcause) parsedData.houseRegistrationcause = req.body.houseRegistrationcause
    if (req.body.payMonthcause) parsedData.payMonthcause = req.body.payMonthcause
    if (req.body.payMonthcausetwo) parsedData.payMonthcausetwo = req.body.payMonthcausetwo
    if (req.body.roomKeycause) parsedData.roomKeycause = req.body.roomKeycause
    if (req.body.dateApproved) parsedData.dateApproved = req.body.dateApproved
    if (req.body.insurance) parsedData.insurance = req.body.insurance
    if (req.body.installments) parsedData.installments = req.body.installments
    if (req.body.maintenance) parsedData.maintenance = req.body.maintenance
    if (req.body.deposit) parsedData.deposit = req.body.deposit
    if (req.body.roomId) parsedData.roomId = req.body.roomId
    if (req.body.dateReturn) parsedData.dateReturn = req.body.dateReturn
    if (req.body.customerOld) parsedData.customerOld = req.body.customerOld
    if (req.body.queue) parsedData.queue = req.body.queue
    if (req.body.userId) parsedData.userId = req.body.userId
    if (req.body.buildingType2) parsedData.buildingType2 = req.body.buildingType2
    if (req.body.bankbookName) parsedData.bankbookName = req.body.bankbookName
    if (req.body.bankbookNumber) parsedData.bankbookNumber = req.body.bankbookNumber
    if (req.body.years) parsedData.years = req.body.years
    if (req.body.leniency) parsedData.leniency = req.body.leniency
    if (req.body.maintenancefee) parsedData.maintenancefee = req.body.maintenancefee
    if (req.body.roomnumber) parsedData.roomnumber = req.body.roomnumber
    if (req.body.typeUser) parsedData.typeUser = req.body.typeUser
    
    filterdata.push(parsedData)
    fs.writeFileSync('./report.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})

app.put('/reportUser/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = reports.findIndex(user => user.userId === (req.params.id))
    let dataOld = reports[updateIndex]
    let filterdata = reports.filter(user => user.userId !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    if (req.body.buildingType) parsedData.buildingType = req.body.buildingType
    if (req.body.monthly) parsedData.monthly = req.body.monthly
    if (req.body.numberfirst) parsedData.numberfirst = req.body.numberfirst
    if (req.body.lastnumber) parsedData.lastnumber = req.body.lastnumber
    if (req.body.houseRegistration) parsedData.houseRegistration = req.body.houseRegistration
    if (req.body.payMonth) parsedData.payMonth = req.body.payMonth
    if (req.body.roomKey) parsedData.roomKey = req.body.roomKey
    if (req.body.houseRegistrationcause) parsedData.houseRegistrationcause = req.body.houseRegistrationcause
    if (req.body.payMonthcause) parsedData.payMonthcause = req.body.payMonthcause
    if (req.body.payMonthcausetwo) parsedData.payMonthcausetwo = req.body.payMonthcausetwo
    if (req.body.roomKeycause) parsedData.roomKeycause = req.body.roomKeycause
    if (req.body.dateApproved) parsedData.dateApproved = req.body.dateApproved
    if (req.body.insurance) parsedData.insurance = req.body.insurance
    if (req.body.installments) parsedData.installments = req.body.installments
    if (req.body.maintenance) parsedData.maintenance = req.body.maintenance
    if (req.body.deposit) parsedData.deposit = req.body.deposit
    if (req.body.roomId) parsedData.roomId = req.body.roomId
    if (req.body.dateReturn) parsedData.dateReturn = req.body.dateReturn
    if (req.body.customerOld) parsedData.customerOld = req.body.customerOld
    if (req.body.queue) parsedData.queue = req.body.queue
    if (req.body.userId) parsedData.userId = req.body.userId
    if (req.body.buildingType2) parsedData.buildingType2 = req.body.buildingType2
    if (req.body.bankbookName) parsedData.bankbookName = req.body.bankbookName
    if (req.body.bankbookNumber) parsedData.bankbookNumber = req.body.bankbookNumber
    if (req.body.years) parsedData.years = req.body.years
    if (req.body.leniency) parsedData.leniency = req.body.leniency
    if (req.body.maintenancefee) parsedData.maintenancefee = req.body.maintenancefee
    if (req.body.roomnumber) parsedData.roomnumber = req.body.roomnumber
    if (req.body.typeUser) parsedData.typeUser = req.body.typeUser
    
    filterdata.push(parsedData)
    fs.writeFileSync('./report.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})

app.delete('/report/:id', (req, res) => {
    const deletedIndex = reports.findIndex(user => user.id === Number(req.params.id))
    res.send(`Delete user '${users[deletedIndex].username}' completed.`)
})

app.get('/utilitie', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users)
})
app.get('/utilitie/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users.find(user => user.id === (req.params.id)))
})
app.post('/utilitie', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let id = uuidv4();
    let body = req.body
    let data = { id: id, ...body }
    users.push(data)
    fs.writeFileSync('./users.json', JSON.stringify(users), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file', users)
        }
    })
    res.json(users)
})
app.put('/utilitie/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const updateIndex = users.findIndex(user => user.id === (req.params.id))
    let dataOld = users[updateIndex]
    let filterdata = users.filter(user => user.id !== (req.params.id))
    const parsedData = dataOld;
    if (req.body.firstName) parsedData.firstName = req.body.firstName
    if (req.body.lastName) parsedData.lastName = req.body.lastName
    if (req.body.affiliation) parsedData.affiliation = req.body.affiliation
    if (req.body.rank) parsedData.rank = req.body.rank
    if (req.body.idcard) parsedData.idcard = req.body.idcard
    if (req.body.phone) parsedData.phone = req.body.phone
    if (req.body.status) parsedData.status = req.body.status
    if (req.body.typeAffiliation) parsedData.typeAffiliation = req.body.typeAffiliation
    if (req.body.typeRanks) parsedData.typeRanks = req.body.typeRanks
    
    
    filterdata.push(parsedData)
    fs.writeFileSync('./users.json', JSON.stringify(filterdata, null, 2), (err) => {
        if (err) {
            console.log("Failed to write updated data to file");
            return;
        }
        console.log("Updated file successfully");
    });
    res.send(`Update user id: '${req.params.id}' completed.`)
})
app.delete('/utilitie/:id', (req, res) => {
    const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Delete user '${users[deletedIndex].username}' completed.`)
})
app.listen(port, () => {
    console.log(`Starting node.js at port ${port}`);
});