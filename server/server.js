require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

var companiesData = mongoose.model('companiesData', mongoose.Schema({}, { strict: false }), "companiesData");
var adsData = mongoose.model("adsData", mongoose.Schema({}, { strict: false }), "adsData");

const PORT = process.env.PORT || 5000;


app.post('/ads', async (req, res) => {
    const { keyword } = req.body;

    const regex = new RegExp(keyword, "i");

    try {
        const companyResp = await companiesData.find({ "name": regex });
        
        if (companyResp.length === 0) {
            const adResp = await adsData.find({ $or: [{ "primaryText": regex }, { "headline": regex }] });

            var companiesIds = [];

            adResp.forEach((item) => {
                let id = item.companyId;
                companiesIds.push(id);
            })

            const companiesResp = await companiesData.find({_id:{$in:companiesIds}})

            let data = [];

            adResp.forEach((ad) => {
                companiesResp.forEach((company) => {
                    if (company._id.toString() === ad.companyId) {
                        data.push({ad:ad,companyData:company})
                    };
                });
            });
            
            res.status(200).json(data)
        }
        else {
            var companiesIds = [];

            companyResp.forEach((item) => {
                let id = item._id.toString();
                companiesIds.push(id);
            })

            let adResp = await adsData.find({ "companyId": { $in: companiesIds } });

            let data = [];

            adResp.forEach((ad) => {
                companyResp.forEach((company) => {
                    if (company._id.toString() === ad.companyId) {
                        data.push({ad:ad,companyData:company})
                    };
                });
            });

            res.status(200).json(data);
        }
    }
    catch (err) {
        console.error(err);
    };

});

mongoose.connect(process.env.MONGOURI, { dbName: 'AdvertisementsDB' }, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB.")
});


app.listen(PORT, () => {
    console.log('Server Successfully Running on Port', PORT);
});