var mysql = require('mysql')
var express = require('express')
var Router = require('router')
const path = require('path')
const ejs = require("ejs")
var app = express()

var routes = Router()

app.use(express.urlencoded());
app.use(express.json());

app.listen(5000, () => {
    console.log('server started port  3000');
})
app.set("view engine", "ejs");

const db = mysql.createConnection({
    user: 'rrr',
    host: 'localhost',
    password: 'PASS',
    database: 'bookstore'

});
db.connect(function (error) {
    // callback

    if (error) {
        throw error;
    }
    console.log("MySQLconnected");

})

app.get('/', (req, res) => {
    res.render("index", { response: { name: "" } });

})
app.get('/create', (req, res) => {
    res.render("create", { response: "" });

})
app.get('/queries', (req, res) => {
    res.render("queries", { response: "" });

})
app.get('/hospital', (req, res) => {
    res.render("hospital", { response: { name: "" } });

})

app.get('/medicine', (req, res) => {
    res.render("medicine", { response: [{}] });

})
app.get('/doctor', (req, res) => {
    res.render("doctor", { response: [{}] });

})
app.get('/employee', (req, res) => {
    res.render("employee", { response: [{}] });

})
app.get('/hospitalentity', (req, res) => {
    res.render("hospitalentity", { response: [{}] });

})
app.get('/modeofpayment', (req, res) => {
    res.render("modeofpayment", { response: [{}] });

})
app.get('/patientfeedback', (req, res) => {
    res.render("patientfeedback", { response: [{}] });

})
app.get('/hospital/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);

    /*var que = "SELECT * FROM hospital WHERE hospital_id = " + id;
    db.query(que, function (err, result, fields) {
        if (err) throw err;

        var json = JSON.stringify(result)
        console.log(json);
        res.render("hospital", { response: result });
    });*/

    res.render("hospital", { response: { name: "" } });
})
app.get('/covid', (req, res) => {
    res.render("covid", { response: { name: "" } });

})
app.get('/patient', (req, res) => {
    res.render("patient", { response: [{}] });

})
app.get('/update', (req, res) => {
    res.render("update", { response: "" });

})

app.get('/delete', (req, res) => {
    res.render("delete", { response: { message: "" } });

})
app.get('/main', (req, res) => {
    res.render("main", { response: [], hospital: [] });
    var first_name = req[0].first_name;

    console.log(first_name);
})
app.get('/register', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    res.render("register", { });
    /*  db.query("SELECT * FROM patient", function (err, result, fields) {
          if (err) throw err;
          var json = JSON.stringify(result)
          res.render("register", { response: json });
      });*/

})

app.post('/register', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })

    if(req.body.readalladmin != null){

        var id = req.body.name;
        var que = "SELECT * FROM admin";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
    
                var json = JSON.stringify(result)
                console.log(json);
                res.render("register", { response: result });
            }
    
        });
    }
    else{
        console.log(req.body);
        var username = req.body.username;
        var password = req.body.password;
    
        var que = "INSERT INTO admin (username,password) VALUES ('" + username + "','" + password + "')";
        db.query(que, function (err, result, fields) {
            if (err) throw err;
    
            var json = JSON.stringify(result)
            res.render("register", { response: result });
        });
    }
    

})


app.post('/', (req, res) => {
    console.log("inside post /")
    var username = req.body.username;
    var password = req.body.password;
    var que = "SELECT COUNT(*) AS count FROM admin WHERE username='" + username + "' AND password='" + password + "'";
    db.query(que, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            if (result[0].count == 0) {
                res.render("index", { response: { name: "Login credentials are not correct" } });
                return;
            }
            else {
                var json = JSON.stringify(result)
                var que = "SELECT * FROM admin WHERE username='" + username + "' AND password='" + password + "'";
                var que1 = "SELECT name FROM hospital";
                var r1;
                db.query(que1, function (err, result, fields) {


                    var json = JSON.stringify(result)
                    console.log(json);
                    r1 = result;
                });
                db.query(que, function (err, result, fields) {


                    var json = JSON.stringify(result)
                    console.log(json);
                    res.render("main", { response: result, hospital: r1 });
                });

            }

        }

    });

})

app.post('/create', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var que = "INSERT INTO patient (name,email,password) VALUES ('" + name + "','" + email + "','" + password + "')";
    db.query(que, function (err, result, fields) {
        if (err) throw err;

        var json = JSON.stringify(result)
        res.render("create", { response: "record successfully inserted" });
    });

})
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
app.post('/patient/create', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var country = req.body.country;

    var patiendid = req.body.patiendid;
    var hospitalid = req.body.hospitalid;
    var medicineid = req.body.medicineid;

    var que = "INSERT INTO patient (first_name,last_name, username,password, address,city,country,payment_id,hospital_id,medicine_id) VALUES ('" + firstname + "','" + lastname + "','" + username + "', '" + password + "','" + address + "','" + city + "','" + country + "'," + patiendid + "," + hospitalid + "," + medicineid + ")";
    db.query(que, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {
            var json = JSON.stringify(result)
            console.log(json);
            res.render("patient/create", { response: result });
        }
    });

})
app.post('/patient', (req, res) => {
    var id = req.body.name;
    var city = req.body.city;
    var deleteid = req.body.deleteid;
    if (id != null) {
        var que = "SELECT * FROM patient WHERE patient_id='" + id + "'";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {

                var json = JSON.stringify(result)
                console.log(json);
                res.render("patient", { response: result });


            }

        });
    }
    else if (req.body.updateID != null) {
        var id = req.body.updateID;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var password = req.body.password;
        var address = req.body.address;
        var city = req.body.city;
        var country = req.body.country;

        var patiendid = req.body.patiendid;
        var hospitalid = req.body.hospitalid;
        var medicineid = req.body.medicineid;
        var que = "SELECT COUNT(*) as count FROM patient WHERE patient_id = " + id;

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log("result:" + result);
                if (result[0].count == 0) {
                    console.log("Patient ID does not exists");
                    res.render("patient", { response: result });
                }
                else {
                    var que = "UPDATE patient SET first_name = '" + firstname + "' , last_name = '" + lastname + "', username = '" + username + "', password= '" + password + "', address = '" + address + "', city = '" + city + "', country='" + country + "',payment_id= '" + patiendid + "', hospital_id = '" + hospitalid + "',medicine_id='" + medicineid + "' WHERE patient_id = '" + id + "'";
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var json = JSON.stringify(result)
                            console.log(json);

                        }
                    });
                }

            }
        });
    }
    else if (deleteid != null) {

        var que1 = "SELECT COUNT(*) as count FROM patient WHERE patient_id = " + deleteid;
        db.query(que1, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                if (result[0].count == 0) {
                    console.log("Patient ID does not exists");
                    res.render("patient", { response: result });
                }
                else {
                    var que = "DELETE FROM patient WHERE patient_id=" + deleteid;
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {

                            var json = JSON.stringify(result)
                            console.log(json);

                        }

                    });
                }
            }

        });

    }
    else if (city != null) {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var password = req.body.password;
        var address = req.body.address;
        var city = req.body.city;
        var country = req.body.country;

        var patiendid = req.body.patiendid;
        var hospitalid = req.body.hospitalid;
        var medicineid = req.body.medicineid;

        var que = "INSERT INTO patient (first_name,last_name, username,password, address,city,country,payment_id,hospital_id,medicine_id) VALUES ('" + firstname + "','" + lastname + "','" + username + "', '" + password + "','" + address + "','" + city + "','" + country + "'," + patiendid + "," + hospitalid + "," + medicineid + ")";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
            }
        });
    }
    else {
        var que = "SELECT * FROM patient";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {

                var json = JSON.stringify(result)
                console.log(json);

            }

        });
    }


})

// MEDCICINE
// create
app.post('/medicine', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    if (req.body.readall != null) {

        var que = "SELECT * FROM medicine";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("medicine", { response: result });
            }
        });
    }
    else if (req.body.deleteidmedicine != null) {
        var deleteid = parseInt(req.body.deleteidmedicine);
        var que1 = "SELECT COUNT(*) as count FROM medicine WHERE medicine_id = " + deleteid;
        db.query(que1, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                if (result[0].count == 0) {
                    console.log("medicine ID does not exists");
                    res.render("medicine", { response: result });
                }
                else {
                    var que = "DELETE FROM medicine WHERE medicine_id=" + deleteid;
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {

                            var json = JSON.stringify(result)
                            console.log(json);

                        }

                    });
                }
            }

        });
    }
    else if (req.body.updateid != null) {
        var medid = req.body.updateid;
        var name = req.body.name;
        var price = req.body.price;
        var expiry = req.body.expiry;

        var que = "SELECT COUNT(*) as count7 FROM medicine WHERE medicine_id = " + medid;

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log("result:" + result);
                if (result[0].count7 == 0) {
                    console.log("medicine ID does not exists");
                    res.render("medicine", { response: result });
                }
                else {
                    var que = "UPDATE medicine SET medicine_name = '" + name + "' , price = '" + price + "', expiry_term_year = '" + expiry + "' WHERE medicine_id = '" + medid + "'";
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var json = JSON.stringify(result)
                            console.log(json);

                        }
                    });
                }

            }
        });

    }
    else {
        var name = req.body.name;
        var price = req.body.price;
        var expiry = req.body.expiry;
        var hospital = req.body.hospital;

        var que = "INSERT INTO medicine (medicine_name,price, expiry_term_year,hospital_id) VALUES ('" + name + "','" + price + "','" + expiry + "', '" + hospital + "')";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
            }
        });
    }
})

// mode of payment

app.post('/modeofpayment', (req, res) => {
    if (req.body.readall != null) {
        var id = req.body.readall;
        var que = "SELECT * FROM mode_of_payment";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("modeofpayment", { response: result });
            }
        });
    }
    else if (req.body.deleteidpayment != null) {
        var id = parseInt(req.body.deleteidpayment);
        var que1 = "SELECT COUNT(*) as count FROM mode_of_payment WHERE payment_id = " + id;
        db.query(que1, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                if (result[0].count == 0) {
                    console.log("mode_of_payment ID does not exists");
                    res.render("modeofpayment", { response: result });
                }
                else {
                    var que = "DELETE FROM mode_of_payment where payment_id = " + id;
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {

                            var json = JSON.stringify(result)
                            console.log(json);

                        }

                    });
                }
            }

        });
    }
    else if (req.body.updateid != null) {
        var id = req.body.updateid;
        var typeofpayment = req.body.typeofpayment;
        var docreferred = req.body.docreferred;
        var dateoftransaction = req.body.dateoftransaction;
        var que = "SELECT COUNT(*) as count7 FROM mode_of_payment WHERE payment_id = " + id;

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log("result:" + result);
                if (result[0].count7 == 0) {
                    console.log("modeofpayment does not exists");
                    res.render("modeofpayment", { response: result });
                }
                else {
                    var que = "UPDATE mode_of_payment SET type_of_payment = '" + typeofpayment + "' , doc_referred = '" + docreferred + "', date_of_transaction = '" + dateoftransaction + "' WHERE payment_id = '" + id + "'";
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var json = JSON.stringify(result)
                            console.log(json);

                        }
                    });
                }

            }
        });

    }
    else {
        var typeofpayment = req.body.typeofpayment;
        var docreferred = req.body.docreferred;
        var dateoftransaction = req.body.dateoftransaction;


        var que = "INSERT INTO mode_of_payment (type_of_payment, doc_referred,date_of_transaction) VALUES ('" + typeofpayment + "','" + docreferred + "', date_of_transaction = '" + dateoftransaction + "')";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
            }
        });
    }
})

//


app.post('/hospitalentity', (req, res) => {
    if(req.body.readall){
        var que = "SELECT * FROM hospital";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("hospitalentity", { response: result });
            }
        });
    }
    else if (req.body.deleteidpayment != null) {
        var id = parseInt(req.body.deleteidpayment);
        var que1 = "SELECT COUNT(*) as count FROM hospital WHERE hospital_id = " + id;
        db.query(que1, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                if (result[0].count == 0) {
                    console.log("hospital ID does not exists");
                    res.render("hospitalentity", { response: result });
                }
                else {
                    var que = "DELETE FROM hospital where hospital_id = " + id;
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {

                            var json = JSON.stringify(result)
                            console.log(json);

                        }

                    });
                }
            }

        });

    }
    else if (req.body.updateid != null) {
        var id = req.body.updateid;
        var name = req.body.name;
        var address = req.body.address;
        var phone_no = req.body.phone_no;
        var number_of_staff = req.body.number_of_staff;
        var que = "SELECT COUNT(*) as count7 FROM hospital WHERE hospital_id = " + id;

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log("result:" + result);
                if (result[0].count7 == 0) {
                    console.log("hospitalid does not exists");
                    res.render("hospitalentity", { response: result });
                }
                else {
                    var que = "UPDATE hospital SET name = '" + name + "' , address = '" + address + "', phone_no = '" + phone_no + "', number_of_staff = '" + number_of_staff + "' WHERE hospital_id = '" + id + "'";
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var json = JSON.stringify(result)
                            console.log(json);

                        }
                    });
                }

            }
        });

    }
    else {
        var name = req.body.name;
        var address = req.body.address;
        var phone_no = req.body.phone_no;
        var number_of_staff = req.body.number_of_staff;


        var que = "INSERT INTO hospital (name, address, phone_no,number_of_staff) VALUES ('" + name + "','" + address + "','" + phone_no + "','" + number_of_staff + "')";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
            }
        });
    }
})
// patiend feedback

app.post('/patientfeedback', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    if (req.body.readall != null) {

        var que = "SELECT * FROM patient_feedback";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("patientfeedback", { response: result });
            }
        });
    }
    else if (req.body.deleteidmedicine != null) {
        var id = parseInt(req.body.deleteidmedicine);
        var que1 = "SELECT COUNT(*) as count FROM patient_feedback WHERE patient_id = " + id;
        db.query(que1, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                if (result[0].count == 0) {
                    console.log("patientfeedback for that ID does not exists");
                    res.render("patientfeedback", { response: result });
                }
                else {
                    var que = "DELETE FROM patient_feedback where patient_id = " + id;
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {

                            var json = JSON.stringify(result)
                            console.log(json);

                        }

                    });
                }
            }

        });
    }
    else if (req.body.updateid != null) {
        var id = req.body.updateid;
        var employeeid = req.body.employeeid;
        var feedback = req.body.feedback;
        var patient_name = req.body.patient_name;
        var date_of_feedback = req.body.date_of_feedback;
        var que = "SELECT COUNT(*) as count7 FROM patient_feedback WHERE patient_id = " + id;

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log("result:" + result);
                if (result[0].count7 == 0) {
                    console.log("patient_feedback for that id does not exists");
                    res.render("patientfeedback", { response: result });
                }
                else {
                    var que = "UPDATE patient_feedback SET employee_id = '" + employeeid + "' , feedback = '" + feedback + "', patient_name = '" + patient_name + "', date_of_feedback= '" + date_of_feedback + "' WHERE patient_id = '" + id + "'";
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var json = JSON.stringify(result)
                            console.log(json);

                        }
                    });
                }

            }
        });

    }
    else {
        var employeeid = req.body.employeeid;
        var feedback = req.body.feedback;
        var patient_name = req.body.patient_name;
        var date_of_feedback = req.body.date_of_feedback;

        var que = "INSERT INTO patient_feedback (employee_id,feedback, patient_name,date_of_feedback) VALUES ('" + employeeid + "','" + feedback + "','" + patient_name + "', '" + date_of_feedback + "')";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
            }
        });
    }
})

// doctor

app.post('/doctor', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    if (req.body.readall != null) {

        var que = "SELECT * FROM doctor";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("doctor", { response: result });
            }
        });
    }
    else if (req.body.deleteidmedicine != null) {
        var id = parseInt(req.body.deleteidmedicine);
        var que1 = "SELECT COUNT(*) as count FROM doctor WHERE doctor_employee_id = " + id;
        db.query(que1, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                if (result[0].count == 0) {
                    console.log("doctorfor that ID does not exists");
                    res.render("doctor", { response: result });
                }
                else {
                    var que = "DELETE FROM doctor where doctor_employee_id = " + id;
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {

                            var json = JSON.stringify(result)
                            console.log(json);

                        }

                    });
                }
            }

        });

    }
    else if (req.body.updateid != null) {
        var id = req.body.updateid;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var address = req.body.address;
        var email = req.body.email;
        var city = req.body.city;
        var country = req.body.country;
        var description = req.body.description;
        var hospital_name = req.body.hospital_name;
        var salary = req.body.salary;
        var type_of_employement = req.body.type_of_employement;
        var phone_number = req.body.phone_number;
        var speciality = req.body.speciality;
        var doc_description = req.body.doc_description;
        var hospital_table_id = req.body.hospital_table_id;
        var que = "SELECT COUNT(*) as count7 FROM doctor WHERE doctor_employee_id = " + id;

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log("result:" + result);
                if (result[0].count7 == 0) {
                    console.log("doctor id does not exists");
                    res.render("doctor", { response: result });
                }
                else {
                    var que = "UPDATE doctor SET first_name = '" + first_name + "' , last_name = '" + last_name + "', address = '" + address + "', email= '" + email + "', city= '" + city + "', country = '" + country + "', description = '" + description + "', hospital_name = '" + hospital_name + "',salary = '" + salary + "', type_of_employment = '" + type_of_employement + "', phone_number = '" + phone_number + "',speciality = '" + speciality + "', doc_description = '" + doc_description + "', hospital_table_id = '" + hospital_table_id + "' WHERE doctor_employee_id = '" + id + "'";
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var json = JSON.stringify(result)
                            console.log(json);

                        }
                    });
                }

            }
        });

    }
    else {
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var address = req.body.address;
        var email = req.body.email;
        var city = req.body.city;
        var country = req.body.country;
        var description = req.body.description;
        var hospital_name = req.body.hospital_name;
        var salary = req.body.salary;
        var type_of_employement = req.body.type_of_employement;
        var phone_number = req.body.phone_number;
        var speciality = req.body.speciality;
        var doc_description = req.body.doc_description;
        var hospital_table_id = req.body.hospital_table_id;

        var que = "INSERT INTO doctor (first_name,last_name, address,email,city,country,description,hospital_name, salary, type_of_employment,phone_number,speciality,doc_description,hospital_table_id) VALUES ('" + first_name + "','" + last_name + "','" + address + "', '" + email + "' , '" + city + "','" + country + "', '" + description + "','" + hospital_name + "','" + salary + "','" + type_of_employement + "','" + phone_number + "','" + speciality + "','" + doc_description + "','" + hospital_table_id + "')";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
            }
        });
    }
})

// employee


app.post('/employee', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    if (req.body.readall != null) {
        var id = req.body.readall;
        var que = "SELECT * FROM employee"

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("employee", { response: json });
            }
        });
    }
    else if (req.body.deleteidmedicine != null) {
        var id = parseInt(req.body.deleteidmedicine);
        var que1 = "SELECT COUNT(*) as count FROM employee WHERE employee_id = " + id;
        db.query(que1, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                if (result[0].count == 0) {
                    console.log("employee fot that ID does not exists");
                    res.render("employee", { response: result });
                }
                else {
                    var que = "DELETE FROM employee where employee_id = " + id;
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {

                            var json = JSON.stringify(result)
                            console.log(json);

                        }

                    });
                }
            }

        });
    }
    else if (req.body.updateid != null) {
        var id = req.body.updateid;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var address = req.body.address;
        var email = req.body.email;
        var city = req.body.city;
        var country = req.body.country;
        var description = req.body.description;
        var hospital_name = req.body.hospital_name;
        var salary = req.body.salary;
        var type_of_employement = req.body.type_of_employement;
        var hospital_id = req.body.hospital_id;
        var que = "SELECT COUNT(*) as count7 FROM employee WHERE employee_id = " + id;

        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                console.log("result:" + result);
                if (result[0].count7 == 0) {
                    console.log("employee id does not exists");
                    res.render("employee", { response: result });
                }
                else {
                    var que = "UPDATE employee SET first_name = '" + first_name + "' , last_name = '" + last_name + "', address = '" + address + "', email= '" + email + "', city= '" + city + "', country = '" + country + "', description = '" + description + "', hospital_name = '" + hospital_name + "',salary = '" + salary + "', type_of_employment = '" + type_of_employement + "', hospital_id = '" + hospital_id + "' WHERE employee_id = '" + id + "'";
                    db.query(que, function (err, result, fields) {
                        if (err) {
                            throw err;
                        }
                        else {
                            var json = JSON.stringify(result)
                            console.log(json);

                        }
                    });
                }

            }
        });


    }
    else {
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var address = req.body.address;
        var email = req.body.email;
        var city = req.body.city;
        var country = req.body.country;
        var description = req.body.description;
        var hospital_name = req.body.hospital_name;
        var salary = req.body.salary;
        var type_of_employement = req.body.type_of_employement;
        var hospital_id = req.body.hospital_id;


        var que = "INSERT INTO employee (first_name,last_name, address,email,city,country,description,hospital_name, salary, type_of_employment,hospital_id) VALUES ('" + first_name + "','" + last_name + "','" + address + "', '" + email + "' , '" + city + "','" + country + "', '" + description + "','" + hospital_name + "','" + salary + "','" + type_of_employement + "','" + hospital_id + "')";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("employee", { response: result });
            }
        });
    }
})

app.post('/delete', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    console.log("inside post /")
    var id = req.body.name;
    var que = "DELETE FROM patient WHERE patient_id='" + id + "'";
    db.query(que, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {

            var json = JSON.stringify(result)
            console.log(json);
            res.render("delete", { response: { message: "record successful deleted" } });
        }

    });

})




app.post('/update', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/register.html'), { name: "karan" })
    console.log("inside post /")
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var que = "UPDATE patient SET email='" + email + "', password='" + password + "' ,name ='" + name + "' WHERE patient_id ='" + id + "'";
    db.query(que, function (err, result, fields) {
        if (err) {
            throw err;
        }
        else {

            var json = JSON.stringify(result)
            console.log(json);
            res.render("update", { response: { message: "record successful updated" } });
        }

    });

})

app.post('/queries1', (req, res) => {
    if (req.body.readall != null) {

        var que = "SELECT employee_id, first_name FROM employee WHERE salary >= 10000 AND salary <= 1000000;";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });

    }


})
app.post('/queries2', (req, res) => {
    if (req.body.readall1 != null) {
        var id = parseInt(req.body.deleteidmedicine);

        var que = "SELECT payment_id, date_of_transaction FROM mode_of_payment WHERE type_of_payment= 'credit card' ;";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }

})
app.post('/queries3', (req, res) => {
    if (req.body.readall != null) {

        var que = "SELECT speciality  FROM doctor WHERE type_of_employment = 'employee'";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }
})
app.post('/queries4', (req, res) => {
    if (req.body.readall4 != null) {
        var id = parseInt(req.body.deleteidmedicine);

        var que = "SELECT SUM(salary) as TOTAL_CHICAGO_BUDGET FROM doctor WHERE city = 'Chicago';";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }

})
app.post('/queries5', (req, res) => {
    if (req.body.readall5 != null) {
        var id = parseInt(req.body.deleteidmedicine);

        var que = "SELECT COUNT(payment_id) as TOTAL_FUNDS_COLLECTED FROM mode_of_payment WHERE date_of_transaction > '12/11/20'";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }

})

app.post('/queries6', (req, res) => {
    if (req.body.readall6 != null) {
        var id = parseInt(req.body.deleteidmedicine);

        var que = "SELECT COUNT(number_of_staff) as p,name FROM hospital GROUP BY name  HAVING SUM(number_of_staff) < 50 ;";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }

})
app.post('/queries7', (req, res) => {
    if (req.body.readall7 != null) {
        var id = parseInt(req.body.deleteidmedicine);

        var que = "Select * from f";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }

})
app.post('/queries8', (req, res) => {
    if (req.body.readall8 != null) {
        var id = parseInt(req.body.deleteidmedicine);

        var que = "select * from poc";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }

})
app.post('/queries9', (req, res) => {
    if (req.body.readall9 != null) {
        var id = parseInt(req.body.deleteidmedicine);

        var que = "Select * from pay";
        db.query(que, function (err, result, fields) {
            if (err) {
                throw err;
            }
            else {
                var json = JSON.stringify(result)
                console.log(json);
                res.render("queries", { response: result });
            }
        });
    }

})


app.post('/droptable', (req, res) => {

   
    var dropdoc = "DROP TABLE IF EXISTS `doctor`";

    var dropemp = "DROP TABLE IF EXISTS `employee`";

    var drophosp = "DROP TABLE IF EXISTS `hospital`";

    var dropmed = "DROP TABLE IF EXISTS `medicine`";

    var dropmode = "DROP TABLE IF EXISTS `mode_of_payment`";

    var patient = "DROP TABLE IF EXISTS `patient`";

    var dropfeed = "DROP TABLE IF EXISTS `patient_feedback`";
    var viewdrop1="DROP VIEW IF EXISTS `POC`";


    var viewdrop2="DROP VIEW IF EXISTS `PAY`";
     
    var viewdrop3="DROP VIEW IF EXISTS `f`";

    
    db.query(viewdrop1, function (err, result, fields) { });
    db.query(viewdrop2, function (err, result, fields) { });
    db.query(viewdrop3, function (err, result, fields) { });
    db.query(dropfeed, function (err, result, fields) { });
    db.query(dropmode, function (err, result, fields) { });
    db.query(dropmed, function (err, result, fields) { });
    db.query(patient, function (err, result, fields) { });
    db.query(dropdoc, function (err, result, fields) { });
    db.query(dropemp, function (err, result, fields) { });
    db.query(drophosp, function (err, result, fields) { });


    console.log("droped successfullly");

})

app.post('/createtable', (req, res) => {
    var que1 = "CREATE TABLE `hospital` ( `hospital_id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, `address` varchar(45) NOT NULL,`phone_no` varchar(45) NOT NULL,`number_of_staff` int(11) NOT NULL, PRIMARY KEY (`hospital_id`),UNIQUE KEY `hospital_id_UNIQUE` (`hospital_id`))";
    var que2 = "CREATE TABLE `medicine` (`medicine_id` int(11) NOT NULL AUTO_INCREMENT,`medicine_name` varchar(45) NOT NULL, `price` varchar(50) NOT NULL, `expiry_term_year` varchar(35) NOT NULL,`hospital_id` int(11) NOT NULL,   PRIMARY KEY (`medicine_id`), UNIQUE KEY `medicine_id_UNIQUE` (`medicine_id`))";
    var que3 = "CREATE TABLE `mode_of_payment` (`payment_id` int(11) NOT NULL AUTO_INCREMENT,  `type_of_payment` varchar(45) NOT NULL,`doc_referred` varchar(45) NOT NULL,`date_of_transaction` varchar(20) NOT NULL,  PRIMARY KEY (`payment_id`), UNIQUE KEY `payment_id_UNIQUE` (`payment_id`) )";
    var que4 = "CREATE TABLE `patient` (`patient_id` int(11) NOT NULL AUTO_INCREMENT,`first_name` varchar(45) NOT NULL,`last_name` varchar(45) NOT NULL,`username` varchar(45) NOT NULL, `password` varchar(45) NOT NULL,`address` varchar(45) NOT NULL,`city` varchar(45) NOT NULL, `country` varchar(45) NOT NULL,`payment_id` int(11) NOT NULL,`hospital_id` int(11) NOT NULL,`medicine_id` int(11) NOT NULL,PRIMARY KEY (`patient_id`), UNIQUE KEY `patient_id_UNIQUE` (`patient_id`),UNIQUE KEY `payment_id_UNIQUE` (`payment_id`),UNIQUE KEY `username_UNIQUE` (`username`), UNIQUE KEY `hospital_id_UNIQUE` (`hospital_id`),UNIQUE KEY `medicine_id_UNIQUE` (`medicine_id`) ,CONSTRAINT `hospital_id` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hospital_id`),CONSTRAINT `medicine_id` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`medicine_id`),CONSTRAINT `payment_id` FOREIGN KEY (`payment_id`) REFERENCES `mode_of_payment` (`payment_id`))";
    var que5 = "CREATE TABLE `patient_feedback` (`patient_id` int(11) NOT NULL AUTO_INCREMENT,`employee_id` int(11) NOT NULL,`feedback` varchar(45) NOT NULL,`patient_name` varchar(20) NOT NULL,`date_of_feedback` varchar(20) NOT NULL, PRIMARY KEY (`patient_id`),UNIQUE KEY `idpatient_feedback_UNIQUE` (`patient_id`))";
    var que6 = "CREATE TABLE `employee` (`employee_id` int(11) NOT NULL,`first_name` varchar(20) NOT NULL, `last_name` varchar(20) NOT NULL,`address` varchar(20) NOT NULL,`email` varchar(20) NOT NULL,`city` varchar(20) NOT NULL,`country` varchar(20) NOT NULL,`description` varchar(70) DEFAULT NULL,`hospital_name` varchar(20) DEFAULT NULL,`salary` varchar(45) NOT NULL, `type_of_employment` varchar(20) NOT NULL,`hospital_id` int(11) NOT NULL,PRIMARY KEY (`employee_id`),UNIQUE KEY `idpatient_UNIQUE` (`employee_id`),UNIQUE KEY `hospital_id_UNIQUE` (`hospital_id`),UNIQUE KEY `hospital_name_UNIQUE` (`hospital_name`),CONSTRAINT `hospital_id_employee` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hospital_id`)) ";
    var que7 = "CREATE TABLE `doctor` (`doctor_employee_id` int(11) NOT NULL AUTO_INCREMENT,`first_name` varchar(45) NOT NULL,`last_name` varchar(45) NOT NULL, `address` varchar(45) NOT NULL,`email` varchar(45) NOT NULL, `city` varchar(45) NOT NULL,`country` varchar(45) DEFAULT NULL,`description` varchar(45) NOT NULL,`hospital_name` varchar(20) DEFAULT NULL, `salary` varchar(56) NOT NULL,`type_of_employment` varchar(20) NOT NULL,`phone_number` varchar(30) NOT NULL, `speciality` varchar(20) NOT NULL, `doc_description` varchar(45) NOT NULL,`hospital_table_id` int(11) NOT NULL,PRIMARY KEY (`doctor_employee_id`),UNIQUE KEY `doctor_employee_id_UNIQUE` (`doctor_employee_id`),UNIQUE KEY `hospital_table_id_UNIQUE` (`hospital_table_id`),CONSTRAINT `hospital_table_id` FOREIGN KEY (`hospital_table_id`) REFERENCES `hospital` (`hospital_id`))";
    
    

    db.query(que1, function (err, result, fields) { });
    db.query(que6, function (err, result, fields) { });
    db.query(que7, function (err, result, fields) { });
    db.query(que4, function (err, result, fields) { });
    db.query(que3, function (err, result, fields) { });
    db.query(que2, function (err, result, fields) { });
    db.query(que5, function (err, result, fields) { });
    

    console.log("created successfullly");

})

app.post('/inserttable', (req, res) => {

    var insertdoc = "INSERT INTO `doctor` VALUES (1,'Daniel','Micheal','south miller','xyz@gmail.com','Chicago','USA','my name is dianeal','sunshine','50000','employye','1234334343','General surgeon','best doctor in the city',1),(2,'John','Mason','123 st Taylor st','john@gmail.com','Chicago','United States','John','Cross Hospital','100000','employee','9876543210','ornithologist','cool doctor',2),(3,'James','Thames','65 Berkley st','james@gmail.com','Berkley','UK','good','Red Cross','140000','employee','98765894323','dermatology','great',3),(4,'ABC','XYZ','LEXINGTON','ABC@GMAIL.COM','HYD','INDIA','COOL','SUNRISE','100000','employee','1234567891','DOCTOR','PHYSICIAN',4),(5,'rani','Lakshmi','789 lewisburg lane','rani@gmail.com','mumbai','india','helper','sunset','500000','employee','5678943210','mbbs','helps everone',5)";

    var insertemp = "INSERT INTO `employee` VALUES (2,'Daniel','Micheal','south miller','xyz@gmail.com','Chicago','USA','my name is dianeal','sunshine','50000','doctor',2),(4,'harshith','alle','Gandhinagar','har@gmail.com','hyderbad','country','I am a workboy','srikara','40000','workboy',4),(5,'James','Thames','65 Berkley st','james@gmail.com','Berkley','UK','James is a general surgeon and a neurosurgeon.','red cross','140000','doctor',5)";

    var inserthop = "INSERT INTO `hospital` VALUES (1,'Red Cross','main road st, lexington','3124335432',23),(2,'Merry hospital','tatylor st','3123435432',34),(3,'UI Health','roosevelt road','3124235432',78),(4,'sunrise','lewisburg','987651234',4),(5,'srikara','miller','5678912340',50)";

    var insertmed = "INSERT INTO `medicine` VALUES (1,'Paracip 500','12','12/23/22',1),(2,'crocin','200','2/23/20',2),(3,'Advil','20','12/21/22',4),(5,'carpal','340','5/4/22',3),(6,'Advil pro max','30','11/23/22',5)";

    var insertmode = "INSERT INTO `mode_of_payment` VALUES (1,'credit card','john mason','12/11/20'),(2,'cash','john mason','12/12/20'),(3,'credit card','john mason','12/21/20'),(5,'debit card','Hiral','9/8/21'),(21,'cash','XYZ','2/7/21')";

    var insertpatient = "INSERT INTO `patient` VALUES (1,'john','mason','john1234','john1234','123 main road','Chicago','US',1,2,2),(2,'Merry','main','merybest','dsfwe','234 taylor st','Chicago','US',2,3,1)";

    var insertfeed = "INSERT INTO `patient_feedback` VALUES (1,1,'Very good treatment','john','3/12/2020'),(2,3,'Very good treatment','karl','3/12/2020'),(3,3,'The treatment was done correctly.','karen','3/12/2020'),(4,4,'Very good treatment','pranavi','3/12/2020'),(5,5,'Very good treatment','hiral','3/12/2020')";
    var view1="CREATE VIEW poc AS SELECT E.employee_id, E.first_name FROM employee E INNER JOIN Doctor D ON D.doctor_employee_id = E.employee_id GROUP BY E.employee_id ORDER BY E.first_name ASC";
    var view2="Create view pay as SELECT first_name, last_name FROM patient as p WHERE EXISTS (SELECT t.patient_id FROM patient_feedback as t WHERE p.patient_id=t.patient_id AND date_of_feedback > '2/12/20')";
    var view3="CREATE VIEW f AS select employee_id from employee e where  Exists (select hospital_id from hospital as h where h.number_of_staff>20)";




    db.query(inserthop, function (err, result, fields) { });
    db.query(insertemp, function (err, result, fields) { });
    db.query(insertdoc, function (err, result, fields) { });
    db.query(insertpatient, function (err, result, fields) { });
    db.query(insertfeed, function (err, result, fields) { });
    db.query(insertmode, function (err, result, fields) { });
    db.query(insertmed, function (err, result, fields) { });
    db.query(view1, function (err, result, fields) { });
    db.query(view2, function (err, result, fields) { });
    db.query(view3, function (err, result, fields) { });


    console.log("inserted successfullly");

})
module.exports = db;

