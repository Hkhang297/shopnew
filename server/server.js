require('dotenv').config();
const http = require('http');
const port = process.env.PORT;
// const port = 8080
const fs = require('fs'); //Đọc tập tin
const db = require('./mongoDB');
const sendMail = require('./sendMail');
const imgCloud = require("./cloudinaryImages")

const server = http.createServer((req, res) => {
    let method = req.method;
    let url = req.url;
    let ket_qua = `Server NodeJS - Method: ${method} - URL: ${url}`;
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (method == 'GET') {
        if (url == '/dsTivi') {
            db.getAll('tivi').then((result) => {
                try {
                    ket_qua = JSON.stringify(result);
                    res.writeHead(200, {
                        'Content-type': 'text/json, charset=utf-8',
                    });
                    res.end(ket_qua);
                } catch (error) {
                    console.log(error);
                }
            });
        } else if (url == '/dsDienthoai') {
            db.getAll('mobile').then((result) => {
                try {
                    ket_qua = JSON.stringify(result);
                    res.writeHead(200, {
                        'Content-type': 'text/json, charset=utf-8',
                    });
                    res.end(ket_qua);
                } catch (error) {
                    console.log(error);
                }
            });
        } else if (url == '/Cuahang') {
            db.getAll('store').then((result) => {
                try {
                    ket_qua = JSON.stringify(result);
                    res.writeHead(200, {
                        'Content-type': 'text/json, charset=utf-8',
                    });
                    res.end(ket_qua);
                } catch (error) {
                    console.log(error);
                }
            });
        } else if (url == '/dsHocsinh') {
            db.getAll('student').then((result) => {
                try {
                    ket_qua = JSON.stringify(result);
                    res.writeHead(200, {
                        'Content-type': 'text/json, charset=utf-8',
                    });
                    res.end(ket_qua);
                } catch (error) {
                    console.log(error);
                }
            });
        } else if (url == '/dsNguoidung') {
            db.getAll('user').then((result) => {
                try {
                    ket_qua = JSON.stringify(result);
                    res.writeHead(200, {
                        'Content-type': 'text/json, charset=utf-8',
                    });
                    res.end(ket_qua);
                } catch (error) {
                    console.log(error);
                }
            });
        } else if (url == '/dsMathang') {
            db.getAll('food').then((result) => {
                try {
                    ket_qua = JSON.stringify(result);
                    res.writeHead(200, {
                        'Content-type': 'text/json, charset=utf-8',
                    });
                    res.end(ket_qua);
                } catch (error) {
                    console.log(error);
                }
            });
        } else if (url.match('.png$')) {
            let imagePath = `images/${url}`;
            if (!fs.existsSync(imagePath)) {
                imagePath = `images/noImage.png`;
            }
            let fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            fileStream.pipe(res);
        } else {
            res.writeHead(200, { 'Content-type': 'text/json, charset=utf-8' });
            res.end(ket_qua);
        }
    } else if (method == 'POST') {
        let noi_dung_nhan = ``;
        req.on('data', (data) => {
            noi_dung_nhan += data;
        });
        // Xử lý
        if (url == '/ThemNguoidung') {
            req.on('end', () => {
                res.end(noi_dung_nhan);
            });
        } else if (url == '/Lienhe') {
            req.on('end', function () {
                let thongTin = JSON.parse(noi_dung_nhan);
                let Ket_qua = { Noi_dung: true };
                let from = `admin.shopsl@gmail.com`;
                let to = `knguyn694@gmail.com`;
                let subject = thongTin.tieude;
                let body = thongTin.noidung;
                sendMail
                    .Goi_Thu_Lien_he(from, to, subject, body)
                    .then((result) => {
                        console.log(result);
                        res.end(JSON.stringify(Ket_qua));
                    })
                    .catch((err) => {
                        console.log(err);
                        Ket_qua.Noi_dung = false;
                        res.end(JSON.stringify(Ket_qua));
                    });
            });
        }else if (url == '/Dathang') {
            req.on('end', () => {
                let dsDathang = JSON.parse(noi_dung_nhan);
                let ket_qua = { Noi_dung: [] };
                dsDathang.forEach((item) => {
                    let filter = {
                        Ma_so: item.key,
                    };
                    let collectionName =
                        item.manhom == 1
                            ? 'tivi'
                            : item.manhom == 2
                            ? 'food'
                            : 'mobile';
                    db.getOne(collectionName, filter)
                        .then((result) => {
                            item.dathang.So_Phieu_Dat =
                                result.Danh_sach_Phieu_Dat.length + 1;
                            result.Danh_sach_Phieu_Dat.push(item.dathang);
                            // Update
                            let capnhat = {
                                $set: {
                                    Danh_sach_Phieu_Dat:
                                        result.Danh_sach_Phieu_Dat,
                                },
                            };
                            let obj = {
                                Ma_so: result.Ma_so,
                                Update: true,
                            };
                            db.updateOne(collectionName, filter, capnhat)
                                .then((result) => {
                                    if (result.modifiedCount == 0) {
                                        obj.Update = false;
                                    }
                                    ket_qua.Noi_dung.push(obj);
                                    console.log(ket_qua.Noi_dung);
                                    if (
                                        ket_qua.Noi_dung.length ==
                                        dsDathang.length
                                    ) {
                                        res.end(JSON.stringify(ket_qua));
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            });
        } else if (url == "/Dangnhap") {
            req.on("end", () => {
                let ket_qua = {
                    "Noi_dung": true
                }
                let user=JSON.parse(noi_dung_nhan);
                let dieukien = {
                    $and: [
                        { "Ten_Dang_nhap": user.Ten_Dang_nhap },
                        { "Mat_khau": user.Mat_khau }
                    ]
                }
                db.getOne("user",dieukien).then(result=>{
                    console.log(result)
                    ket_qua.Noi_dung = {
                        "Ho_ten": result.Ho_ten,
                        "Nhom": {
                            "Ma_so": result.Nhom_Nguoi_dung.Ma_so,
                            "Ten": result.Nhom_Nguoi_dung.Ten
                        }
                    };
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));

                }).catch(err=>{
                    console.log(err);
                    ket_qua.Noi_dung=false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                })	
            })
        } else if (url == "/ThemTivi") {
            req.on('end', function () {
                let tivi = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.insertOne("tivi", tivi).then(result => {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if (url == "/ImagesTivi") {
            req.on('end', function () {
                let img = JSON.parse(noi_dung_nhan);
                let Ket_qua = { "Noi_dung": true };
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(Ket_qua));

                }).catch(err=>{
                    Ket_qua.Noi_dung=false
                    res.end(JSON.stringify(Ket_qua))
                })
            })
        }else if (url == "/SuaTivi") {
            req.on('end', function () {
                let tivi = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.updateOne("tivi",tivi.condition,tivi.update).then(result=>{
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err=>{
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua)) 
                })
            })
        }else if (url == "/XoaTivi") {
            req.on('end', function () {
                let tivi = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": true };
                db.deleteOne("tivi",tivi).then(result=>{
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                }).catch(err=>{
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua))
                })
            })
        }
    }
});

server.listen(port, () => {
    console.log(`Service Run IP: http://localhost:${port}`);
});

// Upload Media -----------------------------------------------------------------
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Error ...');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function saveMedia(Ten, Chuoi_nhi_phan) {
    var Kq = "OK"
    try {
        var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
        var Duong_dan = "images//" + Ten
        fs.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
        Kq = Loi.toString()
    }
    return Kq
}