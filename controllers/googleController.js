const SendMail = require('../emails/mailConfig');
const { ServerError } = require('../utils/utils');
const { delayApiCall } = require('./userController');
const User = require('../models').users


exports.continueWithGoogle = async (req, res) => {
    try {
        const { firstname, lastname, email, image } = req.body
        if (!firstname) return res.json({ status: 404, msg: `First name field is required` })
        if (!lastname) return res.json({ status: 404, msg: `Last name field is required` })
        if (!email) return res.json({ status: 404, msg: `Email address field is required` })
        const checkEmail = await User.findOne({ where: { email } })
        if (!checkEmail) {
            let Currency;
            const normalizedCountry = country.trim().toLowerCase();
            const url = `https://restcountries.com/v3.1/name/${normalizedCountry}`
            try {
                const response = await delayApiCall(url);
                if (response.data && response.data.length > 0) {
                    //   if(normalizedCountry === 'china'){
                    //     const countryData = response.data[2];
                    //     const currencySymbol = Object.values(countryData.currencies)[0].symbol;
                    //     Currency = currencySymbol
                    //  }`
                    //  else{
                    const countryData = response.data[0];
                    const currencySymbol = Object.values(countryData.currencies)[0].symbol;
                    Currency = currencySymbol;
                    //  }
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (apiError) {
                console.error('Error fetching currency:', apiError);
                return res.status(500).json({ status: 500, msg: 'Failed to fetch currency information' });
            }
            const Otp = otpgenerator.generate(10, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })
            const code = otpgenerator.generate(4, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })
            User.create({
                firstname,
                lastname,
                email,
                account_number: Otp,
                status: 'online',
                currency: Currency,
                lastlogin: moment().format('DD-MM-YYYY hh:mmA')
            })

            await SendMail({ code: code, mailTo: email, subject: 'Account Verification Code', username: firstname, message: 'Copy and paste your account verification code below', template: 'verification', fullname: ` ${firstname} ${lastname}`, email: email, date: moment().format('DD MMMM YYYY hh:mm A') })
            return res.json({ status: 200, msg: ' Acount created successfully' })
        }else{

        }


    } catch (error) {
        ServerError(res, error)
    }
};