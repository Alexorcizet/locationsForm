
const nodemailer = require('nodemailer')

async function sendData(facilityData) {
    const stations = facilityData.stations
    let csv = ''
    stations.forEach(station => csv += station.join() + '\n')


    return new Promise((resolved, reject) => {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'locationsform@gmail.com',
                pass: 'dmoqmghwonxhpajo'
            }
        })

        let mailOptions = {
            from: 'locationsform@gmail.com',
            to: 'Dima@buzzztech.com',
            //to:'alexorcizet87@gmail.com'
            subject: `טופס מיקומים ל${facilityData.facility}`,
            attachments: [{
                filename: `${facilityData.facility}.csv`,
                content: csv
            }]
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('err:', err)
                resolved(false)
            } else {
                resolved(true)
            }
        })
    })
}

module.exports = {
    sendData,
}